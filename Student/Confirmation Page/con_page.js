document.addEventListener('DOMContentLoaded', function() {
    // Retrieve doctor details from localStorage
    const doctorDetails = JSON.parse(localStorage.getItem('doctorDetails'));
    document.getElementById('doctor-name').textContent = doctorDetails.name;
    document.getElementById('doctor-specialty').textContent = doctorDetails.specialty;
    document.getElementById('doctor-location').textContent = doctorDetails.location;

    // Retrieve appointment date and time from localStorage
    const appointmentDate = localStorage.getItem('selectedDate');
    const appointmentTime = localStorage.getItem('selectedTime');
    document.getElementById('appointment-date').textContent = appointmentDate;
    document.getElementById('appointment-time').textContent = appointmentTime;

    // Retrieve appointment data from localStorage
    const appointmentData = JSON.parse(localStorage.getItem('newAppointment'));
    document.getElementById('patient-age').textContent = appointmentData.age;
    document.getElementById('patient-weight').textContent = appointmentData.weight;
    document.getElementById('patient-temperature').textContent = appointmentData.temperature;
    document.getElementById('patient-symptoms').textContent = appointmentData.symptoms;

    // Add event listener to the confirm button
    document.getElementById('confirm-button').addEventListener('click', function() {
        // Redirect to the student homepage (you can replace the URL below with the actual homepage URL)
        window.location.href = '../Student Data/homepage.html';
    });
});
