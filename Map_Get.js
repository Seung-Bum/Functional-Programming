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
let _map = function(list, mapper){
    let rslt = [];
    _each(list, function(val) { // each => 주어진 list의 값들을 하나씩 함수처리 해줌
        rslt.push(mapper(val)) ;
    } )
    // console.log(rslt)
    return rslt ;
}
let _filter = function(list, predi){
    let rslt = [];
    _each(list, function(val) {
        if(predi(val)) rslt.push(val);
    })
    return rslt;
}

console.log(
    _map( _filter(users, function(user){return user.age > 20}),
    _get('age') )
)
