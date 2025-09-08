import { expect, test, Page, Browser } from '@playwright/test';

/*(async () =>{
    let page: Page;
    let browser: Browser;

    test.describe('Pruebas iniciales con playwright', () => {
        test('Navegacion en freerangetesters', async ({page}) => {
            await test.step('Inicio Navegacion a la pagina freerangetester', async() => {
                page.goto("https://www.freerangetesters.com");
            })
            
            await test.step('Hago click en cursos', async() =>{
                page.locator('#page_header').getByRole('link', {name: 'Cursos', exact: true}).click();
                //await page.waitForURL('*cursos');
            })

            
        })
    })
})();*/
const secciones = [
    {nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos'},
    {nombre: 'Talleres', url: '/talleres-y-webinars', tituloEsperado: 'Webinars en vivo'},
    {nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos'},
    //{nombre: 'Academia', url: '/academia', tituloEsperado: 'Academia'},
    {nombre: 'Mentorías', url: '/mentoria-1-1-con-pato', tituloEsperado: 'Mentoría personalizada de avance de carrera para testers de software'},
    {nombre: 'Blog', url: '/blog', tituloEsperado: 'Free Range Testers'}
]
for (const seccion of secciones){
    test(`Basico de PW TFTR "${seccion.nombre}"`, async ({ page }) => {
        await page.goto("https://www.freerangetesters.com");
        await expect(page).toHaveTitle('Free Range Testers')
        await page.getByRole('link', { name: seccion.nombre, exact: true }).click();
        await page.waitForURL(`**${seccion.url}`)
        await expect(page).toHaveTitle(seccion.tituloEsperado)
    });
}



