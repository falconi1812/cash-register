function addNumberList(key){

  productsForSell[key].inList = ++productsForSell[key].inList;


}

function removeNumberList(key){

  productsForSell[key].inList = --productsForSell[key].inList;

}

function addNumberPay(key){

  productsForSell[key].inSell = ++productsForSell[key].inSell;


}

function removeNumberPay(key){

  productsForSell[key].inSell = --productsForSell[key].inSell;


}
