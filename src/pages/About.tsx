
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="container max-w-7xl mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              About Inscribe
            </h1>
            <p className="text-xl text-muted-foreground">
              A minimalist blogging platform designed for writers who appreciate simplicity, 
              typography, and beautiful reading experiences.
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="container max-w-7xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that great ideas deserve a beautiful space to exist. 
                Inscribe was created with a singular focus: to provide writers with 
                a distraction-free environment where their words can truly shine.
              </p>
              <p className="text-lg text-muted-foreground">
                In a world full of cluttered platforms and noisy feeds, we've built 
                a sanctuary for thoughtful writing and engaged reading.
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-8 animate-fade-in animate-delay-100">
              <blockquote className="text-xl italic">
                "The art of writing is the art of discovering what you believe."
                <footer className="text-right text-muted-foreground mt-4">
                  — Gustave Flaubert
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="bg-secondary py-16 mb-16">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center animate-fade-in">
              What Makes Inscribe Different
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 animate-fade-in">
                <h3 className="text-xl font-bold mb-3">Distraction-Free Writing</h3>
                <p className="text-muted-foreground">
                  Our clean editor removes barriers between your thoughts and the page. 
                  No clutter, just your words taking center stage.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 animate-fade-in animate-delay-100">
                <h3 className="text-xl font-bold mb-3">Typography-Focused Design</h3>
                <p className="text-muted-foreground">
                  We've carefully selected fonts and layouts that make reading a genuine 
                  pleasure for your audience.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 animate-fade-in animate-delay-200">
                <h3 className="text-xl font-bold mb-3">Engaged Community</h3>
                <p className="text-muted-foreground">
                  Connect with readers who value quality writing and thoughtful 
                  perspectives in an environment built for meaningful engagement.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="container max-w-7xl mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center animate-fade-in">
            The Team Behind Inscribe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {["Emma Thompson", "Michael Chen", "Sarah Johnson"].map((name, index) => (
              <div key={name} className={`text-center animate-fade-in animate-delay-${index * 100}`}>
                <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold mb-1">{name}</h3>
                <p className="text-muted-foreground">Co-Founder</p>
              </div>
            ))}
          </div>
          
          <div className="text-center animate-fade-in">
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              We're a passionate team of writers, designers, and developers who 
              believe in the power of well-crafted words and beautiful design.
            </p>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="container max-w-7xl mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-lg p-10 text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Experience the joy of writing and connecting with readers on a platform 
              that puts your words first.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link to="/register">Start writing</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full bg-transparent border-white hover:bg-white hover:text-primary">
                <Link to="/explore">
                  Explore stories <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
