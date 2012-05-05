var open_symbol_tabs = function (symbol) {
    var urls = [
        "http://www.google.com/finance?q=SYMBOL",
        "http://finance.yahoo.com/q?s=SYMBOL&ql=1",
        "http://investing.money.msn.com/investments/stock-price?Symbol=SYMBOL&ocid=qbeb"
    ];
    $(urls).each(function(idx, url){
        chrome.tabs.create({
            "url": url.replace("SYMBOL", symbol),
			"active": (idx == 0)
        });
    });
};

$(document).ready(function(){

    $("form#symbol-lookup").submit(function(event){
        var $symbol = $("#symbol");
        open_symbol_tabs($symbol.val());
		event.preventDefault();
		event.stopPropogation();
		return false;
    });

});
