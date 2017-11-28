
function clickOnProduct(key){

      swal({ text : "Ajouter -> "+productsForSell[key].name+"" ,
      buttons: {
        Un: {
          value: "un",
        },
        Choisir: {
          value: "choisir",
        }
      }
    })
    .then((value) => {
      switch (value) {

        case "un":
            productsForSell[key].inList = ++productsForSell[key].inList
            totalInList = totalInList + productsForSell[key].price
            Materialize.toast( 1 + '  '+ productsForSell[key].name +'   -> List', 3000);
            $("#totalList").html(totalInList + " Fr");
          break;
          case "choisir":

              swal("Combien?", {
              content: "input",
              })
              .then((value) => {
                if (value == "0"|value == 0){
                swal({  title :" Il faut écrire un numero",  icon: "warning",});
               }
               else {
               productsForSell[key].inList = productsForSell[key].inList + parseInt(value);
               Materialize.toast( +value +'  '+ productsForSell[key].name +'   -> List', 3000);
               totalInList = totalInList + productsForSell[key].price * parseInt(value);
               $("#totalList").html(totalInList + " Fr");
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

function clickInList(key){
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
      Choisir: {
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
            if (productsForSell[key].inList > 0 && productsForSell[key].inList >=  parseInt(value)){
            productsForSell[key].inList = productsForSell[key].inList - parseInt(value);

            totalInList = totalInList - productsForSell[key].price * parseInt(value);

            $("#totalList").html(totalInList + " Fr");
          }
          else {
            swal({  title :" Il n'y a pas assez ---> "+ productsForSell[key].name ,  icon: "warning",});
          }
          });
        break;

        case "tout":
          productsForSell[key].inSell = productsForSell[key].inSell + productsForSell[key].inList;
          totalInList = totalInList - productsForSell[key].price * productsForSell[key].inList;

          totalToPay = totalToPay + productsForSell[key].price * productsForSell[key].inList;

          $("#totalPay").html(totalToPay + "Fr");
          $("#totalList").html(totalInList + " Fr");

          Materialize.toast( +productsForSell[key].inList +'  '+ productsForSell[key].name +'   -> Payment', 3000);
          productsForSell[key].inList = 0;
          break;

        case "un":
          if (productsForSell[key].inList > 0){

            productsForSell[key].inSell = ++productsForSell[key].inSell;
            productsForSell[key].inList = --productsForSell[key].inList;
            totalInList = totalInList - productsForSell[key].price;
            totalToPay = totalToPay + productsForSell[key].price;

            $("#totalPay").html(totalToPay + "Fr");
            $("#totalList").html(totalInList + " Fr");
            Materialize.toast( 1 +'  '+ productsForSell[key].name +'   -> Payment', 3000);

          }
          else {
            swal({  title :" Il n'y plus de "+ productsForSell[key].name ,  icon: "warning",});
          }
          break;
          case "choisir":
              swal("Combien?:", {
              content: "input",
              })
              .then((value) => {

                if (productsForSell[key].inList > 0 && productsForSell[key].inList >=  parseInt(value)){
                productsForSell[key].inSell = productsForSell[key].inSell + parseInt(value);
                productsForSell[key].inList = productsForSell[key].inList - parseInt(value);

                Materialize.toast( +value +'  '+ productsForSell[key].name +'   -> Payment', 3000);

                totalInList = totalInList - productsForSell[key].price * parseInt(value);
                totalToPay = totalToPay + productsForSell[key].price * parseInt(value);

                $("#totalPay").html(totalToPay + "Fr");
                $("#totalList").html(totalInList + " Fr");

                }
                else if (value == "0"|value == 0){
                swal({  title :" Il faut écrire un numero",  icon: "warning",});
                }
               else {
                  swal({  title :" Il n'y a pas assez ---> "+ productsForSell[key].name ,  icon: "warning",});
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

function clickInPay(key){
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
      Choisir: {
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
          if (productsForSell[key].inSell > 0 && productsForSell[key].inSell >=  parseInt(value)){
          productsForSell[key].inSell = productsForSell[key].inSell - parseInt(value);

          totalToPay = totalToPay - productsForSell[key].price * parseInt(value);

          $("#totalPay").html(totalToPay + " Fr");
        }
        else {
          swal({  title :" Il n'y a pas assez ---> "+ productsForSell[key].name ,  icon: "warning",});
        }
        });
      break;

      case "tout":
        productsForSell[key].inList = productsForSell[key].inList + productsForSell[key].inSell;
        totalToPay = totalToPay - productsForSell[key].price * productsForSell[key].inSell;

        totalInList= totalInList + productsForSell[key].price * productsForSell[key].inSell;

        $("#totalPay").html(totalToPay + "Fr");
        $("#totalList").html(totalInList + " Fr");

        Materialize.toast( +productsForSell[key].inSell +'  '+ productsForSell[key].name +' <-- List', 3000);
        productsForSell[key].inSell = 0;
        break;

      case "un":
        if (productsForSell[key].inSell > 0){

          productsForSell[key].inList = ++productsForSell[key].inList;
          productsForSell[key].inSell = --productsForSell[key].inSell;
          totalInList = totalInList + productsForSell[key].price;
          totalToPay = totalToPay - productsForSell[key].price;

          $("#totalPay").html(totalToPay + "Fr");
          $("#totalList").html(totalInList + " Fr");
          Materialize.toast( 1 +'  '+ productsForSell[key].name +'   <- List', 3000);

        }
        else {
          swal({  title :" Il n'y plus de "+ productsForSell[key].name ,  icon: "warning",});
        }
        break;
        case "choisir":
            swal("Combien?:", {
            content: "input",
            })
            .then((value) => {

              if (productsForSell[key].inSell > 0 && productsForSell[key].inSell >=  parseInt(value)){
              productsForSell[key].inSell = productsForSell[key].inSell - parseInt(value);
              productsForSell[key].inList = productsForSell[key].inList + parseInt(value);

              Materialize.toast( +value +'  '+ productsForSell[key].name +'   <- List', 3000);

              totalInList = totalInList + productsForSell[key].price * parseInt(value);
              totalToPay = totalToPay - productsForSell[key].price * parseInt(value);

              $("#totalPay").html(totalToPay + "Fr");
              $("#totalList").html(totalInList + " Fr");

              }
              else if (value == "0"|value == 0){
              swal({  title :" Il faut écrire un numero",  icon: "warning",});
              }
             else {
                swal({  title :" Il n'y a pas assez ---> "+ productsForSell[key].name ,  icon: "warning",});
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




function clickLocation(code_loc){
    console.log(code_loc);
    let url = LOCATIONS.replace("{locationid}",code_loc);

       $.ajax({
           url: url,
           type: 'GET',
           dataType: 'json',
           success: function (data) {
             console.log(data);
             

           },

       });

    }





function clickCash(){

}

function clickCC(){

}

function clickQR(){

}
