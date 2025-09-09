import { type Locator, type Page } from "@playwright/test";

export class SandboxPage {
    readonly page: Page;
    readonly heladoCheckbox: Locator;
    readonly hamburguesaCheckbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heladoCheckbox = page.getByRole('checkbox', { name: 'Helado 🍧' });
        this.hamburguesaCheckbox = page.getByRole('checkbox', { name: 'Hamburguesa 🍔' });
    }
    async checkHelado() {
        await this.heladoCheckbox.check();
    }

    async unCheckHelado() {
        await this.heladoCheckbox.uncheck();
    }

    async checkHamburguesa() {
        await this.hamburguesaCheckbox.check();
    }

    async unCheckHamburguesa() {
        await this.hamburguesaCheckbox.uncheck();
    }
}