"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    var nameInput = document.getElementById('nameInput');
    var emailInput = document.getElementById('emailInput');
    var messageInput = document.getElementById('messageInput');
    function validateName(name) {
        return name.trim().length > 0;
    }
    function validateEmail(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    function validateMessage(message) {
        return message.trim().length > 0;
    }
    function setError(input, isValid) {
        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
        else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
    }
    nameInput.addEventListener('blur', function () {
        setError(nameInput, validateName(nameInput.value));
    });
    emailInput.addEventListener('blur', function () {
        setError(emailInput, validateEmail(emailInput.value));
    });
    messageInput.addEventListener('blur', function () {
        setError(messageInput, validateMessage(messageInput.value));
    });
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var isNameValid = validateName(nameInput.value);
        var isEmailValid = validateEmail(emailInput.value);
        var isMessageValid = validateMessage(messageInput.value);
        setError(nameInput, isNameValid);
        setError(emailInput, isEmailValid);
        setError(messageInput, isMessageValid);
        if (isNameValid && isEmailValid && isMessageValid) {
            alert('Pesan berhasil dikirim! (simulasi)');
            form.reset();
            document.querySelectorAll('.is-valid').forEach(function (el) { return el.classList.remove('is-valid'); });
        }
        else {
            alert('Mohon lengkapi semua field dengan benar.');
        }
    });
});