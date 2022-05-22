let each = function(list, iter){
    for (let i=0; i<list.length; i++) {
        iter(list[i])
    }
}

let reduce = function (list, iter, memo) {

    if(arguments.length == 2){ // 만약에 초기값이 안정해져 있으면 초기값 설정
        memo = list[0]
        list = Array.prototype.silece.call(list, 1); // 객체형태일 경우 Array로 변환 필요
    }
    
    each(list, function(val) {
        console.log(memo, val);
        memo = iter (memo,val); 
    }); 
    
    console.log("최종 : " + memo)
    return memo;
}
    
reduce([1,2,3,4,5], function(acc,val) {return acc += val}, 0);