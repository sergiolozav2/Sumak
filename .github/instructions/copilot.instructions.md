---
applyTo: '**'
---

# Copilot Instructions for Sumak Landing

## Project Overview

Sumak is a modern React/TypeScript web app focused on personalized education in Latin America, built with TanStack tools, tRPC, and Tailwind CSS. The architecture is modular, with clear separation of routing, data fetching, and UI components.

## Key Technologies

- **React 19** with TypeScript
- **TanStack Router** for file-based routing (`src/routes/`)
- **TanStack Query** for data fetching and caching
- **tRPC** for type-safe API communication (`src/integrations/trpc/`)
- **Tailwind CSS** and **daisyUI** for styling
- **Vite** for build and dev server
- **Vitest** for testing

## Architecture & Patterns

- **Routing:** Each file in `src/routes/` is a route. The root layout is in `__root.tsx`, using `<Outlet />` for nested content. Use `Link` from `@tanstack/react-router` for navigation.
- **Data Layer:** Data fetching is handled via TanStack Query and tRPC. The query client and tRPC helpers are provided via context in `src/integrations/tanstack-query/root-provider.tsx`.
- **API:** tRPC routers are defined in `src/integrations/trpc/router.ts`, using Zod for validation.
- **Styling:** Tailwind CSS is configured globally. Use utility classes and daisyUI components for UI.

## Developer Workflows

- **Install dependencies:** `pnpm install`
- **Start dev server:** `pnpm dev`
- **Build for production:** `pnpm build`
- **Run tests:** `pnpm test`
- **Lint & format:** `pnpm lint`, `pnpm format`, `pnpm check`

## Conventions

- **Type safety:** Use TypeScript everywhere. API contracts are enforced via tRPC and Zod.
- **File-based routing:** Add new routes by creating files in `src/routes/`.

## Integration Points

- **TanStack Query**: Used for client-side data fetching and caching.
- **tRPC**: Used for server-client communication, with API routes and types in `src/integrations/trpc/`.

## Example: Adding a Route

1. Create a new file in `src/routes/`, e.g. `admin-teacher.tsx`.
2. No need to manually add to a router; the vite plugin already handles it.

```tsx
// This code is automatically added by the vite plugin based on the file path.
import { createFileRoute } from '@tanstack/react-router'
import { RouteComponent } from '@/components/admin/AdminLayout' // Only add this line after the file is created, otherwise you will run into conflicts with vite

export const Route = createFileRoute('/admin-teacher/')({
  component: RouteComponent,
})
// Do not include it, only create the <RouteComponent /> in a new file.
```

3. Only after creating the new file route, you can import the <RouteComponent /> inside
4. Use `Link` for navigation: `import { Link } from "@tanstack/react-router";`

## Project goals

Project Sumak: MVP Product Backlog

This backlog breaks down your specified features into actionable user stories. We'll use a simple priority system:

P0 (Critical): The MVP cannot launch without this. It's part of the core user journey.

P1 (High): Essential for a polished, functional MVP.

P2 (Medium): Important for a good user experience but could be simplified if time is tight.

Epic: User Foundation & Onboarding

Story-1 (P0): As a new user, I want to sign up with my email and a password so I can create a secure account.

Story-2 (P0): As a new user, I must select my role (Teacher or Student) during sign-up so the platform can provide me with the correct interface and tools.

Story-3 (P0): As a registered user, I want to log in with my email and password to access my dashboard.

Story-4 (P2): As a user who forgot my password, I want a "Forgot Password" link so I can reset it via email.

Epic: Teacher Core Experience (Content Creation)

Story-5 (P0): As a Teacher, I want to see a personalized dashboard that lists all the "Classes" I have created.

Story-6 (P0): As a Teacher, I want a "Create New Class" button so I can start a new subject container.

Story-7 (P0): As a Teacher, when I create a class, the system must generate a unique and easy-to-share join code for my students.

Story-8 (P0): As a Teacher, I want to be able to create "Topics" (e.g., syllabus items) within a class to organize my course material.

Story-9 (P0): As a Teacher, within a topic, I need an interface to upload one or more image files (JPEG, PNG) of my notes.

Story-10 (P1): As a Teacher, within a topic, I need a simple text editor to type or paste digital notes directly.

Story-11 (P1): As a Teacher, after uploading content, I want to see a "Processing" status so I know the system is working on it.

Story-12 (P0): As a Teacher, after processing is complete, I want to view the final, structured notes exactly as a student would see them, so I can verify the AI's output.

Epic: Student Core Experience (Learning & Interaction)

Story-13 (P0): As a Student, I want to see a personalized dashboard that lists all the "Classes" I have joined.
✅ **COMPLETED**: Student dashboard implemented with class grid display at `/admin-student/` route. Shows enrolled classes with visual cards, class codes, and teacher information.

Story-14 (P0): As a Student, I need a "Join a Class" feature where I can input a teacher's code to get access to their materials.
✅ **COMPLETED**: Join class modal implemented with code input functionality. Modal opens from dashboard with proper validation and tRPC integration.

Story-15 (P0): As a Student, I want to be able to navigate into a class and see a clear list of all the topics created by the teacher.
✅ **COMPLETED**: Class view implemented at `/admin-student/class/$classId` route. Displays topic grid with descriptions and navigation to individual topics.

