# ALIGN Backend — Complete Beginner's Guide

Welcome, Kaz. This guide will walk you through **what each file does**, **why it exists**, and **how to use it step-by-step**. We'll move slowly and I'll explain concepts as we go.

---

## **Part 1: Understanding What We Built**

### **The Big Picture: How ALIGN Works**

When someone takes your retirement quiz, here's what happens:

```
User fills out 36 questions
          ↓
Clicks "Get My Results"
          ↓
Frontend sends all 36 answers to our API
          ↓
API (backend) calculates:
  - Which tier (A, B, or C)
  - Which 6 traits (Contractual, Market Driven, etc.)
  - Which persona (Collaborative Visionary, Pragmatic Realist, etc.)
          ↓
API sends back a JSON response with all results
          ↓
Frontend displays results page with personalized copy
          ↓
Results saved to database (Neon) for trust stacking
          ↓
Redtail CRM gets tags applied automatically
```

**What I built:** The API (backend) that handles the middle part — the scoring and logic.

---

## **Part 2: The 3 Files You Asked About**

### **File 1: `.env.local.example`**

**What it is:** A template showing which secret credentials you need.

**Why it exists:** 
- Your API needs to connect to the Neon database
- Neon requires a password (connection string)
- You should NEVER commit passwords to GitHub (security risk)
- This file shows you *which* secrets you need, without revealing the actual secrets

**What it looks like:**
```
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@...
REDTAIL_API_KEY=your_redtail_api_key_here
```

**How to use it:**
1. Copy this file and rename it to `.env.local` (remove the `.example`)
2. Replace `YOUR_PASSWORD` with your actual Neon password
3. Your code will read from `.env.local` to get the credentials
4. `.env.local` is in `.gitignore` so it never gets pushed to GitHub

**Why we do this:**
- If you pushed your password to GitHub, hackers could access your database
- By using `.env.local`, the password stays on your computer only
- When deployed to Vercel, you add the secrets there instead

---

### **File 2: `package.json`**

**What it is:** A list of all the software packages (libraries) your project needs.

**Think of it like:** A shopping list for your project.
- Your project is a cake
- `package.json` is the ingredient list
- Each package is an ingredient (flour, sugar, eggs, etc.)

**What's in it:**
```json
{
  "name": "align-assessment-api",
  "dependencies": {
    "next": "^14.0.0",      ← Framework for building the API
    "react": "^18.2.0",     ← Library for UI (not needed yet, but good to have)
    "pg": "^8.11.0",        ← PostgreSQL client (talks to Neon database)
    "axios": "^1.6.0",      ← Makes HTTP requests (used for Redtail API)
    "dotenv": "^16.3.0"     ← Reads your .env.local file
  }
}
```

**Scripts section:**
```json
"scripts": {
  "dev": "next dev",        ← Starts development server (npm run dev)
  "build": "next build",    ← Builds for production (npm run build)
  "start": "next start"     ← Runs production server (npm start)
}
```

**How to use it:**
1. When you download the project, you run `npm install`
2. npm reads `package.json` and downloads all the dependencies
3. All packages go into a folder called `node_modules/` (not committed to GitHub)
4. When you run `npm run dev`, npm uses the `"dev"` script to start your server

**Why we do this:**
- Instead of managing thousands of files, we just list what we need
- Everyone gets the same versions of packages (consistency)
- Easy to upgrade (just change the version number and run `npm install` again)

---

### **File 3: `README.md`**

**What it is:** Documentation. Instructions for how to set up and use the project.

**Think of it like:** The instructions on a LEGO box.
- Without it, you don't know how to build
- With it, step-by-step is clear

**What's in it:**
- How to install dependencies (`npm install`)
- How to start the development server (`npm run dev`)
- How to test the API
- What each endpoint does
- Troubleshooting tips
- Deployment instructions

**How to use it:**
When someone (including future you) downloads this project, they read README.md first. It answers: "What is this project?" and "How do I get it running?"

---

## **Part 3: Understanding the Other Files**

### **`tsconfig.json`**

