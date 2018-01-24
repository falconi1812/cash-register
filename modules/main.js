function printProducts() {

  let result = getProducts();
  let products = result.responseJSON.products;
  let totalInList = 0;
  let totalInPay = 0;

  for (i = 0; i < products.length; i++) {

    let name = products[i].name;
    let icon = products[i].icon_ref;
    let price = products[i].price;
    let products_in_list = products[i].products_in_list;
    let products_in_payment = products[i].products_in_payment;
    let id = products[i].id;


    let html = '<a class="white-text imgicon col m12 l4" onclick="clickOnProduct(\'' + name + '\',\'' + price + '\',\'' + id + '\',\'' + i + '\')" aria-label="' + name + '"> \
       <i  class="fa ' + icon + ' fa-4x fa-border hoverable" aria-hidden="true" title="' + name + '"></i></i>\
      </a>';

    let html2 = '<a class="white-text imgicon col m12 l4" onclick="clickInList(\'' + name + '\',\'' + price + '\',\'' + id + '\',\'' + i + '\')" aria-label="' + name + '"> \
       <i id ="list' + name + '" class="fa ' + icon + ' fa-3x fa-border hoverable" aria-hidden="true" title="' + name + '">' + products_in_list + '</i>\
      </a>';

    let html3 = '<a class="white-text imgicon col m12 l4" onclick="clickInPay(\'' + name + '\',\'' + price + '\',\'' + id + '\',\'' + i + '\')" aria-label="' + name + '"> \
       <i id ="pay' + name + '" class="fa ' + icon + ' fa-3x fa-border hoverable" aria-hidden="true" title="' + name + '">' + products_in_payment + '</i>\
      </a>';



    $('#products').append(html);
    $('#list').append(html2);
    $('#topay').append(html3)

    totalInList += products_in_list * price;
    totalInPay += products_in_payment * price;
  }

  $('#totalList').html(totalInList);
  $('#totalPay').html(totalInPay);
}


function getPay(key) {
  let result = getProducts();
  let product = result.responseJSON.products[key].products_in_payment;
  return product;
}


function getList(key) {
  let result = getProducts();
  let product = result.responseJSON.products[key].products_in_list;
  return product;
}


function actualize() {
  let result = getProducts();
  let products = result.responseJSON.products;
  let totalInList = 0;
  let totalInPay = 0;

  products.forEach(function(key) {
    let products_in_list = key.products_in_list;
    let products_in_payment = key.products_in_payment;
    let price = key.price;
    let name = key.name;

    $('#list' + name).html(products_in_list);
    $('#pay' + name).html(products_in_payment);


    totalInList += products_in_list * price;
    totalInPay += products_in_payment * price;
  })

  $('#totalList').html(totalInList);
  $('#totalPay').html(totalInPay);


}

function getProducts() {
  let code_loc = location.search.split('code_loc=')[1]
  let urls = LOCATIONSGET.replace("{locationid}", code_loc);
  return $.ajax({
    url: urls,
    type: 'GET',
    dataType: 'json',
    async: false,
    success: function(data) {
      return data.products;
    },
  });
}

function generateLocation(result) {

  if (result.length == 0) {
    let html = '<div class="col s12 m12 l4"> \
                  </div>\
                  <div class="col s12 m12 l4"> \
                    <div class="card light-blue darken-2">\
                      <div class="card-content black-text">\
                        <div class="row">\
                          <ul class="collection with-header">\
                             <li class="collection-header center"><h4>Pas de location pour <br> Ajourd\'hui</h4></li>\
                          </ul>\
                        </div>\
                    </div>\
                  </div>\
                </div>';
    $('#locations').append(html);
  } else {
    result.forEach(function(element) {
      let name = element.client_name;
      let type = element.type;
      let email = element.client_email;
      let phone = element.phone;
      let hour_start = element.hour_start;
      let hour_end = element.hour_end;
      let terrain = element.terrain;
      let players = element.players;
      let code = element.code;
      let html = '<div class="col s12 m6 l6"> \
                 <div onclick="writeLocation(\'' + code + '\')" class="hoverable">  \
                   <div class="card light-blue darken-2">\
                     <div class="card-content  black-text">\
                       <div class="row">\
                         <ul class="collection with-header">\
                           <li class="collection-header center"><h5>' + name + '</h5></li>\
                           <a class="collection-item"><span class="badge black-text">' + type + '</span>Type: </a>\
                           <a class="collection-item"><span class="badge black-text">' + phone + '</span>tel: </a>\
                           <a class="collection-item"><span class="badge black-text">' + email + '</span>mail: </a>\
                           <a class="collection-item"><span class="badge black-text">' + hour_start + '</span>Heure start: </a>\
                           <a class="collection-item"><span class="badge black-text">' + hour_end + '</span>Heure end: </a>\
                           <a class="collection-item"><span class="badge black-text">' + terrain + '</span>Terrain: </a>\
                           <a class="collection-item"><span class="badge black-text">' + players + '</span>Nombre: </a>\
                         </ul>\
                       </div>\
                     </div>\
                   </div>\
                 </div>\
               </div>';

      $('#locations').append(html);
    });
  }
}

function countingAll() {
  productForSell.forEach(function(key) {
    $("#list" + key.name + "").append(key.products_in_list);
    $("#pay" + key.name + "").append(key.products_in_payment);
  });
}

function getLocation() {
  jQuery.support.cors = true;
  $.ajax({
    url: CLIENTS,
    type: "GET",
    dataType: 'json',
    success: function(result) {
      generateLocation(parseResult(result));
    }
  });
}

function parseResult(result) {
  let data = [];
  result.forEach(function(element, i) {
    data[i] = {};
    data[i].client_name = element.client.name + " " + element.client.last_name;
    data[i].client_email = element.client.email;
    data[i].type = element.location.type.name;
    data[i].phone = element.client.phone;
    data[i].hour_start = element.location.hour_start;
    data[i].hour_end = element.location.hour_end;
    data[i].players = element.location.players;
    data[i].code = element.location.code;
    data[i].terrain = element.location.terrain.name;
  })
  return data;
}





//printProducts();
