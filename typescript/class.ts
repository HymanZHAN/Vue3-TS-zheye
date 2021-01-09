class Animal {
  readonly name: string;
  /**
   * Constructor for Animal class
   */
  constructor(name: string) {
    this.name = name;
  }

  protected run() {
    return `${this.name} is running`;
  }
}

class Dog extends Animal {
  bark() {
    return `${this.name} is barking`;
  }
}

const dog = new Dog("xiaogougou");

class Cat extends Animal {
  static categories = ["mammal"];
  /**
   * Constructor function for Cat
   */
  constructor(name: string) {
    super(name);
    console.log(this.name);
  }

  run() {
    return "Meow, " + super.run();
  }
}

const maomao = new Cat("maomao");
// maomao.name = ""; // error: Trying to modify a readonly property
console.log(maomao.run());
console.log(Cat.categories);
