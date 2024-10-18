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
  const [currentPage, setCurrentPage] = useState(1); // Add state for current page
  const [itemsPerPage] = useState(10); // Set items per page
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const router = useRouter();

  const fetchResults = async (searchQuery, page = 1) => {
    try {
      setIsLoading(true); // Set loading state to true
      const response = await fetch(
        `https://hackathon-z4ug.onrender.com/api/search?item=${encodeURIComponent(
          searchQuery
        )}&page=${page}&items_per_page=${itemsPerPage}`,
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
      setCurrentPage(page); // Update the current page
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setIsLoading(false); // Set loading state to false when done
    }
  };

  const handleItemClick = (selectedQuery) => {
    setQuery(selectedQuery);
    fetchResults(selectedQuery, 1); // Reset to first page on new search
  };

  const handlePageChange = (page) => {
    fetchResults(query, page);
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

      {/* Show loading spinner when fetching results */}
      {isLoading && (
        <div className="flex justify-center items-center h-[60vh]">
          <div role="status" className="flex flex-col items-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="mt-2 text-xl">Loading...</span>
          </div>
        </div>
      )}

      {/* Render Results if they exist and not loading */}
      {!isLoading && results && (
        <Results
          results={results}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
