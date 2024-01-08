const { JSDOM  } = require("jsdom")

function normalizeURL(urlString){
	let http = new RegExp("http://", "g")
	let https = new RegExp("https://", "g")
	urlString = urlString
		.toLowerCase()
		.replace(http, "")
		.replace(https, "")
		.replace(" ", "%20")
	while(urlString.endsWith("/")){
		urlString = urlString.slice(0, -1)
	}
	return urlString
}


function getUrlFromHTML(htmlBody, baseUrl){
	const urls = []
	const dom = new JSDOM(htmlBody)
	const linkElements = dom.window.document.querySelectorAll('a')
	for (let linkElement of linkElements){
		if(linkElement.href.slice(0, 1) == "/"){
			try{
				const urlObj = (`${baseUrl}${linkElement.href}`)
				urls.push(urlObj.href)
			} catch (err) {
				console.log(err)
			}
		}else{
			try{
				const urlObj = (`$${linkElement.href}`)
				urls.push(urlObj.href)
			} catch (err) {
				console.log(err)
			}
		}
	}
	return urls
}



module.exports = {
	normalizeURL,
	getUrlFromHTML
}
