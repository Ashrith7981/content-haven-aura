
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Post } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface PostCardProps {
  post: Post;
  featured?: boolean;
  className?: string;
}

const PostCard = ({ post, featured = false, className }: PostCardProps) => {
  const { id, title, excerpt, author, publishedDate, readTime, imageUrl, likes, comments, tags, category } = post;
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const { toast } = useToast();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    
    if (!isLiked) {
      toast({
        title: "You liked this post! 🔥",
        description: `You and ${likesCount} others like this content`,
        variant: "default"
      });
    }
  };
  
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? "Removed from collection" : "Saved to collection! 📌",
      description: isBookmarked 
        ? "This post has been removed from your saved items." 
        : "This post has been added to your collection.",
      variant: "default"
    });
  };
  
  const handleComment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `/post/${id}#comments`;
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: window.location.origin + `/post/${id}`
      }).then(() => {
        toast({
          title: "Shared successfully! 🚀",
          description: "Thanks for spreading the word!",
          variant: "default"
        });
      }).catch(err => {
        console.error("Error sharing:", err);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.origin + `/post/${id}`);
      toast({
        title: "Link copied! 📋",
        description: "Share link copied to clipboard",
        variant: "default"
      });
    }
  };

  return (
    <article 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl transition-all duration-300 border border-border",
        featured ? "md:flex-row" : "h-full",
        className
      )}
    >
      <Link 
        to={`/post/${id}`} 
        className={cn(
          "relative overflow-hidden",
          featured ? "md:w-1/2" : "aspect-[4/5]" // More Instagram-like aspect ratio
        )}
      >
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
        
        {/* Instagram-style hover action layer */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
          <div className="flex flex-col items-center text-white">
            <Heart className="h-8 w-8 mb-1" fill={isLiked ? "white" : "none"} />
            <span className="text-sm font-semibold">{likesCount}</span>
          </div>
          <div className="flex flex-col items-center text-white">
            <MessageCircle className="h-8 w-8 mb-1" />
            <span className="text-sm font-semibold">{comments}</span>
          </div>
        </div>
      </Link>
      
      <div className={cn(
        "flex flex-col justify-between p-5 bg-card",
        featured ? "md:w-1/2" : ""
      )}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Link 
              to={`/category/${category.toLowerCase()}`}
              className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors"
            >
              {category}
            </Link>
            <span className="text-xs text-muted-foreground">{readTime} min</span>
          </div>
          
          <Link to={`/post/${id}`}>
            <h3 className={cn(
              "font-bold tracking-tight hover:text-primary transition-colors",
              featured ? "text-2xl" : "text-xl"
            )}>
              {title}
            </h3>
          </Link>
          
          <p className="text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Link 
                  key={tag} 
                  to={`/tag/${tag.toLowerCase()}`}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarImage src={author.avatarUrl} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <Link to={`/author/${author.id}`} className="font-medium hover:text-primary transition-colors">
                  {author.name}
                </Link>
                <p className="text-xs text-muted-foreground">{publishedDate}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <Button 
              variant={isLiked ? "default" : "secondary"} 
              size="sm" 
              onClick={handleLike}
              className="flex-1"
            >
              <Heart className="h-4 w-4 mr-1" fill={isLiked ? "currentColor" : "none"} />
              {isLiked ? "Liked" : "Like"}
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={handleComment}
              className="flex-1"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Comment
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9" 
              onClick={handleBookmark}
            >
              <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
              <span className="sr-only">Bookmark</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9" 
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
