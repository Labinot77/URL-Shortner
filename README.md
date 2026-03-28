# Next.js URL Shortener

A fully functional URL shortening application built with **Next.js**, **Prisma**, and **MongoDB**. Users can shorten long URLs and copy/share the generated short links.  

**Features:**
- Generate short links with unique codes using `nanoid`
- Persist links in MongoDB via Prisma ORM
- Animated UI using **Framer Motion**
- Form handling with **React Hook Form** and **Zod** validation
- Shadcn/UI components for clean design
- Error handling with smooth animations
- Environment-based base URL support for production and development

**Tech Stack:**
- Next.js (App Router)
- TypeScript
- Prisma + MongoDB
- React Hook Form + Zod
- Framer Motion
- TailwindCSS + Shadcn/UI

**Future Improvements:**
- History of shortened URLs
- Copy-to-clipboard feature
- Analytics for clicks per short URL
- User authentication

**Usage:**
1. Clone the repo
2. Install dependencies: `npm install`
3. Set up `.env` with MongoDB URL and base URLs
4. Run the development server: `npm run dev`
