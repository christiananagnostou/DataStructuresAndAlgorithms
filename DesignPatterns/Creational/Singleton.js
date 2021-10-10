/**
 * The Singleton Pattern
 *
 * In conventional software engineering, the singleton pattern can be implemented by creating a class with
 * a method that creates a new instance of the class if one doesn't exist. In the event of an instance
 * already existing, it simply returns a reference to that object.
 *
 */

var mySingleton = function () {
  // private methods and variables are defined in the function closure
  var privateVariable = "something private";

  function showPrivate() {
    console.log(privateVariable);
  }

  // public variables and methods are defined in the return object and can access private variables and methods
  return {
    publicMethod: function () {
      showPrivate();
    },
    publicVar: "the public can see this!",
  };
};

var single = mySingleton();

single.publicMethod(); // something private
console.log(single.publicVar); // the public can see this!

/**
 *
 * NOTE:
 * The above example is great, but let's next consider a situation where you only want
 * to instantiate the singleton when it's needed. To save on resources, you can place
 * the instantiation code inside another constructor function as follows:
 *
 */

var Singleton = (function () {
  var instantiated;

  function init() {
    // singleton here
    return {
      publicMethod: function () {
        console.log("hello world");
      },
      publicProperty: "test",
    };
  }

  // Public method
  return {
    getInstance: function () {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    },
  };
})();

// calling public methods is then as easy as:
Singleton.getInstance().publicMethod(); // hello world
console.log(Singleton.getInstance().publicProperty); // test

/**
 * Another example:
 */

var SingletonTester = (function () {
  // options: an object containing configuration options for the singleton
  // e.g var options = { name: 'test', pointX: 5};
  function Singleton(options = {}) {
    this.name = options.name || "SingletonTester";
    this.pointX = options.pointX || 6;
    this.pointY = options.pointY || 10;

    this.getPoint = function () {
      return { name: this.name, coords: [this.pointX, this.pointY] };
    };
  }

  // this is our instance holder
  var instance;

  // this is an emulation of static variables and methods
  var _static = {
    name: "SingletonTester",
    
    // This is a method for getting an instance
    getInstance: function (options) {
      if (!instance) {
        instance = new Singleton(options);
      }
      return instance;
    },
  };

  return _static;
})();

var singletonTest = SingletonTester.getInstance({ pointX: 5 });

console.log(singletonTest.getPoint()); // { name: 'SingletonTester', coords: [ 5, 10 ] }
