function enableSelection(listId) {
    document.getElementById(listId).addEventListener("click", e => {
        const item = e.target.closest(".list-item");
        if (!item) return;

        document.querySelectorAll(`#${listId} .list-item`)
            .forEach(i => i.classList.remove("selected"));

        item.classList.add("selected");
    });
}