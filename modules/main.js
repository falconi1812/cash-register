

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
     <i  class="fa fa-'+icon+' fa-3x fa-border hoverable" aria-hidden="true" title="'+name+'">+</i>\
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


function countingAll() {

  Object.keys(productsForSell).map(function(key) {
    $( "#list"+productsForSell[key].name+"").append(productsForSell[key].inList);
    $( "#pay"+productsForSell[key].name+"").append(productsForSell[key].inSell);
  });
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
    		weekdaysLetter: [ 'D', 'L', 'M', 'M',
        'J', 'V', 'S' ],
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
