import { Check, X, Loader2, Facebook, Twitter, Instagram, Linkedin, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface SocialResultsProps {
  username: string;
  isLoading: boolean;
}

const SOCIAL_PLATFORMS = [
  { name: "Facebook", icon: Facebook, url: "facebook.com" },
  { name: "X", icon: Twitter, url: "x.com" },
  { name: "Instagram", icon: Instagram, url: "instagram.com" },
  { name: "LinkedIn", icon: Linkedin, url: "linkedin.com" },
  { name: "VK", icon: Globe, url: "vk.com" },
  { name: "Rutube", icon: Globe, url: "rutube.ru" },
  { name: "Odnoklassniki", icon: Globe, url: "ok.ru" },
  { name: "Telegram", icon: Globe, url: "t.me" }
];

const SocialResults = ({ username, isLoading }: SocialResultsProps) => {
  const { t } = useLanguage();

  // Simulate random availability
  const isAvailable = (platform: string) => {
    return Math.random() > 0.5;
  };

  return (
    <div className="grid gap-4">
      {SOCIAL_PLATFORMS.map(({ name, icon: Icon, url }) => (
        <Card
          key={name}
          className={`p-4 fade-in flex items-center justify-between ${
            isLoading ? "opacity-75" : ""
          }`}
        >
          <div className="flex items-center space-x-4">
            <Icon className="h-6 w-6 text-gray-600" />
            <div className="text-lg font-medium">
              {url === "t.me" ? `${url}/${username}` : `${url}/${username}`}
            </div>
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : isAvailable(name) ? (
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
        </Card>
      ))}
    </div>
  );
};

export default SocialResults;