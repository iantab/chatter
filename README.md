# Chatter

WIP web chatting application in TypeScript with React and NestJS.

## Project Structure

This is a monorepo-style setup containing two main packages:
- `chatter-backend`: The backend service built with NestJS, providing a GraphQL API and using MongoDB.
- `chatter-ui`: The frontend user interface built with React, Vite, and Apollo Client for GraphQL interactions.

## Tooling

- **Package Manager**: The entire workspace uses [Bun](https://bun.sh/) for all dependency management and script execution.
- **Prettier**: Code formatting is enforced across the workspace.

## Getting Started

Make sure you have `bun` installed on your system.

### Install Dependencies
From the root of the respective project directories (or workspace root if configured), install all dependencies:
```bash
bun install
```

### Running the Applications

**Backend (`chatter-backend`)**
```bash
cd chatter-backend
bun run start:dev
```

**Frontend (`chatter-ui`)**
```bash
cd chatter-ui
bun run start
```
