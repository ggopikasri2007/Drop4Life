

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const loginData = {
            email: document.querySelector("input[name='email']").value,
            password: document.querySelector("input[name='password']").value
        };

        fetch("https://blooddonationbackend-beryl.vercel.app/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Login successful") {
               
                localStorage.setItem("userId", data.user_id);

                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert(data.detail || "Login failed!");
            }
        })
        .catch(err => {
            console.error(err);
            alert("Server error!");
        });
    });
});