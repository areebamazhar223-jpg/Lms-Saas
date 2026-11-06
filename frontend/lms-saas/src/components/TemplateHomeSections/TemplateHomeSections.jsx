import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Award, BookOpenCheck, BriefcaseBusiness, Clock3, GraduationCap,
  MonitorPlay, ShieldCheck, Sparkles, UsersRound,
} from "lucide-react";
import api from "../../services/api";
import { getCourseDescription, getCourseFallbackImage } from "../../services/courseArtwork";
import { getCourseImageUrl } from "../../services/media";
import aiImage from "../../assets/courses/ai.jpg";
import webImage from "../../assets/courses/react.jpg";
import designImage from "../../assets/courses/figma-uiux.jpg";
import officeImage from "../../assets/courses/excel-data-analysis.jpg";
import wordpressImage from "../../assets/courses/wordpress.jpg";
import marketingImage from "../../assets/courses/digital-marketing.jpg";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "./TemplateHomeSections.css";

const categories = [
  { title: "Artificial Intelligence", href: "artificial-intelligence", match: /artificial intelligence|generative ai|chatgpt|prompt|machine learning|\bai\b/i, image: aiImage },
  { title: "Web Development", href: "web-development", match: /web development|html|css|javascript|\breact\b|mern|full.?stack/i, image: webImage },
  { title: "Graphic Designing", href: "graphic-design", match: /graphic design|photoshop|illustrator|canva|ui\s*\/?\s*ux|figma/i, image: designImage },
  { title: "Microsoft Office", href: "microsoft-office", match: /microsoft office|ms word|\bexcel\b|powerpoint|\baccess\b|office management/i, image: officeImage },
  { title: "WordPress Development", href: "wordpress", match: /wordpress|woocommerce|elementor/i, image: wordpressImage },
  { title: "Digital Marketing", href: "digital-marketing", match: /digital marketing|social media|seo|marketing|content strategy/i, image: marketingImage },
];

const learningTracks = [
  { title: "Artificial Intelligence & Machine Learning", href: "artificial-intelligence", match: /artificial intelligence|generative ai|ai agent|agentic ai|large language model|\bllm\b|machine learning|deep learning|prompt engineer|prompt engineering|chatgpt|\bai\b/i, description: "Explore generative AI, AI agents, LLMs, machine learning, and prompt engineering." },
  { title: "Frontend Software Engineering", href: "frontend-development", match: /frontend|front-end|web development|html|css|javascript|typescript|\breact\b|\bvue\b|\bangular\b|\bsvelte\b/i, description: "Build user interfaces with HTML, CSS, JavaScript, TypeScript, React, Vue, and Angular." },
  { title: "Backend Software Engineering", href: "backend-development", match: /backend|back-end|node\.?js|express|python|django|flask|java|spring|php|laravel|\.net|golang|\bgo\b|ruby|rails|api|database/i, description: "Learn server-side development with Node.js, Python, Java, PHP, databases, and APIs." },
  { title: "Cybersecurity Courses", href: "cybersecurity", match: /cyber.?security|ethical hack|penetration test|network security|information security|soc analyst/i, description: "Build practical foundations in cybersecurity, ethical hacking, and network defense." },
  { title: "Graphic Designing Courses", href: "graphic-design", match: /graphic design|photoshop|illustrator|canva|ui\s*\/?\s*ux|figma/i, description: "Learn visual design, creative software, and user experience skills." },
  { title: "Microsoft Office Courses", href: "microsoft-office", match: /microsoft office|ms office|ms word|microsoft word|\bexcel\b|powerpoint|power point|\baccess\b|office management/i, description: "Grow practical skills in Excel, Word, PowerPoint, and office tools." },
  { title: "Short Courses", href: "short-courses", match: /wordpress|freelanc|short|quick/i, description: "Quick, practical courses in WordPress, freelancing, and other in-demand skills.", short: true },
  { title: "Professional Diploma Programs", href: "professional", match: /professional|diploma|bootcamp|mern|full.?stack|advanced/i, description: "Longer learning paths for deeper, career-focused study." },
];

const benefits = [
  { title: "Flexible learning", text: "Learn on your schedule and at your pace.", icon: MonitorPlay },
  { title: "Clear course details", text: "Review the price and course information before enrolling.", icon: ShieldCheck },
  { title: "Skills that grow", text: "Explore focused lessons and deeper learning paths.", icon: BriefcaseBusiness },
  { title: "Certificates", text: "See certificate availability and pricing on each course.", icon: Award },
];

