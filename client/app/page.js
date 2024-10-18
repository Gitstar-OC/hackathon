// Home.js
"use client";
import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox"; // Import your custom search box component
import MainAccordion from "@/components/Accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="justify-center flex">
      <Alert className="w-96 bg-red-600">
          <AlertDescription>
            Please note that the first request may take time up to 2 minutes!! 
          </AlertDescription>
        </Alert>
        </div>
      <div className="flex flex-col mt-6 items-center justify-center pb-8 ">
        <SearchBox /> {/* Add the search box */}
        <MainAccordion />
      </div>
    </div>
  );
}
