"use client";

import React, { useMemo, useState } from "react";
import { Search, Library } from "lucide-react";
import PageHeader from "@/components/portal/PageHeader";
import TabSwitcher from "@/components/portal/TabSwitcher";
import EmptyState from "@/components/portal/EmptyState";
import ResourceCard from "./components/ResourceCard";
import MyBorrowedList from "./components/MyBorrowedList";
import { LIBRARY_RESOURCES, type ResourceFormat } from "./data";

type Filter = "All" | ResourceFormat;

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(() => {
    return LIBRARY_RESOURCES.filter((r) => {
      const matchesFilter = filter === "All" || r.format === filter;
      const matchesQuery =
        query.trim() === "" ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.author.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <main className="flex flex-col gap-5 my-5">
      <PageHeader
        title="E-Library"
        subtitle="Search, borrow and read e-books, journals and past questions"
        badge="200,000+ Resources"
        badgeIcon={Library}
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF9B63]/40 focus:border-[#BF9B63]"
          />
        </div>
        <TabSwitcher
          options={[
            { value: "All", label: "All" },
            { value: "E-Book", label: "E-Books" },
            { value: "Journal", label: "Journals" },
            { value: "Past Question", label: "Past Questions" },
          ]}
          value={filter}
          onChange={setFilter}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No resources found"
              description="Try a different search term or filter."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>

        <MyBorrowedList />
      </div>
    </main>
  );
}
