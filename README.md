# Time-Travel Sleuth

A vintage parchment-style browser quiz game. Travel through history, answer multiple-choice questions against the clock, and uncover the past.

**Live feel:** kraft paper / old notebook aesthetic · mobile-friendly · no build step · pure HTML/CSS/JS.

## Features

- Clean home screen with investigation theme
- Gameplay screen with multiple-choice questions
- Retro circular timer with urgency pulse
- Score + progress tracking
- Fast-answer bonus points
- Results summary with verdict
- Textured kraft/parchment background
- Fully responsive (phones → desktop)

## How to run

Open `index.html` in any modern browser, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8080
```

Then visit the local URL.

## Question bank

All questions live in **`questions.js`**.

Each item looks like:

```js
{
  question: "Your question text?",
  options: ["A", "B", "C", "D"],
  correct: 1,           // 0-based index
  explanation: "Optional short explanation shown after answering"
}
```

Replace or expand the `QUESTIONS` array with content from Gemini Pro (or any source). The game shuffles the bank on each run.

## Customize

| Setting | File | Default |
|---------|------|---------|
| Seconds per question | `script.js` → `TIME_PER_QUESTION` | 25 |
| Points for correct | `POINTS_CORRECT` | 100 |
| Fast bonus | `POINTS_FAST_BONUS` | 25 |

Visual theme is controlled in `style.css` (CSS variables at the top).

## License

MIT — free to use, modify, and share.
