import { LightningElement,api,track } from 'lwc';

export default class Childcomponent extends LightningElement {
    @api label = 'child';
    @track selected = false;

    get buttonText() {
        return this.selected ? 'Deselect' : 'Select';
    }
    get buttonVarient(){
        return this.selected ? 'Destructive' : 'Success';
    }

    handleToggle(){
        this.selected = !this.selected;

        this.dispatchEvent(new CustomEvent('childselected', {
            detail: { name: this.label, selected: this.selected },
      
            bubbles: true,
            composed: true
        }));
    }

    @api resetSelection(){
        this.selected = false;
    }

}