
function addNumberList(key, quantity){

    let dataJson = {
      "add": {
        "products_in_list": quantity,
        "products_in_payment": 0
      }
    };

  productsAjax(key, dataJson);
}

function removeNumberList(key, quantity){

  let dataJson = {
      "remove": {
        "products_in_list": quantity,
        "products_in_payment": 0
      }
    };
    productsAjax(key, dataJson);
  }

function addNumberPay(key, quantity){

  let dataJson = {
      "add": {
        "products_in_list": 0,
        "products_in_payment": quantity
        }
    };
    productsAjax(key, dataJson);
  }

function removeNumberPay(key, quantity){

  let dataJson = {
      "remove": {
        "products_in_list": 0,
        "products_in_payment": quantity
      }
    };
    productsAjax(key, dataJson);
  }

function editproduct(key, add_List, remove_List, add_Pay, remove_Pay){

  let dataJson = {
      "add": {
        "products_in_list": add_List,
        "products_in_payment": add_Pay
      },
      "remove": {
        "products_in_list": remove_List,
        "products_in_payment": remove_Pay
      }
    }
  productsAjax(key, dataJson);
}


function productsAjax(key, dataJson){

  let code_loc =  location.search.split('code_loc=')[1];

  let urls = LOCATIONPUT;
   urls = urls.replace("{location_code}", code_loc) ;
   urls = urls.replace("{product_id}", key);

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
