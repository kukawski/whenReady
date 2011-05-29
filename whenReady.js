/*
Copyright (c) 2011 Rafał Kukawski <rafal@kukawski.pl>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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