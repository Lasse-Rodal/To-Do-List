let items = [];
const input = document.getElementById("itemInput");
const dueDateInput = document.getElementById("dueDateInput");
const itemsDiv = document.getElementById("items");
const storageKey = "items";

function renderItems() {
    itemsDiv.innerHTML = "";

    items.forEach((item, idx) => {
        const container = document.createElement("div");
        container.style.marginBottom = "10px";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;
        checkbox.onchange = () => toggleCompleted(idx);

        const text = document.createElement("span");
        text.textContent = item.text + (item.dueDate ? ` (Due: ${item.dueDate})` : "");
        text.style.margin = "0 10px";
        if (item.completed) text.style.textDecoration = "line-through";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => removeItem(idx);

        container.appendChild(checkbox);
        container.appendChild(text);
        container.appendChild(deleteBtn);

        itemsDiv.appendChild(container);
    });
}

function toggleCompleted(idx) {
    items[idx].completed = !items[idx].completed;
    saveItems();
    renderItems();
}

function loadItems() {
    const oldItems = localStorage.getItem(storageKey);
    if (oldItems) items = JSON.parse(oldItems);
    renderItems();
}

function saveItems() {
    localStorage.setItem(storageKey, JSON.stringify(items));
}

function addItem() {
    const value = input.value;
    const due = dueDateInput.value;
    if (!value) return alert("You cannot add an empty item");

    items.push({ text: value, dueDate: due, completed: false });
    input.value = "";
    dueDateInput.value = "";
    saveItems();
    renderItems();
}

function removeItem(idx) {
    items.splice(idx, 1);
    saveItems();
    renderItems();
}

document.addEventListener("DOMContentLoaded", loadItems);
