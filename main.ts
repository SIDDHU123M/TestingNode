// type annotation
let myString: string = 'Hello World';
let myNumber: number = 1;
let myBoolean: boolean = true;
let myAny: any = 'Hello World';

let myArray: number[] = [1, 2, 3];
let myArray2: Array<number> = [1, 2, 3];
let myArray3: [string, number] = ['Hello', 1];
let arr: number[] = [1, 2, 3];
let myTuple: [string, number] = ['Hello', 1];

let myVoid: void = undefined;
let myNull: null = null;
let myUndefined: undefined = undefined;
let myNever: never;

let myObject: object = {};
type myType = string | number;
type person = { name: string, age: number };

// function annotation
function myFunction(x : string): void {
  console.log('Hello World');
}
// void - function which doesnt return anything

let myFunction3 =  (x : string): void => { console.log('Hello World'); }

// function return type annotation
function myFunction2(): string {
  return 'Hello World';
}

// class annotation
class myClass {
  constructor(public name: string, public age: number) {}
}

// interface annotation
interface myInterface {
  name: string;
  age: number;
}

// enum annotation
enum myEnum {
  A,
  B,
  C
}

// generic annotation
function myFunction4<T>(x: T): T {
  return x;
}