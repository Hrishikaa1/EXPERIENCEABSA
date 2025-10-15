import { LightningElement, track } from 'lwc';

export default class Otpverification extends LightningElement {
     @track otp = ['', '', '', '', ''];
    @track countdown = 30;
    timer;

    connectedCallback() {
        this.startCountdown();
    }

    startCountdown() {
        this.timer = setInterval(() => {
            if (this.countdown > 0) {
                this.countdown -= 1;
            } else {
                clearInterval(this.timer);
            }
        }, 1000);
    }

    handleInput(event) {
        const index = event.target.dataset.index;
        this.otp[index] = event.target.value;

        // Move focus to next input automatically
        const nextInput = this.template.querySelector(`lightning-input[data-index="${parseInt(index)+1}"]`);
        if(nextInput && event.target.value) nextInput.focus();
    }

    resendOtp() {
        this.countdown = 30;
        this.startCountdown();
        // Call Apex or external service to resend OTP
        console.log('OTP Resent');
    }

    handleBack() {
        console.log('Back clicked');
    }

    handleSubmit() {
        const otpValue = this.otp.join('');
        console.log('Submitted OTP:', otpValue);
        // Call Apex or validate OTP
    }
}