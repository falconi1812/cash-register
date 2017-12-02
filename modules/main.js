function products() {
  let i = 0;

  Object.keys(productsForSell).map(function(key) {
    generateProduct(productsForSell[key], key);

    if (i == 2 | i == 5 | i == 8 | i == 11 | i == 14) {
      let html = '</div>\
                    <div class="row">';
      $('#products').append(html);
      $('#list').append(html);
      $('#topay').append(html);
    }
    i++;
  });

  countingAll();
  let html = '</div>';
  $('#products').append(html);
  $('#list').append(html);
}

function generateProduct(productForSell, key) {
  name = productForSell.name;
  icon = productForSell.icon;

  let html = '<a class="white-text imgicon " onclick="clickOnProduct(\'' + key + '\')" aria-label="' + name + '"> \
     <i  class="fa fa-' + icon + ' fa-2x fa-border hoverable" aria-hidden="true" title="' + name + '"><i class="fa fa-plus" aria-hidden="true"></i></i>\
    </a>';

  let html2 = '<a class="white-text imgicon " onclick="clickInList(\'' + key + '\')" aria-label="' + name + '"> \
     <i id ="list' + name + '" class="fa fa-' + icon + ' fa-2x fa-border hoverable" aria-hidden="true" title="' + name + '"></i>\
    </a>';

  let html3 = '<a class="white-text imgicon " onclick="clickInPay(\'' + key + '\')" aria-label="' + name + '"> \
     <i id ="pay' + name + '" class="fa fa-' + icon + ' fa-2x fa-border hoverable" aria-hidden="true" title="' + name + '"></i>\
    </a>';

  $('#products').append(html);
  $('#list').append(html2);
  $('#topay').append(html3);
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
  Object.keys(productsForSell).map(function(key) {
    $("#list" + productsForSell[key].name + "").append(productsForSell[key].inList);
    $("#pay" + productsForSell[key].name + "").append(productsForSell[key].inSell);
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
  console.log(result);
  let data = [];
  result.forEach(function(element, i) {
    data[i] = {};
    //console.log(element);
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

function printClient(element) {

  let name = element.client.name;
  let type = element.type_id;
  let email = element.client.email;
  let phone = element.client.phone;
  let hour_start = element.hour_start;
  let hour_end = element.hour_end;
  let terrain = element.terrain_id;
  let players = element.players;
  let code = element.code;
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
                 </tr>'
  $('#name_lastName').append(html);
  $('#modal2_content').append(html2);
}
