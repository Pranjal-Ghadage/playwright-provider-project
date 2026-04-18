# 🎭 Playwright Automation Framework (Provider App)

## 📌 Project Overview

This project is an end-to-end automation framework built using Playwright.
It covers real-time scenarios like login, dashboard validation, and booking workflows.

The framework follows a structured approach using Page Object Model (POM).

---

## 🚀 Tech Stack

* Language: JavaScript
* Automation Tool: Playwright
* Design Pattern: Page Object Model (POM)

---

## 📁 Project Structure

```bash
playwright-provider-project
│
├── tests/                 # Test files
├── pages/                 # Page Object Model files
├── downloads-pdf/         # Downloaded PDF files validation
├── files-img/             # Image upload/download handling
│
├── playwright.config.js
├── package.json
└── README.md
```

---

## ✅ Features Covered

* 🔐 Login & Logout automation
* ❌ Login error validation (invalid credentials, empty fields)
* ⚠️ Alert handling (browser alerts, confirmations)
* 📊 Dashboard validation
* 📅 Booking functionality
* 📄 PDF download validation
* 🖼️ Image upload/download handling

---

## ⚙️ Setup & Installation

### Clone repository

```bash
git clone https://github.com/Pranjal-Ghadage/playwright-provider-project.git
cd playwright-provider-project
```

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

---

## ▶️ Run Tests

```bash
npx playwright test
```

Run specific file:

```bash
npx playwright test tests/login.spec.js
```

---

## 📌 Key Learning

* Handling file downloads (PDF)
* Handling image upload
* Handling browser alerts and popups
* Validating login errors and edge cases
* Working with real application flows
* Writing reusable automation code

---

## 🚧 Future Improvements

* Add API automation
* Add reporting
* Improve folder structure

---

## 👩‍💻 Author

Pranjal Ghadage
