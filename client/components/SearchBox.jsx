"use client";

import searchQueries from "@/lib/constant.js";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Results from "./Results";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const router = useRouter();

  const fetchResults = async (searchQuery) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search?item=${encodeURIComponent(searchQuery)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
      // Push the query to the URL after successfully fetching data
      router.push({
        pathname: router.pathname,
        query: { item: searchQuery },
      });
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const handleItemClick = (selectedQuery) => {
    setQuery(selectedQuery);
    fetchResults(selectedQuery);
  };

  return (
    <div className="flex flex-col">
      <Command className="rounded-lg border shadow-md mt-0 sm:w-full h-60 sm:mt-0 sm:mx-1 sm:max-w-[95vw] md:w-[80vw] md:max-w-[80vw] md:mx-auto xl:w-[40vw] xl:max-w-[60vw] xl:mx-auto">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {searchQueries.map((queryItem, index) => (
              <button
                key={index}
                className="contents"
                onClick={() => handleItemClick(queryItem)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleItemClick(queryItem)
                }
              >
                <CommandItem>
                  <span>{queryItem}</span>
                </CommandItem>
              </button>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>

      {results && <Results results={results} />}
    </div>
  );
}
