
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Flag, MoreHorizontal, MessageCircle } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Comment, currentUser } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
}

const CommentSection = ({ comments, postId }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const [displayedComments, setDisplayedComments] = useState(comments);
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const { toast } = useToast();

  const handleAddComment = () => {
    if (!commentText.trim()) {
      toast({
        title: "Empty comment",
        description: "Please write something before posting a comment.",
        variant: "destructive"
      });
      return;
    }
    
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
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully!",
      variant: "default"
    });
  };

  const handleLikeComment = (commentId: string) => {
    // Check if already liked this comment
    if (likedComments.includes(commentId)) {
      // Unlike comment
      setLikedComments(likedComments.filter(id => id !== commentId));
      setDisplayedComments(
        displayedComments.map((comment) => 
          comment.id === commentId 
            ? { ...comment, likes: Math.max(0, comment.likes - 1) } 
            : comment
        )
      );
      toast({
        title: "Like removed",
        description: "You've removed your like from this comment.",
        variant: "default"
      });
    } else {
      // Like comment
      setLikedComments([...likedComments, commentId]);
      setDisplayedComments(
        displayedComments.map((comment) => 
          comment.id === commentId 
            ? { ...comment, likes: comment.likes + 1 } 
            : comment
        )
      );
      toast({
        title: "Comment liked",
        description: "You've liked this comment!",
        variant: "default"
      });
    }
  };

  const handleReportComment = (commentId: string) => {
    toast({
      title: "Comment reported",
      description: "Thank you for reporting this comment. Our team will review it.",
      variant: "default"
    });
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
          <Button onClick={handleAddComment}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Post Comment
          </Button>
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
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => handleReportComment(comment.id)}
                    >
                      <Flag className="mr-2 h-4 w-4" /> Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm">{comment.content}</p>
              <div className="flex items-center pt-1">
                <Button 
                  variant={likedComments.includes(comment.id) ? "default" : "ghost"}
                  size="sm" 
                  onClick={() => handleLikeComment(comment.id)}
                  className="h-8 px-2 hover:text-foreground"
                >
                  <Heart 
                    className="mr-1 h-4 w-4" 
                    fill={likedComments.includes(comment.id) ? "currentColor" : "none"} 
                  /> 
                  {comment.likes}
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
