const profileBtn = document.getElementById("profileBtn");
const dropdown = document.getElementById("profileDropdown");
const container = document.getElementById("profileContainer");

// Toggle dropdown
profileBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // prevent instant close
    dropdown.classList.toggle("show");
});

// Close when clicking outside
document.addEventListener("click", function (e) {
    if (!container.contains(e.target)) {
        dropdown.classList.remove("show");
    }
});

const editBtn = document.getElementById("editProfileBtn");
const saveBtn = document.getElementById("saveProfileBtn");
const inputs = document.querySelectorAll(".profile-input");

// Enable editing
editBtn.addEventListener("click", () => {
    inputs.forEach(input => {
        input.removeAttribute("readonly");
        input.style.background = "#fff";
    });

    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
});

// Save & lock again
saveBtn.addEventListener("click", () => {
    inputs.forEach(input => {
        input.setAttribute("readonly", true);
        input.style.background = "#f9f9f9";
    });

    editBtn.style.display = "inline-block";
    saveBtn.style.display = "none";

    console.log("Saved Data:");
    inputs.forEach(input => console.log(input.value));
});