Story-16 (P0): As a Student, when I click on a topic, I want to view the AI-structured, easy-to-read notes.
✅ **COMPLETED**: Topic view implemented at `/admin-student/topic/$topicId` route. Displays formatted notes in a clean, readable layout with proper styling.

Story-17 (P0): As a Student, on the notes page, I need access to an AI Tutor (chatbot) to ask questions about the content.
✅ **COMPLETED**: AI Tutor chat interface implemented in topic view. Real-time chat with loading states, conversation history, and proper message formatting.

Story-18 (P0): As a Student, I want the AI Tutor to only answer questions based on the notes for the current topic so I can get focused help without being overwhelmed or tempted to cheat.
✅ **COMPLETED**: AI Tutor uses RAG implementation that only responds based on current topic's notes. Includes context-aware responses and topic-specific validation.

Story-19 (P0): As a Student, I want a "Generate Practice Questions" button on the topic page.
✅ **COMPLETED**: Quiz generation button implemented in topic view header. Triggers quiz modal with dynamically generated questions based on topic content.

Story-20 (P1): As a Student, after generating a quiz, I want to answer the questions and receive immediate feedback (correct/incorrect) on my answers.
✅ **COMPLETED**: Interactive quiz modal implemented with multiple-choice questions, progress tracking, answer submission, and completion feedback with celebration UI.

Epic: AI Backend & Processing Pipeline

Story-21 (P0): As the System, when an image is uploaded, I must use an OCR service to accurately extract all text and basic structural elements.

Story-22 (P0): As the System, after ingesting text (from OCR or direct input), I must use an LLM to clean, structure, and format the content into a readable format with headings, lists, and key terms.

Story-23 (P0): As the System, for each topic, I must create and store a vector embedding of the processed notes to be used by the AI Tutor.
✅ **COMPLETED (MOCK)**: Mock implementation with structured notes data. Vector embedding simulation ready for real AI integration.

Story-24 (P0): As the System, when a student asks the AI Tutor a question, I must use a RAG (Retrieval-Augmented Generation) process to find the most relevant context from the topic's notes and generate a safe, accurate, and helpful answer.
✅ **COMPLETED (MOCK)**: Mock RAG implementation in tRPC `askTutor` procedure. Returns contextual responses based on topic content with conversation history tracking.

Story-25 (P1): As the System, when a student requests a practice quiz, I must use the topic's notes as context to generate 3-5 relevant multiple-choice or short-answer questions and their correct answers.
✅ **COMPLETED (MOCK)**: Mock quiz generation in tRPC `generateQuiz` procedure. Creates topic-specific multiple-choice questions with proper answer validation and scoring.

Evaluation and Future Feature Recommendations

Your current MVP scope is excellent. It is lean, focused, and perfectly aligned with your goal. It creates a complete "value loop": a teacher provides input, the AI creates value, and a student consumes that value. This is exactly what investors want to see—a functioning prototype that proves your core hypothesis.

Do not add more features to the MVP. The current list is ambitious enough and covers the "Wow Factor" perfectly.

However, thinking beyond the MVP is crucial for your pitch. You need a roadmap. Adding Teacher Tools is not just a good idea; it is the most logical and critical next step to turn this from a cool tool into an indispensable platform for educators.

Here is a backlog of potential features for "Sumak V2" and beyond, categorized for a strategic roadmap.

Immediate Post-MVP: The Teacher Feedback Loop & Control

This is your highest priority after the MVP. It transforms the teacher from a simple content provider into a professional who uses Sumak to improve their teaching.

Epic: Teacher Analytics Dashboard

Story: As a Teacher, I want to see a dashboard of anonymized, frequently asked questions to the AI Tutor for each topic, so I can identify which concepts my class is struggling with the most.

Story: As a Teacher, I want to see simple analytics on the practice quizzes, such as average scores or the most commonly missed questions, so I can adjust my next lesson.

Epic: Content Management

Story: As a Teacher, I want to be able to edit the AI-generated notes to correct any OCR errors or rephrase a concept.

Story: As a Teacher, I want to be able to delete a topic or an entire class.

Story: As a Teacher, I want to be able to re-order topics within a class to match my syllabus.

Epic: Student Management

Story: As a Teacher, I want to see a list of all students enrolled in my class.

Story: As a Teacher, I want the ability to remove a student from my class.

V2 Feature Set: Deepening Student Engagement & Learning

These features make the tool stickier for students and broaden the learning experience.

Epic: Advanced Learning Tools

Story: As a Student, I want to be able to highlight text in the notes and save my highlights for later review.

Story: As a Student, I want to save or "bookmark" specific AI Tutor conversations that I found particularly helpful.

Story: As a Student, I want the AI to be able to generate a summary or a "Key Concepts" list from the notes on demand.

Story: As a Student, I want the practice quiz to offer different question types (e.g., fill-in-the-blank, true/false) to vary my learning.

V3 & Beyond: Platform Scaling & Business Growth

This is about expanding from a tool for individual teachers to a solution for institutions.

Epic: Institutional Accounts

Story: As a School Administrator, I want a master account to manage all the teachers and classes in my institution.

Story: As a School Administrator, I want to see school-wide analytics on subject performance and student engagement.

Epic: Advanced Content & Collaboration

Story: As a Teacher, I want the content uploader to support PDFs (multi-page).

Story: As a Teacher, I want the AI to recognize and correctly format mathematical equations (LaTex support).

Story: As a Teacher, I want to be able to add a "clarification note" to a topic that is visible to all students, perhaps in response to a common question seen in the analytics.
