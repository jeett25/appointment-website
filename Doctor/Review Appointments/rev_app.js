const appointments = [
    { name: 'John Doe', time: '10:00 AM - 10:30 AM' },
    { name: 'Jane Smith', time: '11:00 AM - 11:30 AM' },
    { name: 'Sam Wilson', time: '12:00 PM - 12:30 PM' },
    { name: 'Emily Davis', time: '2:00 PM - 2:30 PM' },
];

function updateAppointmentsTable() {
    const tbody = document.querySelector('#appointmentsTable tbody');
    tbody.innerHTML = '';
    appointments.forEach((appointment, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.time}</td>
            <td><button onclick="viewStudentDetails(${index})">View Details</button></td>
        `;
        tbody.appendChild(row);
    });
}

function viewStudentDetails(index) {
    const appointment = appointments[index];
    window.location.href = `student_details.html?name=${appointment.name}&time=${appointment.time}`;
}

function toggleProfileOverlay() {
    const overlay = document.getElementById('profile-overlay');
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    updateAppointmentsTable();
});

// Generate next 7 days including "Today" and "Tomorrow"
const days = [];
for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    if (i === 0) {
        days.push({ label: "Today", date: date });
    } else if (i === 1) {
        days.push({ label: "Tomorrow", date: date });
    } else {
        days.push({ 
            label: date.toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric' }), 
            date: date 
        });
    }
}

function toggleProfileOverlay() {
    const overlay = document.getElementById('profile-overlay');
    overlay.classList.toggle('active');
}

let currentDayIndex = 0;

// Dynamically generate the date buttons
function createDateButtons() {
    const dateScrollbar = document.getElementById('date-scrollbar');
    dateScrollbar.innerHTML = '';

    days.forEach((day, index) => {
        const button = document.createElement('button');
        button.classList.add('date-button');
        if (index === currentDayIndex) {
            button.classList.add('active', 'orange');
        }
        button.innerHTML = `${day.label} <span>${day.date.toLocaleDateString()}</span>`;
        button.addEventListener('click', () => changeDay(index));
        dateScrollbar.appendChild(button);
    });
}

function changeDay(index) {
    currentDayIndex = index;
    updateDateButtons();
}

function updateDateButtons() {
    const buttons = document.querySelectorAll('.date-button');
    buttons.forEach((button, index) => {
        if (index === currentDayIndex) {
            button.classList.add('active', 'orange');
        } else {
            button.classList.remove('active', 'orange');
        }
    });
}

// Initialize the page with default content
createDateButtons();    