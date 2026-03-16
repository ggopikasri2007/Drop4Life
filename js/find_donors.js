const container = document.getElementById("donor-container");

fetch("https://blooddonationbackend-beryl.vercel.app/donation/available-donors")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })

  .then((donors) => {
    container.innerHTML = "";

    if (!donors || donors.length === 0) {
      container.innerHTML = "<p>No donors found.</p>";
      return;
    }

    donors.forEach((donor) => {
      const card = document.createElement("div");
      card.className = "donor-card";

      const message = `Hi ${donor.full_name}, I need blood donation help.`;

      const whatsappLink = `https://wa.me/${donor.phone}?text=${encodeURIComponent(message)}`;

      const statusClass =
        donor.status === "Available"
          ? "status-available"
          : "status-unavailable";

      let nextDateText = "";

      // show next eligible date
      if (donor.next_eligible_date) {
        const date = new Date(donor.next_eligible_date);

        nextDateText = `<p><b>Next Eligible:</b> ${date.toLocaleDateString()}</p>`;
      }

      card.innerHTML = `
      <h3>${donor.full_name} (${donor.age} yrs)</h3>

      <p><b>Blood Group:</b> ${donor.blood_group}</p>

      <p><b>City:</b> ${donor.city}</p>

      <p class="${statusClass}">
        ${donor.status}
      </p>

      ${nextDateText}

      ${
        donor.status === "Available"
          ? `<a href="${whatsappLink}" target="_blank" class="whatsapp-btn">Chat via WhatsApp</a>`
          : `<button class="whatsapp-btn" disabled>Not Available</button>`
      }
    `;

      container.appendChild(card);
    });
  })

  .catch((error) => {
    console.error("Error fetching donors:", error);

    container.innerHTML =
      "<p style='color:red;'>Failed to load donors. Please try again later.</p>";
  });

// const container = document.getElementById("donor-container");

// // Helper to format date
// function formatDate(dateString) {
//   const date = new Date(dateString + "T00:00:00");
//   const day = String(date.getDate()).padStart(2,'0');
//   const month = String(date.getMonth()+1).padStart(2,'0');
//   const year = date.getFullYear();
//   return `${day}-${month}-${year}`;
// }

// // Fetch and display donors
// function fetchDonors() {
//   fetch("https://blooddonationbackend-beryl.vercel.app/donation/available-donors")
//     .then(res => res.json())
//     .then(donors => {
//       container.innerHTML = "";

//       if (!donors || donors.length === 0) {
//         container.innerHTML = "<p>No donors found.</p>";
//         return;
//       }

//       donors.forEach(donor => {
//         const card = document.createElement("div");
//         card.className = "donor-card";

//         const whatsappLink = `https://wa.me/${donor.phone}?text=${encodeURIComponent(`Hi ${donor.full_name}, I need blood donation help.`)}`;

//         const statusClass = donor.status === "Available" ? "status-available" : "status-unavailable";

//         let nextDateText = "";
//         if (donor.next_eligible_date) {
//           nextDateText = `<p><b>Next Eligible:</b> ${formatDate(donor.next_eligible_date)}</p>`;
//         }

//         card.innerHTML = `
//           <h3>${donor.full_name} (${donor.age} yrs)</h3>
//           <p><b>Blood Group:</b> ${donor.blood_group}</p>
//           <p><b>City:</b> ${donor.city}</p>
//           <p class="${statusClass}">${donor.status}</p>
//           ${nextDateText}
//           ${
//             donor.status === "Available"
//               ? `<a href="${whatsappLink}" target="_blank" class="whatsapp-btn">Request via WhatsApp</a>`
//               : `<button class="whatsapp-btn" disabled>Not Available</button>`
//           }
//         `;

//         container.appendChild(card);
//       });
//     })
//     .catch(err => {
//       console.error(err);
//       container.innerHTML = `<p style="color:red;">Failed to load donors. Please try again later.</p>`;
//     });
// }

// // Initial fetch
// fetchDonors();

// // Listen for donation updates from Donate page
// window.addEventListener("focus", () => {
//   if (localStorage.getItem("donationUpdated") === "true") {
//     fetchDonors();  // refresh donors list
//     localStorage.removeItem("donationUpdated");
//   }
// });
