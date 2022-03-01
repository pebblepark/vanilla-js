## Vanilla Javascript로 웹 컴포넌트 만들기
[Vanilla Javascript로 웹 컴포넌트 만들기 참고](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/#_1-%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC-%E1%84%80%E1%85%AE%E1%84%92%E1%85%A7%E1%86%AB)

## Vanilla Javascript로 상태관리 시스템 만들기
[Vanilla Javascript로 상태관리 시스템 만들기 참고](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Store/#_1-%E1%84%8C%E1%85%AE%E1%86%BC%E1%84%8B%E1%85%A1%E1%86%BC-%E1%84%8C%E1%85%B5%E1%86%B8%E1%84%8C%E1%85%AE%E1%86%BC%E1%84%89%E1%85%B5%E1%86%A8-%E1%84%89%E1%85%A1%E1%86%BC%E1%84%90%E1%85%A2%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5)

### Concept
중앙 집중식 저장소를 `Store`라고 한다면
- `Store`는 여러 개의 컴포넌트에서 사용될 수 있음
- `Store`가 변경될 때 `Store`가 사용되고 있는 `Component`도 변경되어야 함

### Observer Pattern 사용
- 객체의 상태 변화를 관찰하는 옵저버들의 목록을 객체에 등록
- 상태 변화가 있을 때마다 메서드 등을 통해 객체가 목록의 각 옵저버들에게 통지
- 주로 분산 이벤트 핸들링 시스템을 구현하는데 사용됨

```javascript
let currentObserver = null;

const observe = fn => {
  currentObserver = fn;
  fn();
  currentObserver = null;
}

const observable = obj => {
  Object.keys(obj).forEach(key => {
    let _value = obj[key];
    const observers = new Set();
    
    Object.defineProperty(obj, key, {
      get () {
        if(currentObserver) observers.add(currentObserver);
        return _value;
      },
      set (value) {
        _value = vaule;
        observers.forEach(fn => fn());
      }
    })
  })
  return obj;
}
```
- 함수가 실행될 때 `currentObserver`가 실행중인 함수를 참조
- `state`의 `property`를 사용할 때(=`get` 메소드 실행), `currentObserver`를 `observers`에 등록
- `state`의 `property`를 변경할 때(=`set` 메소드 실행), `observers`에 등록된 모든 `observer` 실행

**사용예시**
```javascript
const 상태 = observable({ a: 10, b: 20 });
observe(() => console.log(`a = ${상태.a}`));
observe(() => console.log(`b = ${상태.b}`));
observe(() => console.log(`a + b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a * b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a - b = ${상태.a} + ${상태.b}`));

상태.a = 100;
상태.b = 200;
```
