import { Calendar, User, ArrowRight } from 'lucide-react';
import aiWorkplaceImage from '../../assets/blog/ai-workplace-2026.png';
import digitalMarketingImage from '../../assets/blog/digital-marketing-2025-2026.png';
import reactTrendsImage from '../../assets/blog/react-trends-2026.png';
import uiuxDesignImage from '../../assets/blog/uiux-design-principles.png';
import './Blog.css';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Learn Web Development: From HTML to Full-Stack',
    excerpt: 'Master modern web development with our comprehensive guide. Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and launch your career as a full-stack developer.',
    author: 'LearnSmart Team',
    date: 'Dec 15, 2024',
    image: reactTrendsImage,
    category: 'Web Development',
    readTime: '12 min read'
  },
  {
    id: 2,
    title: 'Mobile App Development: iOS & Android Essentials',
    excerpt: 'Discover how to build native and cross-platform mobile apps. Learn React Native, Flutter, Swift, and Kotlin. Create apps that work seamlessly on both iOS and Android devices.',
    author: 'Mobile Dev Expert',
    date: 'Dec 12, 2024',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    category: 'Mobile Development',
    readTime: '10 min read'
  },
  {
    id: 3,
    title: 'UI/UX Design Principles for Modern Apps',
    excerpt: 'Learn the fundamentals of creating beautiful, user-friendly interfaces. Master design thinking, wireframing, prototyping, and usability testing. Create experiences your users will love.',
    author: 'Design Lead',
    date: 'Dec 10, 2024',
    image: uiuxDesignImage,
    category: 'Design',
    readTime: '8 min read'
  },
  {
    id: 4,
    title: 'Data Science & Machine Learning for Beginners',
    excerpt: 'Start your journey into data science and AI. Learn Python, data analysis, visualization, and machine learning algorithms. Work with real datasets and build predictive models.',
    author: 'Data Science Expert',
    date: 'Dec 8, 2024',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    category: 'Data Science',
    readTime: '14 min read'
  },
  {
    id: 5,
    title: 'Digital Marketing in 2025: Strategies That Work',
    excerpt: 'Master modern digital marketing techniques including SEO, content marketing, social media strategy, email campaigns, and analytics. Learn to drive traffic, engage audiences, and grow your business.',
    author: 'Marketing Strategist',
    date: 'Dec 5, 2024',
    image: digitalMarketingImage,
    category: 'Marketing',
    readTime: '11 min read'
  },
  {
    id: 6,
    title: 'Cloud Computing & DevOps: Deploy Like a Pro',
    excerpt: 'Learn cloud platforms (AWS, Azure, GCP), containerization with Docker, Kubernetes orchestration, CI/CD pipelines, and infrastructure as code. Deploy and scale applications with confidence.',
    author: 'DevOps Specialist',
    date: 'Dec 1, 2024',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    category: 'DevOps',
    readTime: '13 min read'
  },
  {
    id: 7,
    title: 'AI & Automation: Transform Your Business',
    excerpt: 'Explore how artificial intelligence and automation are reshaping industries. Learn AI applications, ChatGPT, prompt engineering, automation workflows, and how to leverage AI tools for productivity.',
    author: 'LearnSmart Team',
    date: 'Nov 28, 2024',
    image: aiWorkplaceImage,
    category: 'Artificial Intelligence',
    readTime: '9 min read'
  }
];

export default function Blog() {
  return (
    <section className="blog-section">
      <div className="container">
        <div className="section-header">
          <h2>Latest Blog Posts</h2>
          <p>Learn from industry experts and stay updated with the latest trends</p>
        </div>

        <div className="blog-grid">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-image">
                <img 
                  src={post.image} 
                  alt={post.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=' + encodeURIComponent(post.category);
                    e.target.style.backgroundColor = '#f0f0f0';
                  }}
                  onLoad={(e) => {
                    e.target.style.opacity = '1';
                  }}
                  style={{ opacity: 0.9, transition: 'opacity 0.3s ease' }}
                />
                <div className="blog-badge">{post.category}</div>
              </div>

              <div className="blog-content">
                <div className="blog-meta">
                  <span className="meta-item">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span className="meta-item">
                    {post.readTime}
                  </span>
                </div>

                <h3>{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>

                <div className="blog-footer">
                  <div className="blog-author">
                    <User size={14} />
                    {post.author}
                  </div>
                  <button className="read-more">
                    Read More
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
