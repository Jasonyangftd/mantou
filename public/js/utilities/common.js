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
