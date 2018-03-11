# rxjs reference

## What is the Difference Between a Subject and BehaviorSubject?

`Subject` is a `RxJS` class that behaves like an event bus. Subjects can be subscribed to like a regular observable.

```typescript
const s = new Subject();
s.next('hello');
s.subscribe(value => console.log(value));
s.next('world!');
// "world" is printed, but not "hello"
```

A `BehaviorSubject` is a subclass of `Subject` that, when subscribed to, emits the last value of that `BehaviorSubject`, which is more useful in many situations.


```typescript
const s = new BehaviorSubject();
s.next('hello');
s.subscribe(value => console.log(value));
s.next('world!');
// both "hello" and "world" are printed
// also, the BehaviorSubject also has a getValue() function to retrieve the last value of the stream:
console.log(s.getValue());
```


## What's the difference between a Hot and Cold Observable?

Cold observables start running upon subscription, i.e., the observable sequence only starts pushing values to the observers when Subscribe is called. Values are also not shared among subscribers - a separate processing chain is used for each subscriber. This means that cold observables such as HTTP calls may run twice if they have two subscribers.

```typescript
// the following code causes the HTTP request to be sent twice!
const request$ = this.httpClient.get(uri);
const subscription1 = request$.subscribe(res => console.log(res));
const subscription2 = request$.subscribe(res => console.log(res));
```

When an observer subscribes to a hot observable sequence, it will get all values in the stream that are emitted after it subscribes. The hot observable sequence is shared among all subscribers, and each subscriber is pushed the next value in the sequence. For example, even if no one has subscribed to a particular stock ticker, the ticker will continue to update its value based on market movement. When a subscriber registers interest in this ticker, it will automatically receive the next tick.

```typescript
// the following code causes the HTTP request to be turned into a hot observable, and thus is fired only once
const request$ = this.httpClient.get(uri).publishLast().refCount();
const subscription1 = request$.subscribe(res => console.log(res));
const subscription2 = request$.subscribe(res => console.log(res));
```
