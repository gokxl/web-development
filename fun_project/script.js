// script.js
function handleNo() {
    const noButton = document.getElementById('no-button');

    // Calculate random position within visible window bounds
    const maxX = window.innerWidth - noButton.clientWidth;
    const maxY = window.innerHeight - noButton.clientHeight;

    // Update button position with translation
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    noButton.style.transform = `translate(${newX}px, ${newY}px)`;
}

// script.js

function confirmSelection() {
    const name = document.getElementById('name').value;
    const activity = document.getElementById('activity').value;
    const timing = document.getElementById('timing').value;

    if (name && activity && timing) {
        const formData = {
            name: name,
            activity: activity,
            timing: timing
        };

        fetch('http://localhost:8000/saveFormData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                // Display thank you message and clear form
                document.getElementById('main-container').innerHTML = "<h1>Thank You!</h1><p>Your form data has been saved. We'll meet you soon!</p>";
            } else {
                // Handle other status codes
                throw new Error('Failed to save form data');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving the form data. Please try again later.');
        });
    } else {
        alert('Please fill in all fields before confirming.');
    }
}
