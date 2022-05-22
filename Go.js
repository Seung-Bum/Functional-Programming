go(10, 
function(a){ return a*10}, 
function(a){ return a+10},
function(a){ return a-10})

let go = function(arg) {

    let fns = Arry.prototype.slice.call(arguments, 1)
    // arguments의 첫번째 값을 제외하고 fns에 값을줌
    return pipe.apply(null, fns)
    
}