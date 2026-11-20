# Happy 54th Birthday, Dada

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

1. Run `npm run build` to generate `dist/`.
2. Create a new repository on GitHub (for example, `for-dada`).
3. Upload the contents of `dist/` (`index.html`, `assets/`, `js/`) while keeping the folder structure intact.
4. Go to **Settings -> Pages**, set Source to **Deploy from a branch**, pick **main** and **/ (root)**, and save.
5. Wait 1 to 2 minutes and open `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/` on your phone to test every popup and candle.
