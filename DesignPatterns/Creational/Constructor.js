/**
 * Basic Functional Constructor
 */

function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
  this.toString = function () {
    return this.model + " has done " + this.miles + " miles";
  };
}

var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString()); // Honda Civic has done 20000 miles
console.log(mondeo.toString()); // Ford Mondeo has done 5000 miles
