document.addEventListener('DOMContentLoaded', function() {
    // Retrieve appointment date and time from localStorage
    const appointmentDate = localStorage.getItem('selectedDate');
    const appointmentTime = localStorage.getItem('selectedTime');
    document.getElementById('appointment-date').textContent = appointmentDate || 'N/A';
    document.getElementById('appointment-time').textContent = appointmentTime || 'N/A';

    // Retrieve appointment data from localStorage
    const appointmentData = JSON.parse(localStorage.getItem('newAppointment'));
    if (appointmentData) {
        document.getElementById('patient-age').textContent = appointmentData.age || 'N/A';
        document.getElementById('patient-weight').textContent = appointmentData.weight || 'N/A';
        document.getElementById('patient-temperature').textContent = appointmentData.temperature || 'N/A';
        document.getElementById('patient-symptoms').textContent = appointmentData.symptoms || 'N/A';
    } else {
        console.error("Appointment data not found in localStorage.");
    }

    // Add event listener to the confirm button
    document.getElementById('confirm-button').addEventListener('click', function() {
        // Create an object to store confirmed appointment details
        const confirmedAppointment = {
            date: appointmentDate,
            time: appointmentTime,
            age: appointmentData.age,
            weight: appointmentData.weight,
            temperature: appointmentData.temperature,
            symptoms: appointmentData.symptoms
        };

        // Store confirmed appointment details in localStorage
        localStorage.setItem('confirmedAppointment', JSON.stringify(confirmedAppointment));

        // Redirect to the student dashboard
        window.location.href = '../Student Dashboard/stu_dash.html';
    });
});
