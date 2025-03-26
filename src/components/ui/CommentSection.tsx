
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Flag, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Comment, currentUser } from "@/utils/mockData";

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
}

const CommentSection = ({ comments, postId }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const [displayedComments, setDisplayedComments] = useState(comments);

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    
    // Create a new comment
    const newComment: Comment = {
      id: `temp-${Date.now()}`,
      content: commentText,
      author: currentUser,
      publishedDate: "Just now",
      likes: 0,
    };
    
    // Add to displayed comments
    setDisplayedComments([newComment, ...displayedComments]);
    setCommentText("");
  };

  const handleLikeComment = (commentId: string) => {
    setDisplayedComments(
      displayedComments.map((comment) => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 } 
          : comment
      )
    );
  };

  return (
    <section className="pt-10 animate-fade-in">
      <h3 className="text-xl font-bold mb-6">Comments ({displayedComments.length})</h3>
      
      {/* Comment form */}
      <div className="mb-8 flex items-start space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Share your thoughts..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="resize-none mb-2 focus-visible:ring-primary"
          />
          <Button onClick={handleAddComment}>Post Comment</Button>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-6">
        {displayedComments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4 animate-fade-in">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{comment.author.name}</span>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{comment.publishedDate}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      <Flag className="mr-2 h-4 w-4" /> Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm">{comment.content}</p>
              <div className="flex items-center pt-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleLikeComment(comment.id)}
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                >
                  <Heart className="mr-1 h-4 w-4" /> {comment.likes}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
