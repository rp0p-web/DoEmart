import React, { useRef, useEffect, useState } from "react";
import "./Cards.css";

function Cards() {

 const cards = [
  {
    title: "Explore Nearby Shops",
    text: "Discover local shops around you and browse a wide range of products available near your location.",
    img: "https://images.unsplash.com/photo-1607082349566-187342175e2f"
  },
  {
    title: "Get Exclusive Offers",
    text: "Find the best deals and discounts from local shopkeepers and save more on every purchase.",
    img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db"
  },
  {
    title: "Order Easily",
    text: "Place your orders directly from nearby stores without the hassle of visiting physically.",
    img: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae"
  },
  {
    title: "Support Local Businesses",
    text: "Help local shopkeepers grow by shopping from trusted stores in your area.",
    img: "https://images.unsplash.com/photo-1607082352121-fa243f3dde32"
  }
];
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  const position = useRef(0);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const autoRef = useRef(null);

  const [visible, setVisible] = useState(false);

  /* Scroll reveal */
useEffect(()=>{

const observer = new IntersectionObserver(
(entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
setVisible(true);
}
});
},
{
threshold:0.15,
rootMargin:"-80px"
}
);

if(sectionRef.current){
observer.observe(sectionRef.current);
}

return ()=>observer.disconnect();

},[]);

  /* Auto slider motion */

 const startAuto = () => {
  autoRef.current = setInterval(() => {
    if (!isDragging.current && trackRef.current) {

      position.current -= 0.4;

      const trackWidth = trackRef.current.scrollWidth / 2;

      // 🔥 infinite loop reset
      if (Math.abs(position.current) >= trackWidth) {
        position.current = 0;
      }

      updateTransform();
    }
  }, 16);
};
  const stopAuto = () => clearInterval(autoRef.current);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, []);

  const updateTransform = () => {
    if(trackRef.current){
      trackRef.current.style.transform =
        `translate3d(${position.current}px,0,0)`;
    }
  };

  /* Drag */

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e) => {

    if (!isDragging.current) return;

    const dx = e.clientX - startX.current;

    position.current += dx;

    updateTransform();

    startX.current = e.clientX;
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  return (

    <div
      ref={sectionRef}
      className={`creator-section reveal ${visible ? "show" : ""}`}
    >

      <div
        className="slider-wrapper"
        onMouseEnter={stopAuto}
        onMouseLeave={()=>{
          stopDrag();
          startAuto();
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
      >

        <div className="creator-slider" ref={trackRef}>

          {cards.concat(cards).map((card, index) => (

            <div
              className="creator-card"
              key={index}
              style={{ backgroundImage:`url(${card.img})` }}
            >

              <div className="creator-overlay">
                <h2>{card.title}</h2>
                <p>{card.text}</p>
                <button className="apply-btn">Apply now</button>
              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Cards;