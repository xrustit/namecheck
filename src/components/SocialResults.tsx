import { Check, X, Loader2, Facebook, Twitter, Instagram, Linkedin, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SocialResultsProps {
  username: string;
  isLoading: boolean;
}

const SOCIAL_PLATFORMS = [
  { name: "Facebook", icon: Facebook, url: "facebook.com" },
  { name: "Twitter", icon: Twitter, url: "twitter.com" },
  { name: "Instagram", icon: Instagram, url: "instagram.com" },
  { name: "LinkedIn", icon: Linkedin, url: "linkedin.com" },
  { name: "Website", icon: Globe, url: "website" }
];

const SocialResults = ({ username, isLoading }: SocialResultsProps) => {
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
              {url === "website" ? `${username}.com` : `${url}/${username}`}
            </div>
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : isAvailable(name) ? (
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
        </Card>
      ))}
    </div>
  );
};

export default SocialResults;