const MAIN = "https://api-paintball.herokuapp.com";
const CLIENTS = MAIN + "/clients/2017-10-29";
const LOCATIONSGET = MAIN + "/locations/{locationid}";
const LOCATIONPUT = MAIN + "/locations/products/{location_code}/{product_id}";
const PRODUCTS = MAIN + "/products";
const PRODUCTSPUT = MAIN + "/products/{product_id}";
const PRODUCTSDELETE = MAIN + "/products/{product_id}";
const ICONS = MAIN + "/icons";
const ICONSLIST = getIcons().responseJSON;
const DELETELOCAION = MAIN + "/locations/{location_code}"
const MAINFRONT = "http://127.0.0.1:8080"
const PUTPAYMENT = MAIN + "/payments/{location_id}/{type_id}"

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

    let html = '<a class="white-text imgicon col m12 l4"  onclick="clickOnProduct(\'' + name + '\',\'' + price + '\',\'' + id + '\',\'' + i + '\')" aria-label="' + name + '"> \
       <i  class="fa ' + icon + ' fa-4x fa-border hoverable" aria-hidden="true" title="' + name + '"></i></i>\
      </a>';

    let html2 = '<a class="white-text imgicon col m12 l4" id="list_fade'+ id +'" onclick="clickInList(\'' + name + '\',\'' + price + '\',\'' + id + '\',\'' + i + '\')" aria-label="' + name + '"> \
       <i id ="list' + id + '" class="fa ' + icon + ' fa-3x fa-border hoverable" aria-hidden="true" title="' + name + '">' + products_in_list + '</i>\
      </a>';

    let html3 = '<a class="white-text imgicon col m12 l4" id="pay_fade'+ id +'" onclick="clickInPay(\'' + name + '\',\'' + price + '\',\'' + id + '\',\'' + i + '\')" aria-label="' + name + '"> \
       <i id ="pay' + id + '" class="fa ' + icon + ' fa-3x fa-border hoverable" aria-hidden="true" title="' + name + '">' + products_in_payment + '</i>\
      </a>';

    $('#products').append(html);
    $('#list').append(html2);
    $('#topay').append(html3)

    if (products_in_list == 0){
      $("#list_fade"+id+"").fadeOut();
    }
    else{
      $("#list_fade"+id+"").fadeIn();
    }
    if (products_in_payment == 0 ){
      $("#pay_fade"+id+"").fadeOut();
    }
    else{
      $("#pay_fade"+id+"").fadeIn();
    }
    totalInList += products_in_list * price;
    totalInPay += products_in_payment * price;
    }
  $('#totalList').html(totalInList + "  CHF");
  $('#totalPay').html(totalInPay + "  CHF");

  if($("#totalList").text() === "0  CHF"){
    $("#container_list").fadeOut();
  }
  else{
    $("#container_list").fadeIn();
  }
  if($("#totalPay").text() === "0  CHF" && $("#totalPayed").text() === "0 CHF"){
    $("#container_payment").fadeOut();
  }
  else if($("#totalPay").text() === "0  CHF" && $("#totalPayed").text() !== "0 CHF"){
    $("#topay").fadeOut();
    $("#PAYMENT").fadeOut();
    $("#PAYMENT_INFO").fadeOut();
    $("#total_a_payer").fadeOut();
  }
  else{
    $("#container_payment").fadeIn();
    $("#topay").fadeIn();
    $("#PAYMENT").fadeIn();
    $("#PAYMENT_INFO").fadeIn();
    $("#total_a_payer").fadeIn();
  }

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
    let id = key.id;
    if (products_in_list == 0){
      $("#list_fade"+id+"").fadeOut();
    }
    else{
      $("#list_fade"+id+"").fadeIn();
    }
    if (products_in_payment == 0){
      $("#pay_fade"+id+"").fadeOut();
    }
    else{
      $("#pay_fade"+id+"").fadeIn();
    }
    $('#list' + id).html(products_in_list);
    $('#pay' + id).html(products_in_payment);

    totalInList += products_in_list * price;
    totalInPay += products_in_payment * price;
  })

  $('#totalList').html(totalInList + "  CHF");
  $('#totalPay').html(totalInPay + "  CHF");

  if($("#totalList").text() === "0  CHF"){
    $("#container_list").fadeOut();
  }
  else{
    $("#container_list").fadeIn();
  }
  if($("#totalPay").text() === "0  CHF" && $("#totalPayed").text() === "0 CHF"){
    $("#container_payment").fadeOut();
  }
  else if($("#totalPay").text() === "0  CHF" && $("#totalPayed").text() !== "0 CHF"){
    $("#topay").fadeOut();
    $("#PAYMENT").fadeOut();
    $("#PAYMENT_INFO").fadeOut();
    $("#total_a_payer").fadeOut();
  }
  else{
    $("#container_payment").fadeIn();
    $("#topay").fadeIn();
    $("#PAYMENT").fadeIn();
    $("#PAYMENT_INFO").fadeIn();
    $("#total_a_payer").fadeIn();
  }
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
                     <div class="card grey darken-4">\
                       <div class="card-content  black-text">\
                         <div class="row">\
                           <ul class="collection with-header">\
                             <li class="collection-header center"><h5>' + name + '</h5></li>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + type + '</span>Type: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + phone + '</span>tel: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + email + '</span>mail: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + hour_start + '</span>Heure start: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + hour_end + '</span>Heure end: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + terrain + '</span>Terrain: </a>\
                             <a class="collection-item grey-text darken-2"><span class="badge black-text">' + players + '</span>Nombre: </a>\
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
function parseResult(result) {
  let data = [];
  result.forEach(function(element, i) {

    if(element.location != null){
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

  })
  return data;
}
function clickOnProduct(name, price, id, key) {
  swal("Ajouter -> " + name, {
      content: "input",
    })
    .then((value) => {
      if (value == 0) {
        swal({
          title: " Il faut écrire un numero",
          icon: "warning",
        });
      } else {
        addNumberList(id, parseInt(value));
        actualize();
        Materialize.toast(+value + '  ' + name + '   -> List', 3000);
      }
    });
}
function clickInList(name, price, id, key) {
  let list_total = getList(key);
  swal({
      title: "Selectioner votre option",
      buttons: {
        "Surimer": {
          value: "Suprimer",
        },
        "Tout->": {
          value: "tout",
        },
        "Un->": {
          value: "un",
        },
        "->": {
          value: "choisir",
        }
      }
    })
    .then((value) => {
      switch (value) {
        case "Suprimer":
          swal("Combien?", {
              content: "input",
            })
            .then((value) => {

              if (list_total > 0 && list_total >= parseInt(value)) {
                removeNumberList(id, parseInt(value));
                actualize();
                Materialize.toast(parseInt(value) + '  ' + name + '   Deleted', 3000);

              } else {
                swal({
                  title: " Il n'y a pas assez ---> " + name,
                  icon: "warning",
                });
              }
            });
          break;

        case "tout":

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

        case "un":
          if (list_total > 0) {

            editproduct(id, 0, 1, 1, 0);
            actualize();
            Materialize.toast(1 + '  ' + name + '   -> Payment', 3000);

          } else {
            swal({
              title: " Il n'y plus de " + name,
              icon: "warning",
            });
          }
          break;
        case "choisir":
          swal("Combien?:", {
              content: "input",
            })
            .then((value) => {

              if (list_total > 0 && list_total >= parseInt(value)) {

                editproduct(id, 0, parseInt(value), parseInt(value), 0)
                Materialize.toast(+value + '  ' + name + '   -> Payment', 3000);
                actualize();

              } else if (value == "0" | value == 0) {
                swal({
                  title: " Il faut écrire un numero",
                  icon: "warning",
                });
              } else {
                swal({
                  title: " Il n'y a pas assez ---> " + name,
                  icon: "warning",
                });
              }
            });
          break;
        default:
          swal("Operation cancelé!", {
            className: "red",
            buttons: false,
            timer: 600,
          });
      }
    })
}
function clickInPay(name, price, id, key) {
  let pay_total = getPay(key);
  swal({
      title: "Selectioner votre option",
      buttons: {
        Suprimer: {
          value: "Suprimer",
        },
        Tout: {
          value: "tout",
        },
        Un: {
          value: "un",
        },
        "<=": {
          value: "choisir",
        }
      }
    })
    .then((value) => {
      switch (value) {

        case "Suprimer":
          swal("Combien?", {
              content: "input",
            })
            .then((value) => {
              if (pay_total > 0 && pay_total >= parseInt(value)) {
                removeNumberPay(id, parseInt(value));
                actualize();
                Materialize.toast(parseInt(value) + '  ' + name + '   Deleted', 3000);

              } else {
                swal({
                  title: " Il n'y a pas assez ---> " + name,
                  icon: "warning",
                });
              }
            });
          break;

        case "tout":
          editproduct(id, pay_total, 0, 0, pay_total);
          actualize();
          Materialize.toast(+pay_total + '  ' + name + ' <-- List', 3000);
          break;

        case "un":
          if (pay_total > 0) {
            editproduct(id, 1, 0, 0, 1);
            actualize();
            Materialize.toast(1 + '  ' + name + '   <- List', 3000);
          } else {
            swal({
              title: " Il n'y plus de " + name,
              icon: "warning",
            });
          }
          break;
        case "choisir":
          swal("Combien?:", {
              content: "input",
            })
            .then((value) => {

              if (pay_total > 0 && pay_total >= parseInt(value)) {

                editproduct(id, parseInt(value), 0, 0, parseInt(value));
                actualize();
                Materialize.toast(+value + '  ' + name + '   <- List', 3000);
              } else if (value == 0) {
                swal({
                  title: " Il faut écrire un numero",
                  icon: "warning",
                });
              } else {
                swal({
                  title: " Il n'y a pas assez ---> " + name,
                  icon: "warning",
                });
              }
            });
          break;
        default:
          swal("Operation cancelé!", {
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
  let html = '<a href="#modal2" class="modal-trigger brand-logo center">' + name + '</a>'
  let html2 = '<table>\
                  <tr> \
                   <td><b>Email:</b></td>\
                   <td>' + email + '</td>\
                 </tr>\
                  <tr> \
                   <td><b>Phone:</b></td>\
                   <td>' + phone + '</td>\
                 </tr>\
                  <tr> \
                   <td><b>Terrain:</b></td>\
                   <td>' + terrain + '</td>\
                 </tr>\
                  <tr> \
                   <td><b>Hour Start:</b></td>\
                   <td>' + hour_start + '</td>\
                 </tr>\
                  <tr> \
                   <td><b>Hour End:</b></td>\
                   <td>' + hour_end + '</td>\
                 </tr>\
                  <tr> \
                   <td><b>Initial Players:</b></td>\
                   <td>' + players + '</td>\
                 </tr>';
  let html3 = name;
  $('title').append(html3)
  $('#name_lastName').append(html);
  $('#modal2_content').append(html2);
}
function modifyProduct(id) {
  let dataJson = {

    "icon_id": $("#input_icon_" + id + "").val(),
    "name": $("#input_name_" + id + "").val(),
    "price": $("#input_price_" + id + "").val()
  }
  modifyProductAjax(id, dataJson);
  location.reload();
}
function createProduct() {
  let dataJson = {
    "icon_id": $("#input_icon_create_product").val(),
    "name": $("#input_name_create_product").val(),
    "price": $("#input_price_create_product").val()
  }
  createProductAjax(dataJson);
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
            location.reload();
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
  list.forEach(function(product) {
    let name = product.name;
    let price = product.price;
    let icon = product.icon_ref;
    let id = product.id;
    let html = '<div id="modal_' + name + '" class="modal modal-fixed-footer">  \
    <div class="modal-content">  \
      <h4>' + name + '</h4>  \
      <div class="row">  \
        <form class="col s12">  \
          <div class="row">  \
            <div class="input-field col s6">  \
              <input value="' + name + '" id="input_name_' + id + '" type="text" class="validate">  \
              <label for="first_name">Name</label>  \
            </div>  \
            </div>  \
            <div class="input-field col s6">  \
              <input value="' + price + '" id="input_price_' + id + '" type="text" class="validate">  \
              <label for="first_name">Price in Fr</label>  \
            </div>  \
            <div class="input-field col s6">  \
              <select value="' + icon + '" class="icons-select" id="input_icon_' + id + '"></select>  \
          </div>  \
        </form>  \
      </div>  \
    </div>  \
    <div class="modal-footer">  \
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat orange-text">Cancel</a>  \
      <a href="#!" onclick="deleteProduct(' + id + '); location.reload();" class="modal-action modal-close waves-effect waves-green btn-flat red-text">Suprimer</a> \
      <a href="#!" onclick="modifyProduct(' + id + ')" class="modal-action modal-close waves-effect waves-green btn-flat green-text">Modifier</a>  \
    </div>  \
  </div>';
    $('body').append(html);
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
    html = html + '<div class="card col s3 offset-s1 hoverable container"> \
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
      <a class="red-text" href="#" onclick="deleteProduct(' + id + ');" >Delete</a>  \
        <a class="blue-text modal-trigger right" href="#modal_' + name + '">Edit</a>  \
      <div class="card-reveal"> \
        <span class="card-title grey-text text-darken-4">' + name + '<i class="fa fa-times-circle-o right"></i></span> \
        <p> \
          Icon Name: ' + icon + '<br><br> Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.<br> \
        </p> \
      </div> \
    </div> ';

    $('#products_list').append(html);
    row++;
  });
  this.init_select2(icons);
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
function close_Cash_register(){
  let code_loc = location.search.split('code_loc=')[1];
  let urls = DELETELOCAION.replace("{location_code}", code_loc);
  let dataJson = '{"ok": true}'
  swal({
  title: "tu est sûr de fermer la caisse? ",
  text: "Le client va recevoir une mail avec la facture jointe comme PDF",
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
        success: function(result){
          location.href = MAINFRONT;
      }
      });
    } else {
      swal("tu as pas ferme la Caisse!");
    }
  });
};
function click_pay_cash(){
  if($("#totalPay").text() === "0  CHF"){
    swal("Rien a encaisser","", "error");
  }
  else{
  swal({
  title: "tu es sûr de encaisser en CASH?",
  text: $("#totalPay").text(),
  icon: "warning",
  buttons: true,
  dangerMode: false,
  })
  .then((willDelete) => {
    if (willDelete) {
      pay_cash();
      swal("C'est Fait" , {
        icon: "success",
      })
      .then((value) => {
        location.reload();
      });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
}}
function pay_cash(){
  let origin = getProducts();
  let products =  origin.responseJSON.products;
  let id_location = origin.responseJSON.location.id;
  let to_pay = [];

  products.forEach(function(product){
    let in_payment = product.products_in_payment
    let id_product = product.id
    if(in_payment > 0) {
      let object = {}
      object.product_id = id_product;
      object.quantity = in_payment;
      to_pay.push(object);
      removeNumberPay(id_product, in_payment)
    }
  });
  pay_products(1, to_pay, id_location)
}
function pay_products(payment_type , to_pay, id_location){

  let urls = PUTPAYMENT;
  urls = urls.replace("{location_id}", id_location);
  urls = urls.replace("{type_id}", payment_type);
  $.ajax({
    url: urls,
    type: "PUT",
    contentType: 'application/json',
    data: JSON.stringify(to_pay),
    success: function(result){
      //location.href = MAINFRONT;
      console.log(result);
  }
  });
}
function click_pay_carte(){
  if($("#totalPay").text() === "0  CHF"){
    swal("Rien a encaisser","", "error");
  }
  else{
  swal({
  title: "tu es sûr de encaisser en CARTE?",
  text: $("#totalPay").text(),
  icon: "warning",
  buttons: true,
  dangerMode: false,
  })
  .then((willDelete) => {
    if (willDelete) {
      pay_carte();
      swal("C'est Fait" , {
        icon: "success",
      })
      .then((value) => {
        location.reload();
      });
    } else {
      swal("Vous n'avais rien encaissé!");
    }
  });
}}
function pay_carte(){
  let origin = getProducts();
  let products =  origin.responseJSON.products;
  let id_location = origin.responseJSON.location.id;
  let to_pay = [];

  products.forEach(function(product){
    let in_payment = product.products_in_payment
    let id_product = product.id
    if(in_payment > 0) {
      let object = {}
      object.product_id = id_product;
      object.quantity = in_payment;
      to_pay.push(object);
      removeNumberPay(id_product, in_payment)
    }
  });
  pay_products(2, to_pay, id_location)
}
