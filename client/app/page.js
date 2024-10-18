// Home.js
"use client";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import SearchBox from "../components/SearchBox"; // Import your custom search box component
import MainAccordion from "@/components/Accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="flex flex-col mt-0 items-center justify-center pb-8">
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
        <SearchBox /> {/* Add the search box */}
        <MainAccordion />
      </div>
    </div>
  );
}
