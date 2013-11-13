$(document).ready(function(){
	console.log('Finance Panel loaded.');
	var extension_id = chrome.i18n.getMessage('@@extension_id');
	var page_domain = URI(window.location.href).domain();
	var query_params = URI(window.location.href).query(true);
	var symbol = null;

	if (page_domain === 'google.com') {
		symbol = query_params['q'];
	} else if (page_domain === 'yahoo.com') {
		symbol = query_params['s'];
	} else if (page_domain === 'msn.com') {
		symbol = query_params['Symbol'];
	} else {
		console.log('Unrecognized domain:', page_domain);
	}

	var css_url = 'chrome-extension://@@extension_id/css/financepanel.css'.replace('@@extension_id', extension_id);
	$('head').build(function(b){
		b.link({'href': css_url, 'rel': 'stylesheet', 'type': 'text/css'});
	});

	$('body').build(function(b){
		b.div(symbol, {'id': 'financepanel-container'},
			b.button('Google', {'id': 'fp-view-on-google'},
				b.img({'src': 'https://www.google.com/finance/favicon.ico', 'class': 'fp-favicon'})
					),
			b.button('Yahoo', {'id': 'fp-view-on-yahoo'},
				b.img({'src': 'https://finance.yahoo.com/favicon.ico', 'class': 'fp-favicon'})
					),
			b.button('MSN', {'id': 'fp-view-on-msn'},
				b.img({'src': 'http://col.stc.s-msn.com/br/gbl/lg/csl/favicon.ico', 'class': 'fp-favicon'})
					)
		);
	});

	$('div#financepanel-container').addClass(page_domain.replace('.', '-'));

	$('button#fp-view-on-google').click(function(event){
		// TODO: Need to send a message to the background script to either find the google tab and show it or open a new tab
	});
});
