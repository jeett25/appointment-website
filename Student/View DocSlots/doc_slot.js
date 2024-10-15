function bookAppointment(doctorName, specialty, location) {
    // Create an object to store doctor details
    const doctorDetails = {
        name: doctorName,
        specialty: specialty,
        location: location
    };

    // Store the doctor details in local storage
    localStorage.setItem('doctorDetails', JSON.stringify(doctorDetails));

    // Redirect to the booking page or any further action
    window.location.href = '../Student Data/time date/time_date.html';
}
