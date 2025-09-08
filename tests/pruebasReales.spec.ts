import { expect, test, Page, Browser } from '@playwright/test';
test.describe('Pruebas reales para testing', () => {
    const valorBusqueda = "Gafas Rayban"
    test('Probando una busqueda en google', async ({ page }) => {
        await test.step('Ir a google', async () => {
            await page.goto('https://www.google.com');
        })
        await test.step('Cerrar cookies', async () => {
            const aceptarCookiesButton = page.getByRole('button', { name: 'Aceptar todo' });
            await aceptarCookiesButton.click();
        })
        await test.step('realizar busqueda', async () => {
            const searchInput = page.getByRole('combobox', { name: 'Buscar' });
            await searchInput.click();
            await searchInput.fill('Becas en españa');
            await searchInput.press('Enter');
        })
    })
    test('Busqueda en mercadolibre', async ({ page }) => {
        await test.step('Ir a mercado libre', async () => {
            await page.goto('https://www.mercadolibre.com/');
        })
        await test.step('Ir a la busqueda de colombia', async () => {
            await page.getByRole('link', { name: 'Colombia' }).click();
        })
        await test.step('Buscar objeto', async () => {
            const boxBusqueda = page.getByRole('combobox', { name: 'Ingresa lo que quieras' });
            await boxBusqueda.click();
            await boxBusqueda.fill(valorBusqueda)
            await boxBusqueda.press("Enter")
        })
        
        
    })
    
    
})
