'use strict';
import SelectN from "./SelectN.js";

class Game{
	selectN = null;
	status = 0; // 0 : init, 10: start, 20: next, 90: end, 91: success end;
	history = null;
	constructor(){
		this.init();
		// this.hello();
	}

	// hello(){
	// 	console.log('HELLO!\n');
	// }
	init(){
		if(!this.selectN) this.selectN = new SelectN();
		this.selectN.init();
		this.status = 0;
		this.history = [];
	}

	restart(){
		this.init();
		this.status = 10;
		this.selectN.start(3);
		this.selectN.next();
		this.onRestart();
	}
	start(){
		console.log("Game:start");
		this.init();
		this.status = 10;
		this.selectN.start(3);
		this.selectN.next();
		this.onStart();
	}

	next(){
		if(this.status == 10 || this.status == 20){
			if(this.selectN.trueCnt==1){ // 마지막
				this.status = 91;
				this.end(91);
				return;
			}
		}
		this.selectN.next();
		this.status = 20;
		this.onNext();
	}

	end(status = 90){
		this.status = status;
		this.onEnd();
	}
	draw(){
		this.onDraw();
	}

	input(n){
		n = parseInt(n,10);
		let r = -1;
		try{
			r = this.selectN.isConnrect(n);
		}catch(e){
			return 2;
			console.error(e);
		}
		this.history.push({'ns':Array.from(this.selectN.ns),'chance':this.chance(),'n':n,'r':r?1:0});
		return r?1:0;
	}

	chance(){
		return this.selectN.chance(this.selectN.ns)
	}
	successChance(){
		let chance = 0
		this.history.forEach(el => {
			if(el.r === 1){
				if(chance===0){chance = 1;}
				chance *= el.chance;
			} 
		});
		return chance;
	}
	
	lastChance(){
		return this.history[this.history.length - 1 ].chance;
	}

	onRestart(){

    }
	onStart(){

    }
    onNext(){

    }
    onEnd(){

    }
	onDraw(){

    }
}


export default Game;