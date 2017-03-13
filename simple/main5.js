// requirejs(["node_modules/fractional"], function(fractional) {
// });



document.querySelector('#convert-btn').addEventListener("click",function(e){

  e.preventDefault();
  tableObject=[];
  clearTable();

  var away = document.querySelector('#away-odds').value;
  var home = document.querySelector('#home-odds').value;

  var awayImplied = convert(away,home,"awayImplied").toFixed(2);
  var homeImplied = convert(away,home,"homeImplied").toFixed(2);
  var awayUsaWithJuice = convert(away,home,"awayUsaWithJuice");
  var homeUsaWithJuice = convert(away,home,"homeUsaWithJuice");
  var awayDecimalWithJuice = convert(away,home,"awayDecimalWithJuice").toFixed(2);
  var homeDecimalWithJuice = convert(away,home,"homeDecimalWithJuice").toFixed(2);
  var awayFractionalWithJuice = convert(away,home,"awayFractionalWithJuice");
  var homeFractionalWithJuice = convert(away,home,"homeFractionalWithJuice");
  var awayUsaNoJuice = convert(away,home,"awayUsaNoJuice");
  var homeUsaNoJuice = convert(away,home,"homeUsaNoJuice");
  var awayDecimalNoJuice = convert(away,home,"awayDecimalNoJuice");
  var homeDecimalNoJuice = convert(away,home,"homeDecimalNoJuice");
  var awayFractionalNoJuice = convert(away,home,"awayFractionalNoJuice");
  var homeFractionalNoJuice = convert(away,home,"homeFractionalNoJuice");

  var tableObject = [
    {
    "name":"Implied Probability",
    "away":awayImplied,
    "home":homeImplied,
  },
    {
    "name":"American (with vig)",
    "away":awayUsaWithJuice,
    "home":homeUsaWithJuice,
  },
    {
    "name":"Decimal (with vig)",
    "away":awayDecimalWithJuice,
    "home":homeDecimalWithJuice,
  },
    {
    "name":"American (no vig)",
    "away":awayUsaNoJuice,
    "home":homeUsaNoJuice,
  },
    {
    "name":"Decimal (no vig)",
    "away":awayDecimalNoJuice,
    "home":homeDecimalNoJuice,
    }
  ]

  var table = document.querySelector('.table');
  var header = table.createTHead();

  var row = header.insertRow(0);

  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);

  cell0.innerHTML = "";
  cell1.innerHTML = "<b>Away Team</b>";
  cell2.innerHTML = "<b>Home Team</b>";


  for (i in tableObject){
    var row = table.insertRow(-1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    cell0.innerHTML = tableObject[i].name;
    cell1.innerHTML = tableObject[i].away;
    cell2.innerHTML = tableObject[i].home;
  }

});


function clearTable(){

  if (document.querySelector('.table')){
    var table = document.querySelector('.table')
    while(table.rows.length > 0) {
      table.deleteRow(0);
    }
  }
}




function convert(awayLine,homeLine,lineType) {

      //get implied prob with vig
      var homeImpliedProb = getImpliedProb(awayLine);
      var awayImpliedProb = getImpliedProb(homeLine);

      var awayUsaWithJuice = impliedToAmerican(awayImpliedProb);
      var homeUsaWithJuice = impliedToAmerican(homeImpliedProb);

      var awayDecimalWithJuice = impliedToDecimal(awayImpliedProb);
      var homeDecimalWithJuice = impliedToDecimal(homeImpliedProb);


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
        case "awayUsaWithJuice": return awayUsaWithJuice;
        case "homeUsaWithJuice": return homeUsaWithJuice;
        case "awayDecimalWithJuice": return awayDecimalWithJuice;
        case "homeDecimalWithJuice": return homeDecimalWithJuice;
        // case "awayFractionalWithJuice": return awayFractionalWithJuice;
        // case "homeFractionalWithJuice": return homeFractionalWithJuice;
        case "awayUsaNoJuice": return noVigAwayLineUSA;
        case "homeUsaNoJuice": return noVigHomeLineUSA;
        case "awayDecimalNoJuice": return noVigAwayLineDecimal;
        case "homeDecimalNoJuice": return noVigHomeLineDecimal;
        // case "awayFractionalNoJuice": return noVigAwayLineFractional;
        // case "homeFractionalNoJuice": return noVigHomeLineFractional;
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
