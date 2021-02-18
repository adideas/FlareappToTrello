const port = chrome.runtime.connect({name: JSON.stringify({ channel: 'channel-1' })});

// class

var init = function(port) {
	
	this.postMessage = (obj) => {
		port.postMessage(obj);
	};
	
	port.onMessage.addListener((msg) => {
		// console.error(msg);
		
		// message
		if(msg.function) {
			port.postMessage({
				function: msg.function, 
				arguments: msg.arguments,
				return: this[msg.function](msg.arguments)
			});
			
			
		}
	})
};

// functions

init.prototype.addButons = function() {
	// card-stacked
	try {
		
		var data_page = {
			id: location.pathname.match(/\/errors\/(\d+)-/s)[1],
			exception_message: document.querySelector('.ui-exception-message').innerHTML.slice(0, 100),
			links: {
				show: location.href
			}
		}
	
	} catch (e){
		// console.error(e);
		return false;
	}
	
	// var data_page = JSON.parse(document.getElementById('app').dataset.page).props.flareError;
	
	console.log(data_page);
	
	
	var container_button_ul = document.querySelector('ul.occurrence-toolbar-group');
	
	var li = document.createElement('li');
	li.id = 'my_custom_id_bleat';
	var button = document.createElement('button');
	button.classList = 'occurrence-toolbar-button';
	button.dataset.el = encodeURI(JSON.stringify(data_page));
	button.onclick = this.clickButton;
	
	var span = document.createElement('span');
	
	span.innerHTML = 'Отправить в трелло';
	
	button.append(span);
	li.append(button);
	
	if(container_button_ul) {
		container_button_ul.append(li);
		
		port.postMessage({
			function: 'getTrello', 
			arguments: null,
			return: data_page
		});	
	}
}

init.prototype.clickButton = function(event) {
	let data = '';
	if(!event.target.dataset.el) {
		data = event.target.parentNode.dataset.el
	} else {
		data = event.target.dataset.el;
	}
	
	
	try {
		port.postMessage({
			function: 'sendTrello', 
			arguments: null,
			return: JSON.parse(decodeURI(data))
		});
	} catch (e){
		console.error(event.target);
		console.error(event.target.parentNode);
		console.error(e);
		console.error(decodeURI(data));
	}
}

init.prototype.getCookie = function(arguments) {
	this.addButons();
	return document.cookie;
};

init.prototype.getUrl = function(arguments) {
	return location.href;
};
init.prototype.setCount = function(arguments) {
	if(arguments) {
		
		var container_button_ul = document.querySelector('ul.occurrence-toolbar-group');
		
		var li = document.createElement('li');
		li.id = 'my_custom_id_bleat';
		var button = document.createElement('a');
		button.href = arguments;
		button.target = '_blank';
		button.classList = 'occurrence-toolbar-button';
		
		var span = document.createElement('span');
		
		span.innerHTML = 'Открыть в трелло';
		
		button.append(span);
		li.append(button);
		
		if(container_button_ul) {
			container_button_ul.append(li);
		}
	}
		
	return arguments;
};

init.prototype.viewMessage = function(message) {
	console.error(message.url);
	
	try {
		var a = document.createElement('a');
		a.href = message.url;
		a.target = '_blank';
		a.click();
	} catch(e) {
		
	}
	
	return '';
}

// init

var classInit = new init(port);

setInterval(() => {
    if(location.href.match('https://flareapp.io/errors/') && location.href.match('https://flareapp.io/errors/').length) {
		
			setTimeout(() => {
				if(!document.getElementById('my_custom_id_bleat')) {
					classInit.addButons();
				}
			}, 700)
    }
}, 700)