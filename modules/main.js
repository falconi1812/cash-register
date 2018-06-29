
const MAIN = "https://api-paintball.herokuapp.com";
const MAINFRONT = "https://cashier-paintball.herokuapp.com/index.html"
const CLIENTS = MAIN + "/clients";
const LOCATIONSGET = MAIN + "/locations/{locationid}";
const LOCATIONPUT = MAIN + "/locations/products/{location_code}/{product_id}";
const PRODUCTS = MAIN + "/products";
const PRODUCTSPUT = MAIN + "/products/{product_id}";
const PRODUCTSDELETE = MAIN + "/products/{product_id}";
const ICONS = MAIN + "/icons";
const ICONSLIST = getIcons().responseJSON;
const DELETELOCAION = MAIN + "/locations/{location_code}";
const PUTPAYMENT = MAIN + "/payments/{location_id}/{type_id}";
const GETPAYEMETSPAYED = MAIN + "/payments/{location_id}";
const DELETEPAYMENT = MAIN + "/payments/{payment_id}";
const GETLOCATIONTRASH = MAIN + "/locations/in-trash";
const GETLOCATIONBYCODE = MAIN + "/locations/{location_code}";
const PUTRESTORELOCATION = MAIN + "/locations/in-trash/{location_code}";
//const GETTYPESLOCATION = MAIN +"/type-of-location";
const TYPE = MAIN + "/products/per/type/{product_id}/{type_id}";


function printProducts() {


  let result = getProducts();
  let products = result.responseJSON.products;
  let location_id = result.responseJSON.location.id;
  let totalInList = 0;
  let totalInPay = 0;
  for (i = 0; i < products.length; i++) {

    let name = products[i].name;
    let icon = products[i].icon_ref;
    let price = products[i].price;
    let products_in_list = products[i].products_in_list;
    let products_in_payment = products[i].products_in_payment;
    let id = products[i].id;
    let html = `<a class="white-text imgicon hoverable tooltipped" data-position="top" data-delay="50" style="cursor: pointer; min-height: 13em;" data-tooltip="` + name + ` Prix: ` + price + `"  onclick="clickOnProduct(\'` + name + `\',\'` + price + `\',\'` + id + `\',\'` + i + `\')">
       <i  class="fa ` + icon + ` fa-4x  " aria-hidden="true" title="` + name + `"></i><p>`  + name +  `<br>`  + price +  ` Fr </p>
      </a>`
    let html2 = '<a class="white-text imgicon  hoverable tooltipped" data-position="top" data-delay="50" style="cursor: pointer;" data-tooltip="' + name + ' Prix: ' + price + '" id="list_fade' + id + '" onclick="clickInList(\'' + name + '\',\'' + price + '\',\'' + id + '\',\'' + i + '\')"> \
       <i id ="list' + id + '" class="fa ' + icon + ' fa-3x  " aria-hidden="true" title="' + name + '">' + products_in_list + '</i>\
      </a>';
    let html3 = '<a class="white-text imgicon hoverable tooltipped" data-position="top" data-delay="50" style="cursor: pointer" data-tooltip="' + name + ' Prix: ' + price + '" id="pay_fade' + id + '" onclick="clickInPay(\'' + name + '\',\'' + price + '\',\'' + id + '\',\'' + i + '\')"> \
       <i id ="pay' + id + '" class="fa ' + icon + ' fa-3x  " aria-hidden="true" title="' + name + '">' + products_in_payment + '</i>\
      </a>';
    $('#products').append(html);
    $('#list').append(html2);
    $('#topay').append(html3)
    totalInList += products_in_list * price;
    totalInPay += products_in_payment * price;
  }
  $('#totalList').html(totalInList + "  CHF");
  $('#totalPay').html(totalInPay + "  CHF");

  actualize();
}

function printProductsPayed(location_id) {

  let products_payed = getProductsPayed(location_id).responseJSON;
  let total_payed = 0;
  let final_html;

  products_payed.forEach(function(payment) {
    let payment_id = payment.id;
    let product_name = payment.product.name;
    let product_price = payment.product.price;
    let quantity = payment.quantity;
    let type_id = payment.type_id;
    let icon_number = payment.product.icon_id
    let total = product_price * quantity;
    total_payed += total;
    let icon_type;

    if (type_id === 1) {
      icon_type = `fa-money green-text`
    }
    if (type_id === 2) {
      icon_type = `fa-credit-card blue-text`
    }

    let html = `
            <tr>
              <td><h5>` + product_name + `</h5></td>
              <td><i class="fa ` + ICONSLIST.find(item => item.id === icon_number).ref + ` fa-2x" aria-hidden="true"></td>
              <td style="text-align: center"><h5>` + quantity + `</h5></td>
              <td><i class="fa ` + icon_type + ` fa-3x" aria-hidden="true"></td>
              <td style="text-align: right"><h5>` + product_price + `</h5></td>
              <td style="text-align: right"><h5>` + total + `</h5></td>
              <td style="text-align: center"><h5><a class="waves-effect waves-light btn red" onclick="delete_payment(` + payment_id + `)" style="margin-left: 2em"><i class="fa fa-times"></i></a></h5></td>
            </tr>`;

    final_html += html;
  });

  $('#tbody_products_payed').html(final_html);
  $('#totalPayed').html(total_payed + "  CHF");
  $('#table_total_payed').html(total_payed);
}

