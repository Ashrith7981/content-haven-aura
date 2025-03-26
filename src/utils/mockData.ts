
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

// Mock users (Updated with animated character avatars)
export const mockUsers: User[] = [
  {
    id: "1",
    name: "K Ashrith",
    email: "ashrith@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Ashrith",
    bio: "Entertainment enthusiast and content creator. Sharing joy through stories and visuals.",
    joinedDate: "January 2023",
  },
  {
    id: "2",
    name: "K Jignesh",
    email: "jignesh@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Jignesh",
    bio: "Creative director with a passion for visual storytelling and digital experiences.",
    joinedDate: "March 2023",
  },
  {
    id: "3",
    name: "Srikanth",
    email: "srikanth@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Srikanth",
    bio: "Content strategist and social media expert. Building connections through engaging content.",
    joinedDate: "February 2023",
  },
];

// Mock posts (Updated with more entertainment-focused content)
export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Behind the Scenes: How We Created That Viral Video",
    excerpt: "A look at what goes into making content that captures everyone's attention.",
    content: `
      <p>Creating viral content isn't just about luck - it's about understanding what resonates with people and crafting something with that perfect blend of relatability, emotion, and surprise.</p>
      
      <p>When we set out to create our latest video, we knew we wanted to tap into these elements:</p>
      <ul>
        <li>An authentic story that people could connect with</li>
        <li>Visually stunning moments that make viewers pause</li>
        <li>A satisfying conclusion that leaves people feeling something</li>
        <li>An element of the unexpected to keep viewers engaged</li>
      </ul>
      
      <p>The shooting process involved over 20 hours of raw footage, captured across 5 different locations. What you don't see is the team of 12 people behind the camera, the countless technical challenges we overcame, and the moments where we almost gave up.</p>
      
      <h2>The Magic of Editing</h2>
      <p>In post-production, we spent nearly 50 hours crafting the perfect cuts, timing, and transitions. The music selection alone took 3 days - finding that perfect track that complemented the emotional journey without overpowering it.</p>
      
      <h2>When It All Came Together</h2>
      <p>The moment we knew we had something special was during our final review. The room fell silent as the video ended, followed by spontaneous applause. We felt what we hoped our audience would feel.</p>
      
      <p>Creating content that connects is about more than techniques and trends - it's about understanding human emotion and experience.</p>
    `,
    author: mockUsers[0],
    publishedDate: "May 15, 2023",
    readTime: 5,
    imageUrl: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=2070",
    likes: 1248,
    comments: 142,
    tags: ["BehindTheScenes", "ContentCreation", "Viral"],
    category: "Entertainment",
  },
  {
    id: "2",
    title: "5 Secrets to Creating Stunning Social Media Visuals",
    excerpt: "Simple techniques anyone can use to elevate their social media aesthetic.",
    content: `
      <p>In the endless feed of content, visuals that stop the scroll are more valuable than ever.</p>
      
      <p>After analyzing thousands of top-performing posts across platforms, I've distilled what makes certain images capture attention while others fade into the background.</p>
      
      <h2>1. Color Psychology Matters</h2>
      <p>The strategic use of color can trigger specific emotions and responses. Bright, contrasting colors tend to catch attention in busy feeds, while harmonious color schemes create a sense of polished professionalism.</p>
      
      <h2>2. The Rule of Thirds is Still Relevant</h2>
      <p>Despite evolving design trends, the classic rule of thirds continues to create visually appealing compositions that feel natural to the human eye.</p>
      
      <h2>3. Text Overlay Strategy</h2>
      <p>When adding text to images:</p>
      <ul>
        <li>Keep it brief - 5 words or less performs best</li>
        <li>Use contrasting colors or semi-transparent overlays for readability</li>
        <li>Leave breathing room around text (negative space)</li>
        <li>Choose fonts that match your brand personality</li>
      </ul>
      
      <h2>4. Consistency Creates Recognition</h2>
      <p>Developing a consistent visual style helps followers instantly recognize your content. This doesn't mean every post looks identical, but rather that they share visual elements that tie them together.</p>
      
      <h2>5. The Human Element</h2>
      <p>Images featuring faces consistently outperform object-only images. The human brain is wired to notice and connect with other human faces.</p>
      
      <p>Remember that great visuals support your message - they don't replace the need for meaningful content.</p>
    `,
    author: mockUsers[2],
    publishedDate: "June 23, 2023",
    readTime: 8,
    imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2074",
    likes: 824,
    comments: 96,
    tags: ["VisualContent", "SocialMedia", "DesignTips"],
    category: "Media",
  },
  {
    id: "3",
    title: "How We Doubled Our Engagement Rate in 30 Days",
    excerpt: "The strategy shift that transformed our audience interactions.",
    content: `
      <p>When our engagement metrics started plateauing despite growing follower counts, we knew something needed to change.</p>
      
      <p>The solution wasn't posting more content or spending more on promotion - it was about fundamentally rethinking how we connected with our audience.</p>
      
      <h2>The Problem with One-Way Communication</h2>
      <p>We realized we had fallen into the trap of broadcasting rather than conversing. Our content was professional but felt distant and impersonal to our audience.</p>
      
      <p>Our engagement strategy shift focused on:</p>
      <ul>
        <li>Creating content that explicitly invites response</li>
        <li>Responding to comments within 2 hours</li>
        <li>Highlighting community members regularly</li>
        <li>Being more transparent about our process and challenges</li>
      </ul>
      
      <h2>The 70/30 Content Mix</h2>
      <p>We shifted to a ratio where 70% of our content was entertaining or valuable without directly promoting anything, while 30% supported our specific goals.</p>
      
      <h2>Embracing Authenticity</h2>
      <p>Perhaps most importantly, we stopped trying to appear perfect. We shared bloopers, mistakes, and behind-the-scenes moments that humanized our brand.</p>
      
      <p>The results were almost immediate - comment counts tripled in the first week, and within a month, our average engagement rate had doubled from 2.1% to 4.3%.</p>
    `,
    author: mockUsers[1],
    publishedDate: "July 5, 2023",
    readTime: 6,
    imageUrl: "https://images.unsplash.com/photo-1574937319871-11e95ade9053?q=80&w=1964",
    likes: 582,
    comments: 128,
    tags: ["Engagement", "SocialStrategy", "ContentCreation"],
    category: "Strategy",
  },
  {
    id: "4",
    title: "Creating Content That Connects: Emotional Storytelling",
    excerpt: "How to craft stories that resonate deeply with your audience.",
    content: `
      <p>In a digital landscape overflowing with content, the pieces that truly connect share one critical element - they tell stories that evoke emotion.</p>
      
      <p>The most powerful content doesn't just entertain or inform - it makes people feel something.</p>
      
      <h2>The Science of Emotional Connection</h2>
      <p>Neurologically, emotional responses increase memory formation and retention. Content that triggers emotion is simply more memorable than neutral information.</p>
      
      <h2>The Emotional Spectrum</h2>
      <p>While negative emotions like outrage often drive viral sharing, positive emotions like awe, amusement, and inspiration lead to deeper, more meaningful engagement and brand loyalty.</p>
      
      <h2>Authenticity as the Foundation</h2>
      <p>Attempting to manufacture emotion without authentic foundation creates disconnection. The most powerful stories come from truth, even when creatively presented.</p>
      
      <h2>Structure That Resonates</h2>
      <p>Effective emotional storytelling follows patterns that have worked for centuries:</p>
      <ul>
        <li>Establish a relatable character or situation</li>
        <li>Present a conflict or challenge</li>
        <li>Take the audience on a journey with meaningful stakes</li>
        <li>Deliver a resolution that feels both satisfying and authentic</li>
      </ul>
      
      <p>When you create from a place of genuine emotion and human understanding, you don't just capture attention - you create connection.</p>
    `,
    author: mockUsers[0],
    publishedDate: "August 12, 2023",
    readTime: 5,
    imageUrl: "https://images.unsplash.com/photo-1513759565286-20e9c5fad06b?q=80&w=2070",
    likes: 756,
    comments: 112,
    tags: ["Storytelling", "ContentStrategy", "Engagement"],
    category: "Entertainment",
  },
];

