
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  joinedDate: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  publishedDate: string;
  readTime: number;
  imageUrl: string;
  likes: number;
  comments: number;
  tags: string[];
  category: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  publishedDate: string;
  likes: number;
}

// Mock users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    bio: "UX Designer and tech enthusiast. Writing about design systems and user experiences.",
    joinedDate: "January 2023",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    bio: "Software engineer with a passion for React and modern web technologies.",
    joinedDate: "March 2023",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    bio: "Product manager and minimalist. I write about productivity and design.",
    joinedDate: "February 2023",
  },
];

// Mock posts
export const mockPosts: Post[] = [
  {
    id: "1",
    title: "The Future of Minimalist Design in Digital Products",
    excerpt: "How simplicity and clean aesthetics are shaping tomorrow's digital experiences.",
    content: `
      <p>Minimalism has always been at the heart of great design. In the digital world, it takes on new meaning as we balance complex functionality with clean, intuitive interfaces.</p>
      
      <p>The core principles of minimalist design include:</p>
      <ul>
        <li>Removing unnecessary elements</li>
        <li>Focusing on typography and whitespace</li>
        <li>Using subtle animations to guide users</li>
        <li>Prioritizing content over decoration</li>
      </ul>
      
      <p>As we move forward, we're seeing a shift towards what I call "functional minimalism" - where the minimalist aesthetic serves to highlight and enhance functionality rather than simply looking clean for its own sake.</p>
      
      <h2>The Role of Animation</h2>
      <p>Subtle animations play a crucial role in modern minimalist interfaces. They provide feedback, guide attention, and add a layer of polish that elevates the entire experience.</p>
      
      <h2>Typography as a Foundation</h2>
      <p>With fewer visual elements, typography becomes even more important. Careful font selection, sizing, and spacing can create hierarchy and guide users through content naturally.</p>
      
      <p>The future of minimalist design isn't about removing everything - it's about being intentional with every element we include.</p>
    `,
    author: mockUsers[0],
    publishedDate: "May 15, 2023",
    readTime: 5,
    imageUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070",
    likes: 248,
    comments: 42,
    tags: ["Design", "Minimalism", "UX"],
    category: "Design",
  },
  {
    id: "2",
    title: "Building Scalable React Applications in 2023",
    excerpt: "Modern architecture patterns for maintainable and performant React applications.",
    content: `
      <p>As React applications grow in complexity, maintaining scalable architecture becomes increasingly important.</p>
      
      <p>In this article, I'll share the architecture patterns that have proven effective across dozens of enterprise React applications.</p>
      
      <h2>Component Organization</h2>
      <p>Organizing components by feature rather than type has significant benefits as applications scale. This approach aligns with how teams work and how features evolve.</p>
      
      <h2>State Management Strategies</h2>
      <p>The debate between global state libraries and React's built-in state management continues, but a hybrid approach often works best:</p>
      <ul>
        <li>Local component state for UI-specific states</li>
        <li>Context API for shared state within feature boundaries</li>
        <li>Dedicated state management for truly global state</li>
      </ul>
      
      <h2>Performance Optimization</h2>
      <p>Beyond the usual memoization techniques, architectural decisions like code-splitting and lazy loading at the feature level can dramatically improve perceived performance.</p>
      
      <p>Building scalable React applications is less about specific libraries and more about consistent patterns and principles.</p>
    `,
    author: mockUsers[1],
    publishedDate: "June 23, 2023",
    readTime: 8,
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
    likes: 324,
    comments: 56,
    tags: ["React", "JavaScript", "Architecture"],
    category: "Development",
  },
  {
    id: "3",
    title: "The Subtle Art of Product Prioritization",
    excerpt: "How to decide what to build next when everything seems important.",
    content: `
      <p>Product prioritization is perhaps the most challenging aspect of product management - and the most important.</p>
      
      <p>In a world of limited resources and unlimited ideas, choosing what to build next separates successful products from those that flounder.</p>
      
      <h2>Beyond RICE and MoSCoW</h2>
      <p>While frameworks like RICE (Reach, Impact, Confidence, Effort) and MoSCoW (Must have, Should have, Could have, Won't have) provide useful structure, they're just starting points.</p>
      
      <p>Effective prioritization requires deeper thinking:</p>
      <ul>
        <li>Understanding true user problems vs. requested features</li>
        <li>Identifying strategic leverage points in your product</li>
        <li>Balancing short-term wins with long-term investments</li>
        <li>Building alignment across stakeholders with different priorities</li>
      </ul>
      
      <h2>Data-Informed, Not Data-Driven</h2>
      <p>Data should inform prioritization but never drive it completely. The most transformative features often have no historical data to support them.</p>
      
      <h2>The Opportunity Cost Mindset</h2>
      <p>Perhaps most importantly, prioritization is about opportunity cost. Every "yes" means saying "no" or "not yet" to many other options.</p>
      
      <p>Embracing this reality - and communicating it transparently - builds trust even when stakeholders don't get their preferred features immediately.</p>
    `,
    author: mockUsers[2],
    publishedDate: "July 5, 2023",
    readTime: 6,
    imageUrl: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069",
    likes: 182,
    comments: 28,
    tags: ["Product Management", "Strategy", "Decision Making"],
    category: "Product",
  },
  {
    id: "4",
    title: "Typography Fundamentals Every Designer Should Master",
    excerpt: "Essential principles for creating readable, beautiful text in digital products.",
    content: `
      <p>Typography forms the foundation of digital design, yet it's often overlooked in favor of more flashy elements.</p>
      
      <p>Mastering these typography fundamentals will instantly elevate your designs:</p>
      
      <h2>Hierarchy Through Contrast</h2>
      <p>Creating clear hierarchy is about meaningful contrast - not just in size, but in weight, spacing, and sometimes color. Each level should be clearly distinguishable at a glance.</p>
      
      <h2>Readability vs. Legibility</h2>
      <p>Legibility refers to how easily individual characters can be distinguished; readability is about the comfort of reading entire text blocks. Both matter, but in different contexts.</p>
      
      <h2>The Magic of Line Height</h2>
      <p>Proper line height (leading) creates comfortable reading rhythm. For body text, aim for line height that's 1.5-1.6 times your font size.</p>
      
      <h2>Responsive Typography</h2>
      <p>Text should adapt not just to screen size but to reading distance. Mobile devices are held closer, requiring different typography treatment beyond simple scaling.</p>
      
      <p>Typography isn't just about making text look good - it's about serving readers and communicating with clarity.</p>
    `,
    author: mockUsers[0],
    publishedDate: "August 12, 2023",
    readTime: 5,
    imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2069",
    likes: 156,
    comments: 22,
    tags: ["Typography", "Design", "UX"],
    category: "Design",
  },
];

// Mock comments
export const mockComments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      content: "Great article! I've been thinking about this a lot lately in my own design work.",
      author: mockUsers[1],
      publishedDate: "May 16, 2023",
      likes: 5,
    },
    {
      id: "c2",
      content: "I agree with most points, but I think there's still room for more decorative elements when they serve a purpose.",
      author: mockUsers[2],
      publishedDate: "May 17, 2023",
      likes: 3,
    },
  ],
  "2": [
    {
      id: "c3",
      content: "This helped me rethink how I'm structuring my current project. Thanks for sharing!",
      author: mockUsers[0],
      publishedDate: "June 24, 2023",
      likes: 8,
    },
  ],
  "3": [
    {
      id: "c4",
      content: "The opportunity cost mindset has been game-changing for our team. Wish I'd learned this earlier in my career.",
      author: mockUsers[1],
      publishedDate: "July 6, 2023",
      likes: 4,
    },
    {
      id: "c5",
      content: "Do you have any suggestions for getting stakeholders to understand opportunity cost when they're pushing for their features?",
      author: mockUsers[0],
      publishedDate: "July 7, 2023",
      likes: 2,
    },
  ],
};

// Current user (for simulating logged-in state)
export const currentUser: User = mockUsers[0];
