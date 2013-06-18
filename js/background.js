var open_symbol_tab = function (url, url_pattern) {
	chrome.tabs.query({currentWindow: true}, function(tabs){
		var reusable_tabs = [];
		if (url_pattern !== null) {
			reusable_tabs = tabs.filter(function(tab){
				return url_pattern.test(tab.url);
			});
		}

		if (reusable_tabs.length > 0) {
			chrome.tabs.update(reusable_tabs[0].id, {"url": url});
		} else {
			chrome.tabs.create({
				"url": url,
				"active": false
			});
		}
	});
};

var open_symbol_tabs = function (symbol) {
    var DefaultPages = [
        { "url": "http://www.google.com/finance?q=SYMBOL",
		  "pattern": /.*q=[:A-Z0-9]+.*/i
		},
		{ "url": "http://finance.yahoo.com/q?s=SYMBOL&ql=1",
		  "pattern": /.*finance.yahoo.com\/.*[?].*s=([:A-Z0-9]+).*/i
		},
		{ "url": "http://investing.money.msn.com/investments/stock-price?Symbol=SYMBOL&ocid=qbeb",
		  "pattern": /.*Symbol=[:A-Z0-9].*/i
		}
    ];

    $(DefaultPages).each(function(idx, page_info){
		var url = page_info.url.replace("SYMBOL", symbol);
		open_symbol_tab(url, page_info.pattern);
    });
};

chrome.runtime.onMessage.addListener(function(msg, sender, respond){
	console.log('msg', msg);

	if (msg.name == 'open_tabs_for_symbol') {
		if (msg.symbol !== undefined) {
			open_symbol_tabs(msg.symbol);
		}
	}
	
});
