import { useRef } from 'react';
import { ArrowLeft, ArrowRight, Box, Camera, Monitor, Printer } from 'lucide-react';
import './CoursePromoBanners.css';

const banners = [
  {
    className: 'design',
    label: 'Learn Design',
    eyebrow: 'from',
    title: 'lmscourses',
    note: '6 new lessons',
    art: <div className="promo-monitor"><Monitor aria-hidden="true" /><Box aria-hidden="true" /></div>,
  },
  {
    className: 'print',
    label: 'Print Fever',
    eyebrow: 'Ad design packaging',
    title: 'Branding · Illustration',
    art: <div className="promo-print-art"><Printer aria-hidden="true" /><span className="promo-ink promo-ink-orange" /><span className="promo-ink promo-ink-dark" /><span className="promo-ink promo-ink-yellow" /></div>,
  },
  {
    className: 'photo',
    label: 'Photography Courses',
    eyebrow: 'Special training included with this package',
    title: 'Starts from $15.00',
    note: '20% off',
    art: <div className="promo-camera"><Camera aria-hidden="true" /></div>,
  },
];

export default function CoursePromoBanners() {
  const trackRef = useRef(null);
  const scroll = (direction) => trackRef.current?.scrollBy({ left: direction * 330, behavior: 'smooth' });

  return (
    <div className="course-promos" aria-label="Featured learning offers">
      <div className="course-promos-controls">
        <button type="button" aria-label="Previous offers" onClick={() => scroll(-1)}><ArrowLeft size={18} /></button>
        <button type="button" aria-label="Next offers" onClick={() => scroll(1)}><ArrowRight size={18} /></button>
      </div>
      <div className="course-promos-track" ref={trackRef}>
        {banners.map((banner) => (
          <article className={`course-promo course-promo-${banner.className}`} key={banner.className}>
            <div className="course-promo-art">{banner.art}</div>
            <div className="course-promo-copy">
              <span className="course-promo-eyebrow">{banner.eyebrow}</span>
              <h3>{banner.label}</h3>
              <p>{banner.title}</p>
              {banner.note && banner.className !== 'photo' && <span className="course-promo-note">{banner.note}</span>}
            </div>
            {banner.className === 'photo' && <span className="course-promo-discount">{banner.note}</span>}
          </article>
        ))}
      </div>
    </div>
  );
}
