import {VALIDATOR, ERRORINPUT} from "../variables";


function submitForms($form) {
    const formError = $form.querySelector('.form-error');

    const isFormValid = checkFormValid($form);

    if(isFormValid) {
        if(formError.classList.contains('show')) {
            formError.classList.remove('show');
        }

    } else {
        formError.classList.add('show');
    }
    return isFormValid;
}

function checkFormValid($form) {
    let isValid = true;

    const $inputs = $form.querySelectorAll('[data-validate]');

    $inputs.forEach($input => {
        let isInputValide = checkInputValid($input);
        if (!isInputValide) {
            isValid = false;
        }
    });

    return isValid;
}

function checkInputValid($input) {
    let isValid = true;

    const value = $input.type === "file" ? $input.files[0] : $input.value,
          container = $input.closest('.form-input'),
          inputError = container.querySelector('.input-error');

    if($input.dataset.validate) {
        const validates = createInputValidate($input);

        validates.forEach(item => {

            if(container && container.classList.contains('show-error')) {
                container.classList.remove('show-error');
            }

            if(!VALIDATOR[item](value)) {
                isValid = false;
                inputError.innerHTML = ERRORINPUT[item];
            }
        });

        if(!isValid) {
            if(container && !container.classList.contains('show-error')) {
                container.classList.add('show-error');
            } 
        } else {
            if(container && container.classList.contains('show-error')) {
                container.classList.remove('show-error');
            }
        }

    }

    return isValid;

}

function createInputValidate($input) {
    const validates = [];

    $input.dataset.validate.split(',').forEach(item => {
        let itemValid = item.trim();
        validates.push(itemValid);
    });

    return validates;
}


export default submitForms;


