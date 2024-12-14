import { Check, X, Loader2, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

async function fetchDomainPrices(domain: string, isRussian: boolean) {
  try {
    // This is a placeholder for the actual reg.ru API integration
    // You would need to implement the actual API call here
    const response = await fetch(`https://www.reg.ru/api/check_domains?domains=${domain}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching domain prices:', error);
    return null;
  }
}

const DomainResults = ({ searchTerm, isLoading }: DomainResultsProps) => {
  const { t, language } = useLanguage();
  const isRussian = language === 'ru';
  const TLDS = isRussian ? getRuTlds() : getEnTlds();
  
  const { data: prices } = useQuery({
    queryKey: ['domain-prices', language, searchTerm],
    queryFn: () => fetchDomainPrices(searchTerm, isRussian),
    enabled: !!searchTerm,
  });

  // Simulate random availability (replace with actual API response)
  const isAvailable = (tld: string) => {
    return Math.random() > 0.5;
  };

  const getBuyLink = (domain: string) => {
    return `https://www.reg.ru/buy/domains/?query=${domain}`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {TLDS.map((extension) => {
        const available = isAvailable(extension);
        const domain = `${searchTerm}.${extension}`;
        
        return (
          <Card
            key={extension}
            className={`p-4 fade-in flex items-center justify-between ${
              isLoading ? "opacity-75" : ""
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-lg font-medium">
                {domain}
              </div>
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : available ? (
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
            {!isLoading && (
              <div className="flex items-center gap-2">
                {available && prices?.[extension] && (
                  <span className="text-lg font-semibold text-primary">
                    {prices[extension]}{isRussian ? '₽' : '$'}/{t('year')}
                  </span>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a 
                    href={getBuyLink(domain)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    {t('buy')}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default DomainResults;