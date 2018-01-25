const ICONSLIST = getIcons().responseJSON;


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

    if (row % 3 == 0){
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
