# React TypeScript Vite Frontend for Spring Boot REST API

A fast, modern frontend built with React, TypeScript, and Vite, configured for seamless integration with a Spring Boot REST API backend.

## Features

- ⚡ **Vite** - Lightning-fast build tool and development server
- ⚛️ **React 18** - Latest React with hooks and concurrent rendering
- 📘 **TypeScript** - Full type safety and better IDE support
- 🌐 **Axios** - Promise-based HTTP client for API calls
- 🔗 **API Proxy** - Built-in proxy configuration for Spring Boot backend
- 🎯 **ESLint** - Code linting and formatting
- 📦 **Modular Services** - Well-organized API service layer

## Project Structure

```
src/
├── main.tsx           # Application entry point
├── App.tsx            # Root component
├── App.module.css     # App styles
├── index.css          # Global styles
└── services/
    ├── api.ts         # Axios client configuration
    └── example.ts     # Example API service methods
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The development server runs on `http://localhost:3000` by default. Vite automatically reloads the page when you make changes.

### API Configuration

Update the API endpoint in `.env.development` or `.env.production`:

```env
VITE_API_URL=http://localhost:8080
```

The vite.config.ts is already configured with a proxy that forwards requests to `/api/*` to your Spring Boot backend.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## API Integration

### Using the API Service

The `src/services/example.ts` file contains template methods for common REST operations:

```typescript
import { exampleAPI } from './services/example'

// GET request
const items = await exampleAPI.getItems()

// GET by ID
const item = await exampleAPI.getItemById('123')

// POST request
const newItem = await exampleAPI.createItem({ name: 'New Item' })

// PUT request
const updated = await exampleAPI.updateItem('123', { name: 'Updated' })

// DELETE request
await exampleAPI.deleteItem('123')
```

### Configuring for Your API

Edit `src/services/example.ts` to match your Spring Boot API endpoints and data structures.

## Environment Variables

- `VITE_API_URL` - Base URL for your Spring Boot API (default: http://localhost:8080)

Environment variables must be prefixed with `VITE_` to be accessible in the frontend code.

## Development Workflow

1. Start your Spring Boot backend (ensure it runs on port 8080 or update `.env`)
2. Run `npm run dev` to start the Vite dev server
3. Edit components in `src/` - changes hot-reload instantly
4. Use browser DevTools and VS Code for debugging
5. When ready, run `npm run build` for production

## Technologies

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **ESLint** - Code quality
- **CSS Modules** - Component-scoped styles

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure your Spring Boot API is configured to accept requests from `http://localhost:3000` in development, or handle it with spring-boot-starter-web CORS configuration.

### API Proxy Not Working

The proxy is configured in `vite.config.ts`. Verify that your Spring Boot API is running on the URL specified in `VITE_API_URL`.

## Further Reading

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Axios Documentation](https://axios-http.com)
