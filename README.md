# 🎓 EdTech Assignment Tracker

A full-stack web application for managing and submitting assignments in educational settings. Built with **FastAPI + React.js**, featuring role-based access for students and teachers, secure JWT authentication, and file upload support.

---

## 🚀 Features

### 👨‍🏫 Teachers
- Create assignments with title, description, and due date
- View submissions from students
- Download attached files

### 🧑‍🎓 Students
- View available assignments
- Submit answers with optional file attachments
- See due dates and instructions

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|------------|--------------------------------------|
| Frontend   | React, Axios, Tailwind CSS           |
| Backend    | FastAPI, SQLAlchemy, SQLite/Postgres |
| Auth       | OAuth2 Password Flow, JWT            |
| File Upload| Multipart/form-data, Static Serving  |

---

## 📁 Project Structure

```plaintext
edtech-assignment-tracker/
├── backend/
│   └── app/               # FastAPI source code
├── frontend/
│   └── src/               # React components & pages
