(function(o) {
    var isReady = false,
        queue = [],
        w = window, d = document, handler;
    
    function ready () {
        if (!isReady) {
            isReady = true;
            dequeue();
        }
    }
    
    function dequeue () {
        var i = 0, fn;
        while (fn = queue[i++]) {
            fn.call(d);
        }
        queue = [];
    }
    
    if (d.addEventListener) {
        handler = function (event) {
            if (event.type !== 'readystatechange' || document.readyState === 'complete') {
                d.removeEventListener('DOMContentLoaded', handler, false);
                d.removeEventListener('readystatechange', handler, false);
                w.removeEventListener('load', handler, false);
                ready();
            }
        };
        d.addEventListener('DOMContentLoaded', handler, false);
        d.addEventListener('readystatechange', handler, false);
        w.addEventListener('load', handler, false);
    }
    
    if (d.attachEvent) {
        handler = function (event) {
            event = event || window.event;
            if (event.type !== 'readystatechange' || document.readyState === 'complete') {
                d.detachEvent('onreadystatechange', handler);
                w.detachEvent('onload', handler);
                ready();
            }
        };
        d.attachEvent('onreadystatechange', handler);
        w.attachEvent('onload', handler);
    }
    
    o.whenReady = function (callback) {
        if (isReady) {
            callback.call(d);
        } else {
            queue.push(callback);
        }
    }
}(this));