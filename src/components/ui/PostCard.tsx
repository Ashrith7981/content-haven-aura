
import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Post } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  featured?: boolean;
  className?: string;
}

const PostCard = ({ post, featured = false, className }: PostCardProps) => {
  const { id, title, excerpt, author, publishedDate, readTime, imageUrl, likes, comments, tags, category } = post;

  return (
    <article 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl transition-all duration-300",
        featured ? "md:flex-row" : "h-full",
        className
      )}
    >
      <Link 
        to={`/post/${id}`} 
        className={cn(
          "relative overflow-hidden",
          featured ? "md:w-1/2" : "aspect-[16/9]"
        )}
      >
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
      
      <div className={cn(
        "flex flex-col justify-between p-5 bg-white",
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
            <span className="text-xs text-muted-foreground">{readTime} min read</span>
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
        
        <div className="mt-6 pt-4 border-t flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-7 w-7">
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
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Like</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">Comment</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className="h-4 w-4" />
              <span className="sr-only">Bookmark</span>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
