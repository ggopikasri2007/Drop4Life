document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      full_name: document.querySelector("input[name='fullname']").value,
      email: document.querySelector("input[name='email']").value,
      password: document.querySelector("input[name='password']").value,
      age: parseInt(document.querySelector("input[name='age']").value),
      blood_group: document.querySelector("select[name='bloodgroup']").value,
      city: document.querySelector("input[name='city']").value,
      phone: document.querySelector("input[name='phone']").value,
    };

    try {
      const response = await fetch(
        "https://blooddonationbackend-beryl.vercel.app/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        window.location.href = "login.html";
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error!");
    }
  });
});
