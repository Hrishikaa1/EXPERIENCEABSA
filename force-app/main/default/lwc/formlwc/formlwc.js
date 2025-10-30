import { LightningElement, track } from 'lwc';

export default class Formlwc extends LightningElement {
    @track count = 0;
    @track email = '';
    @track emailValid = true;

    handleClick() {
        this.count += 1;
    }

    handleReset() {
        this.count = 0;
        this.email = '';
        this.emailValid = true;
    }

    handleEmailInput(event) {
        const value = (event.target.value || '').trim();
        this.email = value;
        this.emailValid = this.validateEmail(value);
        this.setInputValidity(event.target, this.emailValid, 'Please enter a valid email address');
    }

    validateEmail(value) {
        if (!value) return true;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(value);
    }

    setInputValidity(inputEl, isValid, message) {
        if (!inputEl || typeof inputEl.setCustomValidity !== 'function') return;
        inputEl.setCustomValidity(isValid ? '' : message);
        inputEl.reportValidity?.();
    }

    handleSubmit() {
        if (!this.emailValid) {
            // Simple visual validation
            this.template.querySelector('lightning-input').reportValidity();
            return;
        }
        // Placeholder for future logic (like saving)
        alert(`Submitted successfully!\nCount: ${this.count}\nEmail: ${this.email}`);
    }
}
