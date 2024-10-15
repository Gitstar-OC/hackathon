import { ScrollArea } from "@/components/ui/scroll-area";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

const Results = ({ results }) => {
  const [isReversed, setIsReversed] = useState(false);

  if (!results || results.length === 0) {
    return null; // Do not render if there are no results
  }

  // Function to round CO2 values to 4 decimal places
  const formatCO2 = (value) => {
    return parseFloat(value).toFixed(4);
  };

  // Handle reversing the array based on the toggle state
  const displayedResults = isReversed ? [...results].reverse() : results;

  return (
    <ScrollArea className="rounded-2xl bg-gradient-to-r from-red-200 via-green-200 to-lime-400 dark:bg-gradient-to-r dark:from-red-600/30 dark:via-emerald-700/30 dark:to-lime-700/30 sm:h-[60vh] sm:w-full sm:mt-4 sm:mx-1 md:h-[70vh] md:w-[80vw] md:mx-auto xl:h-[50vh] xl:w-[60vw] xl:ml-auto xl:mr-auto mt-8">
      <div className="justify-center p-5 md:p-10 w-full mx-auto rounded-lg">
        {/* Toggle button to reverse order */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg md:text-xl xl:text-2xl font-bold">
            Search Results for alternative of {results[0]?.searched_item}
          </h3>
          <Toggle
            pressed={isReversed}
            onPressedChange={setIsReversed}
            className="ml-4"
          >
            Reverse Order
          </Toggle>
        </div>

        {/* Table for the searched item */}
        <div className="mb-6">
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Searched Item</th>
                <th className="border px-4 py-2">Emissions per kg CO2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{results[0]?.searched_item}</td>
                <td className="border px-4 py-2">
                  {formatCO2(results[0]?.carbon_footprint)} kg CO2
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table for the alternatives */}
        <div>
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Alternative Item</th>
                <th className="border px-4 py-2">Emissions per kg CO2</th>
              </tr>
            </thead>
            <tbody>
              {displayedResults.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.Entity}</td>
                  <td className="border px-4 py-2">
                    {formatCO2(item["Emissions per kilogram"])} kg CO2
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Results;
