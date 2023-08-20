# Todo App

A modern todo application built with React, TypeScript, Redux, Apollo, and Vite.

## Features

- Manage todos with an interactive UI.
- Apollo Client for potential GraphQL integration.
- State management with Redux Toolkit.
- Development server and bundling with Vite.

## Project Structure

```lua
/project-root
|-- /frontend
|   |-- /public
|   |-- /src
|   |   |-- /assets
|   |   |-- /components
|   |   |-- /features
|   |   |-- /app
|   |   |-- /types
|   |   |-- /utils
|   |   |-- /hooks
|   |   |-- App.tsx
|   |   |-- index.tsx
|   |-- vite.config.ts
|   |-- package.json
|   |-- tsconfig.json
|-- /backend
|-- /docker
|-- docker-compose.yml
```

# Development Setup

## Prerequisites
- Node.js
- Yarn or npm

## Installation

1. Clone the repository:
```bash 
git clone [repository_url] todo-app
```

2. Navigate to the frontend directory:
```bash
cd todo-app/frontend
```

3. Install the dependencies:
```bash
npm install
```

or
```bash
yarn install
```

## Running the App

To run the app in development mode:
```bash
npm run dev
```

or
```bash
yarn dev
```

## Building the App

To build the app for production:
```bash
npm run build
```

or
```bash
yarn build
```

## Linting

To lint the codebase:
```bash
npm run lint
```

or
```bash
yarn lint
```

## Dependencies

This project uses various dependencies for its functionality:

- Apollo Client
- Redux Toolkit
- GraphQL
- React & React DOM
- Vite
- TypeScript
- ESLint
- TailwindCSS

... and more.