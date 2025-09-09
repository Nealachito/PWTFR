import { expect, test, Page, Browser } from '@playwright/test';
import { SandboxPage } from './Pages/SandboxPage';

(async () =>{
    let page: Page;
    let browser: Browser;

    let texto = "Probando el llenado de la caja de texto :)"

    test.describe('Acciones en el automation Sandbox', () => {
        test('Click en Botón ID Dinamico @sp1', async ({ page,browserName }) => {
            test.skip(browserName === 'webkit', 'Flaky en Safari')
            test.info().annotations.push({ 
                type: 'Botón con ID dinamico', 
                description: 'Primeras pruebas con playwright, validando un botón con ID dinamico' 
            });
            await test.step('Dado que navego al sandbox de Automation de Free Range Testers', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")
            })
            await test.step('Puedo hacer click en el botón con ID Dinamico', async () => {
                const botonDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID' })
                await botonDinamico.click({force:true})
                await expect(page.getByText('OMG, aparezco después de 3'),"El texto no se ve").toBeVisible();
                await expect(page.getByText('OMG, aparezco después de 3'),"El texto no se ve").toContainText('de haber hecho click');
            })  
        })
        test('Llenar el campo de texto en SandBox @sp1', async ({ page,browserName }) => {
            test.skip(browserName === 'webkit', 'Flaky en Safari')
            await test.step('Dado que navego al sandbox de Automation de Free Range Testers', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")
            })
            await test.step('llenar el campo de texto visible', async () => {
                 const textAburrido = page.getByRole('textbox', { name: 'Un aburrido texto' })
                 const textAburridoPlaceholder = page.getByPlaceholder('Ingresá texto')
                 await expect(textAburridoPlaceholder).toBeEditable()
                 await textAburridoPlaceholder.fill(texto)
                 await expect(textAburridoPlaceholder).toHaveValue(texto)
            })
            
        })
        test('Seleccionando checkbox en SandBox', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Automation de Free Range Testers', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")
            })
            await test.step('selecciono el checkbox deseado', async () => {
                 const pageSanbox = new SandboxPage(page);
                 await pageSanbox.checkHelado();
                 await pageSanbox.checkHamburguesa();
                 await pageSanbox.unCheckHelado();
                 await expect(pageSanbox.heladoCheckbox).not.toBeChecked();
            })
            
        })
        test('Seleccionando radioButtons en SandBox', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Automation de Free Range Testers', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")
            })
            await test.step('selecciono el radiobutton deseado', async () => {
                 await page.getByLabel('Si').check()
                 await expect(page.getByLabel('Si'),"El elemento no se encuentra seleccionado").toBeChecked()
            })
            
        })
        test('Seleccion en el dropdown', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Automation de Free Range Testers', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")
            })
            await test.step('selecciono una opción del dropdown', async () => {
                await page.getByLabel('Dropdown').selectOption('Tennis')
            })
        })
        test('Validar un dropdown y sus opciones', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Automation de Free Range Testers', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")
            })
            await test.step('Valido la lista de los elementos', async () => {
                const deportes = ['Fútbol', 'Tennis', 'Basketball']
                for (let option of deportes) {
                    const element = await page.$(`select#formBasicSelect > option:is(:text("${option}"))`)
                    if(element){
                        console.log(`El elemento ${option} si se encuentra en el dropdown`)
                    }else{
                        throw new Error(`El elemento ${option} no se encuentra en el dropdown`)
                    }
                }
            })
        })
        test('Seleccionando un "Dropdown"', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Automation de Free Range Testers', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")
            })
            await test.step('selecciono una opción del dropdown', async () => {
                await page.getByRole('button', { name: 'Día de la semana' }).click()
                await page.getByRole('link', { name: 'Viernes' }).click()
            })
        })
        test('Validar una tabla estatica', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Automation de Free Range Testers', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")
            })
            await test.step('Valido la columna nombre de los elementos', async () => {
                const valoresColumnaNombre = await page.$$eval('h2:has-text("Tabla estática")+table tbody tr td:nth-child(2)', elementos => elementos.map(el => el.textContent.trim()))   
                const valoresNombresEsperados = ['Messi', 'Ronaldo', 'Mbappe']
                expect(valoresColumnaNombre).toEqual(valoresNombresEsperados)
            })
        })

        test('Validar el cambio de valores de una tabla dinamica', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Automation de Free Range Testers', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")
            })
            await test.step('Valido el cambio de los valores de la tabla dinamica', async () => {
                const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica")+table tbody tr td', elementos => elementos.map(el => el.textContent.trim()))   
                console.log(valoresTablaDinamica)

                await page.reload()

                const valoresTablaDinamicaPost = await page.$$eval('h2:has-text("Tabla dinámica")+table tbody tr td', elementos => elementos.map(el => el.textContent.trim()))   
                console.log(valoresTablaDinamicaPost)

                expect(valoresTablaDinamica).not.toEqual(valoresTablaDinamicaPost)
            })
        })
        test('validar las opciones de los checkboxes @sp1', async ({ page,browserName }) => {
            test.skip(browserName === 'firefox', 'Flaky en Firefox')
            await test.step('Dado que navego al sandbox de Automation de Free Range Testers', async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/")
            })
            await test.step('Valido las opciones de los checkboxes', async () => {
                const sandboxPage = new SandboxPage(page);
                await expect.soft(page.getByText('Pizza 🍕'),"No se encontró el elemento buscado").toBeVisible();
                await expect.soft(sandboxPage.hamburguesaCheckbox).toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝'),"No se encontró el elemento buscado").toBeVisible();
                await expect.soft(sandboxPage.heladoCheckbox).toBeVisible();
                //await expect.soft(page.getByText('Ensalada 🥗'),"No se encontró el elemento buscado").toBeVisible();
                await expect.soft(page.getByText('Torta 🍰'),"No se encontró el elemento buscado").toBeVisible();
            })
        })
        

    })
    
})();
    