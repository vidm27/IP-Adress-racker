import {test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/');
})

test.describe('New search ip address', () => {
    test('deberias poder ingresar un ip y mostrar su resultado',async ({page}) => {
        const ipAddress = page.getByPlaceholder('Search for any IP address or domain') ;
        
        await ipAddress.fill('8.8.8.8');
        await ipAddress.press('Enter');

        const ip = page.locator('#ip') // con esto localizo por id
        await expect(ip).toContainText('8.8.8.8')
        const location = page.locator("#location")
        await expect(location).toContainText('California')
        const timezone = await page.locator('#timezone')
        await expect(timezone).toContainText('-07:00')
        const isp = await page.locator("#isp")
        await expect(isp).toContainText('Google LLC')

        const marker = await page.locator('img.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive').getAttribute('src');
        console.log(marker);
        await expect(marker).toEqual('http://localhost:5173/node_modules/leaflet/dist/images/marker-icon.png');
    })
})