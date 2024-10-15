import { ScrollArea } from "@/components/ui/scroll-area";
import { ComboboxDemo } from "./ComboboxDemo"; 
import { useState } from "react";
import { Toggle } from "@/components/ui/toggle"; 
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Results = ({ results, currentPage, itemsPerPage, onPageChange }) => {
  const searchedItem = results?.searched_item || "";
  const carbonFootprint = results?.carbon_footprint || "";
  const alternatives = results?.alternatives || [];

  const [selectedMetric, setSelectedMetric] = useState(
    "Emissions per kilogram"
  ); 
  const [isReversed, setIsReversed] = useState(false); 

  const metricKeyMap = {
    "Emissions per kilogram": "Emissions per kilogram",
    "Emissions per 100 grams of protein": "Emissions per 100 grams of protein",
    "Emissions per 100 grams of fat": "Emissions per 100 grams of fat",
  };

  const handleMetricChange = (newMetric) => {
    setSelectedMetric(newMetric);
  };

  const toggleSorting = () => {
    setIsReversed(!isReversed);
  };

  const sortedAlternatives = [...alternatives].sort((a, b) => {
    const aValue = parseFloat(a[metricKeyMap[selectedMetric]]) || 0;
    const bValue = parseFloat(b[metricKeyMap[selectedMetric]]) || 0;
    return isReversed ? bValue - aValue : aValue - bValue;
  });

  return (
    <ScrollArea className="rounded-2xl bg-gradient-to-r from-red-200 via-green-200 to-lime-400 dark:bg-gradient-to-r dark:from-red-600/40 dark:via-emerald-700/40 dark:to-lime-700/40 sm:h-[60vh] sm:w-full sm:mt-4 sm:mx-1 md:h-[70vh] md:w-[80vw] md:mx-auto xl:h-[50vh] h-[70vh] xl:w-[60vw] xl:ml-auto xl:mr-auto mt-8">
      <div className="justify-center p-5 md:p-6 md:px-10 w-full mx-auto rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
            <ComboboxDemo
              selectedMetric={selectedMetric}
              onMetricChange={handleMetricChange}
            />
            <Toggle
              onClick={toggleSorting}
              pressed={isReversed}
              className="border border-white dark:border-black hover:text-black dark:hover:text-white "
            >
              {isReversed ? "Revert" : "Revert"}
            </Toggle>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg md:text-xl xl:text-2xl ">
            Better Alternatives for {""}
            <h2 className="inline font-bold">{searchedItem}</h2>
          </h3>
          <p className="text-md mt-2 mb-6 md:text-lg xl:text-xl ">
            Carbon Footprint: {""}
            <h3 className="inline font-semibold">
              {parseFloat(carbonFootprint).toFixed(3)} kg CO2
            </h3>
          </p>

          <table className="table-auto w-full mt-4">
            <thead className="bg-gray-100/50 dark:bg-neutral-950/50">
              <tr className="">
                <th className="px-4 py-2 text-left rounded-l-lg ">
                  Alternative
                </th>
                <th className="px-4 py-2 text-left  rounded-r-lg">
                  {selectedMetric}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAlternatives.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{item.Entity}</td>
                  <td className="px-4 py-2">
                    {parseFloat(item[metricKeyMap[selectedMetric]]).toFixed(3)}{" "}
                    kg CO2
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
            </PaginationItem>
            {[...Array(3)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={() => onPageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={() => onPageChange(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </ScrollArea>
  );
};

export default Results;
