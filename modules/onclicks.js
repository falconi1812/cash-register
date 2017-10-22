function clickInList(key){
  swal({ title : "Selectioner votre option" ,
  buttons: {
    Cancel: {
      value: "cancel",

    },
    Tout: {
      value: "tout",
    },
    Un: {
      value: "un",
    },
  },
})
.then((value) => {
  switch (value) {

    case "cancel":
      swal.close()
      break;

    case "tout":
      productsForSell[key].inSell = productsForSell[key].inList;
      productsForSell[key].inList = 0;
      break;

    case "un":
      if (productsForSell[key].inList > 0){

        productsForSell[key].inSell = ++productsForSell[key].inSell
        productsForSell[key].inList = --productsForSell[key].inList;
      }
      else {
        swal({title :" Il n'y plus de "+ productsForSell[key].name ,  icon: "warning",});
      }

      break;

    default:
      swal( {title : "opetarion cancelé"});
  }
});
}

function clickInPay(key){
  var slider = document.createElement("input");
  slider.type = "range";
  swal("Selectioner votre option", {

  buttons: {
    Cancel: {
      value: "cancel",
    },
    Tout: {
      value: "tout",
    },
    Un: {
      value: "un",
    },
  },
})
.then((value) => {
  switch (value) {

    case "cancel":

      break;

    case "tout":
      productsForSell[key].inSell = productsForSell[key].inList;
      productsForSell[key].inList = 0;
      break;

    case "un":
      productsForSell[key].inSell = ++productsForSell[key].inSell
      productsForSell[key].inList = --productsForSell[key].inList;
      break;

    default:
      swal("opetarion cancelé");
  }
});
}

// debug(function(nombre, fn){console.log("llamada a " + nombre)});

function clickCard() {
  swal("Quelle est la quantite a payer par carte!", {
    content: "input",
  })

  .then((value) => {
    swal(`You typed: ${value}`);
    payedByCard(parseInt(value));
  }
  );

}

function clickPayer(){
  swal({
  title: "Bien fait!",
  text: "Tu as Payé la totalité!",
  icon: "success",
});
}

function clickLocation(){
    location.href = "terrain.html"
}
