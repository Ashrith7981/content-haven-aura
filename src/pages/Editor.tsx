
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  ImageIcon, 
  Bold, 
  Italic, 
  Link as LinkIcon, 
  List, 
  ListOrdered,
  Heading1, 
  Heading2,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { mockPosts } from "@/utils/mockData";

const SAMPLE_CONTENT = `
<p>Start writing your article here. This editor supports basic formatting like <strong>bold</strong> and <em>italic</em>.</p>

<h2>Add subheadings to organize your content</h2>

<p>Break your content into sections to make it easier for readers to follow along. Each section should cover a specific aspect of your topic.</p>

<p>You can also add lists:</p>

<ul>
  <li>First item in an unordered list</li>
  <li>Second item in an unordered list</li>
  <li>Third item in an unordered list</li>
</ul>

<h2>Add images to enhance your article</h2>

<p>Images help illustrate your points and break up text. Use the image button in the toolbar to add images to your post.</p>

<blockquote>
  <p>Add quotes to highlight important points or include citations from other sources.</p>
</blockquote>

<p>Continue writing your article, and remember to review it before publishing!</p>
`;

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (id) {
      // Editing existing post
      const post = mockPosts.find(p => p.id === id);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt);
        setCoverImage(post.imageUrl);
        setCategory(post.category);
        setTags(post.tags.join(", "));
      }
    } else {
      // New post
      setContent(SAMPLE_CONTENT);
    }
  }, [id]);

  const insertFormatting = (type: string) => {
    let formattedText = "";
    
    switch (type) {
      case "bold":
        formattedText = "<strong>Bold text</strong>";
        break;
      case "italic":
        formattedText = "<em>Italic text</em>";
        break;
      case "link":
        formattedText = '<a href="https://example.com">Link text</a>';
        break;
      case "h1":
        formattedText = "<h1>Heading 1</h1>";
        break;
      case "h2":
        formattedText = "<h2>Heading 2</h2>";
        break;
      case "ul":
        formattedText = "<ul>\n  <li>List item</li>\n  <li>List item</li>\n</ul>";
        break;
      case "ol":
        formattedText = "<ol>\n  <li>List item</li>\n  <li>List item</li>\n</ol>";
        break;
      case "quote":
        formattedText = "<blockquote>\n  <p>Quoted text</p>\n</blockquote>";
        break;
      case "image":
        formattedText = '<img src="https://source.unsplash.com/random/800x400" alt="Description" />';
        break;
      default:
        break;
    }
    
    // Insert at cursor position or at the end
    setContent(prev => prev + formattedText);
  };

  const handleSave = () => {
    if (!title) {
      toast.error("Please enter a title for your post");
      return;
    }
    
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Post saved successfully");
      // For new posts, navigate to the dashboard after saving
      if (!id) {
        navigate("/dashboard");
      }
    }, 1000);
  };

  const handlePublish = () => {
    if (!title) {
      toast.error("Please enter a title for your post");
      return;
    }
    
    if (!content) {
      toast.error("Please add content to your post");
      return;
    }
    
    if (!excerpt) {
      toast.error("Please add an excerpt for your post");
      return;
    }
    
    if (!coverImage) {
      toast.error("Please add a cover image for your post");
      return;
    }
    
    if (!category) {
      toast.error("Please select a category for your post");
      return;
    }
    
    setIsPublishing(true);
    
    // Simulate publishing
    setTimeout(() => {
      setIsPublishing(false);
      toast.success("Post published successfully");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b py-3">
        <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/dashboard")}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-xl font-bold">
              {id ? "Edit Post" : "New Post"}
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={handleSave} 
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            <Button 
              onClick={handlePublish} 
              disabled={isPublishing}
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-8">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Post Details Section */}
          <div className="mb-8 animate-fade-in">
            <div className="mb-6">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter your post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl mt-1"
              />
            </div>
            
            <div className="mb-6">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                placeholder="Write a brief summary of your post"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="mt-1 resize-none"
              />
            </div>
            
            <div className="mb-6">
              <Label htmlFor="cover-image">Cover Image URL</Label>
              <Input
                id="cover-image"
                placeholder="Enter image URL"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="mt-1"
              />
              {coverImage && (
                <div className="mt-2 relative aspect-[16/9] rounded-lg overflow-hidden">
                  <img 
                    src={coverImage} 
                    alt="Cover preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 px-3 mt-1 rounded-md border border-input bg-background"
                >
                  <option value="">Select a category</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Product">Product</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g. Design, UX, Research"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          
          {/* Editor Toolbar */}
          <div className="border rounded-t-lg p-2 flex flex-wrap items-center gap-1 bg-secondary/50 animate-fade-in">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertFormatting("bold")}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertFormatting("italic")}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertFormatting("link")}
              title="Link"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertFormatting("h1")}
              title="Heading 1"
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertFormatting("h2")}
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertFormatting("ul")}
              title="Bulleted List"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertFormatting("ol")}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertFormatting("quote")}
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertFormatting("image")}
              title="Insert Image"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Editor Content */}
          <div className="rounded-b-lg border border-t-0 min-h-[500px] animate-fade-in">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-[500px] p-4 focus:outline-none resize-y font-mono text-sm"
              placeholder="Write your post content here..."
            />
          </div>
          
          {/* Preview */}
          <div className="mt-8 border-t pt-8 animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editor;
