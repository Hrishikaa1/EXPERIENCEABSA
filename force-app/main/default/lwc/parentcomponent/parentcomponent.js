import { LightningElement,track,api } from 'lwc';

export default class Parentcomponent extends LightningElement {
    @track states = {
        'Child One': false,
        'Child Two': false,
        'Child Three': false
    };

    // map → “Selected/Deselected” strings for the header row
    get statusChildOne()  { return this.states['Child One']  ? 'Selected'   : 'Deselected'; }
    get statusChildTwo()  { return this.states['Child Two']  ? 'Selected'   : 'Deselected'; }
    get statusChildThree(){ return this.states['Child Three']? 'Selected'   : 'Deselected'; }

    connectedCallback() {
        // listen for bubbled events from children
        this.addEventListener('childselection', this.handleChildSelection);
    }

    handleChildSelection = (evt) => {
        const { name, selected } = evt.detail;
        this.states = { ...this.states, [name]: selected };

        const count = Object.values(this.states).filter(Boolean).length;

        // bubble up to grandparent with the latest count
        this.dispatchEvent(new CustomEvent('parentcountchange', {
            detail: { count },
            bubbles: true,
            composed: true
        }));
    };

    // Grandparent calls this via @api during Reset All
    @api resetAllChildren() {
        // reset state
        this.states = {
            'Child One': false,
            'Child Two': false,
            'Child Three': false
        };

        // tell each child to reset
        this.template.querySelectorAll('c-childcomponent')
            .forEach(c => c.resetSelection());

        // push 0 upstream
        this.dispatchEvent(new CustomEvent('parentcountchange', {
            detail: { count: 0 },
            bubbles: true,
            composed: true
        }));
    }
}