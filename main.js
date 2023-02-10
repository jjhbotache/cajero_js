const pads = Array.from(document.getElementsByClassName("pad"));
const text = document.getElementById("screen-text");

class box {
  constructor(value=0,amount=0){
    this.value = value;
    this.amount = amount;
    console.log(`Se ha creado una caja con ${this.amount} de billetes de ${this.value} `);
  }
  totalValue(){
    return (this.amount * this.value);
  }
}

let box100Bills = new box(100000,2);
let box50Bills = new box(50000,5);
let box20Bills = new box(20000,2);
let box10Bills = new box(10000,5);
const atmBoxes = [
  box100Bills,
  box50Bills,
  box20Bills,
  box10Bills
]

let retireAmount = 0;
let debt;
let sure = false;

const initialMsg = "Cuanto desea retirar?";

// ==========================================================================
function pressed(number) {

  // if there's money enought retire...
  if (retireAmount <1) {
    // write the number
    if (!(number == 10) && !(number == 12 )) {
      if (number == 11) {number = 0;}
      if (isNaN(text.innerHTML)) {text.innerHTML = "";}
      text.innerHTML += number;
    }
    else if (number == 10){
      text.innerHTML = "";
    }
    else{//if it's 12
      if (isNaN(text.innerHTML)) {
        text.innerHTML = `Inserte un monto`;
      }
      else{
        // saves what it's introduce
        retireAmount = parseInt(text.innerHTML);
        text.innerHTML = `Esta retirando ${retireAmount}. <br> Desea continuar?`;
      }
    }
  }
  // si no, si ya hay una deuda y retireamount existe
  else if (debt!=undefined){
    text.innerHTML = "Verificando que haya suficiente dinero";
    setTimeout(() => {
      // if there`s money enought 
      if (countTotal()>=debt) {
        text.innerHTML = "Hay dinero suficiente, desea continuar?";
        if (sure) {
          text.innerHTML = `Retire:`;
          const info = retire();
          Object.keys(info).forEach(value => {
            const amount = info[value];
            if ((amount>0) && (!isNaN(value))) {
              amount>1? text.innerHTML += `<li> ${amount} billetes de ${value} </li>`: text.innerHTML += `<li> ${amount} billete de ${value} </li>`
            }
            
          });
          text.innerHTML += `Total: ${info["debt"]}`;
          setTimeout(() => {
            restart("Gracias por usar ATM services")
          }, 5000);
        }
        else{
          sure = true;
        }
      }
      else{
        restart("No hay suficiente dinero. <br> Lo sentimos");
      }
    }, 2000);
  }
  // waits for the answer of the amount to retire
  else{
    if (number == 10) {
      restart();
    }
    else if (number == 12) {
      debt = retireAmount;
      pressed(12);
    }
  }
}
// ==========================================================================
function countTotal() {
  let total = 0;
  atmBoxes.forEach(element => {
    total+=element.totalValue();
  });
  console.log(`El total es ${total/1000}`);
  return total;
}
function restart(msg = "Operacion cancelada") {
  text.innerHTML = msg;
  retireAmount = 0;
  debt = undefined;
  sure = false;
  setTimeout(() => {
    text.innerHTML=initialMsg;
  }, 1000);
}
function retire() {
  console.log("im retering");
  let retirement = {
    "posible":false,
    "debt":debt
  };
  if (!isNaN(debt)) {
    atmBoxes.forEach(box => {
      const value = box.value.toString();
      retirement[value] = 0;
      while (box.amount>0 && (debt-box.value >= 0)) {
        box.amount--,
        debt-=box.value;
        retirement[box.value]++;
      }
    });
  }
  console.log(retirement);
  return retirement;
}
/* function addThousandDots(str) {
  return reverseStr(addDots(reverseStr(str)))
}
function addDots(str) {
  let newStr2 = "";
  for (let i = 1; i < str.length + 1; i++) {
    const number = str[i - 1];
    i % 3 === 0 ? newStr2 += number + "." : newStr2 += number;
  }
  return newStr2;
}
function reverseStr(str) {
  let newStr="";
  for (let index = str.length; index > 0; index--) {
    const number = str[index - 1];
    newStr += number;
  }
  return newStr;
} */
// ==========================================================================

for (let index = 0; index < pads.length; index++) {
  const element = pads[index];
  // --------------------------------------
  element.addEventListener("click",()=>{
    pressed(index+1);
  })
  // --------------------------------------
}
window.addEventListener("keydown",event=>{
  console.log(event.key);
  switch (event.key) {
    case "1":
      pressed(1)   
      break;
    case "2":
      pressed(2)   
      break;
    case "3":
      pressed(3)   
      break;
    case "4":
      pressed(4)   
      break;
    case "5":
      pressed(5)   
      break;
    case "6":
      pressed(6)   
      break;
    case "7":
      pressed(7)   
      break;
    case "8":
      pressed(8)   
      break;
    case "9":
      pressed(9)   
      break;
    case "0":
      pressed(0)   
      break;
    case "Backspace":
      pressed(10)   
      break;
    case "Enter":
      pressed(12)   
      break;
  
  }
})

text.innerHTML=initialMsg;
