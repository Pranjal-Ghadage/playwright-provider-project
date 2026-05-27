# 🎭 Playwright Automation Framework (Provider App)

## 📌 Project Overview

This project is an end-to-end automation framework built using Playwright.
It automates real-world workflows including authentication, dashboard validation, booking management, serviceman management, profile validations, and file handling.

The framework follows the **Page Object Model (POM)** design pattern to ensure better code reusability, maintainability, and scalability.

---

## 🚀 Tech Stack

* **Language:** JavaScript
* **Automation Tool:** Playwright
* **Design Pattern:** Page Object Model (POM)
* **CI/CD:** GitHub Actions

---

## 📁 Project Structure

```bash
playwright-provider-project
│
├── tests/              # Test files
├── pages/              # Page Object Model files
├── downloads/          # PDF download validation
├── uploads/            # Image upload/download handling
├── screenshots/        # Test reports / screenshots
│
├── playwright.config.js
├── package.json
└── README.md
```

---

## ✅ Features Covered

* 🔐 Login & Logout automation
* ❌ Login validation (invalid credentials, empty fields)
* 👤 Profile form validation testing
* 👨‍🔧 Serviceman module automation
* ⚠️ Alert handling (browser alerts, confirmations)
* 📊 Dashboard validation
* 📅 Booking workflow automation
* 🔍 Booking search functionality
* 📄 Excel/PDF download validation
* 🖼️ Image upload & download handling
* ♻️ Reusable Page Object Model implementation

---

## 🔄 CI/CD (GitHub Actions)

* Automated test execution on every push and pull request
* Runs Playwright tests in CI environment
* Uploads Playwright HTML report as artifact

---

## ⚙️ Setup & Installation

### 1. Clone repository

```bash
git clone https://github.com/Pranjal-Ghadage/playwright-provider-project.git
cd playwright-provider-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

---

## ▶️ Run Tests

Run all tests:

```bash
npx playwright test
```

Run specific test file:

```bash
npx playwright test tests/login.spec.js
```

---

## 📊 Test Report

After execution:

```bash
npx playwright show-report
```

👉 Add screenshot of report below:

```md
![Playwright Report](./screenshots/report.png)
```

---

## 📌 Key Learning

* Handling file downloads (PDF validation)
* Handling image upload functionality
* Working with browser alerts and popups
* Validating login edge cases
* Automating real-world user workflows
* Writing maintainable and reusable automation code

---

## 🚧 Future Improvements

* Add API automation tests
* Integrate advanced reporting (Allure/HTML)
* Add parallel execution
* Improve framework scalability

---

## 👩‍💻 Author

**Pranjal Ghadage**
