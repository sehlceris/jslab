
# learning cheat sheet

## javascript/programming concepts

### read
https://frontendmasters.com/books/front-end-handbook/2017/

### es2015 (es6)

after es6, all es editions will be postfixed by the year. es6 is the old name for es2015
the best site to learn es6 is [Babel](https://babeljs.io/learn-es2015/#ecmascript-2015-features-arrows-and-lexical-this)

#### arrows and lexical this

Arrow functions provide shorthand for functions. Unlike regular functions, arrows share the same lexical this as their surrounding code. If an arrow is inside another function, it shares the “arguments” variable of its parent function.

There are several ways to write arrows:

```js
[1,2,3] === [0,1,2].map(v => v+1); //one-liners with no brackets automatically return their expression. single argument functions don't need to surround with parenthesis
[1,2,3] === [0,1,2].map((v) => { return v+1 } ); //equivalent, longer version of the above
```

Arrows have a different concept of `this` vs regular functions:

```js
this.x = 'hello';

let arrowFunc = () => {
  return this.x; // this accesses the "this" from the surrounding code ('hello')
}

let regularFunc = function() {
  return this.x // this does NOT access the "this" froum the surrounding code - this.x is null!
}
```

#### classes

ES2015 classes are a simple sugar over the prototype-based OO pattern. Having a single convenient declarative form makes class patterns easier to use, and encourages interoperability. Classes support prototype-based inheritance, super calls, instance and static methods and constructors.

There are 3 ways to define a class:

```js
// define a class using an"unnamed class expression"
var Thing = class {
  ...
}

// define a class using a "named class expression" (name is accessible within the class)
var Thing = class Thing {
  ...
}

// define a class using a "class declaration"
class Thing {
  ...
}
```

The `extends` keyword is used in class declarations or class expressions to create a class as a child of another class.

```js
// subclassing an existing class
class Point extends Thing {

  // classes can have constructors
  constructor(x, y) {
    super(x,y); // call super() if you are subclassing and need to access the parent's constructor
    this.x = x;
    this.y = y;
  }

  // static functions are called like Point.distance()
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }

  // instance functions are called like new Point().test();
  test() {
    super.test(); // call super() if you are subclassing and want to access the parent's behavior
    console.log('test 2!');
  }
}
```

One may also extend traditional function-based "classes":

```js
function Animal (name) {
  this.name = name;  
}

Animal.prototype.speak = function () {
  console.log(this.name + ' makes a noise.');
}

// classes
class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}

var d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
```

Note that classes cannot extend regular (non-constructible) objects. If you want to inherit from a regular object, you can instead use Object.setPrototypeOf():

```js
var Animal = {
  speak() {
    console.log(this.name + ' makes a noise.');
  }
};

class Dog {
  constructor(name) {
    this.name = name;
  }
}

Object.setPrototypeOf(Dog.prototype, Animal);// If you do not do this you will get a TypeError when you invoke speak

var d = new Dog('Mitzie');
d.speak(); // Mitzie makes a noise.
```

Also note that classes can serve as the prototypes of other objects. The one caveat is that you cannot invoke the constructor using the super() call. A workaround exists:

```js
(function() {

class Animal {
    constructor(name) {
        this.init(name);
    }

    init(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

let a = new Animal('whatever');

let Dog = function(name) {
    // the following is invalid code:
    // a.__proto__.constructor.call'name);
    // Animal.prototype.constructor.call(name);
    Animal.prototype.init.call(this, name);
};
Dog.prototype = Object.create(a);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() {
    console.log(this.getName() + ' barks!');
}
let d = new Dog('Fido');
console.log(d.bark());

}());
```

#### enhanced object literals

Objects can be defined with some extra sugary syntax:

```js
let i = 0;
let handler = function() {};

let parent = {
    hello: 'world'
}

let obj = {
    // Sets the prototype. "__proto__" or '__proto__' would also work.
    __proto__: parent,

    // Computed property names: this will create obj.foo1, obj.foo2, obj.foo3
    ['foo' + i++]: i,
    ['foo' + i++]: i,
    ['foo' + i++]: i,

    // Computed property name does not set prototype or trigger early error for duplicate __proto__ properties.
    // ['__proto__']: 'somethingElse',

    // Shorthand for ‘handler: handler’
    handler,

    // Methods
    toString() {
      // Super calls
      return "d " + super.toString();
    }
}
```

#### template strings

```js

let getStr = function() {
  return 'ecmascript version';
};

//es5
console.log('hello ' + getStr() + ' 5');

//es6
console.log(`hello ${getStr()} 6`);

```

#### destructuring

Destructuring allows binding using pattern matching, with support for matching arrays and objects. Destructuring is fail-soft, similar to standard object lookup foo["bar"], producing undefined values when not found.

```js
// list matching
let [a, ,b] = [1,2,3];
a === 1;
b === 3;

// object matching. notice that the variable being assigned comes after the variable being read
let {first: a, second: b} = (function(){ return {first: 1, second: 2}; }());
console.log(`a: ${a} b: ${b}`);

//object matching shorthand - for when the return values match your variable names
let {c, d, e} = function(){ return {c: 1, e: 3}; }();
console.log(`c: ${c} d: ${d}, e: ${e}`); // c: 1 d: undefined, e: 3

//if you use destructuring assignment for values that are already defined, you must use parenthesis:
let z;
({z} = {z:1});

// object matching can be used in parameter position
function g({name: x}) {
  console.log(x);
}
g({name: 5})

// fail-soft destructuring
var [a] = [];
a === undefined;

// fail-soft destructuring with defaults
var [a = 1] = [];
a === 1;

// destructuring + defaults arguments
function r({x, y, w = 10, h = 10}) {
  return x + y + w + h;
}
r({x:1, y:2}) === 23

```

#### Functions: Argument Defaults

You can specify defaults to arguments:

```js
function f(x, y=12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
f(3) == 15
```

#### Functions: Bind Trailing Arguments into an Array

```js
function f(x, ...y) {
  // y is an Array
  return x * y.length;
}
f(3, "hello", true) == 6
```
#### Functions: Spreading Elements of an Array as Arguments

```js
function f(x, y, z) {
  return x + y + z;
}
// Pass each elem of array as argument
f(...[1,2,3]) == 6
```

#### Let + Const

Block-scoped binding constructs. `let` is the new `var`. `const` is
single-assignment. Static restrictions prevent use before assignment.


```js
function f() {
  {
    let x;
    {
      // this is ok since it's a block scoped name
      const x = "sneaky";
      // error, was just defined with `const` above
      x = "foo";
    }
    // this is ok since it was declared with `let`
    x = "bar";
    // error, already declared above in this block
    let x = "inner";
  }
}
```

#### iterators, generators, and for of

Iterators are special objects that possess a next() function, which returns an object with next value in the sequence, as well a boolean detailing whether the sequence is done.
The following code demonstrates getting an iterator for the fibonacci sequence, and logging the sequence 0-89;

```js
let getFibIteratorTo100 = function() {
  let pre = 0, cur = 1;
  return {
    next() {
      [pre, cur] = [cur, pre + cur];
      return { done: cur > 100, value: cur }
    }
  }
}

let f = getFibIteratorTo100();
let value;
let done = false;
do {
    [value, done] = f.next();
    console.log(`fib: ${current}`);
}
while (!done);
```

generator functions add some extra sugar on top of iterators, using `function*` and `yield` keywords:

```js
let getFibIterator = function*() {
  let pre = 0, cur = 1;
  while(true) {
    var temp = pre;
    pre = cur;
    cur += temp;
    yield cur;
  }
}
```

Iterator functions may be assigned to objects via the `[Symbol.iterator]` property, making them enumerable

```
let fibonacci = {
  [Symbol.iterator]: function*() {
    let pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}
```

once created, iterators can be iterated through using `for of`:

```js
for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}
```

#### Map

Holds stuff. Better than using an Object because you can use Functions and Objects as keys

```js
// Maps
var m = new Map();
var x = function() { console.log('wtf?') };
m.set("hello", 42);
m.set(x, 34);
m.get(x) == 34;

//m.entries returns an iterator, you can go over it using 'for of'
for(let entry of m.entries()) {
  let key = entry[0];
  let value = entry[1];
  console.log(`FOR OF k=${key} v=${value}`);
}

//you can also iterate using forEach
m.forEach(function(value, key, map) {
  console.log(`FOR EACH k=${key} v=${value}`);
})
```

#### Set

Holds stuff. Stuff must be unique. Dupes are merged. You can stick in Functions and Objects

```js
// Sets
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;

//s.entries returns an iterator, you can go over it using 'for of'
for(let entry of s.entries()) {
  let key = entry[0]; //entry[1] is the same as entry[0], to keep with the same style as Map's iterator
  console.log(`FOR OF k=${key}`);
}

//you can also iterate using forEach
s.forEach(function(value, value2, set) {
  console.log(`FOR EACH v=${value}`);
})
```


#### WeakMap

WeakMaps provides leak-free object-key’d side tables.

```js
let wm = new WeakMap();

var obj = {}; //this is the object we'll be using as our 'key'

wm.set(obj, 'extradata');

//verify that the weakmap holds our data
console.log(`wm: ${wm.get(obj)}`); //'extradata'

//set obj to null. now that there are no more references to 'obj', it will be garbage collected and disappear from our WeakMap
obj = null
console.log(`wm: ${wm.get(obj)}`); //'undefined'
```


#### WeakSet

WeakSets let you hold weakly-referenced objects in the set. If all other references to the objects are removed, then the objects are removed from the WeakSet as well.
This is useful to prevent memory leaks.

```
let a = {a:'a'};

let s = new WeakSet();
s.add(a);
let setHasA1 = s.has(a);

a = null; //because we removed the only strong reference to 'a', it is garbage collected
let setHasA2 = s.has(a);

console.log(`first setHasA: ${setHasA1}, second setHasA: ${setHasA2}`) // first setHasA: true, second setHasA: false
```

#### Proxies

Proxies enable creation of objects with the full range of behaviors available to host objects. Can be used for interception, object virtualization, logging/profiling, etc.

```js
// Proxying a normal object
var target = {};
var handler = {
  get: function (receiver, name) {
    return `Hello, ${name}!`;
  }
};

var p = new Proxy(target, handler);
p.world === "Hello, world!";
```

```js
// Proxying a function object
var target = function () { return "I am the target"; };
var handler = {
  apply: function (receiver, ...args) {
    return "I am the proxy";
  }
};

var p = new Proxy(target, handler);
p() === "I am the proxy";
```

There are traps available for all of the runtime-level meta-operations:

```js
var handler =
{
  // target.prop
  get: ...,
  // target.prop = value
  set: ...,
  // 'prop' in target
  has: ...,
  // delete target.prop
  deleteProperty: ...,
  // target(...args)
  apply: ...,
  // new target(...args)
  construct: ...,
  // Object.getOwnPropertyDescriptor(target, 'prop')
  getOwnPropertyDescriptor: ...,
  // Object.defineProperty(target, 'prop', descriptor)
  defineProperty: ...,
  // Object.getPrototypeOf(target), Reflect.getPrototypeOf(target),
  // target.__proto__, object.isPrototypeOf(target), object instanceof target
  getPrototypeOf: ...,
  // Object.setPrototypeOf(target), Reflect.setPrototypeOf(target)
  setPrototypeOf: ...,
  // for (let i in target) {}
  enumerate: ...,
  // Object.keys(target)
  ownKeys: ...,
  // Object.preventExtensions(target)
  preventExtensions: ...,
  // Object.isExtensible(target)
  isExtensible :...
}
```

#### Reflection

Reflect is a built-in object that provides methods for interceptable JavaScript operations. The methods are the same as those of proxy handlers.

* `Reflect.apply()` Calls a target function with arguments as specified by the args parameter. See also Function.prototype.apply().
* `Reflect.construct()` The `new` operator as a function. Equivalent to calling `new target(...args)`.
* `Reflect.defineProperty()` Similar to `Object.defineProperty()`. Returns a Boolean.
* `Reflect.deleteProperty()` The `delete` operator as a function. Equivalent to calling `delete target[name]`.
* `Reflect.get()` A function that returns the value of properties.
* `Reflect.getOwnPropertyDescriptor()` Similar to `Object.getOwnPropertyDescriptor()`. Returns a property descriptor of the given property if it exists on the object,  undefined otherwise.
* `Reflect.getPrototypeOf()` Same as `Object.getPrototypeOf()`.
* `Reflect.has()` The `in` operator as function. Returns a boolean indicating whether an own or inherited property exists.
* `Reflect.isExtensible()` Same as `Object.isExtensible()`.
* `Reflect.ownKeys()` Returns an array of the target object's own (not inherited) property keys.
* `Reflect.preventExtensions()` Similar to `Object.preventExtensions()`. Returns a Boolean.
* `Reflect.set()` A function that assigns values to properties. Returns a Boolean that is true if the update was successful.
* `Reflect.setPrototypeOf()` A function that sets the prototype of an object. 

You can use this to reimplement things intercepted by proxies:

```js
var handler = {
  get (receiver, name) {
    console.log(`someone tried to get ${name} on ${receiver}`);
    return Reflect.get(...arguments)
  }
}
var target = { a: 'b' }
var proxy = new Proxy(target, handler)
proxy.hello //logs 'someone tried to get hello on [object Object]'
```

#### Typed Arrays

Typed arrays allow access to and manipulation of binary data.

```js
let uint8Array = new Uint8Array(4)

uint8Array[0] = 1
uint8Array[1] = 2
uint8Array[2] = 256
uint8Array[3] = 1

let view = new DataView(uint8Array.buffer)

let uint8ArrayConvertedToRegularArray = [...uint8Array]
console.log(`uint8ArrayConvertedToRegularArray: ${uint8ArrayConvertedToRegularArray}`) // [1,2,0]

console.log(`view.getUint8(1): ${view.getUint8(1)}`) // 2
console.log(`view.getUint8(2): ${view.getUint8(2)}`) // 0, because it overflowed

uint8Array[0] = 1
uint8Array[1] = 1
uint8Array[2] = 2
uint8Array[3] = 2

console.log(`view.getUint16(0): ${view.getUint16(0)}`) // 257, reading the first byte as "256" plus the second byte, "1"
console.log(`view.getUint16(2): ${view.getUint16(2)}`) // 514, reading the thirs byte as "512" plus the fourth byte, "2"
```

#### Internationalization & Localization

TODO

#### Symbols

Symbols enable access control for object state. Symbols allow properties to be keyed by either string (as in ES5) or symbol. Symbols are a new primitive type. Optional name parameter used in debugging - but is not part of identity. Symbols are unique (like gensym), but not private since they are exposed via reflection features like Object.getOwnPropertySymbols.

```js
(function() {

  // module scoped symbol
  var key = Symbol("key");

  function MyClass(privateData) {
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
      ... this[key] ...
    }
  };

  // Limited support from Babel, full support requires native implementation.
  typeof key === "symbol"
})();

var c = new MyClass("hello")
c["key"] === undefined
```

#### Math + Number + String + Object APIs

Many new library additions, including core Math libraries, Array conversion helpers, and Object.assign for copying.

```js

// Number.EPSILON: represents the difference between 1 and the smallest floating point number greater than 1
Number.EPSILON
Math.abs(0.1 + 0.2 - 0.3) === 0 // false
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON // true

Number.isInteger(Infinity) // false
Number.isNaN("NaN") // false
Number.isFinite(Infinity) === false;

// truncate: lop off the decimal portion
Math.trunc(42.7) // 42 
Math.trunc(0.1) // 0

// sign: 
Math.sign(7)  // 1 
Math.sign(0)  // 0 
Math.sign(-0)  // -0 
Math.sign(-7)  // -1 
Math.sign(NaN) // NaN

//safe integer: returns whether or not the given integer is small enough to be properly represented in JavaScript
Number.isSafeInteger(42) === true;
Number.isSafeInteger(3.1) === false
Number.isSafeInteger(9007199254740992) === false; // too large to be properly represented in JavaScript

Math.acosh(3) // 1.762747174039086
Math.hypot(3, 4) // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2) // 2

// new string functions
"abc".repeat(3) // "abcabcabc"
"hello".startsWith("ello", 1); // true 
"hello".endsWith("hell", 4);  // true 
"hello".includes("ell");  // true 
"hello".includes("ell", 1);  // true 
"hello".includes("ell", 2);  // false

//new array functions
Array.from(document.querySelectorAll("*")) // Returns a real Array
Array.of(1, 2, 3) // Similar to new Array(...). The difference between Array.of() and the Array constructor is in the handling of integer arguments: Array.of(7) creates an array with a single element, 7, whereas Array(7) creates an empty array with a length property of 7 
[0, 0, 0].fill(7, 1) // [0,7,7]
[1,2,3].findIndex(x => x == 2) // 1
["a", "b", "c"].entries() // iterator [0, "a"], [1,"b"], [2,"c"]
["a", "b", "c"].keys() // iterator 0, 1, 2
["a", "b", "c"].values() // iterator "a", "b", "c"

//Object.assign: copies values from source objects to target objects, overwriting existing properties. Overwriting occurs right to left; the last source object has the highest priority
var targetObj = {
  a: 0
};
var sourceObj1 = {
  a: 1,
  b: true
}
var sourceObj2 = {
  a: 2,
  c: true
}
Object.assign(targetObj, sourceObj1, sourceObj2);
targetObj === {a: 2, b: true, c: true}
```

#### Promises

Promises are a library for asynchronous programming. Promises are a first class representation of a value that may be made available in the future. Promises are used in many existing JavaScript libraries.

```js
function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

var p = timeout(1000).then(() => {
    return timeout(2000);
}).then(() => {
    throw new Error("hmm");
}).catch(err => {
    return Promise.all([timeout(100), timeout(200)]);
})
```


### es2016

#### Array.prototype.includes

```js
['a', 'b', 'c'].includes('a') === true
```

`includes()` finds `NaN`, whereas `indexOf()` does not.

#### exponentiation operator

```js
let pow = 2 ** 4 // 2 to the 4th power, equivalent to Math.pow(2, 4)
pow === 16
```

### es2017 (es8)

#### async/await

Previously accomplished using generators, async functions are now part of native JS.
Async functions are able to `await` Promises, pausing execution until they resolve. If the Promise rejects, it is treated as an exception.

```js
async function fetchJson(url) {
    try {
        let request = await fetch(url);
        let text = await request.text();
        return JSON.parse(text);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}
```

#### shared memory and atomics



### browser-specific

#### AppCache

*NOTE: The AppCache functionality is old and should be replaced by service workers.*

#### web workers / service workers

Web Workers run in an isolated thread. As a result, the code that they execute needs to be contained in a separate file. But before we do that, the first thing to do is create a new Worker object in your main page. The constructor takes the name of the worker script:

```js
var worker = new Worker('task.js');
```

If the specified file exists, the browser will spawn a new worker thread, which is downloaded asynchronously. The worker will not begin until the file has completely downloaded and executed. If the path to your worker returns an 404, the worker will fail silently.

After creating the worker, start it by calling the postMessage() method:

```js
worker.postMessage(); // Start the worker.
```

TODO

#### fetch API

TODO

### prototypal inheritance

#### constructor

Constructors are special functions that instantiate objects.

All objects will have a constructor property.  Objects created without the explicit use of a constructor function (i.e. the object and array literals) will have a constructor property that points to the Fundamental Object constructor type for that object.

```js
var Tree = function(name) {
  this.name = name;
}

var theTree = new Tree('Redwood');
theTree.constructor === Tree;
```

Constructors are just functions with a special purpose. The following code is equivalent to using the `new` keyword:
```js
//var o = new Tree('Redwood');

var o = new Object();
o.prototype = Tree.prototype;
Tree.call(o, 'Redwood');
```

#### prototypes

Inheritance is achieved using prototypes - special objects that contain the behavior to be inherited (every object has a `.prototype` property).

```js
var Parent = function() {
    this.name = "parent";
};
Parent.prototype.b = 3;
Parent.prototype.c = 4;

var Child = function() {
    this.name = "child";
}

//one way to copy a prototype is to use a parent's prototype
Child.prototype = Object.create(Parent.prototype, {a: 1, b: 2});

//another way to copy a prototype is to use an instance of the parent (but this may incur side-effects, for example from the constructor function
//Child.prototype = Object.create(new Parent(), {a: 1, b: 2});

var o = new Child();

console.log(o.a); // 1
console.log(o.b); // 2
console.log(o.c); // 4
console.log(o.name);
```

Children may inherit behavior from more than 1 parent, by picking and choosing values from their prototypes;

```js
var Parent1 = function() {};
Parent1.prototype.a = 1;

var Parent2 = function() {};
Parent2.prototype.b = 2;

var Child = function() {}
Child.prototype = {
    a: Parent1.prototype.a,
    b: Parent2.prototype.b,
}

var o = new Child();

console.log(o.a); // 1
console.log(o.b); // 2
```

Multiple inheritance is possible through mixins using `Object.assign(subclass, superclass)`

```js
var Dispatcher = function() {
    this.listeners = [];
};
Dispatcher.prototype.listen = function(fn) {
    this.listeners.push(fn);
};
Dispatcher.prototype.dispatch = function(evt) {
    this.listeners.forEach( (fn) => { fn(evt); } );
};

var Animal = function(sound) {
    this.sound = sound;
};
Animal.prototype.getSound = function() {
    return this.sound;
};

var DispatcherAnimal = function(sound) {
    Animal.call(this, sound); //call constructor of first superclass
    Dispatcher.call(this); //call constructor of second superclass
};

DispatcherAnimal.prototype = Object.create(Dispatcher.prototype); //inherit from first superclass
Object.assign(DispatcherAnimal.prototype, Animal.prototype); //inherit (mixin) from second superclass)

DispatcherAnimal.prototype.work = function() {
    var sound = this.getSound();
    this.dispatch(sound);
};

var d = new DispatcherAnimal('woof');
d.listen(function(sound) {
    console.log('DispatcherAnimal speaks: ' + sound);
});
d.work();
```

About Object and Object.prototype:

1. The function, Object, has a property, called .prototype, which points to an object (Object.prototype)
1. The object, Object.prototype, has a property, called .constructor, which points to a function (Object)

This general scheme is true for all functions in JavaScript. When you create a function `someFunction` it will have a property, `.prototype`, that points to an object, called `someFunction.prototype`.

`someFunction.prototype` will have a property, called `.constructor`, which points back to the function `someFunction`.

```js
function foo () {  console.log('Foo!');  }

console.log(foo.prototype); // Points to an object called 'foo'
console.log(foo.prototype.constructor); // Points to the function, 'foo'

foo.prototype.constructor(); // Prints 'Foo!' -- just proving that 'foo.prototype.constructor' does, in fact, point to our original function
```

Multiple inheritance using ES6 classes is dicey, the best I can figure is to not use a constructor to init and instead have an `init` function:

```js
class Animal {
    constructor(name) {
        this.init(name);
    }

    init(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

let a = new Animal('whatever');

let Dog = function(name) {
    Animal.prototype.init(name);
};
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() {
    console.log(this.getName() + ' barks!');
}
let d = new Dog('Fido');
console.log(d.bark());
```

#### Object.getPrototypeOf() vs __proto__ vs Object.prototype

`__proto__` is present on all objects and represents a link to the object's prototype.

`Function.prototype` is a property of Functions and represents the prototype that gets assigned to objects created by calling `new myFunction()`. Objects created using `new myFunction()` do *not* have a `obj.prototype` property, they have a `obj.__proto__` property.

`Object.getPrototypeOf(obj)` is a cross-browser, standard way of getting the `__proto__` of an object. Never actually try to get the prototype of an object using `obj.__proto__`. Use `Object.getPrototypeOf(obj)`.

```js
  var Foo = function() {};
  Foo.prototype.test = 'test';
  var f = new Foo();

  console.log(`Foo.prototype: ${Foo.prototype}`); //Foo.prototype
  console.log(`f.prototype: ${f.prototype}`); //undefined
  
  console.log(`Object.getPrototypeOf(Foo): ${Object.getPrototypeOf(Foo)}`); //Function.prototype
  console.log(`Object.getPrototypeOf(f): ${Object.getPrototypeOf(f)}`); //Foo.prototype
```

### other javascript basics and gotchas

#### forEach vs "let key in obj"

forEach will loop through the values in an array

```js
var arr = ['a','b','c'];
arr.forEach(function(thing) {console.log(thing)}); //a b c
```

let key in obj loops through the keys in an object, NOT the values

```js
for (let i in arr) {
    console.log(`${i}=${arr[i]}`); //0=1 1=b 2=c
}

var obj = {
    a: 1,
    b: 2,
    c: 3
}

for (let key in obj) {
    console.log(`k=${key},v=${obj[key]}`); //k=a,v=1 k=b,v=2 k=c,v=3
}
```

TODO : for of

### functional programming

TODO

### reactive programming and streams

TODO

### test driven development

TODO

## javascript module formats

TODO

### esm
### cjs
### amd
### global
### umd
### system

## javascript tools and frameworks

TODO

### typescript
### babel
### webpack
### rxjs
### system.js
### react / react native
### angular 4
### meteor

### docker

TODO

## scalable deployment

TODO
