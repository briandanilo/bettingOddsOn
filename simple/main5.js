// requirejs(["node_modules/fractional"], function(fractional) {
// });


document.querySelector('#convert-btn').addEventListener("click",function(e){

  e.preventDefault();

  var away = document.querySelector('#away-odds').value;
  var home = document.querySelector('#home-odds').value;

  var awayImplied = convert(away,home,"awayImplied");
  var homeImplied = convert(away,home,"homeImplied");
  var awayUsaWithJuice = convert(away,home,"awayUsaWithJuice");
  var homeUsaWithJuice = convert(away,home,"homeUsaWithJuice");
  var awayDecimalWithJuice = convert(away,home,"awayDecimalWithJuice");
  var homeDecimalWithJuice = convert(away,home,"homeDecimalWithJuice");
  var awayFractionalWithJuice = convert(away,home,"awayFractionalWithJuice");
  var homeFractionalWithJuice = convert(away,home,"homeFractionalWithJuice");
  var awayUsaNoJuice = convert(away,home,"awayUsaNoJuice");
  var homeUsaNoJuice = convert(away,home,"homeUsaNoJuice");
  var awayDecimalNoJuice = convert(away,home,"awayDecimalNoJuice");
  var homeDecimalNoJuice = convert(away,home,"homeDecimalNoJuice");
  var awayFractionalNoJuice = convert(away,home,"awayFractionalNoJuice");
  var homeFractionalNoJuice = convert(away,home,"homeFractionalNoJuice");




  var table = document.querySelector('.table');
  var header = table.createTHead();

  var row = header.insertRow(0);

  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);

  cell0.innerHTML = "";
  cell1.innerHTML = "<b>Away Team</b>";
  cell2.innerHTML = "<b>Home Team</b>";

  var row = table.insertRow(-1);

  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);

  cell0.innerHTML = "Implied Probability";
  cell1.innerHTML = awayImplied.toFixed(2);
  cell2.innerHTML = homeImplied.toFixed(2);

  var row = table.insertRow(-1);

  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);

  cell0.innerHTML = "No Vig (American)";
  cell1.innerHTML = awayUsaNoJuice;
  cell2.innerHTML = homeUsaNoJuice;


});






function convert(awayLine,homeLine,lineType) {

      //get implied prob with vig
      var homeImpliedProb = getImpliedProb(awayLine);
      var awayImpliedProb = getImpliedProb(homeLine);

      //calculate implied prob without vig
      var noVigAwayImplied = awayImpliedProb / (homeImpliedProb + awayImpliedProb)
      var noVigHomeImplied = homeImpliedProb / (homeImpliedProb + awayImpliedProb)

      //calculate line based on implied prob
      var noVigAwayLineUSA = impliedToAmerican(noVigAwayImplied);
      var noVigHomeLineUSA = impliedToAmerican(noVigHomeImplied);

      var noVigAwayLineDecimal = impliedToDecimal(noVigAwayImplied).toFixed(2);
      var noVigHomeLineDecimal = impliedToDecimal(noVigHomeImplied).toFixed(2);

      var noVigAwayLineFractional = impliedToFractional(noVigAwayImplied);
      var noVigHomeLineFractional = impliedToFractional(noVigHomeImplied);
      // var noVigAwayLineFractional = new Fraction(impliedToFractional(noVigAwayImplied)).toString();
      // var noVigHomeLineFractional = new Fraction(impliedToFractional(noVigHomeImplied)).toString();

      // console.log("implied prob of away ",noVigAwayImplied);
      // console.log("implied prob of home ",noVigHomeImplied);
      //
      // console.log("no vig american away line ",noVigAwayLineUSA);
      // console.log("no vig american home line ",noVigHomeLineUSA);
      //
      // console.log("no vig decimal away line ",noVigAwayLineDecimal);
      // console.log("no vig decimal home line ",noVigHomeLineDecimal);
      //
      // console.log("no vig fractional away line ",noVigAwayLineFractional);
      // console.log("no vig fractional home line ",noVigHomeLineFractional);

      switch(lineType){
        case "awayImplied": return noVigAwayImplied;
        case "homeImplied": return noVigHomeImplied;
        //case "awayUsaWithJuice": return awayUsaWithJuice; break;
        //case "homeUsaWithJuice": return homeUsaWithJuice;
        //case "awayDecimalWithJuice": return awayDecimalWithJuice;
        //case "homeDecimalWithJuice": return homeDecimalWithJuice;
        //case "awayFractionalWithJuice": return awayFractionalWithJuice;
        //case "homeFractionalWithJuice": return homeFractionalWithJuice;
        case "awayUsaNoJuice": return noVigAwayLineUSA;
        case "homeUsaNoJuice": return noVigHomeLineUSA;
        case "awayDecimalNoJuice": return noVigAwayLineDecimal;
        case "homeDecimalNoJuice": return noVigAwayLineDecimal;
        case "awayFractionalNoJuice": return noVigAwayLineFractional;
        case "homeFractionalNoJuice": return noVigHomeLineFractional;
      }

}


function getImpliedProb(line){

        var impliedProb = 0;
        line = Number(line);

        if (Math.abs(line)==100)
            impliedProb = .5
        else if (line < 0)
        {
            impliedProb = Math.abs(line)/(100 - line)
        }
        else if (line > 100)
        {
            impliedProb = 100/(line+100);
        }
        //console.log("implied prob: " + impliedProb);
        return impliedProb;
};

function impliedToAmerican(implied){

    var odds = 100;

    if (implied >= .5)
        odds = Math.round(implied/(1-implied)*-100)
    else
        odds = Math.round((1-implied)/implied*100)

    return odds;
};

function impliedToDecimal(implied){
    return 1/implied ;
}

function impliedToFractional(implied){
    return 1/implied-1;
}



  // console.log(
  //
  //    awayImplied,
  //    homeImplied,
  //    awayUsaWithJuice,
  //    homeUsaWithJuice,
  //    awayDecimalWithJuice,
  //    homeDecimalWithJuice,
  //    awayFractionalWithJuice,
  //    homeFractionalWithJuice,
  //    awayUsaNoJuice,
  //    homeUsaNoJuice,
  //    awayDecimalNoJuice,
  //    homeDecimalNoJuice,
  //    awayFractionalNoJuice,
  //    homeFractionalNoJuice
  //
  //
  //
  // )
  //
