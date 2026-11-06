export default function Hero3D() {
  return (
    <div className="hero-3d-art" role="img" aria-label="Animated 3D books and a graduation cap">
      <span className="hero-3d-glow" />
      <span className="hero-3d-orbit hero-3d-orbit--one" />
      <span className="hero-3d-orbit hero-3d-orbit--two" />
      <div className="hero-3d-scene">
        <div className="hero-book hero-book--green"><span className="hero-book-cover"><i /><b /></span></div>
        <div className="hero-book hero-book--gold"><span className="hero-book-cover"><i /><b /></span></div>
        <div className="hero-book hero-book--coral"><span className="hero-book-cover"><i /><b /></span></div>
        <div className="hero-cap">
          <span className="hero-cap-top" />
          <span className="hero-cap-base" />
          <span className="hero-cap-tassel" />
        </div>
      </div>
      <span className="hero-3d-pill hero-3d-pill--learn">LEARN</span>
      <span className="hero-3d-pill hero-3d-pill--grow">GROW</span>
      <span className="hero-3d-star hero-3d-star--one" />
      <span className="hero-3d-star hero-3d-star--two" />
    </div>
  );
}
