import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, MessageCircle, Bookmark, Share2, Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommentSection from "@/components/ui/CommentSection";
import PostCard from "@/components/ui/PostCard";
import { mockPosts, mockComments } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState(mockPosts.find(p => p.id === id));
  const [relatedPosts, setRelatedPosts] = useState<typeof mockPosts>([]);
  const [comments, setComments] = useState(mockComments[id || ""] || []);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likes || 0);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set post from ID
    const foundPost = mockPosts.find(p => p.id === id);
    setPost(foundPost);
    
    if (foundPost) {
      // Set likes count
      setLikesCount(foundPost.likes);
      
      // Get related posts (same category or tags)
      const related = mockPosts
        .filter(p => 
          p.id !== id && 
          (p.category === foundPost.category || 
           p.tags.some(tag => foundPost.tags.includes(tag)))
        )
        .slice(0, 3);
      setRelatedPosts(related);
    }
    
    // Get comments
    setComments(mockComments[id || ""] || []);
    
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    
    if (isLiked) {
      toast({
        title: "Unliked",
        description: "You've removed your like from this post.",
        variant: "default"
      });
    } else {
      toast({
        title: "Liked!",
        description: "You've liked this post! Thanks for showing appreciation.",
        variant: "default"
      });
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    if (isBookmarked) {
      toast({
        title: "Removed from bookmarks",
        description: "This post has been removed from your bookmarks.",
        variant: "default"
      });
    } else {
      toast({
        title: "Bookmarked!",
        description: "This post has been added to your bookmarks for later reading.",
        variant: "default"
      });
    }
  };

  const handleShare = () => {
    // In a real app, this would use the Web Share API if available
    // For now, let's simulate copying the URL to clipboard
    const postUrl = window.location.href;
    navigator.clipboard.writeText(postUrl).then(() => {
      toast({
        title: "Link copied!",
        description: "Post link has been copied to your clipboard.",
        variant: "default"
      });
    }).catch(err => {
      toast({
        title: "Sharing failed",
        description: "Couldn't copy the link. Please try again.",
        variant: "destructive"
      });
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 container max-w-4xl mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Post not found</h1>
            <p className="text-muted-foreground mb-8">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/">Return to home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <article className="container max-w-4xl mx-auto px-4">
          {/* Post Header */}
          <header className="mb-10 animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <Link 
                to={`/category/${post.category.toLowerCase()}`}
                className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors"
              >
                {post.category}
              </Link>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                {post.publishedDate}
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime} min read
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <Link to={`/author/${post.author.id}`} className="font-medium hover:text-primary transition-colors">
                    {post.author.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{post.author.bio.substring(0, 60)}...</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant={isLiked ? "default" : "outline"} 
                  size="sm" 
                  className="gap-2 rounded-full"
                  onClick={handleLike}
                >
                  <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
                  <span>{likesCount}</span>
                </Button>
                
                <Button 
                  variant={isBookmarked ? "default" : "outline"} 
                  size="icon" 
                  className="rounded-full"
                  onClick={handleBookmark}
                >
                  <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
                  <span className="sr-only">Bookmark</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
          </header>
          
          {/* Featured Image */}
          <div className="mb-10 animate-fade-in">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
          
          {/* Post Content */}
          <div 
            className="prose prose-lg max-w-none mb-10 animate-fade-in"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10 animate-fade-in">
              {post.tags.map((tag) => (
                <Link 
                  key={tag} 
                  to={`/tag/${tag.toLowerCase()}`}
                  className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
          
          {/* Author Bio */}
          <div className="border-t border-b py-8 my-10 animate-fade-in">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Written by {post.author.name}</h3>
                <p className="text-muted-foreground mb-2">{post.author.bio}</p>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/author/${post.author.id}`}>View Profile</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <CommentSection comments={comments} postId={post.id} />
        </article>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="container max-w-7xl mx-auto px-4 mt-16">
            <h2 className="text-2xl font-bold mb-6 animate-fade-in">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post, index) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  className={`animate-fade-in animate-delay-${index * 100}`} 
                />
              ))}
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Post;
