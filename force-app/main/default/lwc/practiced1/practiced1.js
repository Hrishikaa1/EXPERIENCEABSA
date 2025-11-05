import { LightningElement } from 'lwc';

export default class Practiced1 extends LightningElement {
    shouldBeResolve = true;

    createPromise() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.shouldBeResolve) {
                    resolve('success!');
                } else {
                    reject('failed!');
                }
            }, 1000);
        });
    }

    thenCatchApproach() {
        this.createPromise()
            .then((result) => {
                console.log(`thenCatchApproach result => ${result}.`);
            })
            .catch((error) => {
                console.log(`thenCatchApproach error => ${error}.`);
            })
            .finally(() => {
                console.log('thenCatchApproach done.');
            });
    }

    async asyncAwaitApproach() {
        try {
            const result = await this.createPromise();
            console.log(`asyncAwaitApproach result => ${result}.`);
        } catch (error) {
            console.error(error);
            console.log(`asyncAwaitApproach error => ${error}.`);
        } finally {
            console.log('asyncAwaitApproach done.');
        }
    }

    connectedCallback() {
        // success
        this.shouldBeResolve = true;

        this.thenCatchApproach();
        this.asyncAwaitApproach();

        // error
        // this.shouldBeResolve = false;

        // this.thenCatchApproach();
        // this.asyncAwaitApproach();
    }
}