
function addNumberList(key, quantity){


    let dataJson =
    {
      "add": {
        "products_in_list": quantity,
        "products_in_payment": 0
    }
  };

  let response =  productsAjax(key, dataJson);
   productsForSell[key].inList = response.responseJSON.products_in_list;
  }


function removeNumberList(key, quantity){

  let dataJson =
    {
      "remove": {
        "products_in_list": quantity,
        "products_in_payment": 0
      }
    }
    let response =  productsAjax(key, dataJson);
     productsForSell[key].inList = response.responseJSON.products_in_list;
    }


function addNumberPay(key, quantity){

  let data =
    {
      "add": {
        "products_in_payment": quantity,
        "products_in_payment": 0
        }
    }
    let response =  productsAjax(key, dataJson);
     productsForSell[key].inSell = response.responseJSON.products_in_payment;
    }



function removeNumberPay(key, quantity){
  let data =
    {
      "remove": {
        "products_in_payment": quantity,
        "products_in_payment": 0
      }
    }
    let response =  productsAjax(key, dataJson);
     productsForSell[key].inSell = response.responseJSON.products_in_payment;
    }








function productsAjax(key, dataJson){

  let code_loc =  location.search.split('code_loc=')[1];

  let urls = LOCATIONPUT;
   urls = urls.replace("{location_code}", code_loc) ;
   urls = urls.replace("{product_id}", productsForSell[key].id);

   console.log(urls)

  return $.ajax({
  url: urls,
  type: 'PUT',
  contentType: 'application/json',
  data: JSON.stringify(dataJson),
  async:false,
  success: function(data){
     return data;
  }

  });
};
