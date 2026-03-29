document.getElementById("signinForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const organizationName = document.getElementById("organizationName").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    // Basic validation
    if (password.length < 6) {
        alert("Password must be at least 6 characters ❌");
        return;
    }

    fetch("https://wafery-esmeralda-oedipally.ngrok-free.dev/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role: role,
            organizationName: organizationName,
            phone: phone,
            address: address
        })
    })
    .then(async res => {
        const data = await res.json();

        if (!res.ok) {
            console.error("Backend Error:", data);
            throw new Error(data.message || "Server error");
        }

        return data;
    })
    .then(data => {
        console.log("Signup Response:", data);

        if (data && data.success) {
            alert("Signup Successful ✅");

            // Redirect to login
            window.location.href = "login.html";
        } else {
            alert("Signup Failed ❌");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Something went wrong ⚠️");
    });
});