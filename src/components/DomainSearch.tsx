import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import DomainResults from "./DomainResults";

const DomainSearch = () => {
  const [domain, setDomain] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter your domain name"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full h-12 text-lg"
          />
        </div>
        <Button 
          type="submit" 
          className="h-12 px-6"
          disabled={!domain || isSearching}
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>

      {hasSearched && (
        <DomainResults 
          domain={domain} 
          isLoading={isSearching} 
        />
      )}
    </div>
  );
};

export default DomainSearch;