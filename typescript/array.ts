let arrOfNumbers: number[] = [1, 2, 3];
arrOfNumbers.push(3);

console.log(arrOfNumbers);

let users: [string, number] = ["xzhan", 20];
// Incorrect: let users: [string, number] = ["xzhan", 20, "123", 123];

users.push("123");

console.log(users);
