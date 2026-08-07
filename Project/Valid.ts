// ===== VALID.TS - Form Validation =====
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm') as HTMLFormElement;
    const nameInput = document.getElementById('nameInput') as HTMLInputElement;
    const emailInput = document.getElementById('emailInput') as HTMLInputElement;
    const messageInput = document.getElementById('messageInput') as HTMLTextAreaElement;

    function validateName(name: string): boolean {
        return name.trim().length > 0;
    }

    function validateEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validateMessage(message: string): boolean {
        return message.trim().length > 0;
    }

    function setError(input: HTMLElement, isValid: boolean): void {
        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
    }

    nameInput.addEventListener('blur', () => {
        setError(nameInput, validateName(nameInput.value));
    });
    emailInput.addEventListener('blur', () => {
        setError(emailInput, validateEmail(emailInput.value));
    });
    messageInput.addEventListener('blur', () => {
        setError(messageInput, validateMessage(messageInput.value));
    });

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isMessageValid = validateMessage(messageInput.value);

        setError(nameInput, isNameValid);
        setError(emailInput, isEmailValid);
        setError(messageInput, isMessageValid);

        if (isNameValid && isEmailValid && isMessageValid) {
            alert('Pesan berhasil dikirim! (simulasi)');
            form.reset();
            document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
        } else {
            alert('Mohon lengkapi semua field dengan benar.');
        }
    });
});