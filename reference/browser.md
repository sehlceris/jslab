# browser-specific APIs

## web workers / service workers

Web Workers run in an isolated thread. As a result, the code that they execute needs to be contained in a separate file. But before we do that, the first thing to do is create a new Worker object in your main page. The constructor takes the name of the worker script:

```js
var worker = new Worker('task.js');
```

If the specified file exists, the browser will spawn a new worker thread, which is downloaded asynchronously. The worker will not begin until the file has completely downloaded and executed. If the path to your worker returns an 404, the worker will fail silently.

After creating the worker, start it by calling the postMessage() method:

```js
worker.postMessage(); // Start the worker.
```

```js
// TODO: More web worker studies
```

## fetch API

```js
// TODO: Fetch API studies
```