// each의 외부 다형성 높이기
//     ⇒ length를 참조하고자 할때 list가 null이면 에러가 발생하는 경우
//     ⇒ get을 통해 length를 참조하게 한다. 에러발생 x
//     => 예외적인 데이터가 들어와도 문제가 발생하지 않게하기 위함
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
var _get = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key];
});

var _length = _get('length');

// get을 통해 length에 접근했기 때문에 에러가 나질 않는다.
// => keys로 변경
let _each = function(list, iter){
    var keys = _keys(list);
    for (let i=0, len = keys.length; i < len; i++) {
        iter(list[keys[i]])
    }
}

var _map = function(list, mapper){
    let rslt = [];
    _each(list, function(val) { // each => 주어진 list의 값들을 하나씩 함수처리 해줌
        rslt.push(mapper(val)) ;
    } )
    return rslt ;
}
var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);
}
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
var _filter = function(list, predi){
    let rslt = [];
    _each(list, function(val) {
        if(predi(val)) rslt.push(val);
    })
    return rslt;
}
function _go(arg) {
    var fns = _rest(arguments); 
    // 첫번째 값을 제외해야 함수만 남음, list만 넘기면 첫번째 값 정리됨
    return _pipe.apply(null, fns)(arg);
    // apply는 call과 비슷하고 arguments(같은 유사배열)의 값을 받을때 필요
}
var _map = _curryr(_map),
    _filter = _curryr(_filter);


// each를 사용하는 모든 함수들이 적용된다.
_each(null, console.log);
console.log( _map(null, function(v) { return v }) ); // []
_go(null,
    _filter(function(v) { return v % 2 }), // => curryr 적용을 해줘야 go식으로 표현가능함
    _map(function(v) { return v * v }),
    console.log); // []


// Keys
console.log( _keys({ name : 'ID', age : 33}) ); // [ 'name', 'age' ]
console.log( _keys([1, 2, 3, 4]) ); // [ '0', '1', '2', '3' ]
console.log( _keys(10) ); // []
console.log( _keys(null) ); // 에러 => _is_Object 적용후 에러 x, []

function _is_Object(obj) {
    return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
    return _is_Object(obj) ? Object.keys(obj) : [];
}


// 유사배열의 넣었을때 작동하지 않을 수도 있음
_each({
    13: 'ID',
    18: 'HD',
    29: 'YD' // length가 없다.
}, function(name) {
    console.log(name);
});

console.log(
        _map({
        13: 'ID',
        18: 'HD',
        29: 'YD'
    }, function(name) {
        return name.toLowerCase();
    })
);

// 에러가 나지 않고 그럴싸한 값으로 변경해줌
// 함수의 연속실행에 문제가 발생하지 않게 해준다.
// null일 경우 []으로 변경해준다. 
_go(null,
    _map(function(user) {
        return user.name;
    }),
    _map(function(name) {
        return name + ' 영웅등장'
    }),
    console.log)

// 데이터가 어떻게 생겼는지는 상관없이 컨트롤이 가능하다.
_go({
        1: users[0],
        3: users[2],
        5: users[3]
    },
    _map(function(user) {
        return user.name + ' 영웅등장'
    }),
    console.log
);



