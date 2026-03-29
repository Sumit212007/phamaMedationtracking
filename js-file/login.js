document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("https://wafery-esmeralda-oedipally.ngrok-free.dev/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Invalid response from server");
        }

        console.log("API Response:", data);

        if (data && data.success) {
            alert("Login Successful !!");

            // ✅ Save token
            const token = data?.data?.accessToken;
            localStorage.setItem("token", token);

            // ✅ Decode token to get role
            function parseJwt(token) {
                const base64Url = token.split('.')[1];
                const base64 = atob(base64Url);
                return JSON.parse(base64);
            }

            const decoded = parseJwt(token);
            const role = decoded.role; // or decoded.user.role depending on backend

            // ✅ Redirect based on role
            if (role === "MANUFACTURER") {
                window.location.href = "manufacture.html";
            } 
            else if (role === "ADMIN") {
                window.location.href = "warehouse.html";
            } 
            else if (role === "PHARMACY") {
                window.location.href = "pharma.html";
            }
        } else {
            alert("Invalid Credentials ❌");
        }

    } catch (err) {
        console.error("Error:", err);
        alert(err.message || "Something went wrong ⚠️");
    }
});