function delete_payment(id) {
  swal({
      title: "ATTENTION",
      text: "Une fois supprimé, ce payment sera impossible à récupérer!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        let dataJson = {
          "ok": true
        };
        let urls = DELETEPAYMENT;
        urls = urls.replace("{payment_id}", id);
        return $.ajax({
          url: urls,
          type: 'DELETE',
          contentType: 'application/json',
          data: JSON.stringify(`{"ok": true}`),
          async: false,
          success: function(data) {
            actualize();
            return data;
          }
        });
      } else {
        swal("Le payment est ok!", {
          timer: 750,
          buttons: false,
        });
      }
    });

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
  start_loading();
  let result = getProducts();
  let products = result.responseJSON.products;
  let totalInList = 0;
  let totalInPay = 0;
  let location_id = result.responseJSON.location.id;
  printProductsPayed(location_id);

  products.forEach(function(key) {
    let products_in_list = key.products_in_list;
    let products_in_payment = key.products_in_payment;
    let price = key.price;
    let id = key.id;
    if (products_in_list == 0) {
      $("#list_fade" + id + "").fadeOut(1);

    } else {
      $("#list_fade" + id + "").fadeIn(1);
    }
    start_loading();
    if (products_in_payment == 0) {
      $("#pay_fade" + id + "").fadeOut(1);
    } else {
      $("#pay_fade" + id + "").fadeIn(1);
    }
    start_loading();
    $('#list' + id).html(products_in_list);
    $('#pay' + id).html(products_in_payment);


    totalInList += products_in_list * price;
    totalInPay += products_in_payment * price;
  })

  $('#totalList').html(totalInList + "  CHF");
  $('#totalPay').html(totalInPay + "  CHF");
  $('#modal_cash_total_to_pay').html(totalInPay);
  start_loading();

  if ($("#totalList").text() === "0  CHF") {
    $("#container_list").css("background-color", "#7d7d7d");
    $("#container_list1").fadeOut(1);
    $("#container_list2").fadeOut(1);
    $("#container_list3").fadeOut(1);
    $("#list_vide").fadeIn(1);
  } else {
    $("#container_list1").fadeIn(1);
    $("#container_list2").fadeIn(1);
    $("#container_list3").fadeIn(1);
    $("#container_list").css("background-color", "#004d40");
    $("#list_vide").fadeOut(1);
  }
  start_loading();
  if ($("#totalPay").text() === "0  CHF" && $("#totalPayed").text() === "0  CHF") {
    $("#topay, #PAYMENT, #PAYMENT_INFO, #total_a_payer, #payments_total").fadeOut(1);
    $("#container_payment, #bottom_payment_card, #bottom_payment_cash, #bottom_list_payment").css("background-color", "#7d7d7d");
    $("#payment_vide").fadeIn(1);

  } else if ($("#totalPay").text() === "0  CHF" && $("#totalPayed").text() !== "0 CHF") {
    $("#topay").fadeOut(1);
    $("#PAYMENT").fadeOut(1);
    $("#PAYMENT_INFO").fadeOut(1);
    $("#total_a_payer").fadeOut(1);
    $("#container_payment, #bottom_payment_card, #bottom_payment_cash").css("background-color", "#7d7d7d");
    $("#bottom_list_payment").css("background-color", "#827717");
    $("#payment_vide").fadeIn(1);
  } else {
    $("#topay").fadeIn(1);
    $("#PAYMENT").fadeIn(1);
    $("#PAYMENT_INFO").fadeIn(1);
    $("#total_a_payer").fadeIn(1);
    $("#payments_total").fadeIn(1);
    $("#container_payment, #bottom_payment_card, #bottom_payment_cash, #bottom_list_payment").css("background-color", "#827717");
    $("#payment_vide").fadeOut(1);
  }
  if ($("#totalPayed").text() == "0  CHF") {
    $("#bottom_list_payment").css("background-color", "#7d7d7d");
  }
  stop_loading();
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
function getProductsByCode(code_loc) {
  let urls = GETLOCATIONBYCODE.replace("{location_code}", code_loc);
  return $.ajax({
    url: urls,
    type: 'GET',
    dataType: 'json',
    async: false,
    success: function(data) {
      console.log(data);
    },
  });
}

