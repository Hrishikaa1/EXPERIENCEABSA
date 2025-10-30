import { LightningElement, wire, track } from 'lwc';
import getDirectorRecords from '@salesforce/apex/DirectorController.getDirectorRecords';
import saveDirectorRecord from '@salesforce/apex/DirectorController.saveDirectorRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import "cosmos/cosmos.hooks.custom-props.css";
import "cosmos/cosmos.shared.hooks.custom-props.css";
import "cosmos/cosmos.component.hooks.custom-props.css";
export default class DirectorTable extends LightningElement {
      @track data = [];

    @wire(getDirectorRecords)
    wiredDirectors({ data, error }) {
        if (data) {
            this.data = data.map(record => ({ ...record, isNew: false }));
        } else if (error) {
            console.error('Error fetching directors:', error);
        }
    }

    // Add a blank, editable row
    addRow() {
        const newRecord = {
            Id: 'temp_' + Date.now(),
            Name: '',
            Name_ID__c: '',
            Address__c: '',
            Relationship__c: '',
            Share_structure__c: '',
            Account_Role__c: '',
            Status__c: 'Draft',
            isNew: true
        };
        this.data = [...this.data, newRecord];
    }

    // Handle input changes for new rows
    handleInputChange(event) {
        const field = event.target.name;
        const recordId = event.target.dataset.id;
        this.data = this.data.map(item => {
            if (item.Id === recordId) {
                return { ...item, [field]: event.target.value };
            }
            return item;
        });
    }

    // Save newly added editable row
   async saveRecord() {
    const newRecord = this.data.find(item => item.isNew === true);
    if (!newRecord) {
        this.showToast('Info', 'No new record to save.', 'info');
        return;
    }

    // Prepare a clean record without temp Id or flags
    const recordToSave = {
        Name: newRecord.Name,
        Name_ID__c: newRecord.Name_ID__c,
        Address__c: newRecord.Address__c,
        Relationship__c: newRecord.Relationship__c,
        Share_structure__c: newRecord.Share_structure__c,
        Account_Role__c: newRecord.Account_Role__c,
        Status__c: 'Active'
    };

    try {
        const result = await saveDirectorRecord({ newDirector: recordToSave });

        this.showToast('Success', `Record saved! ID: ${result.Id}`, 'success');

        // Replace temp row with saved record
        this.data = this.data.map(item =>
            item.Id === newRecord.Id ? { ...result, isNew: false } : item
        );
    } catch (error) {
        console.error(error);
        this.showToast('Error', 'Failed to save record', 'error');
    }
}

showToast(title, message, variant) {
    this.dispatchEvent(
        new ShowToastEvent({ title, message, variant })
    );
}
}