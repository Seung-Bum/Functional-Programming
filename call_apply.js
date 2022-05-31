// var add = function() {
//     return this.a + this.b;
// }

var add = function (c, d) {
    return this.a + this.b + c + d;
}

// call은 인수의 목록을, apply는 인수배열을 받는다.

console.log( add.apply({a:10, b:20}) ) // call 혹은 apply를 해줘야함 this 사용시

console.log( add.call({a:10, b:20}) )

console.log( add.call({a:10, b:20}, 10, 20) ) 

console.log( add.apply({a:10, b:20}, [10, 20]) ) 