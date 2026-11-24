import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./GalleryPage.css";

const learningMoments = [
  { title: "One-to-One Learning Support", category: "Learning Sessions", image: "https://www.aprendermusica.com.br/aula-de-musica/imagens/escola-que-faz-aula-particular-de-violino.jpg", description: "Personal guidance helps learners ask questions, practice with confidence, and make steady progress with an instructor." },
  { title: "Guided Digital Learning", category: "Classroom Learning", image: "https://img1.wsimg.com/isteam/getty/1358014313", description: "Instructors can bring digital lessons to life by helping learners explore, practice, and ask questions together." },
  { title: "Collaborative Study", category: "Classroom Learning", image: "https://miro.medium.com/v2/resize%3Afit%3A1400/1%2A7m5moOVY-myUoW_KwTl4uA.jpeg", description: "Group activities give students a chance to share ideas, solve problems, and learn from one another." },
  { title: "Supportive Classroom Instruction", category: "Classroom Learning", image: "https://www.erickson.it/media/amasty/blog/1200x630_alto-potenziale-in-discussione-una-legge-per-riconoscere-gli-alunni-gifted.jpg", description: "Focused instruction and hands-on support help learners build confidence as they work through new topics." },
];

const filters = ["All", "Learning Sessions", "Classroom Learning"];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedItem, setExpandedItem] = useState(null);
  const visibleItems = activeFilter === "All"
    ? learningMoments
    : learningMoments.filter((item) => item.category === activeFilter);

  return (
    <div className="gallery-page">
      <Navbar />
      <main>
        <header className="gallery-title-banner">
          <div className="gallery-title-inner">
            <h1>Learning Gallery</h1>
            <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Gallery</span></nav>
          </div>
        </header>

        <section className="learning-gallery" aria-labelledby="learning-gallery-title">
          <div className="learning-gallery-heading">
            <div>
              <h2 id="learning-gallery-title">Learning in Action</h2>
              <p>Explore the skills, projects, and ideas learners build with LearnSmart.</p>
            </div>
            <span className="learning-gallery-count">{visibleItems.length} learning highlights</span>
          </div>

          <div className="learning-gallery-filters" aria-label="Filter gallery by learning area">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "is-active" : ""}
                aria-pressed={activeFilter === filter}
                onClick={() => { setActiveFilter(filter); setExpandedItem(null); }}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="learning-gallery-grid">
            {visibleItems.map((item) => {
              const isExpanded = expandedItem === item.title;
              return (
                <article className="learning-gallery-card" key={item.title}>
                  <button
                    type="button"
                    className={`learning-gallery-image${isExpanded ? " is-expanded" : ""}`}
                    aria-label={`${isExpanded ? "Hide" : "Show"} details: ${item.title}`}
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedItem((current) => current === item.title ? null : item.title)}
                  >
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="learning-gallery-overlay">
                      <span className="learning-gallery-category">{item.category}</span>
                      <span className="learning-gallery-description">{item.description}</span>
                    </span>
                  </button>
                  <div className="learning-gallery-caption">
                    <span>{item.category}</span>
                    <h3>{item.title}</h3>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
