let appointmentBooked = false;  // Change this to true to simulate booked appointment

// Toggle profile overlay
function toggleProfileOverlay() {
    const profileOverlay = document.getElementById('profile-overlay');
    profileOverlay.style.display = profileOverlay.style.display === 'flex' ? 'none' : 'flex';
}

// Toggle cancel appointment overlay
function toggleCancelOverlay() {
    const cancelOverlay = document.getElementById('cancel-overlay');
    cancelOverlay.style.display = cancelOverlay.style.display === 'flex' ? 'none' : 'flex';
}

// Submit cancellation reason
function submitCancellation() {
    const reason = document.getElementById('cancel-reason').value;
    if (reason.trim()) {
        alert('Appointment cancelled for reason: ' + reason);
        appointmentBooked = false;
        updateAppointmentStatus();
        toggleCancelOverlay();
    } else {
        alert('Please provide a cancellation reason.');
    }
}

// Update appointment status dynamically
function updateAppointmentStatus() {
    const statusDiv = document.getElementById('appointment-status');
    statusDiv.innerHTML = '';

    if (appointmentBooked) {
        statusDiv.innerHTML = `
            <p>You have an appointment booked on <strong>2024-09-15</strong>.</p>
            <button onclick="toggleCancelOverlay()">Cancel Appointment</button>
        `;
    } else {
        statusDiv.innerHTML = `
            <p>You have no appointments booked.</p>
            <button onclick="bookAppointment()">Book Appointment</button>
        `;
    }
}

// Simulate booking an appointment
function bookAppointment() {
    appointmentBooked = true;
    updateAppointmentStatus();
}

// Initialize status on page load
document.addEventListener('DOMContentLoaded', updateAppointmentStatus);
