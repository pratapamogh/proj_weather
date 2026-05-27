# WeatherSphere

WeatherSphere is a modern, responsive, production-ready weather platform utilizing real-time API integrations, built with React, Vite, and Tailwind CSS.

## Features
- **Real-time Geolocation:** Accurately fetch your weather based on current location.
- **7-Day Dynamic Forecast:** See max/min temperatures, sunrise/sunset, and weather trends.
- **Interactive Data Charts:** 24-hour visual trend tracking for temperature and precipitation using Recharts.
- **Persistent State:** Saves your recent searches and favorites directly to the browser storage.
- **Dark/Light Theming:** Adjust your preference seamlessly.

## Getting Started

### Installation
1. Clone the repository or open the project folder.
2. Navigate into the `weather-app` directory.
3. Install all necessary dependencies:
   ```bash
   npm install
   ```

### Running Locally
To spin up a local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Deployment to Vercel/Netlify
This project is configured and prepared for zero-config deployments on services like Vercel or Netlify.
1. Create a new project in Vercel/Netlify.
2. Connect your Git repository. 
3. The framework preset (Vite) should be automatically detected (`npm run build`).
4. Set up environment variables if migrating from Open-Meteo to another provider.
5. Click **Deploy**.

## Libraries Used
- **React 19** - Frontend library
- **Vite** - Build tool
- **Tailwind CSS 4** - Utility-first styling
- **Recharts** - Dynamic charts
- **Lucide-React** - SVG Icon sets
- **axios** - Clean API handling
