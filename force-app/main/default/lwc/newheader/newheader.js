import { LightningElement, api } from 'lwc';
import ABSA_LOGO from '@salesforce/resourceUrl/ABSA_LOGO';

export default class HeaderComponent extends LightningElement {
    logoUrl = ABSA_LOGO;

    // Optional: make heading configurable from Aura or Experience Builder
    @api headerText = 'Ultimate Banking';
}