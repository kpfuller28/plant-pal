# PlantPal 🌱

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## Description

PlantPal is a task management web app designed to help users remember to water their plants. Users can add specific plants, set watering schedules, and receive reminders. The app allows users to mark plants as watered, ensuring they stay on top of their plant care routine.

Built with a **React + Vite** frontend, an **Express + Node.js** backend, and **MongoDB + Prisma** for persistent storage, PlantPal delivers a smooth and interactive single-page experience.

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/kpfuller28/plant-pal.git
cd plant-pal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following:

```
DATABASE_URL="your_mongo_connection_string"
PORT=3000
```

### 4. Run the development server

```bash
npx nodemon server.ts
```

## Git Workflow

To maintain a clean and structured workflow, follow this Git branching strategy:

1. **Main Branch (`main`)** - The production-ready branch. Never push directly to `main`.
2. **Feature Branches (`feature/{name}`)** - For new features or bug fixes.

### Git Workflow Steps

```bash
# Create a new branch for a feature
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Add feature: your feature name"

# Push to GitHub
git push origin feature/your-feature-name

# Open a pull request to merge
```

## Future Features

- Ability to 'unwater' if checked in error
  - Subtask is to decide on best method i.e. cache vs DB solution
- Push notifications for watering reminders
- User authentication for personalized plant lists
- Offline mode support
- Integration with external plant care databases

## Contributing

Contributions are welcome! If you'd like to help improve PlantPal, feel free to fork the repo, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.

---
