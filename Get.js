let users = [
    {name : '홍길동', age : 30},
    {name : '이순신', age : 20},
    {name : '강감찬', age : 10},
    {name : '을지문덕', age : 70}
]
function _curryr(fn) {
    return function(a, b) {
        return arguments.length == 2 ?
            fn(a, b) : function(b) { return fn(b, a); }; 
    }
}

// get을 이용하여 조금더 안전하게 가져오기

// var _get = function (obj, key) {
//     return obj == null ? undefined : obj[key];
// }


// get에 curryr 적용하기
// curring을 통해서 인자를 오른쪽부터 적용할 수 있게 한다.
var _get = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key];
});

var user1 = users[0];
console.log(user1.name); // 홍길동
console.log(_get(user1, 'name')); // 홍길동

// console.log(users[10].name); // 에러가 발생한다.
console.log(_get(users[10], 'name')); // undefined

// curryr 적용후 
console.log(_get('name')(user1)); // 홍길동

// 이름을 꺼내는 함수가 된다.
var get_name = _get('name'); 
console.log( get_name(user1) ); // 홍길동
console.log( get_name(users[1]) ); // 이순신
console.log( get_name(users[2]) ); // 강감찬
// => _get('name')(user1) curring에 의해서 이런식으로 동작하게됨