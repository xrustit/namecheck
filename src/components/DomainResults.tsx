import { Check, X, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";

interface DomainResultsProps {
  searchTerm: string;
  isLoading: boolean;
}

const TLDS = [
  "com", "net", "org", "io", "co", "app", "dev", "me", "ai", "tech", "blog", "store",
  "ru", "рф", "su", "москва", "online", "site", "website", "space", "club", "info",
  "biz", "pro", "name", "company", "team", "cloud"
];

async function fetchDomainPrices() {
  // In a real implementation, this would fetch prices from reg.ru API
  // For now, we'll simulate with random prices
  return TLDS.reduce((acc, tld) => {
    acc[tld] = Math.floor(Math.random() * 50) + 10;
    return acc;
  }, {} as Record<string, number>);
}

const DomainResults = ({ searchTerm, isLoading }: DomainResultsProps) => {
  const { t, language } = useLanguage();
  
  const { data: prices } = useQuery({
    queryKey: ['domain-prices'],
    queryFn: fetchDomainPrices,
  });

  // Simulate random availability
  const isAvailable = (tld: string) => {
    return Math.random() > 0.5;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {TLDS.map((extension) => (
        <Card
          key={extension}
          className={`p-4 fade-in flex items-center justify-between ${
            isLoading ? "opacity-75" : ""
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="text-lg font-medium">
              {searchTerm}.{extension}
            </div>
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : isAvailable(extension) ? (
              <div className="flex items-center text-green-500">
                <Check className="h-5 w-5 mr-1" />
                <span>{t('available')}</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <X className="h-5 w-5 mr-1" />
                <span>{t('taken')}</span>
              </div>
            )}
          </div>
          {!isLoading && isAvailable(extension) && prices && (
            <div className="text-lg font-semibold text-primary">
              {prices[extension]}₽/{t('year')}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default DomainResults;