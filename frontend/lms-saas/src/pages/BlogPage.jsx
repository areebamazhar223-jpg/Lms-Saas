import { useState } from "react";
import { FileText, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import aiImage from "../assets/blog/ai-workplace-2026.png";
import reactImage from "../assets/blog/react-trends-2026.png";
import marketingImage from "../assets/blog/digital-marketing-2025-2026.png";
import designImage from "../assets/blog/uiux-design-principles.png";
import "./BlogPage.css";

const posts = [
  {
    title: "Learn React by Building Projects",
    image: reactImage,
    author: "LearnSmart",
    excerpt: "Build your React skills one project at a time. Learn components, state, and modern workflows with practical lessons you can use in real applications.",
    content: "Start with the foundations, then put each new idea into practice. LearnSmart courses pair clear lessons with hands-on projects so you can build a portfolio and grow your confidence as a developer."
  },
  {
    title: "How AI Is Changing Online Learning",
    image: aiImage,
    author: "LearnSmart",
    excerpt: "Explore how AI tools can make study more personal, help explain difficult topics, and support learners as they build useful skills at their own pace.",
    content: "AI is becoming a helpful study companion: it can offer explanations, practice prompts, and new ways to explore a topic. LearnSmart encourages learners to use these tools thoughtfully while building strong fundamentals and checking what they learn."
  },
  {
    title: "Digital Skills for Your Career",
    image: marketingImage,
    author: "LearnSmart",
    excerpt: "Turn curiosity into career-ready skills with focused courses in digital marketing, data, and technology—then apply what you learn to real goals.",
    content: "A clear learning plan can make a big goal feel achievable. Choose a skill that supports your next step, follow a structured course, and use practical exercises to turn new knowledge into work you can show."
  },
  {
    title: "Create Better Digital Learning Experiences",
    image: designImage,
    author: "LearnSmart",
    excerpt: "Good online courses make complex ideas easier to follow. See how thoughtful design, clear lessons, and hands-on practice keep learners moving forward.",
    content: "A useful digital learning experience gives learners a clear path, engaging explanations, and room to practice. LearnSmart brings lessons and resources together so students can study at their own pace and connect each topic to a practical outcome."
  },
];

export default function BlogPage() {
  const [activePost, setActivePost] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);

  return (
    <div className="blog-page">
      <Navbar />
      <main>
        <header className="blog-title-banner">
          <div className="blog-title-inner">
            <h1>Blog</h1>
            <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Blog</span></nav>
          </div>
        </header>

        <section className="blog-listing" aria-label="Blog articles">
          <div className="blog-listing-grid">
            {posts.map((post) => (
              <article className="reference-blog-card" key={post.title}>
                <button className={'reference-blog-image' + (expandedImage === post.title ? ' is-expanded' : '')} type="button" onClick={() => setExpandedImage((current) => current === post.title ? null : post.title)} aria-label={(expandedImage === post.title ? 'Hide excerpt for ' : 'Show excerpt for ') + post.title} aria-expanded={expandedImage === post.title}>
                  <img src={post.image} alt="" loading="lazy" />
                  <span className="reference-blog-overlay"><span>{post.excerpt}</span></span>
                </button>
                <div className="reference-blog-details">
                  <div className="reference-blog-date"><span>30 Thu</span><FileText size={19} aria-hidden="true" /></div>
                  <div className="reference-blog-copy">
                    <button type="button" className="reference-blog-title" onClick={() => setActivePost(post)}>{post.title}</button>
                    <p>{post.author}<span aria-hidden="true">|</span><span>▮ blog, chat</span></p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      {activePost && <div className="blog-article-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActivePost(null); }}>
        <article className="blog-article-dialog" role="dialog" aria-modal="true" aria-labelledby="blog-article-title">
          <button type="button" className="blog-article-close" onClick={() => setActivePost(null)} aria-label="Close article"><X size={22} /></button>
          <img src={activePost.image} alt="" />
          <div className="blog-article-content"><p className="blog-article-meta">30 Thu <span>|</span> {activePost.author} <span>|</span> Blog</p><h2 id="blog-article-title">{activePost.title}</h2><p>{activePost.excerpt}</p><p>{activePost.content}</p></div>
        </article>
      </div>}
    </div>
  );
}
