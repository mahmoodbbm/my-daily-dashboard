import React from "react";
import NewsFeed from "./components/NewsFeed";
import Weather from "./components/Weather";
import TaskManager from "./components/TaskManager";

const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More posts...
];

export default function Home() {
  return (
    <main className="bg-white">
      <div className="flex flex-col md:flex-row m-4">
        <div className="flex flex-col w-full max-w-96 space-y-4 mb-4 md:mb-0 md:mr-4">
          <section className="p-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Daily Dashboard
            </h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              A place you can manage your daily activities.
            </p>
          </section>
          <section className="p-4 border-t border-gray-300 rounded">
            <h2 className="font-semibold text-lg mb-2">Weather Widget</h2>
            <Weather />
          </section>
          <section className="p-4 border-t border-gray-300 rounded">
            <h2 className="font-semibold text-lg mb-2">Task Manager</h2>
            <TaskManager />
          </section>
        </div>
        <div className="w-full md:flex-1">
          <section className="p-4 border-l border-gray-300 rounded h-full">
            <h2 className="font-semibold text-lg mb-2">News Feed</h2>
            <NewsFeed />
          </section>
        </div>
      </div>
    </main>
  );
}
