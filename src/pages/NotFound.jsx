import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const NotFound = () => {
  const cardRef = useRef(null);
  const digitsRef = useRef([]);
  digitsRef.current = [];
  const msgRef = useRef(null);
  const btnsRef = useRef([]);
  const illusRef = useRef(null);

  const addDigit = (el) => {
    if (el && !digitsRef.current.includes(el)) digitsRef.current.push(el);
  };
  const addBtn = (el) => {
    if (el && !btnsRef.current.includes(el)) btnsRef.current.push(el);
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(cardRef.current, { y: 30, opacity: 0, duration: 0.6 })
      .from(
        digitsRef.current,
        { scale: 0.6, opacity: 0, rotation: -8, stagger: 0.12, duration: 0.5 },
        "-=0.3"
      )
      .from(msgRef.current, { y: 10, opacity: 0, duration: 0.45 }, "-=0.25")
      .from(btnsRef.current, { y: 12, opacity: 0, stagger: 0.12, duration: 0.45 }, "-=0.25");

    gsap.to(illusRef.current, { y: -8, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" });

    const goHome = btnsRef.current[0];
    if (goHome) {
      const onEnter = () => gsap.to(goHome, { scale: 1.03, boxShadow: "0 8px 30px rgba(88,166,255,0.12)", duration: 0.25 });
      const onLeave = () => gsap.to(goHome, { scale: 1, boxShadow: "none", duration: 0.25 });
      goHome.addEventListener("mouseenter", onEnter);
      goHome.addEventListener("mouseleave", onLeave);
      return () => {
        goHome.removeEventListener("mouseenter", onEnter);
        goHome.removeEventListener("mouseleave", onLeave);
      };
    }
  }, []);

  return (
    <div className="error-page notfound-page">
      <div className="error-card notfound-card" ref={cardRef} role="alert" aria-labelledby="notfound-title">
        <div className="notfound-illus" ref={illusRef} aria-hidden>
          <span>🚀</span>
        </div>

        <div className="notfound-404" aria-hidden>
          <span className="digit" ref={addDigit}>4</span>
          <span className="digit" ref={addDigit}>0</span>
          <span className="digit" ref={addDigit}>4</span>
        </div>

        <h1 id="notfound-title">Page not found</h1>
        <p ref={msgRef} className="notfound-meta">We can’t find the page you’re looking for. It may have been moved or removed.</p>

        <div className="notfound-actions">
          <Link to="/" className="top-nav"><button className="btn" ref={addBtn}>Go Home</button></Link>
          <Link to="/about" className="top-nav"><button className="btn btn-ghost" ref={addBtn}>About</button></Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
