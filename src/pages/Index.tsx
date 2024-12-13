import DomainSearch from "@/components/DomainSearch";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Domain Name
          </h1>
          <p className="text-lg text-gray-600">
            Check domain availability across multiple TLDs instantly
          </p>
        </div>
        <DomainSearch />
      </div>
    </div>
  );
};

export default Index;