function getProductsPayed(location_id) {
  let urls = GETPAYEMETSPAYED.replace("{location_id}", location_id);
  return $.ajax({
    url: urls,
    type: 'GET',
    dataType: 'json',
    async: false,
    success: function(data) {
      return data;
    },
  });
}

function generateLocation(result) {
  start_loading();
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

      let html = '<div class="col s12 m6 l6" style="cursor: pointer"> \
                   <div onclick="writeLocation(\'' + code + '\')" class="hoverable">  \
                     <div class="card green lighten-1">\
                       <div class="card-content  black-text">\
                         <div class="row">\
                           <ul class="collection with-header">\
                             <li class="collection-header center"><h5>' + name + '</h5></li>\
                             <!--<a class="collection-item grey-text darken-2"><span class="badge black-text">' + type + '</span>Type: </a>-->\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + phone + '</span>Tel: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + email + '</span>Mail: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + hour_start + '</span>Départ: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + hour_end + '</span>Fin: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + terrain + '</span>Terrain: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + players + '</span>Personnes: </a>\
                           </ul>\
                         </div>\
                       </div>\
                     </div>\
                   </div>\
                 </div>';
      $('#locations').append(html);

    });
  }
  stop_loading();
}

function generateLocation_trash(result) {

  if (! result.length == 0) {
    result.forEach(function(element) {
      let code = element.code;
      let name = element.client_name;
      let type = element.type;
      let email = element.client_email;
      let phone = element.phone;
      let hour_start = element.hour_start;
      let hour_end = element.hour_end;
      let terrain = element.terrain;
      let players = element.players;

      let html = '<div class="col s12 m6 l6" style="cursor: pointer"> \
                   <div>  \
                     <div class="card grey lighten-4">\
                       <div class="card-content  black-text">\
                         <div class="row">\
                           <ul class="collection with-header">\
                             <li class="collection-header center"><h5>' + name + '</h5></li>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + type + '</span>Type: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + phone + '</span>Tel: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + email + '</span>Mail: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + hour_start + '</span>Départ: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + hour_end + '</span>Fin: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + terrain + '</span>Terrain: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + players + '</span>Personnes: </a>\
                           </ul>\
                         </div>\
                         <div class="center">\
                         <a class="waves-effect waves-light btn" onclick="restore_Location(`' + code + '`);"  >Restaurer Location</a>\
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

function parseResult(result) {
  let data = [];
  if (! jQuery.isEmptyObject(result)){
    result.forEach(function(element, i) {

      if (element.location != null) {
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
      }

    })}
  return data;
}
function parseResult_Trash(result) {

  let data = [];
  if (! jQuery.isEmptyObject(result)){
    result.forEach(function(element, i) {
      if (element != null) {
        data[i] = {};
        data[i].code = element.code;
        data[i].deleted_at = element.deleted_at;
        data[i].client_name = element.clients.client.name + " " + element.clients.client.last_name;
        data[i].client_email = element.clients.client.email;
        data[i].phone = element.clients.client.phone;
        data[i].type = element.type.name;
        data[i].hour_start = element.hour_start;
        data[i].hour_end = element.hour_end;
        data[i].players = element.players;
        data[i].terrain = element.terrain_id;
      }
    })}
  return data;
}

function clickOnProduct(name, price, id, key) {


  swal(name, {
      content: create_minus_plus("1", "100", "1"),
      buttons: {
        "ANNULER": {
          value: "annuler",
        },
        "AJOUTER": {
          value: "ajouter",
        }
      }
    })
    .then((value) => {



      switch (value) {

        case "annuler":
          swal("Operation cancelée!", {
            className: "red",
            buttons: false,
            timer: 600,
          });
          break;

        case "ajouter":
          start_loading();
          value = $("#input_counter").val();
          addNumberList(id, parseInt(value));
          actualize();
          Materialize.toast(+value + '  ' + name + '   -> List', 3000);
          break;
      }

    });

    let input = document.getElementById("input_counter");
    input.addEventListener("keyup", function a(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        value = $("#input_counter").val();
        addNumberList(id, parseInt(value));
        actualize();
        Materialize.toast(+value + '  ' + name + '   -> List', 3000);
        swal.close();
        input.removeEventListener ("keyup", a );
      }
    });
    }


function clickInList(name, price, id, key) {
  let list_total = getList(key);
  swal({
      title: "Selectioner votre option",
      content: create_minus_plus("1", list_total, "1"),
      buttons: {
        "SUPPRIMER": {
          value: "Supprimer",
        },
        "TOUT": {
          text: "TOUT OK",
          value: "tout",
        },
        "OK": {
          value: "choisir",
        }
      }
    })
    .then((value) => {
      switch (value) {

        case "Supprimer":
          start_loading();
          value = $("#input_counter").val();
          removeNumberList(id, parseInt(value));
          actualize();
          Materialize.toast(parseInt(value) + '  ' + name + '   Deleted', 3000);
          break;
        case "tout":
          start_loading();
          if (list_total > 0) {
            editproduct(id, 0, list_total, list_total, 0);
            actualize();
            Materialize.toast(list_total + '  ' + name + '   -> Payment', 3000);
          } else {
            swal({
              title: " Il n'y plus de " + name,
              icon: "warning",
            });
          }
          break;
        case "choisir":
          start_loading();
          value = $("#input_counter").val();
          editproduct(id, 0, parseInt(value), parseInt(value), 0)
          Materialize.toast(+value + '  ' + name + '   -> Payment', 3000);
          actualize();
          break;
      }
    })

    let input = document.getElementById("input_counter");
    input.addEventListener("keyup", function a(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        value = $("#input_counter").val();
        editproduct(id, 0, parseInt(value), parseInt(value), 0)
        Materialize.toast(+value + '  ' + name + '   -> Payment', 3000);
        actualize();
        swal.close();
        input.removeEventListener ("keyup", a );
      }
    });
}

function clickInPay(name, price, id, key) {
  let pay_total = getPay(key);
  swal({
      title: "Enlever du payment",
      content: create_minus_plus("1", pay_total, "1"),
      buttons: {
        "TOUT": {
          text: "TOUT ENLEVER",
          value: "tout",
        },
        "ENLEVER": {
          value: "choisir",
        }
      }
    })
    .then((value) => {
      switch (value) {
        case "tout":
          start_loading();
          editproduct(id, pay_total, 0, 0, pay_total);
          actualize();
          Materialize.toast(+pay_total + '  ' + name + ' <-- List', 3000);
          break;
        case "choisir":
          start_loading();
          value = $("#input_counter").val()
          editproduct(id, parseInt(value), 0, 0, parseInt(value));
          actualize();
          Materialize.toast(+value + '  ' + name + '   <- List', 3000);
          break;
        default:
          swal("Operation cancelée!", {
            className: "red",
            buttons: false,
            timer: 600,
          });
      }
    });
}

function writeLocation(code_loc) {
  window.open("terrain?code_loc=" + code_loc, "_self");
}

function clickLocation() {
  let code_loc = location.search.split('code_loc=')[1]
  let urls = LOCATIONSGET.replace("{locationid}", code_loc);
  $.ajax({
    url: urls,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      productForSell = data.products;
      printClient(data);
    },
  });
}

function printClient(element) {
  let name = element.client.name;
  let type = element.location.type_id;
  let email = element.client.email;
  let phone = element.client.phone;
  let hour_start = element.location.hour_start;
  let hour_end = element.location.hour_end;
  let terrain = element.location.terrain_id
  let players = element.location.players;
  let code = element.location.code;
  let location_id = element.location.id;
  let last_name = element.client.last_name;
  if (terrain == 1) {
    terrain = "Terrain P"
  }
  if (terrain == 2) {
    terrain = "Terrain A"
  }
  if (terrain == 3) {
    terrain = "Terrain S"
  }
  let html = '<a href="#modal2"  class=" modal-trigger brand-logo center"><b>' + name + ' ' + last_name + '</b> (' + terrain + ') </a>'
  let html2 = '<table>\
                  <tr> \
                   <td><h3><b>Email:</b></h3></td>\
                   <td><h3>' + email + '</h3></td>\
                 </tr>\
                  <tr> \
                   <td><h3><b>Portable:</b></h3></td>\
                   <td><h3>' + phone + '</h3></td>\
                 </tr>\
                  <tr> \
                   <td><h3><b>Terrain:</b></h3></td>\
                   <td><h3>' + terrain + '</h3></td>\
                 </tr>\
                  <tr> \
                   <td><h3><b>Départ:</b></h3></td>\
                   <td><h3>' + hour_start + '</h3></td>\
                 </tr>\
                  <tr> \
                   <td><h3><b>Fin:</b></h3></td>\
                   <td><h3>' + hour_end + '</h3></td>\
                 </tr>\
                  <tr> \
                   <td><h3><b>Joueurs:</b></h3></td>\
                   <td><h3>' + players + '</h3></td>\
                 </tr>';
  let html3 = name;
  $('title').append(html3)
  $('#name_lastName').append(html);
  $('#modal2_content').append(html2);
}


function modifyProduct(id) {

  //let list_types = get_types_locations().responseJSON.types;

/*  list_types.forEach(function(type){
    if ($("#type_" + type.id + "_" + id).is(':checked') == true && $("#type_" + type.id + "_" + id).attr("data") == "false"){

      urls = TYPE.replace("{product_id}", id).replace("{type_id}", type.id);
      $.ajax({
        url: urls,
        type: 'POST',
        contentType: 'application/json',
        async: false,
        success: function(data) {
          console.log("POST")
        }
      });
    }
    if ($("#type_" + type.id + "_" + id).is(':checked') == false && $("#type_" + type.id + "_" + id).attr("data") == "true"){

      urls = TYPE.replace("{product_id}", id).replace("{type_id}", type.id);
      $.ajax({
        url: urls,
        type: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify(`{"ok": true}`),
        async: false,
        success: function(data) {
          console.log("DELETE")
        }
      });
    }
  });*/

  let dataJson = {
    "icon_id": $("#input_icon_" + id + "").val(),
    "name": $("#input_name_" + id + "").val(),
    "price": $("#input_price_" + id + "").val()
  }
  modifyProductAjax(id, dataJson);
  actualize_config_products()
}

function createProduct() {

  let dataJson = {
    "icon_id": $("#input_icon_create_product").val(),
    "name": $("#input_name_create_product").val(),
    "price": $("#input_price_create_product").val(),
    "type": []
  }
/*
    let list_types = get_types_locations().responseJSON.types;
    list_types.forEach(function(type){
      if ($("#type_" + type.id + "_new").is(':checked') == true){
        dataJson.type.push({id: type.id});
      };
    });*/
    createProductAjax(dataJson)
    location.reload();
}

function deleteProduct(id) {
  swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        let dataJson = {
          "ok": true
        };
        let urls = PRODUCTSDELETE;
        urls = urls.replace("{product_id}", id);
        return $.ajax({
          url: urls,
          type: 'DELETE',
          contentType: 'application/json',
          data: JSON.stringify(dataJson),
          async: false,
          success: function(data) {
            actualize_config_products();
            return data;
          }
        });
      } else {
        swal("Your product is safe!");
      }
    });
}

