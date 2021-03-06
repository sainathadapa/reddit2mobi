'use strict';

var http = require('http'),
url = require('url'),
unescp = require('unescape'); //to unescape html text in the json

var t1Parse, mainParse, runner;

t1Parse = function(t1node, level, mainAuthor) {
	var textToWrite = unescp(t1node.body_html);
	if(t1node.author == mainAuthor) {
		textToWrite = 'Author: ' + textToWrite;
	}
	console.log('<li>' + textToWrite);
	if (t1node.replies !== '') {
		mainParse(t1node.replies.data.children, level);
	}
	console.log('</li>');
};


mainParse = function(children, level, mainAuthor) {
	console.log('<ul>');
	for ( var i = 0; i < children.length; i++) {
		if (children[i].kind === 't1') {
			t1Parse(children[i].data, level + '.' + i);
		}
	}
	console.log('</ul>');
};

runner = function(response, mainAuthor) {
	response.setEncoding('utf8');
	var str = '';

	response.on('data', function(data) {
		str += data;
	});

	response.on('error', console.error);

	response.on('end', function() {
		var jsonParsed = JSON.parse(str);
		var pageTitle = unescp(jsonParsed[0].data.children[0].data.title);
		var headerText = unescp(jsonParsed[0].data.children[0].data.selftext_html);
		mainAuthor = jsonParsed[0].data.children[0].data.author;
		var main_node = jsonParsed[1].data.children;
		console.log('<html>');
		console.log('<head><title>' + pageTitle + '</title></head>');
		console.log('<body>');
		console.log('<p class=title>' + headerText + '</p>');
		mainParse(main_node, 0, mainAuthor);
		console.log('</body>');
		console.log('</html>');
	});
}



var reddit2html = function(urlPath,depth) {

	var mainAuthor

	var urlParse =  url.parse(urlPath);
	if(urlParse.protocol === 'https') {
		urlParse.hostname.replace("https", "http"); //changing the protocol from https to http
	}

	//json api endpoint
	var queryPath = urlParse.pathname.replace(/\/$/,'.json');
	if(queryPath.indexOf(".json") === -1) {
		queryPath += '.json';
	}

	if(urlParse.search === null) {
		urlParse.search = '?';
	}

	if(urlParse.search.indexOf("sort=") === -1) {
		if(urlParse.search.indexOf('?') !== -1) {
			urlParse.search += '&'; //sorting by best
		}
		urlParse.search += 'sort=confidence'; //sorting by best
	}

	if( (depth !== undefined) && (urlParse.search.indexOf("depth=") === -1) ) {
		urlParse.search += '&depth=' + depth; //depth parameter
	}

	queryPath += urlParse.search;

	var requestObj = {
		hostname: urlParse.hostname,
		path: queryPath,
		headers: {
			'User-Agent': 'reddit to mobi script'
		}
	};

	http.get(requestObj, function(response) {
		runner(response, mainAuthor);
	});
}

module.exports = reddit2html
