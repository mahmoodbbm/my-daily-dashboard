# My Daily Dashboard

## Overview

"My Daily Dashboard" is a personal dashboard application designed to enhance daily productivity and information access. It integrates various data types including weather forecasts, top news headlines, and a task manager. The dashboard is developed using Next.js and hosted on Vercel, providing a seamless and responsive user experience across different devices.

This application allows users to:

- View current weather information for their location or a specified location using the OpenWeatherMap API.
- Browse top headlines from a public news API, with the ability to filter news by categories such as Technology, Business, and Sports.
- Manage daily tasks with a simple task manager that supports adding, deleting, and marking tasks as completed.

The project aims to demonstrate proficiency in API integration, responsive design, and state management, ensuring a mobile-friendly interface that adjusts smoothly across devices.

## Deployed Application

Visit the deployed application at: [My Daily Dashboard](https://my-daily-dashboard.vercel.app/)

## Setup and Running Locally

To get "My Daily Dashboard" running locally on your machine, follow these steps:

1. **Clone the repository:**

   ```
   git clone https://github.com/mahmoodbbm/my-daily-dashboard.git
   cd my-daily-dashboard
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file at the root of your project and add your API keys for the weather and news APIs. For example:

   ```
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   NEWSAPI_API_KEY=your_newsapi_api_key
   ```

4. **Run the development server:**
   ```
   npm run dev
   ```
   Visit `http://localhost:3000` in your browser to view the application.

## Project Structure

The project is structured to promote easy navigation and maintenance. Below is a tree-like view of the folder structure:

```plaintext
.
├── /app                    # Main application code
│   └── /components         # Client-side components
├── /common                 # Common libraries shared across the project
├── /pages                  # Next.js pages and API routes
│   └── /api                # Server-side rendered API for fetching third-party data
├── /services               # Backend services, including storage service
└── /__tests__              # Unit tests and integration tests
```

## Technical Choices

### Next.js

I chose Next.js for its server-side rendering capabilities and seamless integration with Vercel, providing an optimized user experience and easy deployment process. Next.js's file-based routing system and support for API routes also simplified the application structure and backend communication.

### API Integration

OpenWeatherMap and NewsAPI were selected for their comprehensive data and ease of use. These APIs offer extensive documentation and reliable data for weather forecasts and news headlines, respectively, making them ideal for our dashboard application.

### State Management

React's Context API and useState hook were used for state management to manage application state efficiently without introducing unnecessary complexity. This approach allowed for a modular and scalable structure, facilitating future feature expansions like the optional calendar integration or Todoist API integration.

### Deployment

Vercel was chosen for deployment due to its direct integration with Next.js, enabling automatic deployments from Git, HTTPS-enabled custom domains, and a global CDN for fast content delivery.

## Testing Instructions

To run tests for the project, follow these steps:

1. Ensure all dependencies are installed by running `npm install` if you haven't done so already.
2. Run the test suite using the command:
   ```
   npm test
   ```

This project uses Jest for testing because Jest provides a comprehensive testing solution in one package. It includes features like snapshot testing, global test setup and teardown, and an easy configuration, making it a robust choice for React and Next.js applications. Its ability to run tests in parallel and support for mocking APIs and modules also enhances the development workflow, ensuring that our application remains reliable and bug-free.

## Conclusion

"My Daily Dashboard" represents a commitment to leveraging modern web technologies to create a versatile and user-friendly application. I welcome contributions and feedback to make this dashboard even more useful for your daily needs.
