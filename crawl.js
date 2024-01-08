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



module.exports = {
	normalizeURL

}
