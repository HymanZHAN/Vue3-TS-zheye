let str = "asdf";

let strOrNum: string | number = "123";
strOrNum = 123;

// type assertion
function getLength(input: string | number): number {
  const str = input as string;

  if (str.length) {
    return str.length;
  } else {
    const number = input as number;
    return number.toString().length;
  }
}

// type guard
function getLength2(input: string | number): number {
  if (typeof input === "string") {
    return input.length;
  } else {
    return input.toString().length;
  }
}
