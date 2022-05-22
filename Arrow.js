var a = function(user) { return user.age >= 30; };
var a = user => user.age >= 30;

var add = function(a, b) { a + b };
var add = (a, b) => a + b;

var add = (a, b) => {
    // 블라블라
    return a + b;
}

// 객체를 만들면서 즉시 리턴할때 한줄
var add = (a, b) => ({ val : a + b });