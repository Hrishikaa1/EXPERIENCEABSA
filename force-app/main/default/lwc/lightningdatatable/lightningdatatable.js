import { LightningElement, wire, track } from 'lwc';
import getDirectorRecords from '@salesforce/apex/DirectorController.getDirectorRecords';

export default class DirectorTable extends LightningElement {
    @track data = [];
    
    // Dropdown options
    relationshipOptions = [
        { label: 'Director', value: 'Director' },
        { label: 'Shareholder', value: 'Shareholder' },
        { label: 'Both', value: 'Both' }
    ];

    shareOptions = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
    ];

    roleOptions = [
        { label: 'Role 1', value: 'role1' },
        { label: 'Role 2', value: 'role2' }
    ];

    @wire(getDirectorRecords)
    wiredDirectors({ data, error }) {
        if (data) {
            this.data = data.map(record => ({
                ...record,
                Id: record.Id
            }));
        } else if (error) {
            console.error('Error fetching directors:', error);
        }
    }

    handleBack() {
        // Navigate back logic
        console.log('Back button clicked');
    }

    handleSaveForLater() {
        // Save for later logic
        console.log('Save for later clicked');
    }
}