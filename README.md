# HealthTrack

HealthTrack is a responsive React frontend for recording everyday movement, meals, and water. It includes an overview dashboard, a daily log, feature and about pages, and a contact form.

## Run the project

This project uses the React app setup already present in the repository.

1. Install the project packages with `npm install`.
2. Start the app with `npm start`.
3. Open the local address shown in the terminal.

## Included React concepts

The app uses function components, JSX, props, `useState`, `useEffect`, event handlers, controlled forms, and array `map`, `filter`, and `sort`. The daily log is saved as JSON in browser `localStorage`.

The implementation follows the topics in the supplied CSCI426 lecture slides. It is a frontend-only project: the contact form displays a local confirmation, and entries stay in the current browser.

## Pages

- Overview: daily movement, water, meals, and recent activity.
- Daily log: add movement or meals, add water, filter entries, and change their order.
- Features: a summary of the tracking tools.
- About: the purpose and design principles of the project.
- Contact: a frontend form with a local confirmation state.

## Project structure

- `src/App.js` contains shared app state and selects the current page.
- `src/pages/` contains one component for each page.
- `src/components/` contains reusable layout and UI components.
- `src/App.css` contains the responsive interface styles.
- `src/index.js` renders the app into the initial HTML document in `public`.
