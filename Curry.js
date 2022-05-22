// 함수형 프로그래밍 ⇒ 클로저 (자유변수를 기억하고 참고하는 함수)
// curry함수 => 함수의 인자가 다 채워질 때 까지 실행을 유예하는 함수
let add_maker = function(f) { // 일급 => 변수에 함수를 저장하여 값으로 취급함
    return function(a){
        return function(b) {
            return f(a, b) ;
        }
    }
}
let add = add_maker(function(a,b) {return a+b})
// f는 function(a,b) {return a+b} 이다.

let add10 = add(10)
console.log(add10(30))
console.log(add(30)(10)) // 이런식으로도 사용가능


// JSON : 객체리터럴
let users = [
    {name : '홍길동', age : 30},
    {name : '이순신', age : 20},
    {name : '강감찬', age : 10},
    {name : '을지문덕', age : 70}
]

let each = function(list, iter){
    for (let i=0; i<list.length; i++) {
        iter(list[i])
    }
}
let filter = function(list, predi){
    let rslt = [];
    each(list, function(val) {
        if(predi(val)) rslt.push(val);
    })
    return rslt;
}
// let curry = function(fn){
//     return function(a) {
//         return function(b) {
//             return fn(a,b);
//         } 
//     }
// }
// => @@ 함수처리가 순서대로 이루어진다. @@

// let filter_ = curry(filter); 
// => function(fn) { return function(a) }
// => 작동시킬 기능 등록

// let filter_user = filter_(users); 
// => function(a) { return function(b) }
// => 처리를 원하는 값 등록

// console.log( filter_user(function(user){ return user.age > 30}) )
// => function(b) { return fn(a, b)}
// => 실행


function calc(a,b,c,d,e,f) { // 형인자
    console.log(arguments) // [Arguments] { '0': 1, '1': 2, '2': 3 }
}
calc(1,2,3) // 실인자 ⇒ 실제로 들어간 값


// ** curry refectoring **
// 1. arguments
// let curry = function(fn){
//     return function(a,b) {
//         if (arguments.lenght == 2) return fn(a,b)
//             return function(b) {
//                 return fn(a, b)
//             } 
//     } 
// }
// add(1, 2) => 이런식으로 인자 2개를 넣었을때 실행가능하게함
// 만약 인자가 한개만 들어올 경우 function(b)를 리턴하여 한번더 함수 실행을 미룬다.

// 2. 삼항연산자 활용
let curry = function(fn){
    return function(a, b) {
        return arguments.length == 2 ? 
            fn(a, b) : function(b) { return fn(a, b); };
    }
}
let filter_ = curry(filter); 
let filter_user = filter_(users); 
console.log( filter_user(function(user){ return user.age > 30}) )




