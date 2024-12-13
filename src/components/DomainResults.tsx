import { Check, X, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DomainResultsProps {
  domain: string;
  isLoading: boolean;
}

const TLDS = [
  { extension: "com", price: 12.99 },
  { extension: "net", price: 11.99 },
  { extension: "org", price: 13.99 },
  { extension: "io", price: 39.99 },
];

const DomainResults = ({ domain, isLoading }: DomainResultsProps) => {
  // Simulate random availability
  const isAvailable = (tld: string) => {
    return Math.random() > 0.5;
  };

  return (
    <div className="mt-8 space-y-4">
      {TLDS.map(({ extension, price }) => (
        <Card
          key={extension}
          className={`p-4 fade-in flex items-center justify-between ${
            isLoading ? "opacity-75" : ""
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="text-lg font-medium">
              {domain}.{extension}
            </div>
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : isAvailable(extension) ? (
              <div className="flex items-center text-green-500">
                <Check className="h-5 w-5 mr-1" />
                <span>Available</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <X className="h-5 w-5 mr-1" />
                <span>Taken</span>
              </div>
            )}
          </div>
          {!isLoading && isAvailable(extension) && (
            <div className="text-lg font-semibold text-primary">
              ${price}/year
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default DomainResults;