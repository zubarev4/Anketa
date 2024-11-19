document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('clientForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        let isValid = true;

        const visibleFields = Array.from(form.elements).filter(field => {
            return field.offsetParent !== null && (field.tagName === 'INPUT' || field.tagName === 'SELECT');
        });

        visibleFields.forEach(field => {
            if (field.checkValidity() === false) {
                isValid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
        });

        if (!isValid) {
            form.classList.add('was-validated');
            return;
        }
        
        const formData = new FormData(form);
        let urlParams = new URLSearchParams();

        for (let [key, value] of formData.entries()) {
            urlParams.append(key, value);
        }

        
        window.location.href = 'form.html?' + urlParams.toString();
    }, false);
    

    
    const inputElements = form.querySelectorAll('input, select');

    inputElements.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '' || !input.checkValidity()) {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });
    
        input.addEventListener('input', () => {
            input.classList.remove('is-valid');
            input.classList.remove('is-invalid');
        });
    });



    const birthDate = document.getElementById('birthDate');
    const gender = document.getElementById('gender');
    const autoNationalId = document.getElementById('autoNationalId'); 
    const manualNationalId = document.getElementById('manualNationalId');
    const maritalStatus = document.getElementById('maritalStatus');
    const spouseInfo = document.getElementById('spouseInfo');
    const employmentStatus = document.getElementById('employmentStatus');
    const workFieldContainer = document.getElementById('workFieldContainer');
    const experienceContainer = document.getElementById('experienceContainer');
    const experience = document.getElementById('experience');
    const education = document.getElementById('education');
    const graduatedInstitutionContainer = document.getElementById('graduatedInstitutionContainer');
    const qualificationContainer = document.getElementById('qualificationContainer');
    const degreeContainer = document.getElementById('degreeContainer');
    const maritalStatusContainer = document.getElementById('maritalStatusContainer');
    const employmentStatusContainer = document.getElementById('employmentStatusContainer');

    const studentDetails = document.getElementById('studentDetails');
    const employmentDetails = document.getElementById('employmentDetails');
    const unemploymentDetails = document.getElementById('unemploymentDetails');
    const leaveDetails = document.getElementById('leaveDetails');

    const progressBar = document.getElementById('progressBar');
    const formFields = document.querySelectorAll('#clientForm input, #clientForm select');

    

    const calculateAge = (birthDateValue) => {
        const birthDate = new Date(birthDateValue);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleAgeRelatedFields = () => {
        const birthDateValue = birthDate.value;
        if (!birthDateValue) return;

        const age = calculateAge(birthDateValue);

        if (age >= 18) {
            maritalStatusContainer.style.display = 'block';
        } else {
            maritalStatusContainer.style.display = 'none';
            maritalStatus.value = ""; 
            spouseInfo.style.display = 'none'; 
        }

        
        if (age >= 14) {
            employmentStatusContainer.style.display = 'block';
        } else {
            employmentStatusContainer.style.display = 'none';
            
            document.getElementById('employmentStatus').value = "";
        }
    };

    
    birthDate.addEventListener('change', handleAgeRelatedFields);

    
    maritalStatus.addEventListener('change', () => {
        spouseInfo.style.display = maritalStatus.value === 'vedęs/ištekėjusi' ? 'block' : 'none';
    });

    const generateNationalId = () => {
        const birthDateValue = birthDate.value;
        const genderValue = gender.value;

        if (!birthDateValue || !genderValue) return;

        const year = parseInt(birthDateValue.slice(0, 4), 10);
        const month = birthDateValue.slice(5, 7); // MM
        const day = birthDateValue.slice(8, 10); // DD

        let firstDigit = '';
        if (year >= 1800 && year < 1900) {
            firstDigit = genderValue === 'vyras' ? '1' : '2';
        } else if (year >= 1900 && year < 2000) {
            firstDigit = genderValue === 'vyras' ? '3' : '4';
        } else if (year >= 2000 && year < 2100) {
            firstDigit = genderValue === 'vyras' ? '5' : '6';
        }

        const yearSuffix = year.toString().slice(-2);

        autoNationalId.value = `${firstDigit}${yearSuffix}${month}${day}`;
    };

    
    

    birthDate.addEventListener('change', generateNationalId);
    gender.addEventListener('change', generateNationalId);

    maritalStatus.addEventListener('change', () => {
        spouseInfo.style.display = maritalStatus.value === 'vedęs/ištekėjusi' ? 'block' : 'none';
    });

    education.addEventListener('change', () => {
        const educationValue = education.value;

        graduatedInstitutionContainer.style.display = educationValue !== '' ? 'block' : 'none';

        if (educationValue === "pagrindinis" || educationValue === "vidurinis" || educationValue === "profesinis" || educationValue === "aukštasis kolegijinis" || educationValue === "aukštasis universitetinis") {
            graduatedInstitutionContainer.style.display = 'block';
        } else {
            graduatedInstitutionContainer.style.display = 'none';
        }

        if (educationValue === "profesinis" || educationValue === "aukštasis kolegijinis" || educationValue === "aukštasis universitetinis") {
            qualificationContainer.style.display = 'block';
        } else {
            qualificationContainer.style.display = 'none';
        }

        if (educationValue === "aukštasis kolegijinis" || educationValue === "aukštasis universitetinis") {
            degreeContainer.style.display = 'block';
        } else {
            degreeContainer.style.display = 'none';
        }
    });

    employmentStatus.addEventListener('change', () => {
        studentDetails.style.display = employmentStatus.value === 'studijuoja' ? 'block' : 'none';
        employmentDetails.style.display = employmentStatus.value === 'dirba' ? 'block' : 'none';
        unemploymentDetails.style.display = employmentStatus.value === 'nedirba' ? 'block' : 'none';
        leaveDetails.style.display = employmentStatus.value === 'motinystės/tėvystės atostogose' ? 'block' : 'none';

        if (employmentStatus.value === 'dirba') {
            workFieldContainer.style.display = 'block';
            experienceContainer.style.display = 'block';
        } 
        else if (employmentStatus.value === 'nedirba') {
            workFieldContainer.style.display = 'block';
            experienceContainer.style.display = 'block';
        }
        else if (employmentStatus.value === 'motinystės/tėvystės atostogose') {
            workFieldContainer.style.display = 'block';
            experienceContainer.style.display = 'block';
        } else {
            workFieldContainer.style.display = 'none';
            experienceContainer.style.display = 'none';
            workField.value = ''; 
            experience.value = ''; 
        }
    });

    
    const updateProgressBar = () => {
        let filledFields = 0;
        let visibleFields = 0;
    
        formFields.forEach(field => {
            if (field.offsetParent !== null) {
                visibleFields++;
                if (field.value.trim() !== '') {
                    filledFields++;
                }
            }
        });
            const progressPercentage = visibleFields > 0 ? (filledFields / visibleFields) * 100 : 0;
        progressBar.style.width = `${progressPercentage}%`;
    };
    
    formFields.forEach(field => {
        field.addEventListener('input', updateProgressBar);
        field.addEventListener('change', updateProgressBar);
    });
    
    updateProgressBar();
  
    const experienceInput = document.getElementById('experience');

    document.querySelectorAll('input[type="number"]').forEach(input => {
        
        input.addEventListener('input', () => {
            if (input.value.length > 4) {
                input.value = input.value.slice(0, 4);
            }
        });
    
        experienceInput.addEventListener('input', () => {
            if (experienceInput.value.length > 2) {
                experienceInput.value = experienceInput.value.slice(0, 2);
            }
        });
        
        input.addEventListener('keypress', (event) => {
            // Allow only numeric values
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
        });
    
        input.addEventListener('blur', () => {
            if (input.value.length !== 4) {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });

        experienceInput.addEventListener('blur', () => {
            if (experienceInput.value.length < 1 || experienceInput.value.length > 2) {
                experienceInput.classList.remove('is-valid');
                experienceInput.classList.add('is-invalid');
            } else {
                experienceInput.classList.remove('is-invalid');
                experienceInput.classList.add('is-valid');
            }
        });
        
    });
    
    });
