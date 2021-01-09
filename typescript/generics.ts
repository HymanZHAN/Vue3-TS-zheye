function echo<T>(params: T): T {
  return params;
}

const result = echo("str");
console.log(result.endsWith("s"));

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

const result2 = swap(["asdf", 123]);
result2[0].toString();

function echoWithArr<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

const arr = echoWithArr([1, 2, 3]);

interface IWithLength {
  length: number;
}

function echoWithLength<T extends IWithLength>(arg: T) {
  console.log(arg.length);
  return arg;
}

const str = echoWithLength("string");
const obj = echoWithLength({ length: 10 });
const arr2 = echoWithLength([1, 2, 3]);
// echoWithLength(123); // incorrect
