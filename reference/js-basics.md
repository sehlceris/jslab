# other javascript basics and gotchas

## forEach vs "let key in obj"

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