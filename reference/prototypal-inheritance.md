# prototypal inheritance

## constructor

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

## prototypes

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

## Object.getPrototypeOf() vs __proto__ vs Object.prototype

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