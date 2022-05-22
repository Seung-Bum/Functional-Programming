// _reduce
// array로 숫자하나를 뽑아내거나 객체하나를 뽑아낼때 사용한다. 축약한다.

let _each = function(list, iter){
    for (let i=0; i<list.length; i++) {
        iter(list[i])
    }
}

function add (a, b) { return a + b };

// _rest 적용전
// function _reduce (list, iter, memo) {
//     _each(list, function(val) {
//         memo = iter(memo, val);
//     });
//     return memo;
// }


// rest
var slice = Array.prototype.slice; // 유사배열까지 slice할 수 있도록함
function _rest(list, num) {
    return slice.call(list, num || 1); // 넘어온 list에 대해서 num 만큼 자른 배열리턴, num이 없을 경우 기본값 1
}

// rest 적용후
function _reduce (list, iter, memo) {
    if (arguments.length == 2) {
        memo = list[0]
        list = _rest(list); // 메모가 넘어오지 않아도 잘 작동되게 한다.
    }
    _each(list, function(val) {
        memo = iter(memo, val);
    });
    return memo;
}

console.log( _reduce([1,2,3], add, 0) ); // 6
console.log( _reduce([1,2,3], add, 10) ); // 16
console.log( _reduce([1,2,3,4], add) ); // 10

