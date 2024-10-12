# Password Validator App

## Overview

The **Password Validator App** is a React application built with TypeScript that provides users with a simple interface to validate their passwords. It checks for common password security criteria such as length, uppercase and lowercase letters, numbers, special characters, and password confirmation. The application utilizes Firebase for hosting and potential future user authentication features.

Sample can be viewed at: https://aweber-pw-validator.web.app/

## Features

### On-Click Validation (Task-Required Approach)
- In this form, validation is only triggered when the user clicks the submit button. The user can enter both passwords without receiving feedback until they choose to submit, at which point all validation errors (e.g., password too short, passwords not matching) are displayed.
- While this approach might be considered more clunky from a UX perspective, it strictly adheres to the original project requirements of validation happening only on form submission.

### Live Validation (User-Friendly Approach)
- This form performs real-time validation as the user types, providing immediate feedback. This offers a smoother and more intuitive experience since users are notified of potential errors (e.g., password length, mismatches) before submitting the form.
- The benefits of live validation include reduced friction, fewer mistakes, and a more modern, interactive interface.

### Why Two Versions?
- I initially optimized the password validation experience by adding live, real-time feedback for users. From a usability standpoint, this is more aligned with modern web applications, offering a better experience for users. However, since the task explicitly required validation to occur on-click, I decided to maintain both versions:
  - **On-Click Validation** – to fulfill the task's exact requirements.
  - **Live Validation** – for a more polished, user-friendly experience.
- Each of these can be accessed via their respective URLs within the app:
  - `/` for On-Click Validation.
  - `/live-validation` for Live Validation.

### How It Works
- **On-Click Validation**: All validation checks occur only when the user submits the form. If any issues are found, they're displayed after submission. This setup allows for flexibility in fulfilling different needs, providing both a smooth user experience and adherence to specific task requirements.
- **Live Validation**: As the user types in the password fields, validation functions are called on every change, updating error messages dynamically.

    
## Getting Started

Prerequisites
- Node.js (version >= 14.18.2)
- npm (Node package manager)
    

Installation

1.  git clone [https://github.com/yourusername/your-repo-name.git](https://github.com/yourusername/your-repo-name.git)
    
2.  cd your-repo-name
    
3.  npm install
    

Usage

1.  npm start
    
2.  Open your web browser and go to http://localhost:3000 to view the app.


Unit Testing

1.  npm test