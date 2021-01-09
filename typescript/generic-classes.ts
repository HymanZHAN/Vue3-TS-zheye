class Queue<T> {
  private data: T[] = [];

  push(item: T) {
    return this.data.push(item);
  }

  pop() {
    return this.data.shift();
  }
}

const queue = new Queue<number>();

console.log(queue.push(123));
// console.log(queue.push("str")); //error
console.log(queue.pop());

interface KeyValPair<T, U> {
  key: T;
  value: U;
}

const kp1: KeyValPair<number, string> = { key: 1, value: "asdf" };

