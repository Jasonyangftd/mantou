/* --- 

# Common #

A collection of commonly used helper functions.

--- */

// http://www.jspatterns.com/classical-inheritance/
function inherit(C, P) {
    // Clone P, but with an empty ctor, so we don't have to execute it when just defining a class.
    var F = function() {};
    F.prototype = P.prototype;
    
    // Set C's prototype to an uninitialized instance of P.
    C.prototype = new F();
    
    // Add convenience properties for getting to P's methods.
    // Use CurrentClass.uber.myMethod.call(this, foo, bar).
    Object.defineProperties(C, {
        uber: {
            get: function() { return P.prototype; },
            enumerable: false,
            configurable: false
        },
        uberConstructor: {
            get: function() { return P; },
            enumerable: false,
            configurable: false
        }
    });
    
    // Reset constructor, so instanceof doesn't show that instances of C are instances of P.
    C.prototype.constructor = C;
}

function extend(dst, src) {
    for (var i=1; i<arguments.length; i++) {
        var src = arguments[i];
        if (src instanceof Object) {
            for (var k in src) {
                dst[k] = src[k];
            }
        }
    }
    return dst;
}

// Deep extend
function deep(d, s) {
    for (var p in s) {
        if (d[p] instanceof Object && s[p] instanceof Object) {
            deep(d[p], s[p]);
        } else {
            d[p] = s[p];
        }
    }
}

/* ---

## clamp(a, b, x) ##

Limits the output of the input value `x` into the range `[a, b]`.

### Example ###

    clamp(0, 5,  6); // returns 5
    clamp(0, 5, -1); // returns 0
    clamp(0, 5,  3); // returns 3

--- */
function clamp(a, b, x) {
    return Math.max(a, Math.min(b, x));
}

/* ---

## lerp(a, b, t) ##

Linearly interpolates between values `a` and `b` given `t`
within the interval `[0, 1]`.

### Example ###

    lerp(10, 20, 0.5); // returns 15
    lerp(10, 20, 0.1); // returns 11
    lerp(10, 20, 0.0); // returns 10
    lerp(10, 20, 1.0); // returns 20

--- */
function lerp(a, b, t) {
    return a + clamp(0, 1, t) * (b - a);
}

/* ---

## map(a, b, c, d, x) ##

Maps a value `x` in range `[a, b]` proportionally into another
range `[c, d]`.

### Example ###

    map(0, 1,  0, 100, 0.5); // returns 50
    map(0, 1, 50, 100, 0.5); // returns 75
    map(0, 1, 50, 100, 0.0); // returns 50
    map(0, 1, 50, 100, 1.0); // returns 100
    
    // convert °F to °C given two known references:
    // _____|___°F__|___°C____|
    //  min | -40°F | -40°C   |
    //  max | 100°F | 37.78°C |
    function FtoC(f) {
        //         minF maxF minC maxC
        return map(-40, 100, -40, 37.78, f);
    }

--- */
function map(a, b, c, d, x) {
    return (x - a) / (b - a) * (d - c) + c;
}

/* ---

## step(a, x) ##

Returns `1` if `x` >= `a`, `0` otherwise.

### Example ###

    step(0,  -1); // returns 0
    step(0,   0); // returns 1
    step(0,   2); // returns 1
    step(10,  5); // returns 0
    step(10, 10); // returns 1
    step(10, 11); // returns 1

--- */
function step(a, x) {
    return x < a ? 0 : 1;
}
