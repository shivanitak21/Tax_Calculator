document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const resultContainer = document.getElementById('result');

    // Function to calculate tax
    function calculateTax(grossIncome, extraIncome, ageGroup, deductions) {
        let overallIncome = grossIncome + extraIncome - deductions;
        if (overallIncome <= 800000) {
            return 0;
        } else {
            let taxRate;
            if (ageGroup === '<40') {
                taxRate = 0.3;
            } else if (ageGroup === '>=40 & <60') {
                taxRate = 0.4;
            } else {
                taxRate = 0.1;
            }
            return (overallIncome - 800000) * taxRate;
        }
    }

    // Function to display modal with calculation result
    function displayResult(result) {
        resultContainer.textContent = `Your overall income after tax deductions will be ${result}`;
        modal.style.display = 'block';
    }

    // Event listener for form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const grossIncome = parseFloat(document.getElementById('grossIncome').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
        const ageGroup = document.getElementById('age').value;
        const deductions = parseFloat(document.getElementById('deductions').value) || 0;

        if (!grossIncome || !ageGroup) {
            alert('Please fill out all required fields.');
            return;
        }

        const taxAmount = calculateTax(grossIncome, extraIncome, ageGroup, deductions);
        displayResult(taxAmount);

        form.reset();
    });

    // Close the modal when the close button is clicked
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close the modal when user clicks outside of it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Show/hide error icons based on input validity
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            const errorIcon = input.nextElementSibling;
            if (!input.checkValidity()) {
                errorIcon.style.display = 'inline-block';
            } else {
                errorIcon.style.display = 'none';
            }
        });
    });
});
