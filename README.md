# STILL OUT THERE

**Listen. Explore. Learn. Remember.**
*Some machines stopped working. Their stories didn't.*

An interactive storytelling and STEM learning website (ages ~10–14) about inactive NASA machines on the Moon and Mars. Built for the **NASA Space Apps Challenge**.

> This project is **not endorsed by NASA**. Mission facts are based on NASA mission pages and must be re-verified before submission.

## Team: VU_Aphelion
- **Mome Ashrafe** (Team Leader)
- Md. Sarwar
- Isfar Hosssian
- Aktaruzzamman Rifat

## Features
- Cinematic hero (Mars → Moon fade, cursor depth, orbit ring) and animated star field
- Mission Explorer: Moon/Mars planets with clickable mission pins
- Four missions: Apollo 11 Retroreflector, Surveyor 3, Spirit, InSight
- First-person stories with a **Listen** button (browser SpeechSynthesis)
- Science cards, "How did I work?" machine diagram, animated timelines
- Special sections: laser to the Moon, Spirit planned-vs-actual, "Listen to Mars" (illustration only), Surveyor 3 → Apollo 12
- Mission Check quiz with confetti, badges and progress saved in localStorage (no login)
- Searchable/filterable mission archive, light/dark mode, responsive layout, reduced-motion support
- **English / বাংলা toggle** in the navbar (UI + all four missions; Bangla text needs review by a Bangla speaker)
- Optional generated ambient sound (not a real space recording)

## Tech
Next.js 14 (App Router), JavaScript/JSX only, Tailwind CSS, DaisyUI, React. No backend, no database, no authentication.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
Deploys directly to Vercel.

## Structure
```
app/            pages (home, missions, mission/[id], about, credits)
components/     Navbar, Stage, StarField, Explorer, MissionCard, MissionView,
                MissionSystem, Laser, Seismic, Quiz, Confetti, Progress, NasaImage ...
data/missions.js  all mission content (data-driven)
lib/progress.js   localStorage progress + badges
lib/nasa.js       optional NASA Image API loader
```

## Add a new mission
Copy an object in `data/missions.js` and edit it (`id`, `planet`, `pin:{x,y}`, `story`, `facts`, `timeline`, `components`, `quiz`, `sources`, plus `nasaId` or `imageQuery` for the image). Cards, pins, page and quiz appear automatically.

## Images and credits
Images load at runtime from NASA's Image and Video Library API with credit shown under each image. If a wrong image appears, set that mission's `nasaId`. If loading fails, a placeholder is shown.

## Roadmap
- **Now:** interactive mission experience
- **Next:** test with students and teachers
- **Then:** expert review of Bangla text, more missions, teacher mode, classroom activities, expanded archive
