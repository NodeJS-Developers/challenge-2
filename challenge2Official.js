const {derivative, evaluate} = require('mathjs');
const cluesConstants = {
  num: '16791573288892525934609440079317541905554393653557736896280802239551592289061061348368963',
  equation: '(x^7)/7 - 117649x'
}
const getMinima = (equation) => {
  let y1 = derivative(equation, 'x');
  let morter = [
    ( () => {
      for (let i = 0; i <= Number.MAX_SAFE_INTEGER; i++) {
        let q = y1.evaluate({ x: i });
        if (q == 0) {
          return i
        }
      }
    })(),
    ( () => {
      for (let i = -1; i >= Number.MIN_SAFE_INTEGER; i--) {
        let q = y1.evaluate({ x: i });
        if (q == 0) {
          return i
        }
      }
    })()
  ];
  let y2 = derivative(y1, 'x')
  
  return morter.find(num => y2.evaluate({x: parseFloat(num)}) > 0)
  
}
const toBinary = (n) => {
    let bigintFlag = n > Number.MAX_SAFE_INTEGER;
    let ho = (n, flag) => flag ? BigInt(n)%BigInt(2): n%2 ;
    let lo = (n, flag) => flag ? BigInt(n)/BigInt(2) : n/2 ;
    let m = []
    let z = ( n ) => {
    m.push(ho(n, bigintFlag));
    if(n == 1 || n == 0) {return}
    n = `${lo(n, bigintFlag)}`.split('.')[0];
    z(n) 
    }
    z(n)
    return m.reverse().join('')
}
const GetPass = (a, repeatation) => {
let z = [];
for(let i = 0; i < a.length; i++) {
if(i%7 === 0 && i !== 0) { z.push(a.substring(i-repeatation , i)) }
  else if (i === a.length - 1 && (i+1) % repeatation === 0 ) {
    z.push(a.substring(i-6))
  }
  
}
return String.fromCharCode.apply(null,z.map(el => el.split('').map((num,i, arr) => parseInt(num) * Math.pow(2, arr.length-1 - i))
                  .reduce((am, cv) => am + cv)))
}
console.log(GetPass(toBinary(cluesConstants.num), getMinima(cluesConstants.equation)))

