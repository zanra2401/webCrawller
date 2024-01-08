const { normalizeURL, getUrlFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')


test('normalizeURL', () => {
	const input = 'https://zanuar/rikza////////////////////////////////////'
	const actual = normalizeURL(input)
	const expected = 'zanuar/rikza'
	expect(actual).toEqual(expected)
})

test('normalizeURL', () => {
	const input = 'https://zanuar/rikza aditiya'
	const actual = normalizeURL(input)
	const expected = 'zanuar/rikza%20aditiya'
	expect(actual).toEqual(expected)
})

test('normalizeURL', () => {
	const input = 'HTtps://zanuar/rikza'
	const actual = normalizeURL(input)
	const expected = 'zanuar/rikza'
	expect(actual).toEqual(expected)
})
test('normalizeURL', () => {
	const inputHTMLBody = `
	<html>
		<head>
		</head>
		<body>
			<a href="inva">
				inva
			</a>
		</body>
	</html>
	`
	const inputBaseUrl = "https://zanuar"
	const actual = getUrlFromHTML(inputHTMLBody, inputBaseUrl)
	const expected = []
	expect(actual).toEqual(expected
	)
})




