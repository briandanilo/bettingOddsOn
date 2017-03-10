var runningInput="";


document.querySelector('.btn-group').addEventListener("click",function(e){
  userInput(e.path["0"].innerText);
});

document.querySelector('.clearBtnContainer').addEventListener("click",function(e){
  userInput(e.path["0"].innerText);
});

function userInput(input) {

    //clear placeholder text
    if (document.querySelector('.calcDisplayText').textContent=="Do Math!")
      document.querySelector('.calcDisplayText').textContent="";

    //display latest input
    document.querySelector('.calcDisplayText').textContent += input;

    //add latest input to running total unless user hit equal or clear btn
    //if user hit equal, do math and return answer
    if (input=="CLEAR")
    {
      runningInput = "";
      document.querySelector('.calcDisplayText').textContent="";
    }
    else if (input != "=")
      runningInput += input;
    else
    {
      var finalAnswer = evaluateExpression(runningInput);
      document.querySelector('.calcDisplayText').textContent =finalAnswer;
      runningInput = finalAnswer;
    }
    console.log("running input ",runningInput);
}

function evaluateExpression(eq) {

  //replace '-' with '_'
  eq = eq.replace(/-/g,"_");
  console.log(eq);

  var totalOperations=0;

  for (i in eq){
    switch (eq[i]){
      case "*": totalOperations++; break;
      case "/": totalOperations++; break;
      case "_": totalOperations++; break;
      case "+": totalOperations++; break;
    }
  }

  //ship the equation off for parsing/evaluating
  for (var i=0; i < totalOperations; i++)
    eq = evaluateOneExpression(eq);


  //change _ back to -
  eq = eq.replace(/_/g,"-");

  return eq;

}


function evaluateOneExpression(eq){

  console.log("BEGINNING EQUATION ",eq);

  var opArray = [];
  var multiplyIndex = eq.search(RegExp("\\*"));
  var addIndex = eq.search(RegExp("\\+"));
  var subtractIndex = eq.search(RegExp("\\_"));
  var divideIndex = eq.search(RegExp("\/"));
  var startIndex;
  var activeIndex;
  var endIndex;

  //create an array identifying the position number of the first of any math operation
  for (i in eq){
    switch (eq[i]){
      case "*": opArray.push(i); break;
      case "/": opArray.push(i); break;
      case "_": opArray.push(i); break;
      case "+": opArray.push(i); break;
    }
  }

  //determine which operation will come first
  switch (true){
    case multiplyIndex != -1: activeIndex=multiplyIndex; break;
    case divideIndex != -1: activeIndex=divideIndex; break;
    case addIndex != -1: activeIndex=addIndex; break;
    case subtractIndex != -1: activeIndex=subtractIndex; break;
  }

  //extract the two numbers in the highest math operation
  for (i in opArray)
  {
    if (opArray[i] > activeIndex)
    {
      endIndex = opArray[i];
      break;
    }
    else
      endIndex = eq.length;

    if (opArray[i] < activeIndex)
      startIndex = Number(opArray[i])+Number(1);
    else if (!startIndex)
      startIndex = 0;
  }


  //evaluate the current expression depending on the highest ranking operation
  //this becomes a "new section" in the user's input
  switch (eq[activeIndex]){
    case "*": var newSection = eq.substring(startIndex,activeIndex)*eq.substring(activeIndex+1,endIndex); break;
    case "/": var newSection = eq.substring(startIndex,activeIndex)/eq.substring(activeIndex+1,endIndex); break;
    case "_": var newSection = eq.substring(startIndex,activeIndex)-eq.substring(activeIndex+1,endIndex); break;
    case "+": var newSection = Number(eq.substring(startIndex,activeIndex))+Number(eq.substring(activeIndex+1,endIndex)); break;
  }

  // recreate modified user input: e.g. 3+5*100-5 becomes 3+500-5
  var newBeginning = eq.substring(0,startIndex);
  var newEnding = eq.substring(endIndex,eq.length);
  var newEquation = newBeginning+newSection+newEnding;

  return newEquation;

}
