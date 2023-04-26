const VALIDATOR = {
    'required': (value) => (value.length !== 0),
    'min': (value) => (value.length > 1),
    'email': (value) => !!(value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)),
    'password': (value) => (value.length > 6),
    'confirm': (value) => {
        let $confirm = true;
        const passwordInput = document.querySelector('#password').value;
        if(value != passwordInput) {
            $confirm = false;
        }
        return $confirm;
    },
    'maxSize': (value) => !!(value && value.size < 1048576),
    'maxSizeNotSure': (value) => {
        let img = true;
        if (value && value.size > 1048576) {
            img = false;
        }
        return img;
    },
    'comment': (value) => (value.length > 3)
};

const FORMS = {
    'login': 'user-login',
    'register': 'user-register',
    'change': 'user-change',
    'post': 'new-post',
    'editPost': 'post-edit',
    'comment': 'comment',
    'editComment': 'comment-edit',
    'reply': 'reply',
    'chat': 'chat'
};

const ERRORSFORM = {
    'notUser': 'This user does not exist, check the data.',
    'fildError': 'One of the fields contains an error, check the data and try again.',
    'existUser': 'A user with the same name already exists.',
    'something': 'Something went wrong. Check the data and try again!',
};

const ERRORINPUT = {
    'required': 'This field is required',
    'min': 'Minimum number of characters 2',
    'email': 'Email is not true',
    'password': 'Minimum number of characters 7',
    'confirm': 'Not identical to password',
    'maxSize': 'Add an image less than 1Mb',
    'maxSizeNotSure': 'Add an image less than 1Mb',
    'comment': 'Сomment must be filled in and contain more than three characters'
};

const imageFilters = ["blur", "grayscale", "invert", "contrast", "sepia", "brightness", "turn"];


export {VALIDATOR, FORMS, ERRORSFORM, ERRORINPUT, imageFilters};