var a = [1, 2, 3];

a.slice(1); // [2, 3]
a.slice(2); // [3]

// var b = document.querySelectorAll('*');
// b.slice(1); // 배열이 아니기 때문에 slice를 사용할 수 없어 에러 발생

var slice = Array.prototype.slice;

// console.log(b) 
// console.log( slice.call(b, 2) ); // => Array로 들어옴
// console.log( slice.call(b, 2).constructor ); // Array() { [native code] }

var c = { 0: 1, 1: 10, 2: 30, length: 3 } // => 유사배열(Arraylike-Objects)은 반드시 length가 있어야 한다.
console.log( slice.call(c, 1) );

