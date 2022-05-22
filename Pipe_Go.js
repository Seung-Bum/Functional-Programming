// pipe
// 함수들을 인자로 받아서 연속 실행하는 함수를 리턴하는 함수

// each
let _each = function(list, iter){
    for (let i=0; i<list.length; i++) {
        iter(list[i])
    }
}

// rest
var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);
}

// reduce
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

// go는 pipe의 즉시실행 버전이다.
// 첫번째 인자로 인자를 받고 두번째부터 함수들을 받아서 결과를 반환
function _go(arg) {
    var fns = _rest(arguments); 
    // 첫번째 값을 제외해야 함수만 남음, list만 넘기면 첫번째 값 정리됨
    return _pipe.apply(null, fns)(arg);
    // apply는 call과 비슷하고 arguments(같은 유사배열)의 값을 받을때 필요
}

// pipe
// 함수를 연속실행 하는 함수를 넘김
// 모든함수(fns)를 돌면서 첫번째 함수(fn)에 인자를 적용한 결과를 리턴하면 그 결과는 다시 arg가 되고
// 그 결과를 또 fn에 적용하는 것을 반복해서 정상동작하게 만든다.
function _pipe() {
    var fns = arguments; // arguments로 함수들을 받는다.(클로저)
    return function(arg) {
        // 즉시 함수를 리턴함, arg는 f1(1) 1을 말함 arg는 시작 memo값이 된다.
        return _reduce(fns, function(arg, fn) { 
            // function(arg, fn)가 iter함수가 되어 결과인 memo를 (fn(arg)) 반환, 축약(축적)
            return fn(arg);
        }, arg); // 시작 memo값 1
    }
}

var f1 = _pipe( // pipe 실행시 f1에 함수가 담김, return값잉 함수이다.
    function(a) { return a + 1; }, // 1 + 1
    function(a) { return a * 2; },// 2 * 2
    function(a) { return a * a; }
);

console.log ( f1(1) );

// go
_go(1,
    function(a) { return a + 1; }, // 1 + 1
    function(a) { return a * 2; }, // 2 * 2
    function(a) { return a * a; },
    console.log);

