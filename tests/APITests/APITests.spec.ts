import {test,expect} from '@playwright/test';
import { parse } from 'path';

const REPO = 'PWTFRAPI';
const USER = 'Nealachito';
const ahora = new Date();
const hora = ahora.getHours();
const minutos = ahora.getMinutes();
const noconsecutivo = parseInt(`${hora}${minutos.toString().padStart(2, '0')}`);

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

test.beforeAll(async ({ request }) => {
    const newRepo = await request.post('/user/repos', {
        data:{
            name: REPO,
        }
    });
    expect(newRepo.status()).toBe(201);
});


test('Creando issues a traves de la API', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data:{
            title:  `Nuevo Issue desde Playwright - ${noconsecutivo}`,
            body:  `Descripción del nuevo issue #${noconsecutivo} desde playwright`,
        }
});
    expect(newIssue.ok()).toBeTruthy();
    await sleep(3000);
    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title:  `Nuevo Issue desde Playwright - ${noconsecutivo}`,
            body:  `Descripción del nuevo issue #${noconsecutivo} desde playwright`,
    }));
});
 
test('Puedo crear un feature request', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Quiero que haga helados',
            body: 'Estaría buenísimo que el repo haga helados 🍦',
        }
    });
    expect(newIssue.ok()).toBeTruthy();
    await sleep(3000);
    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Feature] Quiero que haga helados',
        body: 'Estaría buenísimo que el repo haga helados 🍦'
    }
));
})
test.afterAll(async ({ request }) => {
    const deleteRepo = await request.delete(`/repos/${USER}/${REPO}`);
    expect(deleteRepo.ok()).toBeTruthy();
});