function addNumberList(key, quantity) {
  let dataJson = {
    "add": {
      "products_in_list": quantity,
      "products_in_payment": 0
    }
  };
  productsAjax(key, dataJson);
}

function removeNumberList(key, quantity) {
  let dataJson = {
    "remove": {
      "products_in_list": quantity,
      "products_in_payment": 0
    }
  };
  productsAjax(key, dataJson);
}

function addNumberPay(key, quantity) {
  let dataJson = {
    "add": {
      "products_in_list": 0,
      "products_in_payment": quantity
    }
  };
  productsAjax(key, dataJson);
}

function removeNumberPay(key, quantity) {
  let dataJson = {
    "remove": {
      "products_in_list": 0,
      "products_in_payment": quantity
    }
  };
  productsAjax(key, dataJson);
}

function editproduct(key, add_List, remove_List, add_Pay, remove_Pay) {
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

function productsAjax(key, dataJson) {

  let code_loc = location.search.split('code_loc=')[1];
  let urls = LOCATIONPUT;
  urls = urls.replace("{location_code}", code_loc);
  urls = urls.replace("{product_id}", key);
  return $.ajax({
    url: urls,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(dataJson),
    async: false,
    success: function(data) {
      return data;
    }
  });
}

function modifyProductAjax(key, dataJson) {
  let urls = PRODUCTSPUT;
  urls = urls.replace("{product_id}", key);
  return $.ajax({
    url: urls,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(dataJson),
    async: false,
    success: function(data) {
      return data;
    }
  });
}
/*function get_types_locations(){
  let urls = GETTYPESLOCATION;
  return $.ajax({
    url: urls,
    type: 'GET',
    contentType: 'application/json',
    async: false,
    success: function(data) {
      return data;
    }
  });
}*/

function createProductAjax(dataJson) {
  let urls = PRODUCTS;
  return $.ajax({
    url: urls,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(dataJson),
    async: false,
    success: function(data) {
      return data;
      console.log(data);
    }
  });
}

function getListProducts() {
  let urls = PRODUCTS;
  return $.ajax({
    url: urls,
    type: 'GET',
    contentType: 'application/json',
    async: false,
    success: function(data) {
      return data;
    }
  });
}

function getIcons() {
  let urls = ICONS;
  return $.ajax({
    url: urls,
    type: 'GET',
    contentType: 'application/json',
    async: false,
    success: function(data) {
      return data;
    }
  });
}

function printIconsList() {
  let html = '<datalist id="icons">'
  ICONSLIST.forEach(function(icon) {
    let name = icon.name;
    let ref = icon.ref;
    let id = icon.id;
    html = html + '<option value="' + id + '">' + name + '</option>'
  })
  html = html + '</datalist>'
  $('body').append(html);
}

function printListProducts() {

  let list = getListProducts().responseJSON.products;
/*  let list_types = get_types_locations().responseJSON.types;*/
  let html_types = '';

  list.forEach(function(product) {
    let name = product.name;
    let price = product.price;
    let icon = product.icon_ref;
    let id = product.id;
    let product_type_ids = product.type




  /*  list_types.forEach(function(type){
        let type_id = type.id;
        let type_name = type.name;
        let type_check = false;
        product_type_ids.forEach(function(type_checked){
          if (type_id == type_checked.type_id){
            type_check = true;
          }
        })

        if (type_check){
          html_types +=  ' <p class="col 3">\
                        <input data="true" value="'+ type_id +'" type="checkbox" class="filled-in" id="type_'+ type_id +'_' + id + '" checked="checked"/> \
                        <label for="type_'+ type_id +'_' + id + '">' + type_name + '</label> \
                      </p>';
        }

        else{
        html_types +=  ' <p class="col 3">\
                      <input data="false" value="'+ type_id +'" type="checkbox" class="filled-in" id="type_'+ type_id +'_' + id + '"/> \
                      <label for="type_'+ type_id +'_' + id + '">' + type_name + '</label> \
                    </p>';
          }
      });*/

    let html = '<div id="modal_' + id + '" class="modal modal-fixed-footer">  \
    <div class="modal-content">  \
      <h4>' + name + '</h4>  \
      <div class="row">  \
        <form class="col s12">  \
          <div class="row">  \
            <div class="input-field col s5">  \
              <input value="' + name + '" id="input_name_' + id + '" type="text" class="validate">  \
              <label for="first_name"></label>  \
            </div>  \
             \
            <div class="input-field col s2">  \
              <input value="' + price + '" id="input_price_' + id + '" type="text" class="validate">  \
              <label for="first_name"></label>  \
            </div>  \
            <div class="input-field col s5">  \
              <select value="' + icon + '" class="icons-select" id="input_icon_' + id + '"></select>  \
          </div>  \
          </div> \
          <div class="row"> \
          '+ html_types +' \
          </div> \
        </form>  \
      </div>  \
    </div>  \
    <div class="modal-footer">  \
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat orange-text">Cancel</a>  \
      <a href="#!" onclick="deleteProduct(' + id + ');" class="modal-action modal-close waves-effect waves-green btn-flat red-text">Supprimer</a> \
      <a href="#!" onclick="modifyProduct(' + id + ')" class="modal-action modal-close waves-effect waves-green btn-flat green-text">Modifier</a>  \
    </div>  \
  </div>';
    $('#products_body').append(html);
    html_types = '';
  });
  let icons = getIcons();
  let row = 1;
  list.forEach(function(product) {
    let name = product.name;
    let price = product.price;
    let icon = product.icon_ref;
    let id = product.id;
    let html = '';
    if (row % 3 == 0) {
      html = '<div class="row">'
    }
    html = html + '<div class="col s1"></div><div class="card col s2 hoverable container"  > \
      <div class="card-image waves-effect waves-block waves-light center-align"> \
        <i class="activator fa ' + icon + ' fa-10x"></i> \
      </div> \
      <div class="card-content"> \
      <div class="card-action"> \
        <span class="card-title activator grey-text text-darken-4"><p class="center"><b>' + name + '</b></p></span> \
        <span class="card-title activator grey-text text-darken-4">Price :  <p class="right">' + price + '</p></span> \
      </div> \
      </div> \
      <div class="card-action"> \
      <a class="red-text" href="#" onclick="deleteProduct(' + id + ');" >Supprimer</a>  \
        <a class="blue-text modal-trigger right" href="#modal_' + id + '">Editer</a>  \
      <div class="card-reveal"> \
        <span class="card-title grey-text text-darken-4">' + name + '<i class="fa fa-times-circle-o right"></i></span> \
        <p> \
          Icon Name: ' + icon + '<br><br> Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.<br> \
        </p> \
      </div> </div> \
    </div><div class="col s1"></div> ';
    $('#products_list').append(html);
    row++;
  });
  this.init_select2(icons);
  $('.modal').modal();
  stop_loading();
}

function actualize_config_products(){
  $('#products_list').html('');
  $('#products_body').html('');
  printListProducts();
}

function init_select2(icons) {
  icons.then(function(data) {
    result = [];
    for (i = 0; i < data.length; i++) {
      name = "<div>" + '<i class="right fa fa-2x ' + data[i].ref + '"></i> ' + data[i].name + "</div>";
      result[i] = {
        id: data[i].id,
        text: name
      };
    };
    $('.icons-select').select2({
      cache: true,
      data: result,
      templateResult: function(d) {
        return $(d.text);
      },
      templateSelection: function(d) {
        return $(d.text);
      }
    });
  });
  actualize_icons_select2();
  return true;
}

function actualize_icons_select2() {
  return setTimeout(function() {
    let list = getListProducts().responseJSON.products;

    list.forEach(function(product) {
      let icon_id = product.icon_id;
      let id = product.id;

      $("#input_icon_" + id).val(icon_id);
      $("#input_icon_" + id).trigger('change');
    });
  }, 2000);
}

function getLocation() {
  $.ajax({
    url: CLIENTS,
    type: "GET",
    dataType: 'json',
    success: function(result) {
      generateLocation(parseResult(result));
      getLocation_Trash();
    }
  });
}
function getLocation_Trash() {
  $.ajax({
    url: GETLOCATIONTRASH,
    type: "GET",
    dataType: 'json',
    success: function(result) {
      generateLocation_trash(parseResult_Trash(result));
    }
  });
}

function restore_Location(code) {
  swal({
      title: "Reouverture de la caisse ",
      text: "Un mail a déjà été envoyé au client, y compris la facture en PDF",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((ok) => {
      if (ok) {
        urls = PUTRESTORELOCATION;
        urls = urls.replace("{location_code}", code);
        $.ajax({
          url: urls,
          type: "PUT",
          dataType: 'json',
          success: function(result) {
            location.reload();
          }
        });
      } else {
        swal("La caisse ne s'est pas fermée", {
          icon: "info",
          timer: 650,
          buttons: false,
        });
      }
    });
}

function close_Cash_register() {
  let code_loc = location.search.split('code_loc=')[1];
  let urls = DELETELOCAION.replace("{location_code}", code_loc);
  let dataJson = '{"ok": true}';
  swal({
      title: "Fermeture de la caisse ",
      text: "Un mail sera envoyé au client, y compris la facture en PDF",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((ok) => {
      if (ok) {
        $.ajax({
          url: urls,
          type: "DELETE",
          contentType: 'application/json',
          data: JSON.stringify(dataJson),
          success: function(result) {
            location.href = MAINFRONT;
          }
        });
      } else {
        swal("La caisse ne s'est pas fermée", {
          icon: "info",
          timer: 650,
          buttons: false,
        });
      }
    });
};

function click_pay_cash() {
  if ($("#totalPay").text() === "0  CHF") {
    swal("Rien à encaisser", {
      timer: 750,
      buttons: false,
      icon: "error",
    });
  } else {
    $('#modal_pay_cash').modal('open')
  }
}

function pay_cash() {
  let origin = getProducts();
  let products = origin.responseJSON.products;
  let id_location = origin.responseJSON.location.id;
  let to_pay = [];
  products.forEach(function(product) {
    let in_payment = product.products_in_payment
    let id_product = product.id
    if (in_payment > 0) {
      let object = {}
      object.product_id = id_product;
      object.quantity = in_payment;
      to_pay.push(object);
      removeNumberPay(id_product, in_payment)
    }
  });
  pay_products(1, to_pay, id_location)
}

function pay_products(payment_type, to_pay, id_location) {

  let urls = PUTPAYMENT;
  urls = urls.replace("{location_id}", id_location);
  urls = urls.replace("{type_id}", payment_type);
  $.ajax({
    url: urls,
    type: "PUT",
    contentType: 'application/json',
    data: JSON.stringify(to_pay),
    success: function(result) {
      //location.href = MAINFRONT;
    }
  });
}

function click_pay_carte() {
  if ($("#totalPay").text() === "0  CHF") {
    swal("Rien à encaisser", {
      timer: 750,
      buttons: false,
      icon: "error",
    });
  } else {
    swal({
        title: "Payment par CARTE",
        text: $("#totalPay").text(),
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
      .then((willDelete) => {
        if (willDelete) {
          start_loading();
          pay_carte();
          swal("C'est fait", {
              icon: "success",
              timer: 650,
              buttons: false,
            })
            .then((value) => {
              actualize();
            });
        } else {
          swal("Vous n'avez rien encaissé!");
        }
      });
  }
}

function pay_carte() {
  let origin = getProducts();
  let products = origin.responseJSON.products;
  let id_location = origin.responseJSON.location.id;
  let to_pay = [];

  products.forEach(function(product) {
    let in_payment = product.products_in_payment
    let id_product = product.id
    if (in_payment > 0) {
      let object = {}
      object.product_id = id_product;
      object.quantity = in_payment;
      to_pay.push(object);
      removeNumberPay(id_product, in_payment)
    }
  });
  pay_products(2, to_pay, id_location)
}

function create_minus_plus(minimum, maximum, value) {

  let div_principal = document.createElement("div");
  let div = document.createElement("div");
  let spam_minus = document.createElement("span");
  let button_minus = document.createElement("button");
  let fa_minus = document.createElement("span");
  let input = document.createElement("input");
  let spam_plus = document.createElement("spam");
  let button_plus = document.createElement("button");
  let fa_plus = document.createElement("span");

  $(div_principal).attr({
    class: "center_range",
    id: "div_counter"
  });
  $(button_minus).attr({
    type: "button",
    class: "btn-floating btn-large waves-effect waves-light red",
    "data-type": "minus",
    "data-field": "quant[2]"
  });
  $(fa_minus).attr("class", "fa fa-minus");
  $(fa_plus).attr("class", "fa fa-plus");
  $(button_plus).attr({
    type: "button",
    class: "btn-floating btn-large waves-effect waves-light green",
    "data-type": "plus",
    "data-field": "quant[2]"
  });


  $(input).attr({
    type: "number",
    name: "quant[2]",
    class: "form-control input-number",
    value: value,
    min: minimum,
    max: maximum,
    autofocus: "",
    id: "input_counter"
  });

  div_principal.appendChild(div);
  div.appendChild(spam_minus);
  div.appendChild(input);
  div.appendChild(spam_plus);
  spam_minus.appendChild(button_minus);
  button_minus.appendChild(fa_minus);
  spam_plus.appendChild(button_plus);
  button_plus.appendChild(fa_plus);

  let script = document.createElement("script");
  script.innerHTML = `




  $(document).ready(function(){
var autoselect = document.getElementById('input_counter');
autoselect.select();

  });

    $('.btn-floating').click(function(e){
      e.preventDefault();
      fieldName = $(this).attr('data-field');
      type      = $(this).attr('data-type');
      var input = $("input[name='"+fieldName+"']");
      var currentVal = parseInt(input.val());


      if (!isNaN(currentVal)) {
          if(type == 'minus') {

              if(currentVal > input.attr('min')) {
                  input.val(currentVal - 1).change();
              }
              if(parseInt(input.val()) == input.attr('min')) {
                  $(this).attr('disabled', true);
              }

          } else if(type == 'plus') {

              if(currentVal < input.attr('max')) {
                  input.val(currentVal + 1).change();
              }
              if(parseInt(input.val()) == input.attr('max')) {
                  $(this).attr('disabled', true);
              }

          }
      } else {
          input.val(0);
      }
  });
  $('.input-number').focusin(function(){
     $(this).data('oldValue', $(this).val());
  });
  $('.input-number').change(function() {

      minValue =  parseInt($(this).attr('min'));
      maxValue =  parseInt($(this).attr('max'));
      valueCurrent = parseInt($(this).val());
      name = $(this).attr('name');
      if(valueCurrent >= minValue) {
          $(".btn-floating[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
      } else {
        swal({title: "Vous avez depassé le minimum possible",
              icon: "warning",
              });;
          $(this).val($(this).data('oldValue'));
      }
      if(valueCurrent <= maxValue) {
          $(".btn-floating[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
      } else {
        swal({title: "Vous avez depassé le maximun possible",
              icon: "warning",
              });;
          $(this).val($(this).data('oldValue'));
      }


  });
  $(".input-number").keydown(function (e) {
          // Allow: backspace, delete, tab, escape, enter and .
          if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
               // Allow: Ctrl+A
              (e.keyCode == 65 && e.ctrlKey === true) ||
               // Allow: home, end, left, right
              (e.keyCode >= 35 && e.keyCode <= 39)) {
                   // let it happen, don't do anything
                   return;
          }
          // Ensure that it is a number and stop the keypress
          if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
              e.preventDefault();
          }
      });`;
  div_principal.appendChild(script);
  return div_principal;
}

function start_loading(){
  document.getElementById('loading_section').style.opacity = 0.2;
  $('#loading').fadeIn(1);
}
function stop_loading(){
  document.getElementById('loading_section').style.opacity = 1;
  $('#loading').fadeOut(1);
}
