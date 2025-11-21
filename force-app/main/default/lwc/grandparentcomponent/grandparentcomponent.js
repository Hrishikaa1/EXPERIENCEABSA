import { LightningElement,track } from 'lwc';

export default class Grandparentcomponent extends LightningElement {
      @track totalSelected = 0;
    childrenCount = 3;

    connectedCallback() {
        this.addEventListener('parentcountchange', this.handleCountUpdate);
    }

    handleCountUpdate = (evt) => {
        this.totalSelected = evt.detail.count;
    };

    handleReset() {
        this.template.querySelector('c-parentcomponent').resetAllChildren();
        this.totalSelected = 0;
    }
}