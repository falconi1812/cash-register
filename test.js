




/**
 * Funcion para mostrar todas las funciones ejecutadas (debug).
 * @author Christian Falcon
 * @param [name]
 * @return [function=name].
 */
// function debug(withFn) {
//     let nombre, fn;
// 	// Nombre se refiere al nombre de la funcion y fn al codigo de esa funcion
//     for (nombre in window) {
//         fn = window[nombre];
//         if (typeof fn === 'function') {
//             window[nombre] = (function(nombre, fn) {
//                     let args = arguments;
//                     return function() {
//                         withFn.apply(this, args);
//                         return fn.apply(this, arguments);
//                     }
//             })(nombre, fn);
//         }
//     }
// }


// VARIABLES:::::::::::::::::
let totalToPay = 0;
let total = 0;


function counting(id, name){
      let count = $("."+id+""  ).length;
      $( '#'+name+'').remove();
      let html = "<h6 class = 'center' id = "+name+" >"+(count)+"</h6>";
      return $( "#"+id+"" ).append(html);
}
function countingAll(){
  counting('accessibility', 'Adulte');
  counting('child_care', 'Enfant');
  counting('dialpad', 'Billes-Adultes');
  counting('blur_on', 'Billes-Enfants');
  calculateTotal();
  diference(total, totalToPay);
}
function createProduct(name, icon, list, price){
   let html ="<li>\
                 <div class='collapsible-header black-text "+icon+"'><i class='material-icons' >" + icon + "</i>"+name+"</div>\
                   <div class='collapsible-body center'>\
                     <span>\
                       <a onclick='deleteProduct($(this))' class='waves-effect waves-light red btn buttomPad'>\
                         <i class='large material-icons'>close</i>\
                       </a>\
                       <a onclick='sentToPay($(this))' class='waves-effect waves-light btn buttomPad' data-name="+name+" data-icon="+icon+" data-price="+price+">\
                         <i class='large material-icons'>arrow_forward</i>\
                       </a>\
                    </span>\
                 </div>\
              </li>";
    countingAll();
    return $( "#"+list+"" ).append(html);
}
function generateProduct(name, icon, price){
    let html = '<li class="collection-item blue-grey-text lighten-2 black-text" onclick="createProduct(\''+name+'\', \''+icon+'\', \'list\', \''+price+'\'); counting(\''+icon+'\', \''+name+'\');"><div>'+name+'<a href="#!" class="secondary-content"><i class="material-icons brown-text">'+icon+'</i></a></div></li>';
    return $('#listproducts').append(html);
}
function deleteProduct(object){
  object.parent().parent().parent().remove();
  object.parent().parent().remove();
  object.parent().remove();
  object.remove();
  countingAll();
  calculateTotal();
  diference(total, totalToPay)

}
function sentToPay(object){

  let icon = object.data('icon');
  let name = object.data('name');
  let price = object.data('price');
  let html ="<li>\
                <div class='collapsible-header black-text Pay"+icon+"'><i class='material-icons'>" +icon+"</i>"+name+"</div>\
                  <div class='collapsible-body center'>\
                    <span>\
                      <a onclick='sentToList($(this)); countingAll();' class='waves-effect waves-light btn buttomPad' data-name="+name+" data-icon="+icon+" data-price="+price+">\
                        <i class='large material-icons'>arrow_back</i>\
                      </a>\
                      <a onclick='deleteProduct($(this))' class='waves-effect waves-light red btn buttomPad'>\
                        <i class='large material-icons'>close</i>\
                      </a>\
                   </span>\
                </div>\
             </li>";
     deleteProduct(object);

  return $( "#toPay" ).append(html) ,calculateTotal(), diference(total, totalToPay);
}
function sentToList(object){

  let icon = object.data('icon');
  let name = object.data('name');
  let price = object.data('price');
  let html ="<li>\
                <div class='collapsible-header black-text "+icon+"'><i class='material-icons' >" +icon+ "</i>"+name+"</div>\
                  <div class='collapsible-body center'>\
                    <span>\
                      <a onclick='deleteProduct($(this))' class='waves-effect waves-light red btn buttomPad'>\
                        <i class='large material-icons'>close</i>\
                      </a>\
                        <a onclick='sentToPay($(this))' class='waves-effect waves-light btn buttomPad' data-name="+name+" data-icon="+icon+" data-price="+price+">\
                        <i class='large material-icons'>arrow_forward</i>\
                      </a>\
                   </span>\
                </div>\
             </li>";
    deleteProduct(object);
    calculateTotal();
  return $( "#list" ).append(html), diference(total, totalToPay);
}
function datepickerFrench(){
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 2,
        labelMonthNext: 'Mois suivant',
    	  labelMonthPrev: 'Mois précédent',
    		labelMonthSelect: 'Selectionner le mois',
    		labelYearSelect: 'Selectionner une année',
    		monthsFull: [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
    		monthsShort: [ 'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec' ],
    		weekdaysFull: [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ],
    		weekdaysShort: [ 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' ],
    		weekdaysLetter: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
    		today: 'Aujourd\'hui',
    		clear: 'Réinitialiser',
    		close: 'Accepter',
    		format: 'yyyy-mm-dd'
});
}




