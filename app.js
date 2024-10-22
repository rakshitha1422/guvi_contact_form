(function () {
    var contactFormElement = document.getElementById('contactForm');
    var mockApiUrl = 'https://67173fc2b910c6a6e02723a8.mockapi.io/api/contact/data';
    contactFormElement.addEventListener('submit', function (event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var contactNumber = document.getElementById('contactNumber').value;
        var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value;
        // Validation for name (minimum 2 characters)
        if (name.trim().length < 2) {
            alert('Please enter a valid name (minimum 2 characters).');
            return;
        }
        // Validation for email (simple regex check)
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        // Validation for contact number (7 to 15 digits)
        var contactPattern = /^[0-9]{7,15}$/;
        if (!contactPattern.test(contactNumber)) {
            alert('Please enter a valid contact number (7 to 15 digits).');
            return;
        }
        // Validation for subject (non-empty)
        if (subject.trim().length < 1) {
            alert('Please enter a subject.');
            return;
        }
        // Validation for message (minimum 10 characters)
        if (message.trim().length < 10) {
            alert('Message should be at least 10 characters long.');
            return;
        }
        // Form data to be submitted
        var formData = {
            name: name,
            email: email,
            contactNumber: contactNumber,
            subject: subject,
            message: message,
        };
        // Sending form data using HTTP POST to MockAPI
        fetch(mockApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error('Error submitting the form. Please try again.');
            }
        })
            .then(function (data) {
            console.log('Form Submitted:', data);
            alert('Form Submitted Successfully!');
            // Reset the form after submission
            contactFormElement.reset();
        })
            .catch(function (error) {
            console.error('Error:', error);
            alert('Error submitting the form. Please try again.');
        });
    });
})();
