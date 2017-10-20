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

function totalActualInList(key){
  if (productsForSell[key].inList>0){
  totalInList = (totalInList + productsForSell[key].price);
  console.log(totalInList);}
  return totalInList;
}
