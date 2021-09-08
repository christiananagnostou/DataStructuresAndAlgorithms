/*

List Notes

  An List is a based on the array data structure with the main difference being that is has a dynamic length.

    ex: const list = [1,2,3,4,5,6,7,8,9,10]

  Primary built in list (array) methods:
    .push(10) - adds a new value to the end of the array
    .unshift(10) - adds a new value to the begining of the array
    .pop() - removes and returns the last value in the array
    .shift() - removes and returns the first value in the array


  Time Complexity:
    Accessing: O(1)
    Searching: O(n)
    Inserting: O(n)
    Deleting:  O(n)

  Pros: 
    - Dynamic size
    - Methods created come built in

  Cons:
    - Can only store objects
    - Requires more memory to use and upkeep

 */

class List {
  constructor() {
    this.listSize = 0;

    this.pos = 0;

    this.dataStore = [];

    this.length = () => this.listSize;
  }

  clear() {
    this.listSize = this.pos = 0;
    delete this.dataStore;
    this.dataStore = [];
  }

  find(element) {
    return this.dataStore.indexOf(element);
  }

  append(element) {
    this.dataStore[this.listSize++] = element;
  }

  remove(element) {
    const index = this.find(element);
    if (index === -1) return false;
    this.dataStore.splice(this.find(element), 1);
    this.listSize--;
    return true;
  }

  toString = function () {
    return this.dataStore;
  };

  insert(element, after) {
    const index = this.find(after);
    if (index === -1) return false;
    this.dataStore.splice(index + 1, 0, element);
    this.listSize++;
    return true;
  }

  contains(element) {
    return this.dataStore.indexOf(element) > -1 ? true : false;
  }

  front() {
    this.pos = 0;
  }

  end() {
    this.pos = this.listSize - 1;
  }

  prev() {
    if (this.pos > 0) --this.pos;
  }

  next() {
    if (this.pos < this.listSize - 1) {
      ++this.pos;
    }
  }

  currPos() {
    return this.pos;
  }

  moveTo(pos) {
    this.pos = pos;
  }

  getElement() {
    return this.dataStore[this.pos];
  }
}

const names = new List();

// names.append("Clayton");
// names.append("Raymond");
// names.append("Cynthia");
// names.append("Jennifer");
// names.append("Bryan");
// names.append("Danny");

// names.front();
// console.log(names.getElement());

// names.next();
// console.log(names.getElement());

// names.next();
// names.next();
// names.prev();
// console.log(names.getElement());

const moviesString = `1. The Shawshank Redemption
2. The Godfather
3. The Godfather: Part II
4. Pulp Fiction
5. The Good, the Bad and the Ugly
6. 12 Angry Men
7. Schindler’s List
8. The Dark Knight
9. The Lord of the Rings: The Return of the King
10. Fight Club
11. Star Wars: Episode V - The Empire Strikes Back
12. One Flew Over the Cuckoo’s Nest
13. The Lord of the Rings: The Fellowship of the Ring
14. Inception
15. Goodfellas
16. Star Wars
17. Seven Samurai
18. The Matrix
19. Forrest Gump
20. City of God`;

const movies = moviesString.split("\n");

console.log(movies);

const moviesList = new List();

for (var i = 0; i < movies.length; ++i) {
  moviesList.append(movies[i]);
}

console.log(moviesList);
