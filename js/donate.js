// const userId = localStorage.getItem("user_id") || 1;

// const statusBox = document.getElementById("statusBox");
// const donatedBtn = document.getElementById("donatedBtn");
// const notDonatedBtn = document.getElementById("notDonatedBtn");




// function formatDate(dateString){

//     const date = new Date(dateString);

//     const day = String(date.getDate()).padStart(2,'0');
//     const month = String(date.getMonth()+1).padStart(2,'0');
//     const year = date.getFullYear();

//     return `${day}-${month}-${year}`;
// }




// donatedBtn.addEventListener("click", function(){

// fetch(`https://blooddonationbackend-beryl.vercel.app/donation/confirm/${userId}`,{
//     method:"POST"
// })

// .then(response => response.json())

// .then(data => {

//     const nextDate = new Date(data.donation_date);

//     nextDate.setDate(nextDate.getDate() + 90);

//     const formattedDate = formatDate(nextDate);

//     statusBox.innerHTML = `
//         ❌ You are not eligible now.<br>
//         You can donate again after <b>3 months</b>.<br><br>
//         <b>Next Donation Date : ${formattedDate}</b>
//     `;

// })

// .catch(error => {

//     console.log(error);
//     statusBox.innerHTML = "Something went wrong.";

// });

// });



// notDonatedBtn.addEventListener("click", function(){

// statusBox.innerHTML = `
//     ✅ You are eligible to donate.
// `;

// });
document.addEventListener("DOMContentLoaded", function () {

  const statusBox = document.getElementById("statusBox");
  const donatedBtn = document.getElementById("donatedBtn");
  const notDonatedBtn = document.getElementById("notDonatedBtn");

  // Get logged-in user_id from localStorage
  const userId = localStorage.getItem("user_id");
  if (!userId) {
    statusBox.innerHTML = "⚠️ Please login first to donate.";
    donatedBtn.disabled = true;
    notDonatedBtn.disabled = true;
    return;
  }

  // Helper to format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2,'0');
    const month = String(date.getMonth()+1).padStart(2,'0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // Fetch current eligibility on page load
  fetch(`https://blooddonationbackend-beryl.vercel.app/donation/eligibility/${userId}`)
    .then(res => res.json())
    .then(data => {
      if (data.eligible) {
        statusBox.innerHTML = `✅ You are eligible to donate.`;
      } else {
        const formattedDate = formatDate(data.next_eligible_date);
        statusBox.innerHTML = `
          ❌ You are not eligible now.<br>
          You can donate again after 3 months.<br>
          <b>Next Donation Date: ${formattedDate}</b>
        `;
      }
    })
    .catch(err => {
      console.error(err);
      statusBox.innerHTML = "Error checking eligibility.";
    });

  // Donate button click
  donatedBtn.addEventListener("click", function () {
    fetch(`https://blooddonationbackend-beryl.vercel.app/donation/confirm/${userId}`, {
      method: "POST"
    })
    .then(res => res.json())
    .then(data => {
      const nextDate = new Date(data.donation_date);
      nextDate.setDate(nextDate.getDate() + 90);
      const formattedDate = formatDate(nextDate);

      statusBox.innerHTML = `
        ❌ You are not eligible now.<br>
        You can donate again after 3 months.<br>
        <b>Next Donation Date: ${formattedDate}</b>
      `;

      // Optional: Refresh Find Donors if on same page
      // refreshDonors();
    })
    .catch(err => {
      console.error(err);
      statusBox.innerHTML = "Error confirming donation.";
    });
  });

  // Not Donated button
  notDonatedBtn.addEventListener("click", function () {
    statusBox.innerHTML = `✅ You are eligible to donate.`;
  });

});