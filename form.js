document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    params.forEach((value, key) => {
        const displayElement = document.getElementById(key);
        if (displayElement) {
            displayElement.textContent = value;

            if (value.trim() !== '') {
                if (displayElement.parentElement.style.display === 'none') {
                    displayElement.parentElement.style.display = 'block';
                }
            }
        }
    });

    const birthDate = params.get('birthDate');
    if (birthDate) {
        const birthDateValue = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birthDateValue.getFullYear();
        const monthDiff = today.getMonth() - birthDateValue.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateValue.getDate())) {
            age--;
        }

        if (age < 18) {
            document.getElementById('maritalStatusContainer').style.display = 'none';
        }
    }


    const education = document.getElementById('education').textContent.trim();
    if (education !== '') {
        document.getElementById('graduationDetails').style.display = 'block';

        if (education === 'profesinis' || education === 'aukštasis kolegijinis' || education === 'aukštasis universitetinis') {
            document.getElementById('qualificationDetails').style.display = 'block';
        }

        if (education === 'aukštasis kolegijinis' || education === 'aukštasis universitetinis') {
            document.getElementById('degreeDetails').style.display = 'block';
        }
    }

    const employmentStatus = document.getElementById('employmentStatus').textContent.trim();
    if (employmentStatus !== '') {
        switch (employmentStatus) {
            case 'studijuoja':
                document.getElementById('studentDetailsSummary').style.display = 'block';
                break;
            case 'dirba':
                document.getElementById('employmentDetailsSummary').style.display = 'block';
                document.getElementById('workFieldSummary').style.display = 'block';
                document.getElementById('experienceSummary').style.display = 'block';
                break;
            case 'nedirba':
                document.getElementById('unemploymentDetailsSummary').style.display = 'block';
                document.getElementById('workFieldSummary').style.display = 'block';
                document.getElementById('experienceSummary').style.display = 'block';
                break;
            case 'motinystės/tėvystės atostogose':
                document.getElementById('leaveDetailsSummary').style.display = 'block';
                document.getElementById('workFieldSummary').style.display = 'block';
                document.getElementById('experienceSummary').style.display = 'block';
                break;
            default:
                document.getElementById('studentDetailsSummary').style.display = 'none';
                document.getElementById('employmentDetailsSummary').style.display = 'none';
                document.getElementById('unemploymentDetailsSummary').style.display = 'none';
                document.getElementById('leaveDetailsSummary').style.display = 'none';
                document.getElementById('workFieldSummary').style.display = 'none';
                document.getElementById('experienceSummary').style.display = 'none';
                break;
        }
    }

    const maritalStatus = document.getElementById('maritalStatus').textContent.trim();
    if (maritalStatus === 'vedęs/ištekėjusi') {
        document.getElementById('spouseInfoSummary').style.display = 'block';
    } else {
        document.getElementById('spouseInfoSummary').style.display = 'none';
    }
});
