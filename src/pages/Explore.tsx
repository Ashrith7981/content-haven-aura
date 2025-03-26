
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/ui/PostCard";
import { mockPosts } from "@/utils/mockData";

const categories = [
  "All",
  "Design",
  "Development",
  "Product",
  "Strategy",
  "Marketing",
  "Technology",
  "Business",
  "Lifestyle",
];

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPosts = mockPosts.filter(post => {
    // Filter by category
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    
    // Filter by search query
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-10 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Explore Stories</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Discover thought-provoking articles across various topics from our community of writers.
            </p>
          </div>
          
          {/* Search & Filter */}
          <div className="mb-10 animate-fade-in flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Results */}
          <div className="animate-fade-in">
            {filteredPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post, index) => (
                    <PostCard 
                      key={post.id} 
                      post={post} 
                      className={`animate-fade-in animate-delay-${index % 3 * 100}`} 
                    />
                  ))}
                </div>
                
                {filteredPosts.length > 9 && (
                  <div className="mt-10 text-center">
                    <Button variant="outline" size="lg" className="rounded-full">
                      Load more
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 border rounded-lg">
                <h3 className="font-medium text-lg mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter to find what you're looking for
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
