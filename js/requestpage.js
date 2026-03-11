const API_URL = "https://blooddonationbackend-beryl.vercel.app/request";

function loadRequests() {

const tbody = document.getElementById("requests-body");

fetch(API_URL)

.then(function(response){
return response.json();
})

.then(function(data){

console.log("Requests:", data);

tbody.innerHTML = "";

if(!data || data.length === 0){

tbody.innerHTML =
"<tr><td colspan='6'>No Requests Found</td></tr>";

return;

}

data.forEach(function(req){

const row = document.createElement("tr");

let buttonHTML = "";

// status check
if(req.status === "accepted" || req.status === "completed"){

buttonHTML = "<button disabled>Donated</button>";

}else{

buttonHTML = `<button onclick="donate(${req.request_id})">Donate</button>`;

}

row.innerHTML = `
<td>${req.patient_name || "Unknown"}</td>
<td>${req.blood_group}</td>
<td>${req.city}</td>
<td>${req.units_needed}</td>
<td>${req.status || "pending"}</td>
<td>${buttonHTML}</td>
`;

tbody.appendChild(row);

});

})

.catch(function(error){

console.error("Error loading requests:", error);

tbody.innerHTML =
"<tr><td colspan='6'>Failed to load requests</td></tr>";

});

}



function donate(id){

console.log("Donate clicked:", id);

fetch(API_URL + "/" + id , {

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
units_received:1,
status:"accepted"
})

})

.then(function(response){

if(!response.ok){
throw new Error("Update failed");
}

return response.json();

})

.then(function(data){

console.log("Updated:", data);

alert("Donation successful!");

loadRequests();

})

.catch(function(error){

console.error("Error:", error);

alert("Donation failed");

});

}

loadRequests();