// go를 이용해서 사람이 읽기편한 코드를 만듬
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
let _each = function(list, iter){
    for (let i=0; i<list.length; i++) {
        iter(list[i])
    }
}
var _map = function(list, mapper){
    let rslt = [];
    _each(list, function(val) { // each => 주어진 list의 값들을 하나씩 함수처리 해줌
        rslt.push(mapper(val)) ;
    } )
    // console.log(rslt)
    return rslt ;
}
var _filter = function(list, predi){
    let rslt = [];
    _each(list, function(val) {
        if(predi(val)) rslt.push(val);
    })
    return rslt;
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
function _go(arg) {
    var fns = _rest(arguments); 
    // 첫번째 값을 제외해야 함수만 남음, list만 넘기면 첫번째 값 정리됨
    return _pipe.apply(null, fns)(arg);
    // apply는 call과 비슷하고 arguments(같은 유사배열)의 값을 받을때 필요
}
var _get = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key];
});


// 같은 결과값
// 이전 코드 
console.log(
    _map( _filter(users, function(user){return user.age > 20}),
    _get('name') )
)

// @@ go 사용하기 @@
_go(users,
    function(users) {
        return _filter(users, function(user) { 
            return user.age >= 30;
        });
    },
    function(users) {
        return _map(users, _get('name'));
    },
    console.log);


// ** curryr을 사용하여 더 간단하게 바꾸기 **
var _map = _curryr(_map),
    _filter = _curryr(_filter);

// curryr 적용전
console.log(
    _map([1,2,3], function(val) { return val * 2; }));

// curryr 적용후
console.log(
    _map(function(val) { return val * 2; })([1,2,3]));

// @@ 위의 curryr 적용전과 비교하면서 보기 @@
_go(users,
    _filter(function(user) { return user.age >= 30; }),
    _map(_get('name')),
    console.log);

_go(users,
    _filter(function(user){ return user.age > 20 ;}),
    _map(function(user){ return '이름 : ' + user.name + 'ㅣ 나이 : ' + user.age }),
    console.log);


// @@ 화살표 함수까지 적용하기 @@
_go(users,
    _filter(user => user.age >= 30),
    _map(_get('name')),
    console.log);



