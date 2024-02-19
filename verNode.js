'use strict';

import Game from "./src/Game.js";
// import SelectN from "./src/SelectN";


const game = new Game();
game.onStart = function(){
    console.log('HELLO');
    let idx = this.selectN.len -1;
    let percent = (this.chance()*100).toFixed(2)+'%';
    console.log(`지정된 범위 안의 숫자를 선택하세요.[0 - ${idx}](확률:${percent})`);
}
game.onRstart = game.onStart;

game.onNext = function(){
    console.log('onNext');
    let idx = this.selectN.len -1;
    let percent = (this.chance()*100).toFixed(2)+'%';
    console.log(`지정된 범위 안의 숫자를 선택하세요.[0 - ${idx}](확률:${percent})`);
    
}
game.onEnd = function(){
    console.log('End');
    console.log('history',JSON.stringify(game.history));
    console.log('successChance',(this.successChance()*100).toFixed(2)+'%');
    console.log('lastChance',(this.lastChance()*100).toFixed(2)+'%');
    
    if(game.status==91){ //완주 성공
        console.log('SUCCESS!!');
    }else{
        console.log('FAIL!!');
    }
    process.exit();
}
game.onDraw = function(){
    console.log('onDraw',this.status);
    console.log('ARR',JSON.stringify(this.selectN.ns.map((v,idx,arr)=>{return `${idx}:${v}`;})));
}



console.log('# ==== COMMANDS ============================ #');
console.error('? s: Start.   e: Exit.');


process.stdin.on('data', function (input) {

    let arg = input.toString("utf-8").trim()
    console.log(arg);
    // console.log(game);
    if(arg==='e'){
        process.exit();
    }else if(arg=='s'){
        if(game.status === 0){
            console.warn('game.start');
            game.start();
            game.draw();
        }
    }else{
        if(game.status === 10 ||game.status === 20){
            console.warn('game.next');
            const r = game.input(arg);
            if(r===0){
                console.log('DIE');
                game.end();
                
            }else if(r===1){
                console.log('PASS','cnave: '+(game.chance()*100).toFixed(2)+'%');
                game.next();
                game.draw();
                // game.onNext();
            }else{ //잘못된 입력
                console.error('!입력 범위가 잘못되었습니다.');
                game.onNext();
            }
            
        }
    }
    
  
});

game.start();
game.draw();