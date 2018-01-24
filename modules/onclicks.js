

function clickOnProduct(name, price, id, key){


  swal("Ajouter -> "+ name , {
  content: "input",
  })
  .then((value) => {
      if (value == 0){
      swal({  title :" Il faut écrire un numero",  icon: "warning",});
     }
     else {
     addNumberList(id, parseInt(value));
     actualize();
     Materialize.toast( +value +'  '+ name +'   -> List', 3000);
     }
  });
  }

function clickInList(name, price, id, key){

    let list_total = getList(key);

    swal({ title : "Selectioner votre option" ,
    buttons: {
      "Suprimer": {
        value: "Suprimer",
      },
      "Tout": {
        value: "tout",
      },
      "Un": {
        value: "un",
      },
      "=>": {
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

            if (list_total > 0 && list_total >=  parseInt(value)){
            removeNumberList(id, parseInt(value));
            actualize();
            Materialize.toast(parseInt(value) +'  '+ name +'   Deleted', 3000);

          }
          else {
            swal({  title :" Il n'y a pas assez ---> "+ name ,  icon: "warning",});
          }
          });
        break;

        case "tout":

          if (list_total > 0){

          editproduct(id, 0, list_total, list_total, 0);
          actualize();
          Materialize.toast( list_total +'  '+ name +'   -> Payment', 3000);
          }
          else {

            swal({  title :" Il n'y plus de "+ products[key].name ,  icon: "warning",});
          }
          break;

        case "un":
          if (list_total > 0){

            editproduct(id, 0, 1, 1, 0);
            actualize();
            Materialize.toast( 1 +'  '+ products[key].name +'   -> Payment', 3000);

          }
          else {
            swal({  title :" Il n'y plus de "+ products[key].name ,  icon: "warning",});
          }
          break;
        case "choisir":
          swal("Combien?:", {
              content: "input",
            })
            .then((value) => {

                if (list_total > 0 && list_total >=  parseInt(value)){

                editproduct(id, 0, parseInt(value), parseInt(value), 0)
                Materialize.toast( +value +'  '+ name +'   -> Payment', 3000);
                actualize();

                }
                else if (value == "0"|value == 0){
                swal({  title :" Il faut écrire un numero",  icon: "warning",});
                }
               else {
                  swal({  title :" Il n'y a pas assez ---> "+ name ,  icon: "warning",});
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

function clickInPay(name, price, id, key){

  let pay_total = getPay(key);

    swal({ title : "Selectioner votre option" ,
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
          if (pay_total > 0 && pay_total >=  parseInt(value)){
          removeNumberPay(id, parseInt(value));
          actualize();
          Materialize.toast(parseInt(value) +'  '+ name +'   Deleted', 3000);

        }
        else {
          swal({  title :" Il n'y a pas assez ---> "+ name ,  icon: "warning",});
        }
        });
      break;

      case "tout":

        editproduct(id, pay_total, 0, 0, pay_total);
        actualize();
        Materialize.toast( +pay_total +'  '+ name +' <-- List', 3000);
        break;

      case "un":
        if (pay_total > 0){
          editproduct(id, 1, 0, 0, 1);
          actualize();
          Materialize.toast( 1 +'  '+ name +'   <- List', 3000);
        }
        else {
          swal({  title :" Il n'y plus de "+ name ,  icon: "warning",});
        }
        break;
        case "choisir":
          swal("Combien?:", {
              content: "input",
            })
            .then((value) => {

              if (pay_total > 0 && pay_total >=  parseInt(value)){

              editproduct(id, parseInt(value), 0, 0, parseInt(value));
              actualize();
              Materialize.toast( +value +'  '+ name +'   <- List', 3000);
              }
              else if (value == 0){
              swal({  title :" Il faut écrire un numero",  icon: "warning",});
              }
             else {
                swal({  title :" Il n'y a pas assez ---> "+ name ,  icon: "warning",});
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


    let urls = LOCATIONSGET.replace("{locationid}",code_loc);

       $.ajax({
           url: urls,
           type: 'GET',
           dataType: 'json',
           success: function (data) {
             productForSell = data.products;
             printClient(data);



           },
  });
}

function clickCash() {

}

function clickCC() {

}

function clickQR() {

}


function printClient(element){
  console.log(element)
  let name = element.client.name;
  let type = element.location.type_id;
  let email = element.client.email;
  let phone = element.client.phone;
  let hour_start = element.location.hour_start;
  let hour_end = element.location.hour_end;
  let terrain = element.location.terrain_id
  let players = element.location.players;
  let code = element.location.code;
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

function modifyProduct(id){

  let dataJson = {

    "icon_id": $( "#input_icon_"+ id +"" ).val(),
    "name": $( "#input_name_"+ id +"" ).val(),
    "price": $( "#input_price_"+ id +"" ).val()
    }


    modifyProductAjax(id, dataJson);
    location.reload();


}

function createProduct(){
console.log("createProduct()")
  let dataJson = {

    "icon_id": $( "#input_icon_create_product" ).val(),
    "name": $( "#input_name_create_product" ).val(),
    "price": $( "#input_price_create_product" ).val()
    }

    createProductAjax(dataJson);
    location.reload();
}


function deleteProduct(id){

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
      async:false,
      success: function(data){
         location.reload();
         return data;
       }
      });


    } else {
      swal("Your product is safe!");
    }
  });
}
