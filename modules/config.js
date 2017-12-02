let totalToPay = 0;
let totalPayed = 0;
let total = 0;
let totalInList = 0;
const $lastValuesList = {};
const $lastValuesPay = {};
const productsForSell = {
  "adulte": {
    "name": "Adulte",
    "icon": "male",
    "price": 50,
    "inList": 0,
    "inSell": 0
  },
  "enfant": {
    "name": "Enfant",
    "icon": "child",
    "price": 30,
    "inList": 0,
    "inSell": 0
  },
  "billes-adultes": {
    "name": "Billes-Adultes",
    "icon": "th-large",
    "price": 30,
    "inList": 0,
    "inSell": 0
  },
  "billes-enfants": {
    "name": "Billes-Enfants",
    "icon": "th",
    "price": 20,
    "inList": 0,
    "inSell": 0
  },
  "bunny": {
    "name": "Costume-lapin",
    "icon": "paw",
    "price": 40,
    "inList": 0,
    "inSell": 0
  },
  "waste": {
    "name": "Combie-Jetable",
    "icon": "user-secret",
    "price": 8,
    "inList": 0,
    "inSell": 0
  },
  "drink": {
    "name": "Boisson",
    "icon": "beer",
    "price": 2,
    "inList": 0,
    "inSell": 0
  },
  "meal": {
    "name": "Mangé",
    "icon": "cutlery",
    "price": 3,
    "inList": 0,
    "inSell": 0
  },
  "other": {
    "name": "Autre",
    "icon": "keyboard-o",
    "price": 0,
    "inList": 0,
    "inSell": 0
  }
};
