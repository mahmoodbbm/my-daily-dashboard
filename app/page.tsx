import React from "react";
import NewsFeed from "./components/NewsFeed";
import Weather from "./components/Weather";
import TaskManager from "./components/TaskManager";
import DailyQuote from "./components/DailyQuote";

export default function Home() {
  return (
    <main className="bg-white">
      <div className="m-0">
        <div className="lg:w-96 p-4 lg:fixed lg:left-0 lg:top-0">
          {/* <!-- Left column --> */}
          <section className="px-4">
            {/* <!-- Page top left title --> */}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Daily Dashboard
            </h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              A place you can manage your daily activities.
            </p>
          </section>
          <section className="my-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 ease-in-out">
            {/* <!-- Weather widget --> */}
            <h2 className="font-bold text-lg mb-2">Weather Widget</h2>
            <Weather />
          </section>
          <section className="my-4 p-4 rounded-xl bg-gray-100">
            {/* <!-- Daily quotes --> */}
            <h2 className="font-bold text-lg mb-2">Daily wisdom</h2>
            <DailyQuote />
          </section>
        </div>
        <div className="flex-auto p-4 lg:ml-96">
          {/* <!-- News feed content --> */}
          <h2 className="font-bold text-lg mb-2">News Feed</h2>
          <NewsFeed />
        </div>
        {/* <!-- Sticky task manager --> */}
        <TaskManager />
      </div>
    </main>
  );
}
