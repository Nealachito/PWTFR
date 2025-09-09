import  { test,expect } from "@playwright/test"

const REPO = "PWTFR"
const USER = "Nealachito"

let apiContext;

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
          'Authorization': `token ${process.env.API_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        },
    });
});

test.afterAll(async ({ }) => {
   await apiContext.dispose();
})

test('Creando el componente desde el backend', async ({ page }) => {
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: "Probando E2E en PW",
            body: "Validando el issue a nivel de E2E",
        }
    });
    expect (newIssue.ok()).toBeTruthy();
    await sleep(10000);
    await test.step('Ingresando a la pagina', async () => {
        await page.goto(`https://github.com/${USER}/${REPO}/issues`)
    })
    const issueTitle = page.getByText("Probando E2E en PW")
    await test.step('Validando issue registrado', async () => {
        await expect(issueTitle).toBeVisible();
    })
    await test.step('Validando el interior', async () => {
        await issueTitle.click();
        await expect(page.getByText('Validando el issue a nivel de E2E')).toBeVisible();
    }) 
    
})
