document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

   
    fetch(`http://127.0.0.1:8000/auth/user/${userId}`)
        .then(res => res.json())
        .then(user => {
            document.getElementById("full_name").value = user.full_name;
            document.getElementById("email").value = user.email;
            document.getElementById("age").value = user.age;
            document.getElementById("city").value = user.city;
            document.getElementById("phone").value = user.phone;
        })
        .catch(err => {
            console.error(err);
            alert("Failed to load profile for editing!");
        });

    // Handle form submission
    const form = document.getElementById("editProfileForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const updatedData = {
            full_name: document.getElementById("full_name").value,
            email: document.getElementById("email").value,
            age: parseInt(document.getElementById("age").value),
            city: document.getElementById("city").value,
            phone: document.getElementById("phone").value
        };

        fetch(`http://127.0.0.1:8000/auth/user/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        })
        .then(res => {
            if (!res.ok) throw new Error("Update failed");
            return res.json();
        })
        .then(user => {
            alert("Profile updated successfully!");
            window.location.href = "myprofile.html";
        })
        .catch(err => {
            console.error(err);
            alert("Failed to update profile!");
        });
    });
});