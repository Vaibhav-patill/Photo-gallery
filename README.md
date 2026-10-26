# Photo Gallery

A photo gallery web app built with React, Vite, and Tailwind CSS v4. It fetches 30 photos from the free Picsum API, displays them in a responsive grid, lets you search by author name, and lets you mark photos as favorites that persist after a refresh.

## Features

- Fetches 30 photos from `https://picsum.photos/v2/list?page=1&limit=30` on load
- Loading spinner while fetching and an error message if the request fails
- Responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Each card shows the photo, the author name, and a heart button
- Real-time, case-insensitive search by author name (no page reload, no extra API calls)
- Favorites managed with `useReducer` and saved in `localStorage`

## Tech stack

- React (functional components and hooks only)
- Vite
- JavaScript
- Tailwind CSS v4
- Native Fetch API

No component libraries and no other UI libraries are used.

## Getting started

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173).

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run ESLint                           |

## Project structure

```
src/
├── main.jsx
├── index.css                  # Tailwind import
├── App.jsx                    # Page shell
├── components/
│   ├── Gallery.jsx            # Composes the page; owns search and favorites state
│   ├── SearchBar.jsx          # Controlled search input
│   ├── PhotoCard.jsx          # Photo, author name, heart button
│   ├── Spinner.jsx
│   └── ErrorMessage.jsx
├── hooks/
│   └── useFetchPhotos.js      # Custom hook: returns { photos, loading, error }
├── state/
│   └── favoritesReducer.js    # Reducer and action types
└── utils/
    └── favoritesStorage.js    # Safe localStorage load and save
```

## How the requirements are implemented

1. **Setup:** React + Vite + Tailwind CSS v4 (via the `@tailwindcss/vite` plugin). No other UI libraries.
2. **Fetching:** `useFetchPhotos` calls the Picsum endpoint with `fetch`, checks `response.ok`, and aborts the request on cleanup. The Gallery shows a spinner while loading and an error message on failure.
3. **Responsive grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`. Images are resized from the API's `download_url` so the page doesn't download full-size originals.
4. **Search:** the query is held in `useState`, and the already-fetched photos are filtered in the browser by author name. No API call is made when typing.
5. **Favorites:** `favoritesReducer` handles `ADD_FAVORITE` and `REMOVE_FAVORITE` with `useReducer`. The IDs are restored from `localStorage` through the lazy initializer and saved again in a `useEffect` whenever they change. Malformed or unavailable storage is handled without crashing.
6. **Custom hook:** `useFetchPhotos` owns all fetching logic. The Gallery never calls `fetch` directly.
7. **Performance hooks:** `useCallback` keeps the search handler's function reference stable, and `useMemo` computes the filtered list only when `photos` or the query change.

## Accessibility

- The heart is a real `<button>` with a constant label and `aria-pressed` for its state
- Descriptive `alt` text on every image
- A labelled search input and visible focus indicators
- The loading spinner respects `prefers-reduced-motion`

## Data source

Photos come from [Picsum Photos](https://picsum.photos/).