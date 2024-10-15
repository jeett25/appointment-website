document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    const symptomsTextarea = document.getElementById('symptoms');

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission

        const age = document.getElementById('age').value;
        const weight = document.getElementById('weight').value;
        const temperature = document.getElementById('temperature').value;
        const symptoms = symptomsTextarea.value;

        // Validation
        if (age < 1 || age > 120) {
            showError('Please enter a valid age between 1 and 120.');
            return;
        }

        if (weight < 1 || weight > 500) {
            showError('Please enter a valid weight between 1 and 500 kg.');
            return;
        }

        if (temperature < 35 || temperature > 42) {
            showError('Please enter a valid temperature between 35°C and 42°C.');
            return;
        }

        const today = new Date();
        const appointmentDate = today.toISOString().split('T')[0];  // Store current date as appointment date

        const appointmentData = {
            age: age,
            weight: weight,
            temperature: temperature,
            symptoms: symptoms,
            date: appointmentDate
        };

        // Store the appointment details in localStorage
        localStorage.setItem('newAppointment', JSON.stringify(appointmentData));

        // Redirect to the doctor slots page
        window.location.href = '../View DocSlots/doc_slot.html';
    });

    symptomsTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        form.insertBefore(errorDiv, form.firstChild);
        setTimeout(() => errorDiv.remove(), 3000);  // Automatically remove error message after 3 seconds
    }
});
