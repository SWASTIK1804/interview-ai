# Interview AI

Interview AI is a full-stack web application that helps users prepare for job interviews. A user can register, log in, upload a PDF resume or write a self-description, paste a target job description, and generate an AI-powered interview preparation report. The app also supports generating a tailored resume PDF from an existing interview report.

## Features

- User registration, login, logout, and protected routes
- Cookie-based authentication with JWT
- PDF resume upload and parsing
- AI-generated interview report using Google GenAI
- Technical interview questions with suggested answers
- Behavioral interview questions with suggested answers
- Skill gap analysis
- Day-wise preparation roadmap
- Recent interview report history
- Tailored resume PDF generation
- Frontend form validation and user-facing error messages

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Sass

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- pdf-parse
- Puppeteer
- Google GenAI SDK
- Zod

## Project Structure

```text
interview-ai-yt/
  Backend/
    server.js
    package.json
    src/
      app.js
      config/
      controllers/
      middlewares/
      models/
      routes/
      services/
  Frontend/
    index.html
    package.json
    vite.config.js
    src/
      App.jsx
      app.routes.jsx
      features/
      style/
      style.scss
```

## Requirements

Install these before running the project:

- Node.js 18 or later
- npm
- MongoDB local server or MongoDB Atlas database
- Google GenAI API key

## Environment Variables

Create a `.env` file inside `Backend/`.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
CLIENT_URL=http://localhost:5173
PORT=3000
```

Optional frontend environment file: `Frontend/.env`

```env
VITE_API_URL=http://localhost:3000
```

If `VITE_API_URL` is not set, the frontend uses `http://localhost:3000` by default.

## Important Security Notes

Do not commit real `.env` files.

Never push these files or folders to GitHub:

```text
Backend/.env
Frontend/.env
Backend/node_modules/
Frontend/node_modules/
Frontend/dist/
*.log
```

Safe files to commit:

```text
Backend/package.json
Backend/package-lock.json
Frontend/package.json
Frontend/package-lock.json
README.md
source code files
```

If you accidentally commit secrets, rotate the exposed API keys immediately.

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/interview-ai.git
cd interview-ai
```

Install backend dependencies:

```bash
cd Backend
npm install
```

Install frontend dependencies:

```bash
cd ../Frontend
npm install
```

## Running the Project Locally

Start the backend first:

```bash
cd Backend
npm run dev
```

Backend runs on:

```text
http://localhost:3000
```

Start the frontend in another terminal:

```bash
cd Frontend
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

## App Flow

1. Register a new account.
2. Log in with your email and password.
3. Paste the target job description.
4. Upload a PDF resume or add a self-description.
5. Generate the interview report.
6. View technical questions, behavioral questions, skill gaps, and preparation roadmap.
7. Download a tailored resume PDF from the report page.

## API Endpoints

### Auth

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/logout
GET  /api/auth/get-me
```

### Interview

```text
POST /api/interview/
GET  /api/interview/
GET  /api/interview/report/:interviewId
POST /api/interview/resume/pdf/:interviewReportId
```

## File Upload Rules

- Only PDF resumes are supported.
- Maximum resume size is 5MB.
- A user must provide either a PDF resume or a self-description.
- Job description is required.

## Available Scripts

### Backend

```bash
npm run dev
```

Starts the Express backend with Nodemon.

### Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the frontend for production.

```bash
npm run lint
```

Runs ESLint on the frontend code.

```bash
npm run preview
```

Previews the production frontend build.

## Verification

Frontend lint:

```bash
cd Frontend
npm run lint
```

Frontend production build:

```bash
cd Frontend
npm run build
```

Backend syntax check:

```bash
cd Backend
node --check server.js
```

## Common Issues

### MongoDB connection fails

Check that `MONGO_URI` is correct and reachable.

For local MongoDB:

```env
MONGO_URI=mongodb://127.0.0.1:27017/interview-ai-yt
```

For MongoDB Atlas:

- Make sure your username and password are correct.
- Make sure your current IP address is allowed in Atlas Network Access.
- Make sure your cluster is running.

### Frontend cannot call backend

Check that:

- Backend is running on port `3000`.
- Frontend is running on port `5173`.
- `CLIENT_URL=http://localhost:5173` is set in backend `.env`.
- `VITE_API_URL=http://localhost:3000` is set if needed.

### Resume upload fails

Use a valid text-based PDF file under 5MB. Scanned image PDFs may not parse correctly.

## Deployment Notes

For deployment, set the same environment variables on your hosting provider. Do not upload `.env` files manually to GitHub.

Backend environment:

```env
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
CLIENT_URL=your_frontend_url
PORT=3000
NODE_ENV=production
```

Frontend environment:

```env
VITE_API_URL=your_backend_url
```

## License

This project is currently licensed under ISC, based on the backend package metadata.
