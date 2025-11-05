import { LightningElement } from 'lwc';

export default class Practiced1 extends LightningElement {
    let shouldBeResolve = true ; 

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
      if (shouldBeResolve) {
          resolve('success!');
      }

      reject('failed!');
  }, 1000);
});

// then/catch
const thenCatchApproach = () => {
  promise
    .then((result) => {
      console.log(`thenCatchApproach result => ${result}.`);
    })
    .catch((error) => {
      console.log(`thenCatchApproach error => ${error}.`);
    })
    .finally(() => {
      console.log('thenCatchApproach done.');
    })
}

// async/await
const asyncAwaitApproach = async () => {
  try {
    const result = await promise;
    console.log(`asyncAwaitApproach result => ${result}.`);
  } catch (error) {
    console.error(error);
    console.log(`asyncAwaitApproach error => ${error}.`);
  } finally {
    console.log('asyncAwaitApproach done.');
  }
}

// success
shouldBeResolve = true;

thenCatchApproach();
asyncAwaitApproach();

// error
// shouldBeResolve = false;

// thenCatchApproach();
// asyncAwaitApproach();
}