# Quiz Master

A responsive and interactive quiz web application developed as part of my Web Development Internship at SkillCraft Technology.

## 🚀 Project Overview

Quiz Master is a web-based quiz platform designed to help users practice and test their knowledge across multiple technical and aptitude subjects.

The application provides both Practice Test and Mock Test modes with difficulty selection, customizable question counts, a timer, score tracking, explanations, and answer review.

## ✨ Features

- 🔐 Local Sign Up and Login
- 👤 Personalized User Experience
- 📚 8 Different Subjects
- 🎯 Easy, Medium, Hard and Mixed Difficulty
- 📝 10, 15, 20 or 25 Questions
- 📖 Practice Test Mode
- 🧪 Mock Test Mode
- ⏱️ Question Timer
- 📊 Score and Accuracy Tracking
- 🏆 Best Score Tracking
- 💡 Explanations for Incorrect Answers
- 📝 Review Answers Section
- 🌙 Light and Dark Theme
- 📱 Responsive Design
- 💾 Local Storage for User Data and Statistics

## 📚 Subjects

- Python
- Java
- HTML
- Data Structures & Algorithms
- Logical Reasoning
- Vocabulary
- C Programming
- Aptitude

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Git
- GitHub

## 🎮 Test Modes

### Practice Test

Practice mode provides immediate feedback after answering a question and displays explanations for incorrect answers.

### Mock Test

Mock mode simulates a test environment where answers are selected without immediate feedback. Results and explanations are displayed after completing the test.

## ⏱️ Timer

Each question has a countdown timer. If the time expires, the question is automatically marked as not answered and the correct answer is revealed.

## 📊 Performance Tracking

Quiz Master keeps track of:

- Total attempts
- Questions solved
- Best accuracy
- Best score for each subject

User-specific statistics are stored locally using browser LocalStorage.

## 🔐 Authentication

The application includes a simple frontend authentication system using:

- Username
- Date of Birth
- Password
- Confirm Password

No external authentication service or database is used.

> Note: This authentication system is intended for demonstration purposes and is not suitable for production security.

## 💻 How to Run

1. Clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` using Live Server or your browser.
4. Create an account or log in.
5. Select a subject and start the quiz.

## 📁 Project Structure

```text
quiz-master/
│
├── index.html
├── style.css
├── script.js
├── .vscode/
│
└── README.md
