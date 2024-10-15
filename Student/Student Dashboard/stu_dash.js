let appointmentBooked = false;
let appointments = [
    { date: '2024-08-10', symptoms: 'Fever, Cough' },
    { date: '2024-07-22', symptoms: 'Headache, Dizziness' }
];

function toggleOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
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
        statusDiv.innerHTML = `
            <p>You have an appointment booked for <strong>${appointments[0].date}</strong>.</p>
            <button onclick="toggleOverlay('cancel-overlay')">Cancel Appointment</button>
        `;
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

// Check for new appointment data in localStorage
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