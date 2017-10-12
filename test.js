/**
 * Funcion para mostrar todas las funciones ejecutadas (debug).
 * @author Christian Falcon
 * @param [name]
 * @return [function=name].
 */
function debug(withFn) {
    var nombre, fn;
	// Nombre se refiere al nombre de la funcion y fn al codigo de esa funcion
    for (nombre in window) {
        fn = window[nombre];
        if (typeof fn === 'function') {
            window[nombre] = (function(nombre, fn) {
                    var args = arguments;
                    return function() {
                        withFn.apply(this, args);
                        return fn.apply(this, arguments);
                    }
            })(nombre, fn);
        }
    }
}

function createProduct(name, icon, list, price){
   var html ="<li>\
                 <div class='collapsible-header black-text'><i class='material-icons'>" + icon + "</i>"+name+"</div>\
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
    return $( "#"+list+"" ).append(html);
}

function deleteProduct(object){
  object.parent().parent().parent().remove();
  object.parent().parent().remove();
  object.parent().remove();
  object.remove();
}

function sentToPay(object){

  var html ="<li>\
                <div class='collapsible-header black-text'><i class='material-icons'>" +object.data('icon')+"</i>"+object.data('name')+"</div>\
                  <div class='collapsible-body center'>\
                    <span>\
                      <a onclick='sentToList($(this))' class='waves-effect waves-light btn buttomPad' data-name="+object.data('name')+" data-icon="+object.data('icon')+" data-price="+object.data('price')+">\
                        <i class='large material-icons'>arrow_back</i>\
                      </a>\
                      <a onclick='deleteProduct($(this))' class='waves-effect waves-light red btn buttomPad'>\
                        <i class='large material-icons'>close</i>\
                      </a>\
                   </span>\
                </div>\
             </li>";
    //  Materialize.toast(object.data('name')'send to Pay', 4000); // 4000 is the duration of the toast
     deleteProduct(object);
  return $( "#toPay" ).append(html);
}

function sentToList(object){

  var html ="<li>\
                <div class='collapsible-header black-text'><i class='material-icons'>" + object.data('icon') + "</i>"+object.data('name')+"</div>\
                  <div class='collapsible-body center'>\
                    <span>\
                      <a onclick='deleteProduct($(this))' class='waves-effect waves-light red btn buttomPad'>\
                        <i class='large material-icons'>close</i>\
                      </a>\
                      <a onclick='sentToPay($(this))' class='waves-effect waves-light btn buttomPad' data-name="+object.data('name')+" data-icon="+object.data('icon')+" data-price="+object.data('price')+">\
                        <i class='large material-icons'>arrow_forward</i>\
                      </a>\
                   </span>\
                </div>\
             </li>";
     deleteProduct(object);
  return $( "#list" ).append(html);
}


function pay(){


}
// debug(function(nombre, fn){console.log("llamada a " + nombre)});
