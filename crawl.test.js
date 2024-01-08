const { normalizeURL } = require('./crawl.js')
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
