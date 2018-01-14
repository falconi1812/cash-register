function getListProducts(){
  let urls = PRODUCTS;
  return $.ajax({
  url: urls,
  type: 'GET',
  contentType: 'application/json',
  async:false,
  success: function(data){
     return data;
    }
  });
}




function printListProducts(){

  let list = getListProducts().responseJSON.products;


list.forEach(function(product){
  let name = product.name;
  let price = product.price;
  let icon = product.icon_name;
  let id = product.id;

  let html2 = '<div id="modal_' + name + '" class="modal modal-fixed-footer">  \
    <div class="modal-content">  \
      <h4>' + name + '</h4>  \
      <div class="row">  \
        <form class="col s12">  \
          <div class="row">  \
            <div class="input-field col s6">  \
              <input value="' + name + '" id="input_name_'+ id +'" type="text" class="validate">  \
              <label for="first_name">Name</label>  \
            </div>  \
            <div class="input-field col s6">  \
              <input value="' + icon + '" id="input_icon_'+ id +'" type="text" class="validate">  \
              <label for="first_name">Icon Name</label>  \
            </div>  \
            <div class="input-field col s6">  \
              <input value="' + price + '" id="input_price_'+ id +'" type="text" class="validate">  \
              <label for="first_name">Price in Fr</label>  \
            </div>  \
          </div>  \
        </form>  \
      </div>  \
    </div>  \
    <div class="modal-footer">  \
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat orange-text">Cancel</a>  \
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat red-text">Suprimer</a> \
      <a href="#!" onclick="modifyProduct('+ id +')" class="modal-action modal-close waves-effect waves-green btn-flat green-text">Modifier</a>  \
    </div>  \
  </div>';

  $('body').append(html2);


  });

  list.forEach(function(product){

    let name = product.name;
    let price = product.price;
    let icon = product.icon_name;

    let html = '<div class="card col s3 offset-s1 hoverable container"> \
      <div class="card-image waves-effect waves-block waves-light center-align"> \
        <i class="activator fa fa-' + icon + ' fa-10x"></i> \
      </div> \
      <div class="card-content"> \
        <span class="card-title activator grey-text text-darken-4">' + name + ' <p class="right">' + price + '</p></span> \
      </div> \
      <div class="card-action right-align"> \
        <a class="blue-text modal-trigger" href="#modal_' + name + '">Edit</a>  \
      <div class="card-reveal"> \
        <span class="card-title grey-text text-darken-4">' + name + '<i class="fa fa-times-circle-o right"></i></span> \
        <p> \
          Icon Name: fa-' + icon + '<br><br> Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.<br> \
        </p> \
      </div> \
    </div> ' ;
    $('#products_list').append(html);

  });
}
