function main(){
	if (process.argv.length < 3){
		console.log("tidak ada url yang di berikan")
		process.exit(1)
	}

	if (process.argv > 3){
		console.log("hanya bisa memberikan 1 url")
		process.exit(1)
	}

	console.log(`starting crawling ${process.argv[2]}`)

}

main()
