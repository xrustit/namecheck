import { Check, X, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";

interface DomainResultsProps {
  searchTerm: string;
  isLoading: boolean;
}

const getRuTlds = () => [
  "ru", "рф", "su", "москва", "com", "net", "org", "io", "co", "app", 
  "dev", "me", "ai", "tech", "blog", "store", "online", "site", "website", 
  "space", "club", "info", "biz", "pro", "name", "company", "team", "cloud"
];

const getEnTlds = () => [
  "com", "net", "org", "io", "co", "app", "dev", "me", "ai", "tech", 
  "blog", "store", "ru", "рф", "su", "москва", "online", "site", "website", 
  "space", "club", "info", "biz", "pro", "name", "company", "team", "cloud"
];

async function fetchDomainPrices(isRussian: boolean) {
  // In a real implementation, this would fetch prices from reg.ru API
  // For now, we'll simulate with random prices
  const tlds = isRussian ? getRuTlds() : getEnTlds();
  return tlds.reduce((acc, tld) => {
    // Random price between 10-50 USD/RUB
    const basePrice = Math.floor(Math.random() * 40) + 10;
    // Convert to rubles for Russian version (approximate exchange rate)
    acc[tld] = isRussian ? basePrice * 90 : basePrice;
    return acc;
  }, {} as Record<string, number>);
}

const DomainResults = ({ searchTerm, isLoading }: DomainResultsProps) => {
  const { t, language } = useLanguage();
  const isRussian = language === 'ru';
  const TLDS = isRussian ? getRuTlds() : getEnTlds();
  
  const { data: prices } = useQuery({
    queryKey: ['domain-prices', language],
    queryFn: () => fetchDomainPrices(isRussian),
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
              {prices[extension]}{isRussian ? '₽' : '$'}/{t('year')}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default DomainResults;