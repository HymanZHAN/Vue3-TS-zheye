interface IPerson {
  readonly id: number;
  name: string;
  age: number;
}

let xzhan: IPerson = { id: 1, age: 20, name: "Xucong" };

// xzhan.id = 123; // error
