// document.addEventListener("DOMContentLoaded", function () {

//     const form = document.getElementById("loginForm");

//     form.addEventListener("submit", function (e) {

//         e.preventDefault();

//         const email = document.querySelector("input[name='email']").value;
//         const password = document.querySelector("input[name='password']").value;

//         const loginData = {
//             email: email,
//             password: password
//         };

//         fetch("https://blooddonationbackend-beryl.vercel.app/auth/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(loginData)
//         })

//         .then(function(res){
//             return res.json();
//         })

//         .then(function(data){

//             if(data.message === "Login successful"){

//                 // user id save
//                 localStorage.setItem("userId", data.user_id);

//                 // donor name save (email used as name)
//                 localStorage.setItem("donor_name", email);

//                 alert("Login successful!");

//                 window.location.href = "dashboard.html";

//             }else{

//                 alert(data.detail || "Login failed!");

//             }

//         })

//         .catch(function(err){

//             console.error(err);

//             alert("Server error!");

//         });

//     });

// });

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;

    const loginData = {
      email: email,
      password: password,
    };

    fetch("https://blooddonationbackend-beryl.vercel.app/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then(function (res) {
        return res.json();
      })

      .then(function (data) {
        if (data.message === "Login successful") {
          // ✅ correct key
          localStorage.setItem("user_id", data.user_id);

          localStorage.setItem("donor_name", email);

          alert("Login successful!");

          window.location.href = "dashboard.html";
        } else {
          alert(data.detail || "Login failed!");
        }
      })

      .catch(function (err) {
        console.error(err);
        alert("Server error!");
      });
  });
});
