/**
 * Constructors with Prototypes
 */

function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}

// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};

var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString()); // Honda Civic has done 20000 miles
console.log(mondeo.toString()); // Ford Mondeo has done 5000 miles
