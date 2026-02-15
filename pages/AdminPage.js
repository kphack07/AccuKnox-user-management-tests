class AdminPage {
  constructor(page) {
    this.page = page;

    this.adminTab = page.getByRole('link', { name: 'Admin' });

    this.addButton = page.getByRole('button', { name: 'Add' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    this.passwordInputs = page.locator('input[type="password"]');
    this.deleteIcon = page.locator('i.bi-trash');
    this.confirmDelete = page.getByRole('button', { name: 'Yes, Delete' });
    this.editIcon = page.locator('i.bi-pencil-fill');

    this.usernameSearchInput = page.locator('.oxd-input').nth(1);
  }

  async goToAdmin() {
    await this.adminTab.click();
    await this.page.waitForTimeout(2000);
  }

  async addUser(username, password) {
    await this.addButton.click();

    // User Role
    await this.page.locator('.oxd-select-text').first().click();
    await this.page.getByRole('option', { name: 'ESS' }).click();

    // Employee Name
    const employeeInput = this.page.locator('input[placeholder="Type for hints..."]');
    await employeeInput.fill('a');
    await this.page.locator('.oxd-autocomplete-option').first().click();

    // Status
    await this.page.locator('.oxd-select-text').nth(1).click();
    await this.page.getByRole('option', { name: 'Enabled' }).click();

    // Username
    await this.page.locator('.oxd-input').nth(1).fill(username);

    // Password
    await this.passwordInputs.nth(0).fill(password);
    await this.passwordInputs.nth(1).fill(password);

    await this.saveButton.click();

    // 🔥 Instead of waiting for redirect, manually navigate back
    await this.goToAdmin();
  }

  async searchUser(username) {
    await this.usernameSearchInput.fill('');
    await this.usernameSearchInput.fill(username);
    await this.searchButton.click();
    await this.page.waitForTimeout(2000);
  }

  async editUser(newUsername) {
    await this.editIcon.first().click();

    await this.page.locator('.oxd-input').nth(1).fill(newUsername);
    await this.saveButton.click();

    await this.goToAdmin();
  }

  async deleteUser() {
    await this.deleteIcon.first().click();
    await this.confirmDelete.click();
    await this.page.waitForTimeout(2000);
  }

  async addUserWithMissingFields() {
    await this.addButton.click();
    await this.saveButton.click();
  }
}

module.exports = { AdminPage };
