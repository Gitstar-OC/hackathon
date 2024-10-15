import { ScrollArea } from "@/components/ui/scroll-area";

const Results = ({ results }) => {
  return (
    
    <ScrollArea className="rounded-2xl bg-gradient-to-r from-red-200 via-green-200 to-lime-400 dark:bg-gradient-to-r dark:from-red-600/30 dark:via-emerald-700/30 dark:to-lime-700/30 sm:h-[60vh] sm:w-full sm:mt-4 sm:mx-1 md:h-[70vh] md:w-[80vw] md:mx-auto xl:h-[50vh] xl:w-[60vw] xl:ml-auto xl:mr-auto mt-8">
      <div className="justify-center p-5 md:p-10 w-full mx-auto rounded-lg">
        <div className="mt-4">
          <h3 className="text-lg md:text-xl xl:text-2xl font-bold">
            Search Results for alternative of {results?.carbon_footprint}
          </h3>
          <p className="text-md md:text-lg xl:text-xl">
            {results?.carbon_footprint} — {results?.searched_item}
          </p>
          <ul className="list-disc pl-5">
            {results?.map((item, index) => (
              <li key={index} className="text-md md:text-lg xl:text-xl">
                {item.Entity}: {item["Emissions per kilogram"]} kg CO2
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Results;
