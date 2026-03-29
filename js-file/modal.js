(function () {
    let overlay, els = {};

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    function ensureModal() {
        if (document.getElementById("dashboardModalOverlay")) return;

        document.body.insertAdjacentHTML("beforeend", `
            <div id="dashboardModalOverlay" class="dashboard-modal-overlay">
                <div class="dashboard-modal">
                    <div class="dashboard-modal-header">
                        <h3 id="dashboardModalTitle"></h3>
                    </div>
                    <div id="dashboardModalBody" class="dashboard-modal-body"></div>
                    <div id="dashboardModalFooter" class="dashboard-modal-footer"></div>
                </div>
            </div>
        `);

        overlay = document.getElementById("dashboardModalOverlay");

        els = {
            title: document.getElementById("dashboardModalTitle"),
            body: document.getElementById("dashboardModalBody"),
            footer: document.getElementById("dashboardModalFooter")
        };
    }

    function openOverlay() {
        overlay.classList.add("is-open");
    }

    setTimeout(() => {
        const firstInput = document.querySelector(".dashboard-modal-input");
        if (firstInput) firstInput.focus();
    }, 50);

    function closeOverlay() {
        overlay.classList.remove("is-open"); // ← was overlay.style.display = "none"
    }

    window.dashboardAlert = function (message) {
        ensureModal();

        return new Promise(resolve => {
            els.title.textContent = "Notice";
            els.body.innerHTML = `<p class="dashboard-modal-msg">${escapeHtml(message)}</p>`;
            els.footer.innerHTML = `<button id="okBtn" class="btn">OK</button>`;

            document.getElementById("okBtn").onclick = () => {
                closeOverlay();
                resolve();
            };

            openOverlay();
        });
    };

    window.dashboardFormPrompt = function (config) {
        ensureModal();

        return new Promise(resolve => {
            els.title.textContent = config.title;

            els.body.innerHTML = config.fields.map(f => `
                <label class="dashboard-modal-label">
                    ${escapeHtml(f.label || f.id)}
                    <input class="dashboard-modal-input" id="field_${f.id}" placeholder="${escapeHtml(f.placeholder || "")}" />
                </label>
            `).join("");

            els.footer.innerHTML = `
                <button id="cancelBtn" class="btn">Cancel</button>
                <button id="submitBtn" class="btn">Submit</button>
            `;

            document.getElementById("cancelBtn").onclick = () => {
                closeOverlay();
                resolve(null);
            };

            document.getElementById("submitBtn").onclick = () => {
                let data = {};
                config.fields.forEach(f => {
                    data[f.id] = document.getElementById("field_" + f.id).value;
                });
                closeOverlay();
                resolve(data);
            };

            openOverlay();
        });
    };

})();