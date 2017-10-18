setInterval(function() {
    Object.keys(productsForSell).map(function(key) {
        if ( productsForSell[key].inList > 0 && $lastValues[key] !== productsForSell[key].inList) {
            $lastValues[key] = productsForSell[key].inList;
            return $("#"+key).html(productsForSell[key].inList);
        }
    });
}, 150);
