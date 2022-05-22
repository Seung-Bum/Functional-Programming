// curryRight()
// 표현에 맞는 동작을 시키기 위함
// 왼쪽에서 부터가 아니라 오른쪽에서 부터 인자를 적용시킨다.
let _curry = function(fn){
    return function(a, b) {
        return arguments.length == 2 ? 
            fn(a, b) : function(b) { return fn(a, b); };
    }
}

function _curryr(fn) {
    return function(a, b) {
        return arguments.length == 2 ?
            fn(a, b) : function(b) { return fn(b, a); }; 
            // 10만 들어왔을경우 원래는 a(5) - b(10) 이렇게 되야 하는데
            // a, b를 바꿔서 b - a 표현에 맞는식을 완성함
    }
}

var sub = _curryr(function(a, b) {
    return a - b;
});

console.log( sub(10, 5) ); // 5

var sub10 = sub(10);
console.log( sub10(5) ) // 5, -5