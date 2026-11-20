# Happy 53rd Birthday, Dada

An interactive birthday card and popup gift experience built for Dada from Mama, Z, Abu, and Umar. It builds to a static folder (`dist/`) with relative paths (`./`) so it works directly on GitHub Pages.

## 1. Personalizing the messages (`public/js/content.js`)

Open `public/js/content.js` (or `js/content.js` inside the built `dist/` folder) in any text editor:
1. Under `cards`, edit any of the story popups.
2. Under `notes.people`, customize each personal message and birthday wish for **Mama**, **Z**, **Abu**, and **Umar**.
3. Keep the surrounding quotes `"` and commas `,` intact.

## 2. Adding optional audio

Place optional `.mp3` files inside `public/assets/audio/` (or `assets/audio/` in `dist/`):
- Voice notes inside each person's birthday note:
  - `voice-mama.mp3`
  - `voice-z.mp3`
  - `voice-abu.mp3`
  - `voice-umar.mp3`
- Optional background birthday music (appears as a toggle in the top-right corner):
  - `music.mp3`

If an audio file is missing, its button stays hidden automatically.

## 3. Running locally & building

```bash
npm install
npm run dev
```

To build the static files into `dist/`:

```bash
npm run build
```

## 4. Publishing to GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`, which builds and publishes the site automatically.

1. Push the project to a GitHub repository on the `main` branch.
2. On GitHub, open **Settings -> Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` or run **Actions -> Deploy to GitHub Pages -> Run workflow**.
5. Open the URL shown on the workflow's GitHub Pages deployment step.

The workflow runs TypeScript validation, creates `dist/`, and uploads that folder as the Pages artifact. Vite is configured with relative paths, so the site works on a project subpath such as `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`.

To verify the production build locally:

```bash
npm run deploy
npm run preview
```
