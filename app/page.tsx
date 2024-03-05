import React from "react";
import NewsFeed from "./components/NewsFeed";
import Weather from "./components/Weather";
import TaskManager from "./components/TaskManager";

export default function Home() {
  return (
    <main className="bg-white">
      <div className="m-0">
        <div className="w-96 p-4 lg:fixed lg:left-0 lg:top-0">
          {/* <!-- Left column content --> */}
          <section className="px-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Daily Dashboard
            </h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              A place you can manage your daily activities.
            </p>
          </section>
          <section className="my-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 ease-in-out">
            <h2 className="font-bold text-lg mb-2">Weather Widget</h2>
            <Weather />
          </section>
        </div>
        <div className="flex-auto p-4 lg:ml-96">
          {/* <!-- Middle column content --> */}
          <h2 className="font-bold text-lg mb-2">News Feed</h2>
          <NewsFeed />
        </div>
        {/* <!-- Right column content --> */}
        <TaskManager />
      </div>
    </main>
  );
}