**What it is:** Configuration for TypeScript (the language we're using).

**Why TypeScript?**
- Regular JavaScript can have bugs that go unnoticed until runtime
- TypeScript catches bugs *before* you run the code
- Example: If you try to use `email` as a number, TypeScript yells at you immediately

**You don't need to change this file.** It's just configuration to keep TypeScript happy.

---

### **`next.config.js`**

**What it is:** Configuration for Next.js (the framework).

**What does it do?**
- Tells Next.js how to optimize your code for production
- Handles special setup for PostgreSQL (`serverComponentsExternalPackages`)

**You don't need to change this either.** It's set up correctly for your needs.

---

### **`lib/db.ts`**

**What it is:** The connection to your Neon database.

**What does it do?**
```
Your API code
    ↓
Calls getPool() or query()
    ↓
This file connects to Neon
    ↓
Sends SQL command to Neon
    ↓
Gets data back
    ↓
Returns to your API code
```

**You won't touch this.** But understand: this is the bridge between your code and the database.

---

### **`lib/types.ts`**

**What it is:** TypeScript type definitions for your quiz.

**Think of it like:** A template that says "A quiz response looks like this":
```typescript
{
  email: "john@example.com",
  firstName: "John",
  responses: {
    1: "Strongly Agree",
    2: "Agree",
    ...
    36: "CA"
  }
}
```

**Why?**
- Every time you use quiz data, TypeScript checks: "Does this match the template?"
- If someone sends an invalid response (like `email: 123`), TypeScript catches it
- Prevents bugs

---

### **`lib/scoring-engine.ts`**

**What it is:** The brain of ALIGN. All the scoring logic.

**What does it do?**
- Takes 36 quiz responses
- Calculates tier (A, B, or C)
- Calculates 6 traits (Contractual, Market Driven, etc.)
- Calculates persona (Collaborative Visionary, etc.)
- Returns all results as JSON

**This is where the magic happens.** Every line of logic you defined in the spreadsheet is coded here.

---

### **`app/api/score/route.ts`**

**What it is:** The API endpoint (where requests come in).

**What does it do?**
```
Frontend sends POST request with 36 quiz answers
    ↓
This file receives it
    ↓
Validates the data
    ↓
Calls scoring-engine.ts to calculate results
    ↓
Saves results to Neon database
    ↓
Sends JSON response back to frontend
```

**This is the doorway to your API.** When the frontend (quiz page) sends data, it comes through here.

---

## **Part 4: The Workflow (Step by Step)**

### **When You Start Development**

1. **You have the code** (the files I created)
2. **You have Node.js installed** (`node --version` shows v24.14.0)
3. **You have Neon account** with a database and connection string

### **Step 1: Download/Copy the Code**

I created the code in `/home/claude/align-backend/`. You need to get it on your computer.

**Options:**
- Option A: Clone from GitHub (if already there)
- Option B: Download as ZIP and unzip on your computer
- Option C: Copy the files manually

### **Step 2: Install Dependencies**

```bash
cd align-assessment
npm install
```

**What happens:**
- npm reads `package.json`
- Downloads all 10+ packages listed
- Puts them in `node_modules/` folder
- Creates `package-lock.json` (locks exact versions)

**Time:** ~2 minutes

### **Step 3: Create `.env.local` File**

```bash
cp .env.local.example .env.local
```

**What happens:**
- Copies the template
- You now have `.env.local` (which is NOT committed to Git)

**Then edit it:**
```bash
nano .env.local
```

Replace `YOUR_PASSWORD` with your actual Neon connection string.

### **Step 4: Set Up Database**

```bash
npm run db:setup
```

**What happens:**
- Reads `schema.sql`
- Connects to Neon using your `DATABASE_URL`
- Creates all 6 tables
- Creates indexes for fast queries
- Sets up initial data

**Time:** ~10 seconds

### **Step 5: Start Development Server**

```bash
npm run dev
```

**What happens:**
- Starts Next.js server on `http://localhost:3000`
- Watches for file changes (auto-reloads)
- Your API is now running

### **Step 6: Test the API**

```bash
curl -X POST http://localhost:3000/api/score \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "John",
    "responses": {
      "1": "Strongly Agree",
      ...
      "36": "CA"
    }
  }'
```

**What happens:**
- Sends a quiz to your API
- API calculates tier, traits, persona
- Returns JSON with results
- Results saved to Neon database

---

## **Part 5: Git & GitHub (Version Control)**

### **Why Git?**

Git tracks every change you make. Think of it like:
- Google Docs "Version History" but for code
- You can revert to old versions if something breaks
- Multiple people can work on the same project

### **Why GitHub?**

GitHub is where you store your code online:
- Backup (if your computer breaks, code is safe)
- Collaboration (team members can see your code)
- Deployment (Vercel pulls directly from GitHub)

### **How It Works**

```
Your computer (local)
    ↓
git add .
git commit -m "message"
    ↓
Your changes are staged
    ↓
git push origin main
    ↓
Changes go to GitHub
    ↓
Vercel sees changes
    ↓
Vercel auto-deploys
```

### **The Three Files That Track Changes**

1. **`.git/`** — Hidden folder that tracks all history. Don't touch this.
2. **`.gitignore`** — Tells Git which files to NEVER track. Includes `.env.local` (secret safety).
3. **`package-lock.json`** — Locks exact package versions. Always commit this.

---

## **Part 6: Deploying to Vercel**

### **What is Vercel?**

A hosting company that specializes in Next.js apps. You push code → Vercel deploys automatically.

### **Why Vercel?**

- Works perfectly with Next.js
- Free tier available
- Auto-deploys on every GitHub push
- No server to manage
- Scales automatically

### **How It Works**

```
You push to GitHub
    ↓
Vercel sees the push
    ↓
Vercel runs: npm install && npm run build
    ↓
Builds your app
    ↓
Deploys to Vercel's servers
    ↓
Your API is live at vercel.com/your-project
```

---

## **Part 7: Next Steps (We'll Do These Together)**

1. ✅ **Understand the files** (you are here)
2. ⏳ **Set up on your computer** (npm install, .env.local, npm run db:setup)
3. ⏳ **Run locally** (npm run dev)
4. ⏳ **Test the API** (POST request with sample quiz)
5. ⏳ **Push to GitHub** (git add, git commit, git push)
6. ⏳ **Deploy to Vercel** (connect GitHub, add secrets, deploy)
7. ⏳ **Build frontend** (React landing page + results pages)
8. ⏳ **Wire Redtail** (once you have API credentials)

---

## **Questions to Ask Yourself**

As we go through each step, ask:

- **"What is this file?"** → Check this guide
- **"Why does this file exist?"** → Check this guide
- **"What does this command do?"** → I'll explain each one
- **"What should happen after I run this?"** → I'll tell you what to expect

---

## **Ready?**

Let me know when you're ready for **Step 1: Set up on your computer**, and I'll walk you through every command with explanations.

We're not rushing. We're learning as we go. 🚀
