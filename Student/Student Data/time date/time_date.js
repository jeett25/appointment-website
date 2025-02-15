// Sample slots data (You can replace this with actual data based on day)
const slotData = {
    0: { morning: 2, afternoon: 3, evening: 4, night: 4 }, // Day 0 (Today)
    1: { morning: 2, afternoon: 4, evening: 5, night: 3 }, // Day 1 (Tomorrow)
    2: { morning: 3, afternoon: 2, evening: 3, night: 4 }, // Day 2
    3: { morning: 1, afternoon: 3, evening: 2, night: 4 }, // Day 3
    4: { morning: 4, afternoon: 5, evening: 4, night: 2 }, // Day 4
    5: { morning: 0, afternoon: 2, evening: 1, night: 5 }, // Day 5
    6: { morning: 3, afternoon: 3, evening: 2, night: 3 }  // Day 6
};

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

let currentDayIndex = 0;
let selectedTimeSlot = null;

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
        button.innerHTML = `${day.label} <span>${getAvailableSlotsText(index)}</span>`;
        button.addEventListener('click', () => changeDay(index));
        dateScrollbar.appendChild(button);
    });
}

// Function to calculate available slots text
function getAvailableSlotsText(dayIndex) {
    const slots = slotData[dayIndex];
    const totalSlots = slots.morning + slots.afternoon + slots.evening + slots.night;
    return `${totalSlots} slots available`;
}

function changeDay(index) {
    currentDayIndex = index;
    updateDateButtons();
    loadSlots();
    selectedTimeSlot = null; // Reset selected time slot when changing day
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

// Load time slots
function loadSlots() {
    const slots = slotData[currentDayIndex];

    const morningSlots = Array(slots.morning).fill().map((_, i) => `${11 + i}:30 AM`);
    const afternoonSlots = Array(slots.afternoon).fill().map((_, i) => `${12 + i}:00 PM`);
    const eveningSlots = Array(slots.evening).fill().map((_, i) => `${4 + i}:00 PM`);
    const nightSlots = Array(slots.night).fill().map((_, i) => `${8 + i}:00 PM`);

    renderSlots('morning-slots', morningSlots);
    renderSlots('afternoon-slots', afternoonSlots);
    renderSlots('evening-slots', eveningSlots);
    renderSlots('night-slots', nightSlots);
}

function renderSlots(id, slots) {
    const container = document.getElementById(id);
    container.innerHTML = '';
    slots.forEach(slot => {
        const button = document.createElement('button');
        button.textContent = slot;
        button.addEventListener('click', () => selectTimeSlot(button));
        container.appendChild(button);
    });
}

function selectTimeSlot(button) {
    // Remove the 'selected' class from the previously selected button
    if (selectedTimeSlot) {
        selectedTimeSlot.classList.remove('selected');
    }

    // Add the 'selected' class to the clicked button
    button.classList.add('selected');
    selectedTimeSlot = button;
}

document.getElementById('confirm-appointment').addEventListener('click', () => {
    if (!selectedTimeSlot) {
        alert("Please select a time slot before confirming!");
        return;
    }
    
    // Get selected date and time
    const selectedDate = days[currentDayIndex].label; // Label could be "Today", "Tomorrow", or a specific date
    const selectedTime = selectedTimeSlot.textContent; // Time slot selected
    
    // Store in localStorage
    localStorage.setItem('selectedDate', selectedDate);
    localStorage.setItem('selectedTime', selectedTime);
    
    // Notify user (you can redirect or provide further actions if needed)
    alert(`Appointment confirmed for ${selectedDate} at ${selectedTime}`);
});


// Initialize the page with default content
createDateButtons();
loadSlots();

// Add this to your existing CSS file
const style = document.createElement('style');
style.textContent = `
    .slot-grid button.selected {
        background: linear-gradient(135deg, #ff8c00, #ff6347);
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(style);