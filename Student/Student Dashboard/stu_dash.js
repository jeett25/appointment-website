let appointmentBooked = false;
let appointments = [
    { date: '2024-08-10', symptoms: 'Fever, Cough' },
    { date: '2024-07-22', symptoms: 'Headache, Dizziness' }
];

function toggleOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

// Add this new function to handle the profile overlay
function toggleProfileOverlay() {
    toggleOverlay('profile-overlay');
}

function submitCancellation() {
    const reason = document.getElementById('cancel-reason').value;
    if (reason.trim()) {
        appointmentBooked = false;
        updateAppointmentStatus();
        toggleOverlay('cancel-overlay');
        showNotification('Appointment cancelled successfully', 'success');
    } else {
        showNotification('Please provide a cancellation reason', 'error');
    }
}

function updateAppointmentStatus() {
    const statusDiv = document.getElementById('appointment-status');
    statusDiv.innerHTML = '';
    if (appointmentBooked) {
        const confirmedAppointment = JSON.parse(localStorage.getItem('confirmedAppointment'));
        if (confirmedAppointment) {
            statusDiv.innerHTML = `
                <p>You have an appointment booked for <strong>${confirmedAppointment.date}</strong> at <strong>${confirmedAppointment.time}</strong>.</p>
                <p><strong>Symptoms:</strong> ${confirmedAppointment.symptoms}</p>
                <p><strong>Age:</strong> ${confirmedAppointment.age}</p>
                <p><strong>Weight:</strong> ${confirmedAppointment.weight}</p>
                <p><strong>Temperature:</strong> ${confirmedAppointment.temperature}</p>
                <button onclick="toggleOverlay('cancel-overlay')">Cancel Appointment</button>
            `;
        }
    } else {
        statusDiv.innerHTML = `
            <p>You have no appointments booked.</p>
            <a href="../Student Data/stu_data.html" class="btn">Book Appointment</a>
        `;
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }, 100);
}

function updateAppointmentsTable() {
    const tbody = document.querySelector('#appointmentsTable tbody');
    tbody.innerHTML = '';
    appointments.forEach(app => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.date}</td>
            <td>${app.symptoms}</td>
        `;
        tbody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateAppointmentStatus();
    updateAppointmentsTable();
});

window.addEventListener('storage', function(e) {
    if (e.key === 'newAppointment') {
        const newAppointment = JSON.parse(e.newValue);
        appointments.unshift(newAppointment);
        appointmentBooked = true;
        updateAppointmentStatus();
        updateAppointmentsTable();
        showNotification('New appointment booked successfully', 'success');
        localStorage.removeItem('newAppointment');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const confirmedAppointment = JSON.parse(localStorage.getItem('confirmedAppointment'));
    if (confirmedAppointment) {
        appointmentBooked = true;
        updateAppointmentStatus();
    }
});