const courseText = (course) => `${course.title || ""} ${course.category || ""} ${getCourseDescription(course.description)}`;
const isShortCourse = (course) => Boolean(course.pricing?.isShortCourse) || /wordpress|freelanc/i.test(courseText(course));
const isPaidCourse = (course) => Number(course.pricing?.currentPrice || 0) > 0;
const initials = (name = "") => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

function CourseCard({ course }) {
  const [image, setImage] = useState(course.thumbnail ? getCourseImageUrl(course.thumbnail) : getCourseFallbackImage(course));
  const price = Number(course.pricing?.currentPrice || 0);
  const rating = Number(course.rating);
  const instructor = typeof course.instructor === "object" ? course.instructor?.name : "";

  useEffect(() => {
    setImage(course.thumbnail ? getCourseImageUrl(course.thumbnail) : getCourseFallbackImage(course));
  }, [course]);

  const fallback = () => setImage(getCourseFallbackImage(course));

  return (
    <article className="learn-course-card">
      <Link className="learn-course-card__image" to={`/courses/${course._id}`} aria-label={`View ${course.title}`}>
        <img src={image} alt={course.title} loading="lazy" decoding="async" onError={fallback} />
        <span className={`learn-course-card__price ${price ? "is-paid" : "is-free"}`}>{price ? `Rs ${price.toLocaleString()}` : "Free"}</span>
      </Link>
      <div className="learn-course-card__body">
        <span className="learn-course-card__category">{course.category || "LearnSmart course"}</span>
        <h3><Link to={`/courses/${course._id}`}>{course.title}</Link></h3>
        <div className="learn-course-card__instructor"><span className="learn-course-card__avatar">{initials(instructor) || <GraduationCap size={15} />}</span><span>{instructor || "Instructor details coming soon"}</span></div>
        <div className="learn-course-card__facts">
          <span><Clock3 size={14} />{course.duration || "Duration not specified"}</span>
          <span><BookOpenCheck size={14} />{course.level || "Level not specified"}</span>
          {Number.isFinite(rating) && rating > 0 && <span className="learn-course-card__rating">★ {rating.toFixed(1)}</span>}
        </div>
        <Link className="learn-course-card__action" to={`/courses/${course._id}`}>View course <ArrowRight size={16} /></Link>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return <div className="learn-section-heading"><span>{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

function CourseSection({ track, courses, loading }) {
  const id = `home-${track.href}`;
  return (
    <section className={`learn-course-section learn-course-section--${track.href}`} id={id}>
      <div className="learn-home-container">
        <div className="learn-course-section__heading">
          <SectionHeading eyebrow="LEARN SMARTER" title={track.title} description={track.description} />
          <Link className="learn-view-all" to={`/courses?category=${track.href}`}>View all <ArrowRight size={16} /></Link>
        </div>
        {courses.length ? (
          <div className="row g-4 learn-course-grid">{courses.slice(0, 3).map((course) => <div className="col-12 col-md-6 col-xl-4" key={course._id}><CourseCard course={course} /></div>)}</div>
        ) : <div className="learn-course-empty">{loading ? "Loading courses…" : "Courses in this learning path will appear here when they are added to the catalog."}</div>}
      </div>
    </section>
  );
}

export default function TemplateHomeSections() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    api.get("/courses")
      .then(({ data }) => { if (active) setCourses(data.courses || []); })
      .catch(() => { if (active) setFailed(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const popular = useMemo(() => courses.filter((course) => course.pricing?.isPopular), [courses]);
  const featured = useMemo(() => [...courses]
    .sort((a, b) => Number(Boolean(b.pricing?.isPopular)) - Number(Boolean(a.pricing?.isPopular)) || new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 3), [courses]);
  return (
    <>
      <section className="learn-stats"><div className="learn-home-container learn-stats__inner"><div><strong>50K+</strong><span>Online courses</span></div><div><strong>25K+</strong><span>Expert instructors</span></div><div><strong>100K+</strong><span>Happy learners</span></div><div><strong>4.8/5</strong><span>Average rating</span></div></div></section>
      <section className="learn-trust-strip" aria-label="Learning benefits"><div className="learn-trust-strip__inner">{benefits.map(({ title, text, icon: Icon }) => <article key={title}><span><Icon size={21} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="learn-categories" id="popular-categories">
        <div className="learn-home-container">
          <SectionHeading eyebrow="POPULAR CATEGORIES" title="Find your next skill" description="Explore learning paths built around the skills you want to grow." />
          <div className="row g-4 learn-category-grid">
            {categories.map((category) => {
              const count = courses.filter((course) => category.match.test(courseText(course))).length;
              return <div className="col-12 col-md-6 col-xl-4" key={category.href}><Link className="learn-category-card" to={`/courses?category=${category.href}`}><img src={category.image} alt="" loading="lazy" /><span className="learn-category-card__shade" /><span className="learn-category-card__copy"><strong>{category.title}</strong><small>{count} {count === 1 ? "course" : "courses"}</small></span><span className="learn-category-card__arrow"><ArrowRight size={19} /></span></Link></div>;
            })}
          </div>
        </div>
      </section>

      <section className="learn-featured" id="featured-courses">
        <div className="learn-home-container">
          <div className="learn-course-section__heading"><SectionHeading eyebrow="POPULAR RIGHT NOW" title="Popular courses" description="Learner favorites from across the catalog." /></div>
          {failed ? <div className="learn-course-empty" role="status">Courses could not be loaded right now. Please try again shortly.</div> : (popular.length ? popular.slice(0, 3) : featured).length ? <div className="row g-4 learn-course-grid">{(popular.length ? popular.slice(0, 3) : featured).map((course) => <div className="col-12 col-md-6 col-xl-4" key={course._id}><CourseCard course={course} /></div>)}</div> : <div className="learn-course-empty">{loading ? "Loading courses…" : "Popular courses will appear here when available in the catalog."}</div>}
        </div>
      </section>

      <div className="learn-popular-more"><Link to="/courses">Explore all courses <ArrowRight size={17} /></Link></div>

      <Testimonials />

      <section className="learn-why">
        <div className="learn-home-container learn-why__inner">
          <div><span className="learn-eyebrow">WHY LEARNSMART</span><h2>A thoughtful way to learn, built around your goals.</h2><p>Find clear course details, follow a structured path, and keep learning in one place.</p><Link className="learn-button" to="/courses">Explore the catalog <ArrowRight size={16} /></Link></div>
          <div className="learn-why__points"><article><span><MonitorPlay size={21} /></span><div><h3>Learn on your schedule</h3><p>Access lessons through your LearnSmart account.</p></div></article><article><span><ShieldCheck size={21} /></span><div><h3>Know what you’re choosing</h3><p>See course and certificate pricing before checkout.</p></div></article><article><span><Sparkles size={21} /></span><div><h3>Keep building momentum</h3><p>Choose a short lesson or a more complete learning path.</p></div></article></div>
        </div>
      </section>

      <section className="learn-steps"><div className="learn-home-container"><SectionHeading eyebrow="YOUR LEARNING JOURNEY" title="Three steps to your next skill" description="A clear path from curiosity to confident, career-ready skills."/><div className="learn-steps__grid"><article><b>01</b><h3>Choose a course</h3><p>Find a subject that fits your goals and experience.</p></article><article><b>02</b><h3>Learn at your pace</h3><p>Work through structured lessons on your schedule.</p></article><article><b>03</b><h3>Earn your certificate</h3><p>Complete your course and celebrate your progress.</p></article></div></div></section>

      <section className="learn-stories"><div className="learn-home-container"><SectionHeading eyebrow="STUDENT STORIES" title="Small steps. Big momentum." description="Join learners building skills for what comes next."/><div className="learn-stories__grid"><article><div>★★★★★</div><p>“A clear, practical way to build skills I can use at work.”</p><strong>LearnSmart learner</strong><span>Career development</span></article><article><div>★★★★★</div><p>“I could fit learning around my schedule and keep moving forward.”</p><strong>LearnSmart learner</strong><span>Flexible learning</span></article><article><div>★★★★★</div><p>“The course structure helped me turn a new interest into real progress.”</p><strong>LearnSmart learner</strong><span>New skills</span></article></div></div></section>

      <section className="learn-final-cta"><div className="learn-final-cta__inner"><span>YOUR NEXT CHAPTER STARTS HERE</span><h2>Ready to build your future?</h2><p>Find your next course and start learning today.</p><Link to="/courses">Explore courses <ArrowRight size={17}/></Link></div></section>

      <section className="learn-instructor-cta"><div className="learn-instructor-cta__inner"><span><UsersRound size={25} /></span><div><small>TEACH WITH LEARNSMART</small><h2>Share your knowledge with future learners</h2><p>Get in touch with our team to discuss teaching a course.</p></div><Link to="/contact">Become an instructor <ArrowRight size={16} /></Link></div></section>

    </>
  );
}

function Testimonials() {
  return (
    <section className="learn-testimonials" id="testimonials">
      <div className="learn-home-container"><SectionHeading eyebrow="STUDENT STORIES" title="Made for curious minds" description="Learner feedback will appear here as students share their course experiences." />
        <div className="learn-course-empty">Verified student testimonials will be shown here when real feedback is available.</div>
      </div>
    </section>
  );
}
