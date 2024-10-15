import { ScrollArea } from "@/components/ui/scroll-area";
import { ComboboxDemo } from "./ComboboxDemo"; // Import the Combobox component
import { useState } from "react";
import { Toggle } from "@/components/ui/toggle"; // Assuming you have a Toggle component for sorting

const Results = ({ results }) => {
  const searchedItem = results?.searched_item || "";
  const carbonFootprint = results?.carbon_footprint || "";
  const alternatives = results?.alternatives || [];

  const [selectedMetric, setSelectedMetric] = useState("Emissions per kilogram"); // State for selected metric
  const [isReversed, setIsReversed] = useState(false); // State for toggle sorting

  // Map the selected metric to the corresponding key in the alternatives object
  const metricKeyMap = {
    "Emissions per kilogram": "Emissions per kilogram",
    "Emissions per 100 grams of protein": "Emissions per 100 grams of protein",
    "Emissions per 100 grams of fat": "Emissions per 100 grams of fat",
  };

  // Handle metric change
  const handleMetricChange = (newMetric) => {
    setSelectedMetric(newMetric);
  };

  // Toggle reverse sorting
  const toggleSorting = () => {
    setIsReversed(!isReversed);
  };

  // Sort the alternatives based on the selected metric
  const sortedAlternatives = [...alternatives].sort((a, b) => {
    const aValue = parseFloat(a[metricKeyMap[selectedMetric]]) || 0;
    const bValue = parseFloat(b[metricKeyMap[selectedMetric]]) || 0;
    return isReversed ? bValue - aValue : aValue - bValue;
  });

  return (
    <ScrollArea className="rounded-2xl bg-gradient-to-r from-red-200 via-green-200 to-lime-400 dark:bg-gradient-to-r dark:from-red-600/30 dark:via-emerald-700/30 dark:to-lime-700/30 sm:h-[60vh] sm:w-full sm:mt-4 sm:mx-1 md:h-[70vh] md:w-[80vw] md:mx-auto xl:h-[50vh] xl:w-[60vw] xl:ml-auto xl:mr-auto mt-8">
      <div className="justify-center p-5 md:p-10 w-full mx-auto rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
            <ComboboxDemo selectedMetric={selectedMetric} onMetricChange={handleMetricChange} />
            <Toggle onClick={toggleSorting} pressed={isReversed}>
              {isReversed ? "Sort Descending" : "Sort Ascending"}
            </Toggle>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg md:text-xl xl:text-2xl font-bold">
            Search Results for alternatives of {searchedItem}
          </h3>
          <p className="text-md md:text-lg xl:text-xl font-semibold">
            Carbon Footprint: {parseFloat(carbonFootprint).toFixed(3)} kg CO2
          </p>

        
          <table className="table-auto w-full mt-4">
            <thead className="bg-gray-100/50 dark:bg-neutral-950/50">
              <tr className="">
                <th className="px-4 py-2 text-left rounded-l-lg">Alternative</th>
                <th className="px-4 py-2 text-left  rounded-r-lg">{selectedMetric}</th>
              </tr>
            </thead>
            <tbody>
              {sortedAlternatives.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{item.Entity}</td>
                  <td className="px-4 py-2">
                    {parseFloat(item[metricKeyMap[selectedMetric]]).toFixed(3)} kg CO2
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
