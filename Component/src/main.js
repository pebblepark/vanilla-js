import App from './App.js';

import Publish from './store/Publish.js';
import Subscriber from './store/Subscriber.js';

new App(document.querySelector('#app'));

// Store 생성
const store = new Publish({
  a: 10,
  b: 20,
});

// 컴포넌트 생성
const AddCalculator = new Subscriber(() =>
  console.log(`a+b=${store.a + store.b}`)
);
const MutiplyCalculator = new Subscriber(() =>
  console.log(`a*b=${store.a * store.b}`)
);

// 컴포넌트가 store 구독
AddCalculator.subscribe(store);
MutiplyCalculator.subscribe(store);

// store의 state 변경
store.setState({
  a: 100,
  b: 200,
});

// store가 변경됨을 알림
store.notify();
