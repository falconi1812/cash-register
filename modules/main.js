

function products(){
  let i = 0;
  Object.keys(productsForSell).map(function(key) {
       generateProduct(productsForSell[key], key);

       if(i == 2 | i == 5 | i == 8 | i == 11 | i == 14){

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

    let html = '<a class="white-text imgicon " onclick="addNumberList(\''+key+'\')" aria-label="'+name+'"> \
     <i  class="fa fa-'+icon+' fa-3x fa-border hoverable" aria-hidden="true" title="'+name+'"><i class="fa fa-plus" aria-hidden="true"></i></i>\
    </a>';

    let html2 = '<a class="white-text imgicon " onclick="clickInList(\''+key+'\')" aria-label="'+name+'"> \
     <i id ="list'+name+'" class="fa fa-'+icon+' fa-3x fa-border hoverable" aria-hidden="true" title="'+name+'"></i>\
    </a>';

    let html3 = '<a class="white-text imgicon " onclick="" aria-label="'+name+'"> \
     <i id ="pay'+name+'" class="fa fa-'+icon+' fa-3x fa-border hoverable" aria-hidden="true" title="'+name+'"></i>\
    </a>';


     $('#products').append(html);
     $('#list').append(html2);
     $('#topay').append(html3);

}

function generateLocation(result){
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();

  if (result === "	none"){
    let html =   '<div class="col s12 m12 l4"> \
                  </div>\
                  <div class="col s12 m12 l4"> \
                    <div class="card light-blue darken-2">\
                      <div class="card-content black-text">\
                        <div class="row">\
                          <ul class="collection with-header">\
                             <li class="collection-header center"><h4>Pas de location pour <br> '+dd+'-'+mm+'-'+yyyy+'</h4></li>\
                          </ul>\
                        </div>\
                    </div>\
                  </div>\
                </div>';
     $('#locations').append(html);
  }

  else{
  let obj = JSON.parse(result);
  Object.keys(obj.Location).map(function(key) {

   let name = obj.Location[key].nom;
   let last_name = obj.Location[key].prenom;
   let type = obj.Location[key].type_rental;

   let html =   '<div class="col s12 m6 l6"> \
                 <div onclick="clickLocation()" class="hoverable">  \
                   <div class="card light-blue darken-2">\
                     <div class="card-content  black-text">\
                       <div class="row">\
                         <ul class="collection with-header">\
                           <li class="collection-header center"><h4>'+name+'</h4></li>\
                           <a class="collection-item"><span class="badge black-text">'+name+'</span>Nom :</a>\
                           <a class="collection-item"><span class="badge black-text">'+last_name+'</span>Prenom :</a>\
                           <a class="collection-item"><span class="badge black-text">'+type+'</span>Type: </a>\
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
    $( "#list"+productsForSell[key].name+"").append(productsForSell[key].inList);
    $( "#pay"+productsForSell[key].name+"").append(productsForSell[key].inSell);
  });
}


function getLocation(){

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();

  $.ajax({
  url: "http://paintballarea.ch/test.php",
  type: "GET",
  data: "date="+ 2017 +"-" + 10 +"-" + 28,
  // data: "date="+ yyyy +"-" + mm +"-" + dd,     //TO GET ACTUAL DAY
  dataType : 'html',
  success: function(result){

    console.log(result);
    generateLocation(result);

    }
  });
}
