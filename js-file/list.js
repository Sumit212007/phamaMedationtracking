function addItem(listId, name, extra = "") {
    const item = document.createElement("div");
    item.className = "list-item";

    item.innerHTML = `
        <div>${name}</div>
        <div>${extra}</div>
    `;

    document.getElementById(listId).appendChild(item);
}

async function removeItem(listId) {
    const selected = document.querySelector(`#${listId} .selected`);

    if (!selected) {
        await dashboardAlert("Please select an item first");
        return;
    }

    selected.remove();
}