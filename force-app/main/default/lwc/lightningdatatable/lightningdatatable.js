import { LightningElement, wire, track } from 'lwc';
import getDirectorRecords from '@salesforce/apex/DirectorController.getDirectorRecords';
import saveDirectorRecord from '@salesforce/apex/DirectorController.saveDirectorRecord';
import getPicklistValues from '@salesforce/apex/DirectorController.getPicklistValues';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Lightningdatatable extends LightningElement {
    @track data = [];
    @track picklistOptions = {};

    // ✅ Fetch existing director records
    @wire(getDirectorRecords)
    wiredDirectors({ data, error }) {
        if (data) {
            this.data = data.map(record => ({ ...record, isNew: false }));
        } else if (error) {
            console.error('Error fetching directors:', error);
        }
    }

    // ✅ Fetch picklist values from Apex
    @wire(getPicklistValues)
    wiredPicklists({ data, error }) {
        if (data) {
            this.picklistOptions = data;
        } else if (error) {
            console.error('Error fetching picklist values:', error);
        }
    }

    // ✅ Add new row
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

    // ✅ Handle input/combobox changes
    handleInputChange(event) {
        const field = event.target.name;
        const recordId = event.target.dataset.id;
        const value = event.detail.value || event.target.value;

        this.data = this.data.map(item =>
            item.Id === recordId ? { ...item, [field]: value } : item
        );
    }

    // ✅ Save new record to server
    async saveRecord() {
        const newRecord = this.data.find(item => item.isNew === true);
        if (!newRecord) {
            this.showToast('Info', 'No new record to save.', 'info');
            return;
        }

        const recordToSave = {
            Name: newRecord.Name,
            Name_ID__c: newRecord.Name_ID__c,
            Address__c: newRecord.Address__c,
            Relationship__c: newRecord.Relationship__c,
            Share_structure__c: newRecord.Share_structure__c,
            Account_Role__c: newRecord.Account_Role__c,
            Status__c: newRecord.Status__c
        };

        try {
            const result = await saveDirectorRecord({ newDirector: recordToSave });
            this.showToast('Success', `Record saved successfully!`, 'success');

            // Replace temporary row with saved record
            this.data = this.data.map(item =>
                item.Id === newRecord.Id ? { ...result, isNew: false } : item
            );
        } catch (error) {
            console.error('Save failed:', error);
            this.showToast('Error', 'Failed to save record', 'error');
        }
    }

    // ✅ Reusable toast helper
    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }

    // ✅ Utility to convert Apex picklist list → combobox options
    getOptions(fieldName) {
        if (!this.picklistOptions[fieldName]) return [];
        return this.picklistOptions[fieldName].map(value => ({ label: value, value }));
    }

    // ✅ Computed getters for template binding (no function calls in HTML)
    get relationshipOptions() {
        return this.getOptions('Relationship__c');
    }

    get shareStructureOptions() {
        return this.getOptions('Share_structure__c');
    }

    get accountRoleOptions() {
        return this.getOptions('Account_Role__c');
    }

    get statusOptions() {
        return this.getOptions('Status__c');
    }
}
