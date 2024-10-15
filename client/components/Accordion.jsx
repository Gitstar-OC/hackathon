import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
const MainAccordion = () => {
    return (
        <div className="flex justify-center w-[50vw] mt-10">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="py-2 px-10 bg-gradient-to-r from-red-200/60 via-green-200/60 to-lime-400/60 dark:bg-gradient-to-r dark:from-red-400/30 dark:via-emerald-400/30 dark:to-lime-400/30 rounded-lg">
            <AccordionTrigger>What is this?</AccordionTrigger>
            <AccordionContent className="">
              This website gives you a eco friendly and better alternative food which releases less CO2 in the environment.
            </AccordionContent>
          </AccordionItem >
          <AccordionItem value="item-2" className="mt-4 mb-4 py-2 px-10 bg-gradient-to-r from-red-200/60 via-green-200/60 to-lime-400/60 dark:bg-gradient-to-r dark:from-red-400/30 dark:via-emerald-400/30 dark:to-lime-400/30 rounded-lg">
            <AccordionTrigger>Is the data correct and verified? </AccordionTrigger>
            <AccordionContent>
              Yes. this data is correct and is verified by leading nations and surveys.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="py-2 px-10 bg-gradient-to-r from-red-200/60 via-green-200/60 to-lime-400/60 dark:bg-gradient-to-r dark:from-red-400/30 dark:via-emerald-400/30 dark:to-lime-400/30 rounded-lg">
            <AccordionTrigger>How latest is this data ? </AccordionTrigger>
            <AccordionContent>
              This dat is from 2022 - 2023 as 2024 is still going.  
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
      )
}

export default MainAccordion
  