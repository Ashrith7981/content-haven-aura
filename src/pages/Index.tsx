
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const featuredPost = mockPosts[0];
  const remainingPosts = mockPosts.slice(1);

  const filteredPosts = activeCategory === "All"
    ? remainingPosts
    : remainingPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="container max-w-7xl mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Where great ideas find their voice
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A minimalist blogging platform designed for writers who appreciate simplicity, 
              typography, and beautiful reading experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/register">Start writing</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/explore">Explore content</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Post */}
        <section className="container max-w-7xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold mb-6 animate-fade-in">Featured Story</h2>
          <PostCard post={featuredPost} featured={true} className="animate-fade-in" />
        </section>
        
        {/* Latest Posts */}
        <section className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 animate-fade-in">
            <h2 className="text-2xl font-bold">Latest Stories</h2>
            <div className="flex space-x-1 overflow-x-auto scrollbar-none mt-2 sm:mt-0">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <PostCard 
                key={post.id} 
                post={post} 
                className={`animate-fade-in animate-delay-${index * 100}`} 
              />
            ))}
          </div>
          
          <div className="text-center mt-12 animate-fade-in">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/explore" className="inline-flex items-center">
                View all stories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
