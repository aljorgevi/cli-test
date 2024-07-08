const puppeteer = require('puppeteer')

async function getToken() {
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()

	// Replace with the URL you need to navigate to
	const targetUrl = 'https://example.com/somePage'

	// Navigate to the target page
	await page.goto(targetUrl, { waitUntil: 'networkidle2' })

	// Listen to network requests
	let token
	page.on('response', async response => {
		const request = response.request()
		const requestUrl = request.url()

		// Replace with the specific API endpoint that returns the token
		if (requestUrl.includes('/api/auth/token')) {
			const responseBody = await response.json()
			token = responseBody.token // Adjust this based on the actual response structure
		}
	})

	// Perform any action that might be needed to trigger the token API call
	// For example, clicking a button, if necessary
	// await page.click('#someButton');

	// Give some time for the token to be captured
	await page.waitForTimeout(5000)

	await browser.close()
	return token
}

getToken()
	.then(token => {
		console.log('Bearer Token:', token)
	})
	.catch(err => {
		console.error(err)
	})
