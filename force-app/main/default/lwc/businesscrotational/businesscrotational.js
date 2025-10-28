import { LightningElement } from 'lwc';

export default class Businessrotational extends LightningElement {
    companies = [
    { id: 1, name: 'Apex Solutions', initials: 'AS', color: '#eb15d2' },
    { id: 2, name: 'BlueWave Corp', initials: 'BC', color: '#00a1e0' },
    { id: 3, name: 'CloudNexus', initials: 'CN', color: '#6a0dad' },
    { id: 4, name: 'DataHaven Ltd', initials: 'DL', color: '#ff7043' },
    { id: 5, name: 'EdgeMatrix', initials: 'EM', color: '#26a69a' },
    { id: 6, name: 'FusionTech', initials: 'FT', color: '#e91e63' },
    { id: 7, name: 'GrowWell Inc', initials: 'GI', color: '#8bc34a' },
    { id: 8, name: 'HyperWorks', initials: 'HW', color: '#9c27b0' },
    { id: 9, name: 'InnovaX', initials: 'IX', color: '#009688' },
    { id: 10, name: 'JetLink Systems', initials: 'JS', color: '#fbc02d' }
];

// In your getter
get loopedCompanies() {
    return [...this.companies, ...this.companies].map((c, i) => ({
        ...c,
        uniqueId: i,
        circleStyle: `background-color: ${c.color};`
    }));
}


    currentIndex = 0;
    intervalId;

    connectedCallback() {
        this.startAutoSlide();
    }

    disconnectedCallback() {
        clearInterval(this.intervalId);
    }

    startAutoSlide() {
        this.intervalId = setInterval(() => {
            this.nextSlide();
        }, 3000);
    }

    nextSlide() {
        this.currentIndex++;
        // Smooth reset when halfway through (since we doubled list)
        if (this.currentIndex >= this.companies.length) {
            this.currentIndex = 0;
        }
    }

    get carouselStyle() {
        const translateX = -(this.currentIndex * 230); // move width per card
        return `
            transform: translateX(${translateX}px);
            transition: transform 0.6s ease-in-out;
            display: flex;
            width: ${this.companies.length * 2 * 230}px;
        `;
    }
}