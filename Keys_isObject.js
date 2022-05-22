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