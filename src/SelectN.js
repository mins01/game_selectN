class SelectN{
    debug = false;
    len = 0; // 선택지 수
    trueCnt = 0; // 1로 채워진 까지의 인덱스(키)
    ns = [];

	constructor(){
		this.init();
	}
    init(){
        this.len = 1;
        this.trueCnt = 0;
    }
    start(len){
        this.init();

        this.len = len;
        this.trueCnt = 0;
    }
    next(){
        this.changeNext();
    }
    changeNext(){
        console.log('changeNext',this.len, this.trueCnt);
        if(this.trueCnt <= 1){
            // this.len++;
            if(this.len===1){
                this.trueCnt = this.len;
            }else{
                this.trueCnt = this.len-1;
            }
            
        }else{
            this.trueCnt--;
        }
        this.changeNs(this.len,this.trueCnt);
    }
    changeNs(len,trueCnt){
        console.log('changeNs',[... arguments]);
        this.ns.length = len;
        this.ns.fill(0,0);
        while(trueCnt > 0){
            this.ns[trueCnt-1] = 1;
            trueCnt--;
        }
        this.ns.sort(() => Math.random() - 0.5);
        // console.log('changeNs Arr',this.ns);
    }
    isConnrect(n){
        if(n > this.ns.length -1 || n < 0){
			// console.error('잘못된 입력범위');
			throw new Error('잘못된 입력범위')
		};
		return this.ns[n]===1;
    }
    chance(ns){
        let len = ns.length
        let sum = ns.reduce(function (accumulator, currentValue) { return accumulator + currentValue; }, 0);
        // console.log(len,sum);
        return sum/len;
    }


}


export default SelectN;
