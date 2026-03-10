// request_list.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("requests-container");

  fetch("https://blooddonationbackend-beryl.vercel.app/request/")  // FastAPI endpoint
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch requests");
      return res.json();
    })
    .then((requests) => {
      if (requests.length === 0) {
        container.innerHTML = "<p>No requests found.</p>";
        return;
      }

      requests.forEach((req) => {
        const card = document.createElement("div");
        card.classList.add("request-card");
        card.innerHTML = `
          <h3>${req.patient_name || "Anonymous"}</h3>
          <p><strong>Blood Group:</strong> ${req.blood_group}</p>
          <p><strong>City:</strong> ${req.city}</p>
          <p><strong>Units Needed:</strong> ${req.units_needed}</p>
          <p class="status"><strong>Status:</strong> ${req.status || "Pending"}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error(err);
      container.innerHTML = "<p>Failed to load requests. Make sure your backend is running.</p>";
    });
});