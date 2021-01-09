const str: "name" | "public" = "name";

interface IName {
  name: string;
}

type IPerson = IName & { age: number };
let person: IPerson = { name: "xzhan", age: 12 };
console.log(person);
