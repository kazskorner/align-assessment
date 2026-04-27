# Incoming Landing Page — Drop Zone

Place the HTML file from the marketing VP here when received.

## What goes here
- The updated landing page HTML file (e.g., `landing-v2.html`)
- Any accompanying CSS files or assets referenced by the HTML

## Integration steps
1. Drop the file(s) into this folder
2. Review the copy against `ALIGN_MASTER_COPY.md` in the workspace root
3. Extract any static assets (images, fonts) to `public/`
4. Port the HTML/CSS into `app/page.tsx` + `app/landing.css`
5. Keep the dynamic live counter (`useRollingCounter`) from the existing `page.tsx`
6. Delete this folder once integration is complete

## What stays dynamic (do not replace with static copy)
- The rolling assessments counter — fetches live from `/api/quiz-count`
