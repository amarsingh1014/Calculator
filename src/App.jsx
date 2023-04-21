import React, {useState} from 'react'
import Display from './Display';
import * as math from 'mathjs';


const numbers = [9, 8, 7, "+", 6, 5, 4, "x", 3, 2, 1, "÷"];


function App() {
  let [disabled, setDisabled] = useState(false);
  let [displayValue, setDisplayValue] = useState('');
  let [result, setResult] = useState('')
  let [useless, setUseless] = useState(false)
  const [clicked, setClicked] = useState(false);
 
  function handleDisplay(value) {
      const operators = ['.', '-', '+', '÷', 'x'];
      if(!displayValue && operators.includes(value)) {
        setDisplayValue('')
      }
     else if (operators.includes(value) && operators.includes(displayValue[displayValue.length - 1])) {
        setDisplayValue(displayValue);
  } else {
    setDisplayValue(displayValue + value);
  }
}

  function display0() {
    setDisplayValue(displayValue.concat("0"));
  }
  
 function displayDot() {
  if (
    displayValue[displayValue.length - 1] === '.' ||
    displayValue[displayValue.length - 1] === '-' ||
    displayValue[displayValue.length - 1] === '+' ||
    displayValue[displayValue.length - 1] === '÷' ||
    displayValue[displayValue.length - 1] === 'x'
  ) {
    setDisplayValue(displayValue);
  } else {
    setDisplayValue(displayValue.concat('.'));
  }
 setDisabled(true)
}
 

  function displayMinus() {
    if(!displayValue) {
      setDisplayValue('')
    }
   else if 
    ( displayValue[displayValue.length - 1] === '.' ||
    displayValue[displayValue.length - 1] === '-' ||
    displayValue[displayValue.length - 1] === '+' ||
    displayValue[displayValue.length - 1] === '÷' ||
    displayValue[displayValue.length - 1] === 'x')
       {setDisplayValue(displayValue)} 
       else
    {setDisplayValue(displayValue.concat("-"))}
  }
  
  function clearAll(){
    setDisplayValue(displayValue.slice(0, -1));
    setResult('')
  }
  
  function Clear() {
    setDisplayValue('');
    setResult('')
  }

  function displayEvaluate() {
    try {
      const rep = displayValue.replace(/x/gi, '*')
      const reg = rep.replace(/÷/gi, '/')
      const res = math.evaluate(reg);
      let numFixed = res.toFixed(4)
      setResult(numFixed);
      setDisplayValue(numFixed);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  function displayUseless() {
    setUseless(!useless)
    setClicked(!clicked);
  }

  return (
  <>    
  <div className=' flex items-center justify-center bg-gray-400 flex h-screen flex-col' >
  <div className=' flex items-center justify-center rounded-lg  bg-gray-800 flex h-[600px] w-[300px] flex-col' >
    <div className="mb-1 ml-[195px] font-eurostile text-gray-300 font-bold text-lg">CASIO</div>
  <div className="bg-gray-600 font-orbitron text-white overflow-auto text-2xl font-orbitron w-[260px] h-[100px] mb-4 px-4 flex items-center justify-end border border-gray-900 rounded"> 
 {displayValue ? <Display displayValue={displayValue} /> : <div className='font-orbitron text-white '>{result} </div>}
  </div>
  <div className="grid place-items-center text-4xl font-bold grid-cols-4 gap-x-2 gap-y-2">
  <button onClick={Clear} className="bg-red-600 ml-2 hover:bg-red-700 focus:outline-none font-roboto font-bold text-white focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300 transform hover:-translate-y-1 hover:scale-110 rounded-md p-4">C</button>
  <button onClick={clearAll} className="bg-blue-500 hover:bg-blue-600 focus:outline-none  font-bold text-[25px] px-0.5 font-roboto font-bold w-[60px] h-[72px] text-white focus:ring-2 shadow-lg focus:ring-blue-600 focus:ring-opacity-50 transition duration-300 transform hover:-translate-y-1 hover:scale-110 rounded-md p-4">DEL</button>
  <button onClick={displayUseless} className={`hover:${clicked ? "bg-pink-600" : "bg-blue-600"} font-roboto font-semibold flex text-white focus:ring-5 focus:${clicked ? "ring-yellow-600" : "ring-blue-600"} focus:ring-opacity-50 transition duration-300 transform hover:-translate-y-1 hover:scale-110 rounded-md p-4 ${
        clicked ? "bg-pink-500" : "bg-blue-500"
      }`}> {useless ? <div className=' text-xs flex justify-center items-center'>I'm Useless</div> : <span>%</span>}
</button>
  <button onClick={displayMinus} className="bg-blue-500 mr-2 hover:bg-blue-600 focus:outline-none font-roboto text-white focus:ring-2 w-[54px] ml-1 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300 font-extrabold transform hover:-translate-y-1 hover:scale-110 rounded-md p-4">-</button>
  </div>

  
  <div className="grid place-items-center mt-3 mr-[0px] text-4xl font-semibold grid-cols-4 gap-x-4 gap-y-2">
  {numbers.map(number => (
    <button key={number} onClick={() => handleDisplay(number)} className={`bg-blue-500 grid grid-cols-1 hover:bg-blue-700 focus:outline-none font-roboto font-semibold text-white focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300 transform hover:-translate-y-1 hover:scale-110 rounded-md p-4 ${number === 'x' || '/' ? ' w-[53px] h-[75px]' : ''}`}>
      {number}
    </button>
  ))}
</div>
<div className="grid place-items-center mt-2  text-4xl font-semibold grid-cols-3 gap-x-4 gap-y-2">

<button onClick={display0} className="bg-blue-500 hover:bg-blue-600 focus:outline-none font-roboto font-semibold font-bold text-white focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300 transform hover:-translate-y-1 hover:scale-110 rounded-md p-4">0</button>
  <button onClick={displayDot} className="bg-blue-500 hover:bg-blue-600 focus:outline-none text-4xl w-[52px] h-[71px] mr-[70px] font-roboto font-semibold font-bold text-white focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300 transform hover:-translate-y-1 hover:scale-110 rounded-md p-4">.</button>
  <button onClick={displayEvaluate} className="bg-green-500 hover:bg-green-600 focus:outline-none gap-x-[2px] font-roboto mr-[70px] font-semibold text-white focus:ring-2 focus:ring-blue-600 font-bold focus:ring-opacity-50 transition duration-300 transform hover:-translate-y-1 hover:scale-110 w-[130px] rounded-md p-4">
  =
</button>
  </div>

  </div>
  </div>
  </>

  )

}

export default App
