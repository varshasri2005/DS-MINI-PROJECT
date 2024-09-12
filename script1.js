// Select the form and add an event listener
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get the username and password values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check if the username is "student" or "admin"
    if (username.toLowerCase() === 'student') {
        window.location.href = 'student.html'; // Redirect to student page
    } else if (username.toLowerCase() === 'admin') {
        window.location.href = 'admin.html'; // Redirect to admin page
    } else {
        alert('Invalid username or password'); // Alert if not a valid user
    }
});
