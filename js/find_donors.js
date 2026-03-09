const container = document.getElementById("donor-container");

fetch("http://localhost:8000/donation/available-donors")
  .then(res => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then(donors => {
    if (donors.length === 0) {
      container.innerHTML = "<p>No donors found.</p>";
      return;
    }
    donors.forEach(donor => {
      const card = document.createElement("div");
      card.className = "donor-card";

      const message = `Hi ${donor.full_name}, I need blood donation help.`;
      const whatsappLink = `https://wa.me/${donor.phone}?text=${encodeURIComponent(message)}`;

      card.innerHTML = `
        <h3>${donor.full_name} (${donor.age} yrs)</h3>
        <p>Blood Group: ${donor.blood_group}</p>
        <p>City: ${donor.city}</p>
        <p class="${donor.status === "Available" ? "status-available" : "status-unavailable"}">${donor.status}</p>
        <a href="${whatsappLink}" target="_blank" class="whatsapp-btn">Request via WhatsApp</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error fetching donors:", error);
    container.innerHTML = "<p>Failed to load donors. Please try again later.</p>";
  });