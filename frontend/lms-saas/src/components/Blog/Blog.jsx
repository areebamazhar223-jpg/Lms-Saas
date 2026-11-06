import { Calendar, User, ArrowRight } from 'lucide-react';
import aiWorkplaceImage from '../../assets/blog/ai-workplace-2026.png';
import digitalMarketingImage from '../../assets/blog/digital-marketing-2025-2026.png';
import reactTrendsImage from '../../assets/blog/react-trends-2026.png';
import uiuxDesignImage from '../../assets/blog/uiux-design-principles.png';
import './Blog.css';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Top 10 React Trends in 2026',
    excerpt: 'Explore the React tools and practices developers are following in 2026, from modern rendering patterns to stronger performance and developer workflows.',
    author: 'Sarah Dev',
    date: 'Oct 20, 2026',
    image: reactTrendsImage,
    category: 'Programming',
    readTime: '8 min read'
  },
  {
    id: 2,
    title: 'The Future of Web Design Trends',
    excerpt: 'Discover the latest design trends and techniques that will dominate in 2025. From minimalism to interactive experiences, learn what\'s next.',
    author: 'John Designer',
    date: 'Dec 12, 2025',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    category: 'Design',
    readTime: '6 min read'
  },
  {
    id: 3,
    title: 'Digital Marketing 2025–2026: Strategies That Work',
    excerpt: 'A practical look at the shift from 2025 to 2026, covering search, social content, campaign measurement, and data-informed marketing decisions.',
    author: 'Emma Marketing',
    date: 'Oct 12, 2026',
    image: digitalMarketingImage,
    category: 'Marketing',
    readTime: '10 min read'
  },
  {
    id: 4,
    title: 'Getting Started with Python for Data Science',
    excerpt: 'A beginner\'s guide to Python programming for data science. Libraries, tools, and real-world examples included.',
    author: 'Mike Data',
    date: 'Dec 8, 2025',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    category: 'Programming',
    readTime: '12 min read'
  },
  {
    id: 5,
    title: 'UI/UX Design Principles Every Developer Should Know',
    excerpt: 'Understand the fundamentals of UI/UX design to create better user experiences. Learn color theory, typography, spacing, and more.',
    author: 'Lisa Design',
    date: 'Dec 5, 2025',
    image: uiuxDesignImage,
    category: 'Design',
    readTime: '7 min read'
  },
  {
    id: 6,
    title: 'Building Scalable Applications with Node.js',
    excerpt: 'Learn how to architect and build scalable backend applications using Node.js and Express. Best practices and patterns included.',
    author: 'Alex Backend',
    date: 'Dec 1, 2025',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    category: 'Programming',
    readTime: '11 min read'
  },
  {
    id: 7,
    title: 'How AI Is Changing the Modern Workplace',
    excerpt: 'See how teams are using AI tools to analyze information, improve everyday workflows, and make better informed decisions.',
    author: 'LearnAxis Team',
    date: 'Oct 25, 2026',
    image: aiWorkplaceImage,
    category: 'Artificial Intelligence',
    readTime: '7 min read'
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
