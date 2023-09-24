const registerForm = $('.register');
const submitRegisterFormBtn = $('.btn-submit');
const validatorInput = $('.register [name]');

const isValid = input => {
    input.removeClass('is-invalid');
    input.addClass('is-valid');
    input.next('.invalid-feedback').html('');
}

const isInvalid = (input, mess) => {
    input.addClass('is-invalid');
    input.removeClass('is-valid');
    input.next('.invalid-feedback').html(mess);
}

const Validator = function(input) {
    const name = input.getAttribute('name');
    switch(name) {
        case 'username':
            if (input.value.trim().length >= 4) {
                isValid($(input))
            } else 
                isInvalid($(input), 'Tên đăng nhập phải lớn hơn 4 ký tự');
            break;
        case 'password':
            if (input.value.trim() !== '') {
                isValid($(input))
            } else 
                isInvalid($(input), 'Mật khẩu không được rỗng');
            break;
        case 'password-confirm': 
            if (input.value.trim() === '') {
                isInvalid($(input), 'Mật khẩu không được rỗng');
            } else if (input.value.trim() !== $(registerForm[0]).children('.form-group').children('input[name="password"]')[0].value.trim()) {
                isInvalid($(input), 'Mật khẩu nhập lại không khớp');
            } else 
                isValid($(input));
            break;
        case 'email':
            if (input.value.trim() === '') {
                isInvalid($(input), 'Email không được rỗng');
            } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value.trim())) {
                isInvalid($(input), 'Email không đúng định dạng');
            }
            else 
                isValid($(input));
            break;
    }
};

[...validatorInput].forEach(function(input) {
    $(input).focus(function() {
        $(this).removeClass('is-valid', 'is-invalid');
    });

    $(input).blur(() => Validator(input));
})

submitRegisterFormBtn.click(e => {
    e.preventDefault();
})

$('.modal-dialog').click(e => e.stopPropagation())