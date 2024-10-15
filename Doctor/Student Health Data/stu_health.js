// Sample patient data (you can replace this with actual data)
const patientData = {
    name: "John Doe",
    date: "2023-05-15",
    time: "14:30",
    age: 35,
    temperature: "98.6°F",
    symptoms: "Headache, fever"
};

// Function to populate the card with patient data
function populateCard() {
    document.getElementById("patientName").textContent = patientData.name;
    document.getElementById("appointmentDate").textContent = patientData.date;
    document.getElementById("appointmentTime").textContent = patientData.time;
    document.getElementById("patientAge").textContent = patientData.age;
    document.getElementById("bodyTemperature").textContent = patientData.temperature;
    document.getElementById("symptoms").textContent = patientData.symptoms;
}

// Function to handle button clicks
function handleButtonClick(action) {
    alert(`Appointment ${action} for ${patientData.name}`);
    // Redirect to the dashboard after the alert
    window.location.href = "..//Review Appointments/rev_app.html"; // Replace "dashboard.html" with the actual path to your dashboard
}

// Add event listeners to buttons
document.getElementById("confirmBtn").addEventListener("click", () => handleButtonClick("confirmed"));
document.getElementById("prioritizeBtn").addEventListener("click", () => handleButtonClick("prioritized"));

// Populate the card when the page loads
document.addEventListener("DOMContentLoaded", populateCard);
