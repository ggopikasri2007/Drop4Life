document.getElementById("requestForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    const data = {
        patient_name: formData.get("patient_name"),
        blood_group: formData.get("blood_group"),
        city: formData.get("city"),
        units_needed: parseInt(formData.get("units_needed"))
    };

    fetch("http://localhost:8000/requests/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {

        if (!response.ok) {
            throw new Error("Failed to submit request");
        }

        return response.json();
    })
    .then(function(result) {

        document.getElementById("message").innerText =
            "Request submitted successfully!";

        console.log(result);

        document.getElementById("requestForm").reset();
    })
    .catch(function(error) {

        document.getElementById("message").innerText =
            "Error: " + error.message;

        console.error(error);
    });
});