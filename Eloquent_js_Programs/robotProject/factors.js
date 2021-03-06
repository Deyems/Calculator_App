function factorsOf(n){
    const factors = [];
    if(Number.isNaN(Number(n))){
        throw new RangeError('Argument Error: Value must be a valid integer');
    } else if(n < 0){
        throw new RangeError('Argument Error: Number must be positive');
    }else if(!Number.isInteger(n)){
        throw new RangeError('Argument Error: Number must be an integer')
    }else{
        
        for(let i = 1, max = Math.ceil(Math.sqrt(n)); i < max; ++i){
            if(n%i === 0){
                factors.push(i,n/i);
            }
        }
        
    }
    return factors.sort((a,b) => a-b);
}

self.addEventListener('message', e => {
    const factors = factorsOf(Number(e.data));
    self.postMessage(factors);
    self.close();
},false);
