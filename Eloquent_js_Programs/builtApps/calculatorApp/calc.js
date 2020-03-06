let digits = document.querySelectorAll('.digit');
let textArea = document.querySelector('.screen');
let operands = document.querySelectorAll('.operator');
let resetBtn = document.querySelector('.reset');
let cancel = document.querySelector('.cancel');
let equalTo = document.querySelector('.equal-to');
let result = document.querySelector('.answer');

window.addEventListener('load', (e) => {
    document.querySelector('.wrapper').style.marginTop = "3%";
    document.querySelector('.wrapper').style.transition = "margin-top 4s";
});

equalTo.addEventListener('click', doTask);
resetBtn.addEventListener("click", clearScreen);

for(digit of Array.from(digits)){
    digit.addEventListener('click', showBtnPressed);
}

//GIVE PRESSED BTN TO THE SCREEN
function showBtnPressed(e){
    let node = document.createElement('span');
        node.textContent = e.target.textContent;
//    node.textContent = parseInt(e.target.textContent,10);
    
    textArea.firstElementChild.appendChild(node);
    e.stopPropagation();
    e.preventDefault();
}

//RESET MY SCREEN CONTENT
function clearScreen(e){
    textArea.firstElementChild.textContent = "";
    result.textContent = "0";
    e.stopPropagation();
    e.preventDefault();
}


//CANCEL LAST ADDED NUMBER
cancel.addEventListener('click', (e) => {
    if(textArea.firstElementChild.lastChild){
    textArea.firstElementChild.lastChild.remove();
    }
    e.stopPropagation();
    e.preventDefault();
});


let regex = /[^a-zA-Z]/;
//CARRYOUT OPERATIONS ON THE NUMBERS
for(operation of Array.from(operands)){
    if(regex.test(operation.textContent) && operation.textContent != '='){
    operation.addEventListener('click', addOperand);
    }
}

//APPEND NEXT BUTTON TO ANY VALUE ENTERED FIRST
function addOperand(e){
    let node = document.createElement('span');
    node.textContent = e.target.textContent;
    textArea.firstElementChild.appendChild(node);
    e.stopPropagation();
    e.preventDefault();
}


function doTask(e){
    //GET VARIABLES AT THE INTERFACE
    //PRINT SOLUTION IN THE ANSWER DIV
    try{
        if(textArea.firstElementChild.textContent === "") {
            throw new Error("No Input");
        }else{
            let content = textArea.firstElementChild.textContent;
            let answer = solve(content);
            result.textContent = answer;
        }
    }catch(err){
        let newNode = document.createElement("div");
        newNode.textContent = err.message;
        newNode.style.color = 'red';
        document.querySelector(".wrapper").appendChild(newNode);
        let clearError = setTimeout(() => {
            document.querySelector(".wrapper").lastChild.remove();
            clearTimeout(clearError);
        },6000);
//        result.textContent = err.message;
    }
    e.stopPropagation();
    e.preventDefault();
}

function solve(content){
    let doubleDiv = /\/\//.test(content);
    if(doubleDiv) {
        throw new SyntaxError("Not allowed");
    }
    let soln = eval(content);
    return soln;
}

