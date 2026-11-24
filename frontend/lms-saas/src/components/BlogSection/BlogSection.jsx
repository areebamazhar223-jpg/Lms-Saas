import { Bookmark, FileText } from 'lucide-react';
import './BlogSection.css';

const blogPosts = [
  {
    id: 1,
    title: 'Contrary to popular',
    author: 'dtlmselse',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&q=80',
    imageAlt: 'Learner relaxing at a computer in a bright office',
  },
  {
    id: 2,
    title: 'Omnis voluptas assumenda',
    author: 'dtlmselse',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop&q=80',
    imageAlt: 'Students collaborating around a table',
  },
  {
    id: 3,
    title: 'Piece of classical',
    author: 'dtlmselse',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80',
    imageAlt: 'Colleagues learning together in a bright room',
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="dtlms-blog-section" aria-labelledby="blog-heading">
      <div className="dtlms-blog-container">
        <h2 className="dtlms-blog-heading" id="blog-heading">BLOG</h2>
        <span className="dtlms-blog-heading-rule" aria-hidden="true" />

        <div className="dtlms-blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="dtlms-blog-card">
              <div className="dtlms-blog-image">
                <img src={post.image} alt={post.imageAlt} loading="lazy" />
              </div>
              <div className="dtlms-blog-content">
                <div className="dtlms-blog-date" aria-label="30 Thu">
                  <span>30 Thu</span>
                  <FileText size={21} fill="currentColor" aria-hidden="true" />
                </div>
                <div className="dtlms-blog-details">
                  <h3 className="dtlms-blog-title">{post.title}</h3>
                  <p className="dtlms-blog-author">{post.author}<span aria-hidden="true">|</span></p>
                  <p className="dtlms-blog-tags"><Bookmark size={13} fill="currentColor" aria-hidden="true" /> blog, chat</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
