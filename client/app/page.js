// Home.js
"use client";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import SearchBox from "../components/SearchBox"; // Import your custom search box component
import MainAccordion from "@/components/Accordion"

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="md:flex flex-col mt-0 items-center md:justify-center py-8">
        <SearchBox /> {/* Add the search box */}
        <MainAccordion />
      </div>
    </div>
  );
}
