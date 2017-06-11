document.addEventListener('DOMContentLoaded', () => {
    const jobRole = document.getElementById('title');
    const payment = document.getElementById('payment');
    const colors = document.getElementById('colors-js-puns');
    const options = document.getElementsByTagName('option');
    const design = document.getElementById('design');
    const paypal = document.getElementById('paypal');
    const bitcoin = document.getElementById('bitcoin');
    const register = document.getElementById('register');
    const creditCard = document.getElementById('credit-card');
    const creditCardNumber = document.getElementById('cc-num');
    const zipCode = document.getElementById('zip');
    const cvv = document.getElementById('cvv');

    // focus on first name box
    document.getElementById('name').focus();

    // insert total price for activities to update later
    const legendTotal = document.createElement('legend');
    let total = 0;
    legendTotal.id = 'total';
    legendTotal.textContent = 'Total: $0';
    $('.activities').after(legendTotal);

    // Create real time error messages
    const paymentsErrorParagraph = createErrorMessage('Choose a payment option!',
        'paymentsError');
    $('label[for="payment"]').before(paymentsErrorParagraph);
    $('#paymentsError').hide();

    const activitiesErrorParagraph = createErrorMessage('Pick your activities!',
        'activitiesError');
    $('.activities').find('legend').append(activitiesErrorParagraph);

    const shirtErrorParagraph = createErrorMessage("Don't forget to choose a shirt!",
        "shirtError");
    $('.shirt').find('legend').append(shirtErrorParagraph);

    const jobRoleErrorParagraph = createErrorMessage('Job role cannot be empty!',
        'jobRoleError');

    let creditCardNumberErrorParagraph = createErrorMessage("Please enter a credit card number.",
        "creditCardNumberError");
    $('label[for="cc-num"]').before(creditCardNumberErrorParagraph);

    let zipCodeErrorParagraph = createErrorMessage("Please enter a Zip",
        "zipCodeError");
    $('label[for="zip"]').before(zipCodeErrorParagraph);

    let cvvErrorParagraph = createErrorMessage("Please enter a CVV",
        "cvvError");
    $('label[for="cvv"]').before(cvvErrorParagraph);
    // hide color options until they choose a t-shirt
    $(colors).hide();

    // add input box if they select 'other' or remove it if they select
    // something else after selecting other.
    let otherJobRole;
    jobRole.addEventListener('change', (e) => {
        const previousInput = document.getElementById('other-title');
        const input = document.createElement('input');
        const other = e.target.value;
        input.type = 'text';
        input.id = 'other-title';
        input.placeholder = 'Your Job Role';

        if (e.target.value === 'other') {
            $(jobRole).after(input);
            $(input).after(jobRoleErrorParagraph);
            $(jobRoleError).show();
            otherJobRole = document.getElementById('other-title');
            jobRoleNotEmpty();
        } else {
            $(previousInput).remove();
            $(jobRoleError).hide();
        }
    });

    // check that the job role input not empty
    function jobRoleNotEmpty() {
        $(otherJobRole).on('input', function() {
            let jobRoleValue = $(otherJobRole).val();
            if (jobRoleValue.length > 0) {
                $(jobRoleError).hide();
            } else {
                $(jobRoleError).show();
            }
        });
    }

    // show colors based on what t-shirt they selected
    design.addEventListener('change', (e) => {
        $(colors).hide();
        $('#shirtError').show();
        if (e.target.value !== 'Select Theme') {
            $(colors).show();
            $('#shirtError').hide();
        }
        if (e.target.value === 'js puns') {
            $("#color").children().hide();
            $("#color option:nth-child(-n+3)").show();
            color.options[0].selected = true;
        } else if (e.target.value === 'heart js') {
            $("#color").children().show();
            $("#color option:nth-child(-n+3)").hide();
            color.options[3].selected = true;
        }
    });

    /*
        For each checkbox that is selected or un-selected we will add or subtract
        from the total, and if there is a time conflict, either disable or
        re-enable (if un-checked) the checkboxes.
    */
    $('.activities').on('change', (e) => {
        const checkboxes = $('input');
        const allCheckboxes = $('.activities').find(checkboxes);
        // creating this allows updates, like price changes or conflicts
        const checkboxValues = [
            {
                //main-conference
                total: 200
            },
            {
                //js-frameworks
                total: 100,
                conflict: allCheckboxes[3],
                conflictLabel: allCheckboxes[3].parentNode
            },
            {
                //js-libs
                total: 100,
                conflict: allCheckboxes[4],
                conflictLabel: allCheckboxes[4].parentNode
            },
            {
                //express
                total: 100,
                conflict: allCheckboxes[1],
                conflictLabel: allCheckboxes[1].parentNode
            },
            {
                //node
                total: 100,
                conflict: allCheckboxes[2],
                conflictLabel: allCheckboxes[2].parentNode
            },
            {
                //build tools
                total: 100
            },
            {
                //npm
                total: 100
            }
        ];

        function updateTotal(num) {
            total += num;
            legendTotal.textContent = 'Total: $' + total;
        }
        function updateConflict (action, index) {
            if (action === 'add') {
                checkboxValues[index].conflict.disabled = 'true';
                $(checkboxValues[index].conflictLabel).css('color', 'grey');
            } else {
                checkboxValues[index].conflict.removeAttribute('disabled');
                $(checkboxValues[index].conflictLabel).css('color', '');
            }

        }

        for (let i = 0; i < allCheckboxes.length; i++) {
            if (e.target.name === allCheckboxes[i].name) {
                if (e.target.checked === true) {
                    updateTotal(checkboxValues[i].total);
                    if (checkboxValues[i].conflict) {
                        updateConflict('add', i);
                    }
                } else {
                    updateTotal(-(checkboxValues[i].total));
                    if (checkboxValues[i].conflict) {
                        updateConflict('remove', i);
                    }
                }
            }
            // show error again if they un-select everything
            if (total !== 0) {
                $('#activitiesError').hide();
            } else {
                $('#activitiesError').show();
            }
        }
    });

    // Show text and input boxes based on payment option
    payment.addEventListener('change', (e) => {
        const selection = e.target.value;
        if (selection === 'paypal') {
            hideAllPaymentOptions();
            $('#paymentsError').hide();
            $(paypal).show();
        } else if (selection === 'bitcoin') {
            hideAllPaymentOptions();
            $('#paymentsError').hide();
            $(bitcoin).show();
        } else if (selection === 'credit card') {
            hideAllPaymentOptions();
            $('#paymentsError').hide();
            $(creditCard).show();
        } else {
            hideAllPaymentOptions();
            $('#paymentsError').show();
        }
    });

    // on submit we will run this function to check for a blank name
    const name = document.getElementById('name');
    const nameLabel = $('label[for="name"]');
    const nameLabelText = $(nameLabel).text();
    function checkNameNotBlank () {
        if (name.value === '') {
            $(nameLabel).css('color', 'red');
            $(nameLabel).text(nameLabelText + ' (please provide your name.)');
            return false;
        } else {
            $(nameLabel).css('color', '#000');
            $(nameLabel).text(nameLabelText);
            return true;
        }
    }
    $(name).on('input', checkNameNotBlank);
    //     let nameInput = $(name).val();
    //     if (nameInput.length > 0) {
    //         $(nameLabel).css('color', '#000');
    //         $(nameLabel).text(nameLabelText);
    //
    //     } else {
    //         $(nameLabel).css('color', 'red');
    //         $(nameLabel).text(nameLabelText + ' (please provide your name.)');
    //     }
    // });

    // check for valid email in real time
    const email = document.getElementById('mail');
    const emailLabel = $('label[for="mail"]');
    const emailLabelText = $(emailLabel).text();
    const emailErrorMessage = emailLabelText + ' (please enter a valid email)';
    let emailCheck = false;
    $(emailLabel).css('color', 'red');
    $(emailLabel).text(emailErrorMessage);

    $(email).on('input', function() {
        let emailAddress = $(email).val();
        if (emailAddress.includes('@') && emailAddress.includes('.')) {
            $(emailLabel).css('color', '#000');
            $(emailLabel).text(emailLabelText);
            emailCheck = true;
        } else {
            $(emailLabel).css('color', 'red');
            $(emailLabel).text(emailErrorMessage);
            emailCheck = false;
        }
    });

    // credit card real time error messages
    $(creditCard).on('input', function() {
        const lengthOfCreditCardNumber = $(creditCardNumber).val().length;
        const zipCodeLength = $(zipCode).val().length;
        const cvvLength = $(cvv).val().length;
        if (lengthOfCreditCardNumber < 16 && lengthOfCreditCardNumber > -1
                || lengthOfCreditCardNumber > 16 ) {
            $(creditCardNumberError).hide();
            creditCardNumberErrorParagraph = createErrorMessage("Credit number must be 16 charcters long.",
                "creditCardNumberError");
            displayErrorMessage('cc-num', creditCardNumberErrorParagraph);
        } else {
            $(creditCardNumberError).hide();
        }
        if (zipCodeLength !== 5) {
            $(zipCodeError).hide();
            zipCodeErrorParagraph = createErrorMessage("Zip code must be 5 numbers",
                "zipCodeError");
            displayErrorMessage('zip', zipCodeErrorParagraph);
        } else {
            $(zipCodeError).hide();
        }
        if (cvvLength > 4 || cvvLength < 3) {
            $(cvvError).hide();
            cvvErrorParagraph = createErrorMessage("CVV must be 3 or 4 numbers",
                "cvvError");
            displayErrorMessage('cvv', cvvErrorParagraph);
        } else {
            $(cvvError).hide();
        }

        function displayErrorMessage(label, paragraph) {
            $('label[for=' + label + ']').before(paragraph);
        }
    });

    function createErrorMessage(message, id) {
        const p = document.createElement('p');
        $(p).append(message);
        $(p).css('color', 'red');
        p.id = id;
        return p;
    }

    function hideAllPaymentOptions() {
        $(paypal).hide();
        $(bitcoin).hide();
        $(creditCard).hide();
    }

    hideAllPaymentOptions();
    $(creditCard).show();
    payment.options[1].selected = true;
    checkNameNotBlank();

    // On submit if there are any errors we will not let it submit
    register.addEventListener('click', (e) => {
        const errorList = $('[id*="Error"]');
        for (let i = 0; i < errorList.length; i += 1) {
            if ($(errorList[i]).is(':visible')) {
                e.preventDefault();
            }
        }
        if (!emailCheck) {
            e.preventDefault();
        }
        if (!checkNameNotBlank()) {
            e.preventDefault();
        }
    });
});
