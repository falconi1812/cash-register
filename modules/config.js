let totalToPay = 0;
let totalPayed = 0;
let total = 0;
let  totalInList = 0;
const $lastValuesList = {};
const $lastValuesPay = {};
const productsForSell = {
                          "adulte" : {
                             "name":"Adulte",
                             "icon":"male",
                             "id": 1,
                             "price": 50,
                             "inList": 0,
                             "inSell": 0
                          },
                          "enfant" : {
                            "name":"Enfant",
                            "icon":"child",
                            "id": 2,
                            "price": 30,
                            "inList": 0,
                            "inSell": 0
                          },
                          "billes-adultes" : {
                            "name":"Billes-Adultes",
                            "icon":"th-large",
                            "id": 3,
                            "price": 30,
                            "inList": 0,
                            "inSell": 0
                          },
                          "billes-enfants" : {
                            "name":"Billes-Enfants",
                            "icon":"th",
                            "id": 4,
                            "price": 20,
                            "inList": 0,
                            "inSell": 0
                          },
                          "bunny" : {
                            "name":"Costume-lapin",
                            "icon":"paw",
                            "id": 5,
                            "price": 40,
                            "inList": 0,
                            "inSell": 0
                          },
                          "waste" : {
                            "name":"Combie-Jetable",
                            "icon":"user-secret",
                            "id": 6,
                            "price": 8,
                            "inList": 0,
                            "inSell": 0
                          },
                          "drink" : {
                            "name":"Boisson",
                            "icon":"beer",
                            "id": 7,
                            "price": 2,
                            "inList": 0,
                            "inSell": 0
                          },
                          "meal" : {
                            "name":"Mangé",
                            "icon":"cutlery",
                            "id": 8,
                            "price": 3,
                            "inList": 0,
                            "inSell": 0
                          },
                          "other" : {
                            "name":"Autre",
                            "icon":"keyboard-o",
                            "id": 9,
                            "price": 0,
                            "inList": 0,
                            "inSell": 0
                          }
                      };
