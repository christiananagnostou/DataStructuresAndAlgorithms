/**
 * The Module Pattern
 *
 * The module pattern was originally defined as a way to provide both private and public
 * encapsulation for classes in conventional software engineering.
 *
 * In JavaScript, the module pattern is used to further emulate the concept of classes
 * in such a way that we're able to include both public/private methods and variables
 * inside a single object, thus shielding particular parts from the global scope. What this
 * results in is a reduction in the likelihood of your function names conflicting with other
 * functions defined in additional scripts on the page.
 *
 */
var namespace = (function () {
  // private attributes
  var privateVar = 5;

  // private methods
  var privateMethod = function () {
    return "Private Test";
  };

  return {
    // public attributes
    publicVar: 10,

    // public methods
    publicMethod: function () {
      return "Followed By Public Test ";
    },

    getData: function () {
      return privateMethod() + this.publicMethod() + privateVar + this.publicVar;
    },
  };
})(); // the parens here cause the anonymous function to execute and return

console.log(namespace.getData()); // Private TestFollowed By Public Test 510

/**
 * NOTE:
 *
 * Notice the use of the 'this' keyword when accessing
 * other public variables/methods within the return object;
 *
 */

/**
 * Revealing Module Pattern
 *
 * Revealing Module Pattern allows the syntax of your script to be consistent.
 * It also makes it very clear at the end which of your functions and variables may be
 * accessed publicly, something that is quite useful. In addition, you are also able to
 * reveal private functions with more specific names if you wish.
 *
 */

var myRevealingModule = (function () {
  var name = "John Smith";

  var age = 40;

  function updatePerson() {
    name = "John Smith Updated";
  }

  function setPerson() {
    name = "John Smith Set";
  }

  function getPerson() {
    return name;
  }

  return {
    set: setPerson,
    get: getPerson,
  };
})();

myRevealingModule.get();
