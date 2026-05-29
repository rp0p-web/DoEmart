import React, { useRef, useEffect, useState } from "react";
import "./Customer/CategoryCards.css";
import "./Customer/ShopCategory.css";
import { useNavigate } from "react-router-dom";

function CategoryCards({ title, reverse, search }) { // 🔥 receive search as prop

  const trackRef = useRef(null);

  const position = useRef(0);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const autoRef = useRef(null);
  const path = useNavigate();

  const [cards, setCards] = useState([]);

  /* 🔥 FETCH + FILTER BY CATEGORY */
  useEffect(() => {

    fetch(`http://localhost:8080/api/shops?district=${search}`)
      .then(res => res.json())
      .then(data => {

        let filtered = [];

        if (title === "Departmental Stores") {
          filtered = data.filter(shop => shop.category === "Departmental");
        } 
        else if (title === "Medical Stores") {
          filtered = data.filter(shop => shop.category === "Medical");
        } 
        else {
          filtered = data.filter(shop => shop.category === "Other");
        }

        const formatted = filtered.map(shop => ({
          id : shop.id,
          title: shop.shopName,
          text: shop.district || "Nearby shop",
          img: shop.image
        }));

        setCards(formatted);

      });

  }, [title, search]);

  /* AUTO SLIDER */

  const startAuto = () => {
    autoRef.current = setInterval(() => {
      if (!isDragging.current && trackRef.current) {

        position.current += reverse ? 0.4 : -0.4;

        const trackWidth = trackRef.current.scrollWidth / 2;

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
    if (trackRef.current) {
      trackRef.current.style.transform =
        `translate3d(${position.current}px,0,0)`;
    }
  };

  /* DRAG */

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
    <div className="category-block">

      <h2 className="category-title">{title}</h2>

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

        <div className="category-slider" ref={trackRef}>

          {cards.concat(cards).map((card, index) => (

            <div
              className="category-card"
              key={index}
              style={{ backgroundImage:`url(${card.img})` }}
            >

              <div className="category-overlay">
                <h2>{card.title}</h2>
                <p>{card.text}</p>
               <button 
  className="category-btn"
  onClick={() => path(`/shop/${card.id}`)}
>
  View Shop
</button>
              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default CategoryCards;