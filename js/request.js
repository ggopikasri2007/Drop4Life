document.getElementById("requestForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
        patient_name: formData.get("patient_name"),
        blood_group: formData.get("blood_group"),
        city: formData.get("city"),
        units_needed: parseInt(formData.get("units_needed"))
    };

    try {
        const response = await fetch("http://localhost:8000/requests/", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Failed to submit request");

        const result = await response.json();
        document.getElementById("message").innerText = "Request submitted successfully!";
        console.log(result);

        // Reset the form
        this.reset();

    } catch (error) {
        document.getElementById("message").innerText = "Error: " + error.message;
        console.error(error);
    }
});