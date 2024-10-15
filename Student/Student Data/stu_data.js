document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    const symptomsTextarea = document.getElementById('symptoms');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const age = document.getElementById('age').value;
        const weight = document.getElementById('weight').value;
        const temperature = document.getElementById('temperature').value;
        const symptoms = symptomsTextarea.value;

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

        const appointmentData = { age, weight, temperature, symptoms };
        console.log('Appointment Data:', appointmentData);
        showSuccess('Appointment booked successfully! We will contact you shortly.');
        form.reset();
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
        setTimeout(() => errorDiv.remove(), 3000);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        form.insertBefore(successDiv, form.firstChild);
        setTimeout(() => successDiv.remove(), 3000);
    }
});