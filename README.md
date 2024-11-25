# Note-taking Web App Solution

Welcome to the **Note-taking Web App**, a simple yet powerful tool for
organizing your ideas and tasks. This app allows you to create, manage, and
categorize notes efficiently with features like searching, archiving, and
filtering by tags. Built with modern technologies, it offers a seamless
experience across devices.

---

## Table of Contents

- [The Challenge](#the-challenge)
- [Screenshot](#screenshot)
- [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Author](#author)

---

## The Challenge

Users can:

- Create, read, update, and delete notes.
- Archive notes for safekeeping.
- View all their notes in one place or filter archived notes.
- Search notes by **title**, **tags**, or **content**.
- Filter notes by specific tags.
- Customize their experience by choosing:
  - **Color theme** (light/dark mode).
  - **Font theme**.
- Receive validation messages for incomplete forms.
- Navigate the app and perform all actions with **keyboard accessibility**.
- Experience a responsive layout that adapts to their device's screen size.
- See hover and focus states for all interactive elements.

---

## Screenshot

![Preview](./public/preview.jpg)

---

## Links

- GitHub Repository:
  [Note-Taking Web App](https://github.com/unaygney/note-taking-web-app)
- Live Site: [Note-Taking Web App](https://note-taking-web-app-tau.vercel.app)

---

## My Process

### Built With

This app is built with a modern stack to ensure performance, scalability, and
maintainability:

- **[Next.js](https://nextjs.org/) v15.0.1** (App Router) - Framework for
  building modern web apps.
- **[React](https://reactjs.org/)** - JavaScript library for building user
  interfaces.
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework for
  styling.
- **[Better-Auth](https://better-auth.dev/)** - Authentication and session
  management.
- **[tRPC](https://trpc.io/)** - Type-safe API routes and middleware.
- **[Redis](https://upstash.com/)** - In-memory database for rate limiting.
  Using Upstash
- **Drizzle ORM** - Lightweight ORM for database operations.

### Features

#### Core Features:

- **Note Management**: Add, edit, delete, and archive notes.
- **Tagging System**: Organize notes with tags.
- **Advanced Search**: Search notes by title, tags, or content.
- **Keyboard Navigation**: Fully keyboard-accessible interface.

#### User Experience:

- **Responsive Design**: Adapts to various screen sizes for optimal usability.
- **Customizable Themes**: Choose color and font themes.

#### Technical Features:

- **Rate Limiting**: Prevent abuse using Redis.
- **Authentication**: Secure login with Google and Better-Auth.

## Setup Instructions

To run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/unaygney/note-taking-web-app.git
   cd note-taking-web-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and fill in the required
   environment variables as shown in `.env.example`.

   Example `.env` configuration:

   ```env
   # Drizzle
   DATABASE_URL="postgresql://postgres:password@localhost:5432/note-taking-web-app"

   # Email Credentials
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_pass
   EMAIL_API_KEY=your_api_key

   # Google OAuth Credentials
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Redis
   REDIS_URL=your_redis_url
   REDIS_TOKEN=your_redis_token

   # Better Auth
   BETTER_AUTH_SECRET=your_secret_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see
   the app.

---

## Author

- GitHub - [Guney Unay](https://github.com/unaygney)
- LinkedIn - [Guney Unay](https://www.linkedin.com/in/guneyunay/)
- Website - [guneyunay.com](https://www.guneyunay.com)

---