function getLocation(){

  let date = document.getElementById("picksomedate").value;



  console.log(date);

  $.ajax({
  url: "http://paintballarea.ch/test.php",
  type: "GET",
  data: "date=" + date,
  dataType : 'html',
  success: function(result){

  console.log(result);

            //
            // let obj = JSON.parse('{ "Location": [	{ "code_loc": "DUF3D92P", "nom": "Durussel", "prenom": "Patrick", "type_rental": "paintball" }]}');
            //
            // console.log(obj.Location[0].code_loc);

  }
}); // TREABAJO POR HACER !
}
// CONFIGURATION PICKER DATE




// EXECUTING // // EXECUTING // // EXECUTING // // EXECUTING // // EXECUTING //


// debug(function(nombre, fn){console.log("llamada a " + nombre)});



function products(){
// generateProduct(Name, Icon, Price);
   generateProduct("Adulte","accessibility", 85);
   generateProduct("Enfant","child_care", 85);
   generateProduct("Billes-Adultes","dialpad", 85);
   generateProduct("Billes-Enfants","blur_on", 85);
   generateProduct("Costume de lapin","pets", 85);
   generateProduct("Combie Jetable","person_outline", 85);
   generateProduct("Boisson","local_cafe", 85);
   generateProduct("Mangé","restaurant", 85);
   countingAll();
   calculateTotal();
   diference(total, totalToPay)
   payedByCard(0);

}


function calculateTotal(){

  let count1 = $(".Payaccessibility").length * 50;
  let count2 = $(".Paychild_care").length * 30;
  let count3 = $(".Paydialpad").length * 50;
  let count4 = $(".Payblur_on").length * 20;
  let count5 = $(".Paypets").length * 40;
  let count6 = $(".Payperson_outline").length * 8;
  let count7 = $(".Paylocal_cafe").length * 2;
  let count8 = $(".Payrestaurant").length * 3;

  total = count1 + count2 + count3 + count4 + count5 + count6 + count7 + count8;

  $( '#totalcomplete').remove();
  let html = "<h5 id = 'totalcomplete' >Total : "+total.toFixed(2)+"</h5>";
  return $( "#total" ).append(html), total, diference(total, totalToPay);
}



function addTotal(money){
  totalToPay = totalToPay + money;
return totalToPay.toFixed(2);

}

function payed (object){
  let money = object.data('money');

  $( '#totalpayed').remove();
  let html = "<h5 id = 'totalpayed' > Payé : "+addTotal(money)+"</h5>";
  return $( "#payed" ).append(html), diference(total, totalToPay);
}

function payedByCard(money){

  $( '#totalpayed').remove();
  let html = "<h5 id = 'totalpayed' > Payé : "+addTotal(money)+"</h5>";
  return $( "#payed" ).append(html), diference(total, totalToPay);
}




function diference(total, totalpayed){

  $( '#result').remove();
  let result = + totalpayed - total;
  let html = "<h5 id = 'result'> Diff : "+ result.toFixed(2) +"</h5>";
  return $( "#totaldiference" ).append(html);

}






function clickCard() {
  swal("Quelle est la quantite a payer par carte!", {
    content: "input",
  })

  .then((value) => {
    swal(`You typed: ${value}`);
    payedByCard(parseInt(value));
  }
  );

}

function clickPayer(){
  swal({
  title: "Bien fait!",
  text: "Tu as Payé la totalité!",
  icon: "success",
});
}
