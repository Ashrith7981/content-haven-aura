
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Edit, 
  Eye, 
  Heart, 
  MessageCircle, 
  Plus, 
  Trash2, 
  Filter,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockPosts, currentUser } from "@/utils/mockData";

const Dashboard = () => {
  const [userPosts, setUserPosts] = useState(
    mockPosts.filter(post => post.author.id === currentUser.id)
  );
  const totalViews = 1248;
  const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = userPosts.reduce((sum, post) => sum + post.comments, 0);

  const handleDeletePost = (postId: string) => {
    setUserPosts(userPosts.filter(post => post.id !== postId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your posts and view your stats
              </p>
            </div>
            <Button asChild className="mt-4 md:mt-0">
              <Link to="/editor" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" /> New Post
              </Link>
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalViews}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +14% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in animate-delay-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalLikes}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +9% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in animate-delay-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalComments}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +23% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Analytics Chart */}
          <Card className="mb-10 animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Analytics Overview</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Last 30 days
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 3 months</DropdownMenuItem>
                    <DropdownMenuItem>All time</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                <BarChart3 className="h-16 w-16" />
                <p className="ml-4">Analytics data visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Posts */}
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Your Posts</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Newest</DropdownMenuItem>
                  <DropdownMenuItem>Oldest</DropdownMenuItem>
                  <DropdownMenuItem>Most Views</DropdownMenuItem>
                  <DropdownMenuItem>Most Likes</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="space-y-4">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 h-40 md:h-auto">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h3 className="font-bold text-lg mb-2 md:mb-0">
                            {post.title}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <Button asChild variant="ghost" size="icon">
                              <Link to={`/post/${post.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Link>
                            </Button>
                            <Button asChild variant="ghost" size="icon">
                              <Link to={`/editor/${post.id}`}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Link>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                        <p className="text-muted-foreground line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-muted-foreground">
                            {post.publishedDate} • {post.readTime} min read
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{Math.floor(Math.random() * 500) + 100}</span>
                            </div>
                            <div className="flex items-center">
                              <Heart className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <h3 className="font-medium text-lg mb-2">No posts yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start writing your first post to see it here
                  </p>
                  <Button asChild>
                    <Link to="/editor">
                      <Plus className="mr-2 h-4 w-4" /> Create New Post
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
