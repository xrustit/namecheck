import { Check, X, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface SocialResultsProps {
  username: string;
  isLoading: boolean;
}

const SOCIAL_PLATFORMS = [
  { 
    name: "VK",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-600">
        <path fill="currentColor" d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.18-3.61 2.18-3.61.119-.254.305-.491.728-.491h1.744c.525 0 .643.271.525.643-.22 1.032-2.361 4.042-2.361 4.042-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.745-.576.745z"/>
      </svg>
    ),
    url: "vk.com" 
  },
  { 
    name: "X",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-600">
        <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    url: "x.com" 
  },
  { 
    name: "Rutube",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-600">
        <path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v15A2.5 2.5 0 0 0 4.5 22h15a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 19.5 2h-15zm7.5 5.69L16.31 12 12 16.31 7.69 12 12 7.69z"/>
      </svg>
    ),
    url: "rutube.ru"
  },
  { 
    name: "Odnoklassniki",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-600">
        <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 6.63 5.37 12 12 12s12-5.37 12-12C24 5.37 18.63 0 12 0zm0 4.8c1.98 0 3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6-3.6-1.62-3.6-3.6 1.62-3.6 3.6-3.6zm0 16.32c-2.4 0-4.62-.72-6.48-1.92.03-2.16 4.32-3.36 6.48-3.36 2.16 0 6.45 1.2 6.48 3.36-1.86 1.2-4.08 1.92-6.48 1.92z"/>
      </svg>
    ),
    url: "ok.ru"
  },
  { 
    name: "Telegram",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-600">
        <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.13L15.45 18.1c-.19.8-.7.99-1.42.62l-3.93-2.9-1.89 1.83c-.21.21-.4.4-.81.4l.29-4.08 7.42-6.71c.32-.29-.07-.45-.5-.16l-9.17 5.78-3.95-1.24c-.86-.27-.88-.86.18-1.27l15.42-5.95c.71-.27 1.33.18 1.05 1.22z"/>
      </svg>
    ),
    url: "t.me"
  }
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
            <Icon />
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