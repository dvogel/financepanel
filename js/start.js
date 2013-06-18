
$(document).ready(function(){

    $("form#symbol-lookup").submit(function(event){
        var $symbol = $("#symbol");
		var msg = {
			'name': 'open_tabs_for_symbol',
			'symbol': $symbol.val()
		};
		chrome.runtime.sendMessage(msg);
		event.preventDefault();
		event.stopPropogation();
		return false;
    });

});
