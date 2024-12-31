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

// utilise defined type
type cardNum {
      cardNumber: number;
} 

type cardDate {
      cardDate: string;
}

type cardDetails = cardNum & cardDate & {cvv: number, name: string};

let card: cardDetails = {
      cardNumber: 123456789,
      cardDate: '12/12',
      cvv: 123,
      name: 'John Doe'
}

// readonly property
interface myInterface {
  readonly _id: string;
}

// optional property
interface myInterface {
  name?: string;
}

function myFunction(x: string | number): void {
  if (typeof x === 'number') {
     console.log(x.toLocaleString().toUpperCase());
  }
}

myFunction(123);

// Array vs typule -- multiple types
let arr: (string | number)[] = [1, 'Hello']; // no matter the order
let myTuple: [string, number] = ['Hello', 1]; // order matters

type typule = [string, number];
let myTuple: typule = ['Hello', 1];

// Union type
type myType = string | number;
let myVariable
myVariable = 'Hello';
myVariable = 1;

// Intersection type
type cardNum {
      cardNumber: number;
}

type cardDate {
      cardDate: string;
}

type cardDetails = cardNum & cardDate & {cvv: number, name: string};

let card: cardDetails = {
      cardNumber: 123456789,
      cardDate: '12/12',
      cvv: 123,
      name: 'John Doe'
}

// Interface
interface myInterface {
  name: string;
  age: number;
}

let myObject: myInterface = {
  name: 'John Doe',
  age: 30
}

// Class
class myClass {
  constructor(public name: string, public age: number) {}
}

let myObject: myClass = new myClass('John Doe', 30);

// Enum
enum myEnum {
  A,
  B,
  C
}

let myVariable
myVariable = myEnum.A;

// optional property
interface myInterface {
  name?: string;
}

// readonly property
interface myInterface {
  readonly _id: string;
}