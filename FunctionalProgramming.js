// JSON : 객체리터럴
let users = [
    {name : '홍길동', age : 30},
    {name : '이순신', age : 20},
    {name : '강감찬', age : 10},
    {name : '을지문덕', age : 70}
]
// console.log(users[0]) // { name: '홍길동', age: 30 }

// *** filter ***
// each 적용전
// let filter = function(list, predi){
//     let rslt = [];
//     for (let i=0; i<list.length; i++) {
//         if(predi(list[i])) rslt.push(list[i]) ;
//     }
//     // console.log(rslt)
//     return rslt;
// }

// filter(users, function(user){return user.age <= 20;})
//[ { name: '이순신', age: 20 }, { name: '강감찬', age: 10 } ]


// **** map ***
// each 적용전
// let map = function(list, mapper){
//     let rslt = [];
//     for (let i=0; i<list.length; i++) {
//         rslt.push(mapper(list[i]))
//     }
//     // console.log(rslt);
//     return rslt;
// }
// map(users, function(user){return '나이: ' + user.age + ', ' + '이름: ' + user.name })


// **** each ***
// iter : 반복
let each = function(list, iter){
    for (let i=0; i<list.length; i++) {
        iter(list[i])
    }
}
// each(users, function(val){console.log(val + ' => 영웅')})
// 홍길동 => 영웅
// 이순신 => 영웅
// 강감찬 => 영웅
// 을지문덕 => 영웅


// **** filter ***
// each 적용후
let filter = function(list, predi){
    let rslt = [];
    
    each(list, function(val) {
        if(predi(val)) rslt.push(val);
    })
    
    // console.log(rslt);
    return rslt;
}
// filter(users, function(user){return user.age <= 20;})
// [ { name: '이순신', age: 20 }, { name: '강감찬', age: 10 } ]


// **** map ***
// each 적용후
let map = function(list, mapper){
    let rslt = [];
    
    each(list, function(val) { // each => 주어진 list의 값들을 하나씩 함수처리 해줌
        rslt.push(mapper(val)) ;
    } )
    
    console.log(rslt)
    return rslt ;
}

// each, filter 동시에 사용해보기
// filter를 사용해서 list를 수정, 그 후 each를 사용하여 mapper로 mapping
map(filter(users, function(user){return user.age > 20}),
    function(user) {return '+++' + user.name + '+++' ;})


