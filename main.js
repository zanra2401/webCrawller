const { crawlPage } = require("./crawl.js")

function main(){
	if (process.argv.length < 3){
		console.log("tidak ada url yang di berikan")
		process.exit(1)
	}

	if (process.argv > 3){
		console.log("hanya bisa memberikan 1 url")
		process.exit(1)
	}

	const baseUrl = process.argv[2]
	console.log(`starting crawling ${baseUrl}`)
	const pages = crawlPage(baseUrl, baseUrl, {})

	for (const page of Object.entries(pages)){
		console.log(page)
	}
	

}

main()
