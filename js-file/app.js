document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       🔹 ENABLE SELECTION
    ============================== */
    ["productList", "manufacturerList", "warehouseList", "pharmaceuticalList"]
        .forEach(enableSelection);


    /* ==============================
       🔹 ADD ITEM FUNCTION (UPDATED UI STRUCTURE)
    ============================== */
    function addStyledItem(listId, name, meta = "", status = "Unverified") {

        const item = document.createElement("div");
        item.className = "list-item";

        item.innerHTML = `
            <div class="item-icon icon-blue">
                <svg viewBox="0 0 24 24" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M9 9h6M9 12h6M9 15h4"/>
                </svg>
            </div>

            <div class="item-info">
                <div class="item-name">${name}</div>
                <div class="item-meta">${meta}</div>
            </div>

            <span class="item-status status-verified">${status}</span>
        `;

        document.getElementById(listId).appendChild(item);
    }


    /* ==============================
       🔹 REMOVE ITEM (uses your existing function)
    ============================== */
    function handleRemove(listId) {
        removeItem(listId);
    }


    /* ==============================
       🔹 PRODUCT
    ============================== */
    document.getElementById("addProductBtn").onclick = async () => {

        const data = await dashboardFormPrompt({
            title: "Add Product",
            fields: [
                { id: "name", placeholder: "Product name" },
                { id: "batch", placeholder: "Batch number" },
                { id: "serialNumber", placeholder: "Serial Number"},
                { id: "expireDate", placeholder: "Expire Date"},
                { id: "manufacturingDate", placeholder: "Manufacture Date"},
                { id: "quantity", placeholder: "quantity"}
            ]
        });

        if (!data) return;

        addStyledItem("productList", data.name, "Batch: " + data.batch, "Verified");
    };

    document.getElementById("removeProductBtn").onclick =
        () => handleRemove("productList");


    /* ==============================
       🔹 MANUFACTURER
    ============================== */
    document.getElementById("addManufacturerBtn").onclick = async () => {

            const data = await dashboardFormPrompt({
                title: "Add Manufacturer",
                fields: [
                    { id: "name", placeholder: "Manufacturer name" },
                    { id: "address", placeholder: "Address"}
                ]
            });

            if (!data) return;

            try {
        const response = await fetch("https://wafery-esmeralda-oedipally.ngrok-free.dev/api/v1/manufacturer/medicine", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accesstoken
            },
            body: JSON.stringify({
                name: data.name,
                address: data.address,
                status: data.status

            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to add manufacturer");
        }

        // ✅ Only add to UI if API success
        addStyledItem(
            "manufacturerList",
            data.name,
            "Address: " + data.address,
            "Verified"
        );

        alert("✅ Manufacturer added");

    } catch (error) {
        console.error(error);
        alert("❌ " + error.message);
    }
    };

    document.getElementById("removeManufacturerBtn").onclick =
        () => handleRemove("manufacturerList");


    /* ==============================
       🔹 WAREHOUSE
    ============================== */
    document.getElementById("addWarehouseBtn").onclick = async () => {

        const data = await dashboardFormPrompt({
            title: "Add Distributer",
            fields: [
                { id: "name", placeholder: "Distributer name" },
                { id: "zone", placeholder: "Zone (North/South)" },
                { id: "number", placeholder: "Contact number" },
                { id: "pharma", placeholder: "Pharma company" }
            ]
        });

        if (!data) return;

        const itemName = `${data.name} — ${data.zone}`;
        const itemMeta = `num:${data.number} · phama:${data.pharma}`;

        addStyledItem("warehouseList", itemName, itemMeta);
    };

    document.getElementById("removeWarehouseBtn").onclick =
        () => handleRemove("warehouseList");


    /* ==============================
       🔹 PHARMACEUTICAL COMPANY
    ============================== */
    document.getElementById("addPharmaBtn").onclick = async () => {

        const data = await dashboardFormPrompt({
            title: "Add Pharmaceutical Company",
            fields: [
                { id: "name", placeholder: "Company name" },
                { id: "batch", placeholder: "Batch"}
            ]
        });

        if (!data) return;

        addStyledItem("pharmaceuticalList", data.name);
    };

    document.getElementById("removePharmaBtn").onclick =
        () => handleRemove("pharmaceuticalList");

});