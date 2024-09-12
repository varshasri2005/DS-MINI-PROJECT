// Handle register button clicks
const buttons = document.querySelectorAll('.register-btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        alert('You have successfully registered for this event!');
        // In a real system, here you would add the event registration logic
    });
});
