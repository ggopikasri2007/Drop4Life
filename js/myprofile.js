document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("You are not logged in!");
        window.location.href = "login.html";
        return;
    }

    fetch(`http://127.0.0.1:8000/auth/user/${userId}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to load profile");
            return res.json();
        })
        .then(user => {
            document.getElementById("fullName").textContent = user.full_name;
            document.getElementById("email").textContent = user.email;
            document.getElementById("bloodGroup").textContent = user.blood_group;
            document.getElementById("city").textContent = user.city;
            document.getElementById("phone").textContent = user.phone;
        })
        .catch(err => {
            console.error(err);
            alert("Failed to load profile!");
        });
});