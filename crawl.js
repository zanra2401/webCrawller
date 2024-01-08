const { JSDOM  } = require("jsdom")

function normalizeURL(urlString){
	let urlObj = new URL(urlString)
	urlString = `${urlObj.hostname}${urlObj.pathname}`
	if (urlString.slice(-1) === "/"){
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
				const urlObj = new URL(`${baseUrl}${linkElement.href}`)
				urls.push(urlObj.href)
			} catch (err) {
				console.log("matane : " + err)
			}
		}else{
			try{
				const urlObj = new URL(`$${linkElement.href}`)
				urls.push(urlObj.href)
			} catch (err) {
				console.log("matene : " + err)
			}
		}
	}
	return urls
}



async function crawlPage(baseUrl, currentUrl, pages){
	

	const baseURLObj = new URL(baseUrl)
	const currentURLObj = new URL(currentUrl)

	if (baseURLObj.hostname !== currentURLObj.hostname){
		return pages
	}

	const normalizedCurrentUrl = normalizeURL(currentUrl)
	if(pages[normalizedCurrentUrl] > 0){
		pages[normalizedCurrentUrl]++
		return pages
	}


	pages[normalizedCurrentUrl] = 1

	console.log(`crawling : ${currentUrl}`)

	try{
		const resp = await fetch(currentUrl)
		if (resp.status > 399){
			console.log(`error in fetch with status code: ${resp.status} on page : ${currentUrl}`)
			return pages
		}
		const contentType = resp.headers.get("content-type")
		if(!contentType.includes("text/html")){
			console.log('non html response')
			return pages
		}


		const htmlBody = await resp.text()

		const nextURls = getUrlFromHTML(htmlBody, baseUrl)
		for (const nextUrl of nextURls){
			pages = await crawlPage(baseUrl, nextUrl, pages)
		}

	}catch(err){
		console.log(`error in fetch ${err.message} on page ${currentUrl}`)
	}

	return pages
}



module.exports = {
	normalizeURL,
	getUrlFromHTML,
	crawlPage
}
