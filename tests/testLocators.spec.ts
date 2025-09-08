import test, { expect } from "@playwright/test";
const botonAcceder = 'Acceder'
const enlaceAcademia = 'Academia'
const botonCursos = 'Cursos'
test('Pruebas Locators', async ({ page }) => {
    await page.goto("https://www.freerangetesters.com");
    await page.getByRole('link', {name:botonAcceder, exact: true}).click();
    await expect(page.getByText('Acceder a Free Range Testers')).toBeVisible();
    await page.getByRole('link', { name: botonAcceder }).click();
    await page.getByPlaceholder('e.g. picard@starfleet.org').fill('nealdeoroing@hotmail.com');
    await page.getByLabel('Contraseña').fill('12345');
    await page.getByRole('link', {name: enlaceAcademia, exact: true}).click();
    //await expect(page.getByAltText('valoratributotexto')).toBeVisible();
    //await expect(page.getByTitle('valoratributotitulo')).toBeVisible();
    await expect(page.getByTestId('logo-container')).toBeVisible();
    await expect(page.locator('(//img[@data-testid="media"])[2]')).toBeVisible();
    await expect(page.getByText('La Academia',{exact:true})).toBeVisible();
});

test('Pruebas Locators con filtros', async ({ page }) => {
    await page.goto("https://www.freerangetesters.com");
    await page.getByRole('link', {name:botonCursos, exact: true}).click();
    await expect(page.getByText('Todos los cursos',{exact:true})).toBeVisible();
    await page.getByTestId('grid-item')
        .filter({hasText: 'Introducción al Testing de Software'})
        .getByRole('link', {name: 'Ver producto'})
        .click();
    await page.getByRole('link', {name:botonCursos, exact: true}).click();
    await page.getByTestId('grid-item')
        .filter({has: page.getByRole('heading', {name: 'Programación y trabajo con código para Testers'})})
        .getByRole('link', {name: 'Ver producto'}).click();
    await page.getByRole('link', {name:botonCursos, exact: true}).click();
    await page.getByTestId('grid-item').nth(6).click();
});