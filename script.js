document.getElementById('personalForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;

    // Use HTML5 form validation API to check validity
    if (!form.checkValidity()) {
        // Focus the first invalid field for better UX
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        alert('Please fill out all required fields correctly.');
        return false;
    }

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }

    const genderChecked = document.querySelector('input[name="gender"]:checked');
    if (!genderChecked) {
        alert('Please select your gender.');
        return false;
    }

    const civilStatus = document.getElementById('civilStatus').value;
    if (!civilStatus) {
        alert('Please select your civil status.');
        return false;
    }

    const formData = {
        firstName: document.getElementById('firstName').value,
        middleName: document.getElementById('middleName').value,
        lastName: document.getElementById('lastName').value,
        dob: document.getElementById('dob').value,
        birthLocation: document.getElementById('birthLocation').value,
        gender: genderChecked.value,
        civilStatus: civilStatus,
        nationality: document.getElementById('nationality').value,
        religion: document.getElementById('religion').value,
        contactNumber: document.getElementById('contactNumber').value,
        email: document.getElementById('email').value,
        homeAddress: document.getElementById('homeAddress').value,
        emergencyName: document.getElementById('emergencyName').value,
        emergencyRelationship: document.getElementById('emergencyRelationship').value,
        emergencyContact: document.getElementById('emergencyContact').value,
        username: document.getElementById('username').value,
        // Do not store password for security reasons
    };

    const photoInput = document.getElementById('photo');
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            formData.photoDataUrl = e.target.result;
            localStorage.setItem('personalData', JSON.stringify(formData));
            // Ensure image is always loaded before redirecting to output.html
            window.location.href = 'output.html';
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        formData.photoDataUrl = '';
        localStorage.setItem('personalData', JSON.stringify(formData));
        window.location.href = 'output.html';
    }
});
