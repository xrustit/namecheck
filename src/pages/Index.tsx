import DomainSearch from "@/components/DomainSearch";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Check Domain & Username Availability
          </h1>
          <p className="text-lg text-gray-600">
            Search across domains and social media platforms instantly
          </p>
        </div>
        <DomainSearch />
      </div>
    </div>
  );
};

export default Index;