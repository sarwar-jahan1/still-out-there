# STILL OUT THERE

**Listen. Explore. Learn. Remember.**
*Some machines stopped working. Their stories didn't.*

An interactive storytelling and STEM game site (ages ~10–14) about inactive NASA machines on the Moon and Mars, built for the **NASA Space Apps Challenge 2026** ("Abandoned but not Forgotten").

> Not endorsed by NASA. Mission facts follow NASA/JPL sources linked on each mission page. Games and waveforms are **educational simulations**, not real data.

## Team: VU_Aphelion
- **Mome Ashrafe** (Team Leader)
- Md. Sarwar
- Isfar Hosssian
- Aktaruzzamman Rifat

## What is inside
- Cinematic hero, animated star field, Moon/Mars explorer with clickable pins and a **Find the machine** clue game
- 4 missions: Apollo 11 Retroreflector, Surveyor 3, Spirit, InSight
- Short first-person story chapters, Listen button, 2 NASA photos and a real NASA video per mission (loaded from the NASA Image and Video Library API, with credit)
- One game per mission, with score, stars, best score and "challenge a friend":
  - Apollo 11: **Bounce the Laser** (mirror puzzle)
  - Surveyor 3: **Surveyor Camera** (photo safari)
  - Spirit: **Rover Rally** (runner) and **Build the Rover** (drag and drop)
  - InSight: **Marsquake Rush** (tap the quakes, avoid wind)
- **ORBIT** guide (predefined tips, no AI), Mission Backpack, badges, ranks, progress (localStorage, no login)
- Mission Detective clue game, search/filter archive, light/dark mode, responsive, reduced-motion support

## Tech
Next.js 14 (App Router), JavaScript/JSX only, Tailwind CSS, DaisyUI, React. No backend, database or authentication.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
Deploys directly to Vercel.

## Structure
```
app/         pages: home, missions, mission/[id], backpack, about, credits
components/ UI, games (BounceLaser, SurveyorCamera, RoverRally, BuildMachine, MarsWhack), Orbit, Explorer ...
data/missions.js   all mission content (add a mission by copying an object)
lib/         i18n.js (all text), progress.js, scores.js, nasa.js (NASA API loaders)
```

## Add a mission
Copy an object in `data/missions.js` and edit it (`id`, `planet`, `pin`, `story`, `facts`, `timeline`, `components`, `sources`, `gallery`, `videoQuery`). Add its clue/reward text in `lib/i18n.js`.

## Notes
- NASA images/videos are searched by name; if a wrong one appears, set a `nasaId` in the mission's `gallery`.
- Best scores are stored on the player's own device only.

## Roadmap
- **Now:** interactive mission experience
- **Next:** test with students and teachers
- **Then:** more missions, teacher mode, classroom activities, Bangla and other languages, expanded archive
