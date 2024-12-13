import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import DomainResults from "./DomainResults";
import SocialResults from "./SocialResults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DomainSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter name to check availability"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 text-lg"
          />
        </div>
        <Button 
          type="submit" 
          className="h-12 px-6"
          disabled={!searchTerm || isSearching}
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>

      {hasSearched && (
        <Tabs defaultValue="domains" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="domains">Domains</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>
          <TabsContent value="domains">
            <DomainResults 
              searchTerm={searchTerm} 
              isLoading={isSearching} 
            />
          </TabsContent>
          <TabsContent value="social">
            <SocialResults 
              username={searchTerm} 
              isLoading={isSearching} 
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default DomainSearch;