// Mock comments
export const mockComments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      content: "This is exactly what I needed to read! I've been struggling with my content strategy lately. The behind-the-scenes insights are so valuable!",
      author: mockUsers[1],
      publishedDate: "May 16, 2023",
      likes: 25,
    },
    {
      id: "c2",
      content: "I'd love to see more examples of the early drafts vs final product. It's encouraging to know that even the pros go through multiple iterations.",
      author: mockUsers[2],
      publishedDate: "May 17, 2023",
      likes: 18,
    },
  ],
  "2": [
    {
      id: "c3",
      content: "The color psychology point is so true! I changed my palette last month and immediately saw better engagement. Going to try these other tips too!",
      author: mockUsers[0],
      publishedDate: "June 24, 2023",
      likes: 32,
    },
  ],
  "3": [
    {
      id: "c4",
      content: "We implemented the 70/30 mix you mentioned and it's working brilliantly! Our audience actually looks forward to our promotional content now.",
      author: mockUsers[1],
      publishedDate: "July 6, 2023",
      likes: 41,
    },
    {
      id: "c5",
      content: "How do you measure the quality of engagement beyond just the numbers? I find we get lots of comments but they're often just emojis or one word.",
      author: mockUsers[0],
      publishedDate: "July 7, 2023",
      likes: 15,
    },
  ],
};

// Current user (for simulating logged-in state)
export const currentUser: User = mockUsers[0];
