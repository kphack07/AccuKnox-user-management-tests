# AccuKnox User Management Tests

## 📌 Project Overview
This project contains Playwright automation test cases for the OrangeHRM User Management module as part of the AccuKnox QA Assessment.

## 🛠 Tech Stack
- Playwright
- JavaScript
- Node.js
- Page Object Model (POM)
- Docker (Optional Execution)

## 📂 Project Structure

pages/
  - LoginPage.js
  - AdminPage.js

tests/
  - userManagement.spec.js

playwright.config.js

## ✅ Test Scenarios Covered

1. Add User
2. Search Newly Created User
3. Edit User
4. Validate Updated User
5. Delete User
6. Search Deleted User
7. Missing Field Validation

## ▶️ How to Run Tests

### Install Dependencies
npm install


### Run Tests
npx playwright test


### Run in Docker
docker run --rm -v ${PWD}:/app -w /app mcr.microsoft.com/playwright:v1.58.2-jammy npx playwright test


## 📊 Reporting
Playwright HTML report is generated after execution.

npx playwright show-report


## 👤 Author
Krunal Pate
