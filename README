This small function tries to emulate `DOMContentLoaded` event in a cross-browser manner.

To use this function, just include the file in your document

```
<script type="text/javascript" src="whenReady.js"></script>
```

and call the function as many times you need

```
<script type="text/javascript">
whenReady(function () {
    console.log("1");
});

whenReady(function () {
    console.log("2");
});

setTimeout(function () {
    whenReady(function () {
        console.log("3");
    });
}, 15000);
</script>
```

The function assures all the callbacks are called when the document is ready, in the order they were registered. If you call `whenReady` after the document has loaded, the callback is called immediately.
Just make sure, none of the callbacks throws errors, because the function will stop calling remaining callbacks.
