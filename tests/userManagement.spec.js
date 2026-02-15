const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { AdminPage } = require('../pages/AdminPage');

const PASSWORD = 'Test@123';

test.describe('User Management E2E Professional Suite', () => {

  test('TC-01 Full User Lifecycle (Add → Search → Edit → Delete)', async ({ page }) => {

    const login = new LoginPage(page);
    const admin = new AdminPage(page);

    const username = 'AutoUser' + Date.now();
    const updatedUsername = username + 'Updated';

    // Login
    await login.goto();
    await login.login('Admin', 'admin123');

    // Navigate
    await admin.goToAdmin();

    // Add User
    await admin.addUser(username, PASSWORD);

    // Search Created User
    await admin.searchUser(username);
    await expect(page.locator('.oxd-table')).toContainText(username);

    // Edit User
    await admin.editUser(updatedUsername);

    // Validate Updated
    await admin.searchUser(updatedUsername);
    await expect(page.locator('.oxd-table')).toContainText(updatedUsername);

    // Delete User
    await admin.deleteUser();

    // Validate Deleted
    await admin.searchUser(updatedUsername);
    await expect(page.locator('body')).toContainText('No Records Found');
  });


  test('TC-02 Search Existing User (Admin)', async ({ page }) => {

    const login = new LoginPage(page);
    const admin = new AdminPage(page);

    await login.goto();
    await login.login('Admin', 'admin123');
    await admin.goToAdmin();

    await admin.searchUser('Admin');
    await expect(page.locator('.oxd-table')).toContainText('Admin');
  });


  test('TC-03 Add User With Missing Fields (Negative Test)', async ({ page }) => {

    const login = new LoginPage(page);
    const admin = new AdminPage(page);

    await login.goto();
    await login.login('Admin', 'admin123');
    await admin.goToAdmin();

    await admin.addUserWithMissingFields();
    await expect(page.locator('body')).toContainText('Required');
  });

});
