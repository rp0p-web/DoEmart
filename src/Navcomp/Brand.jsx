import React, { useRef, useEffect, useState } from "react";
import "./Brand.css";

function Brands(){

const sectionRef = useRef(null);
const [visible,setVisible] = useState(false);

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

return(

<div
ref={sectionRef}
className={`brand-section reveal ${visible ? "show" : ""}`}
>

<div className="brand-container">

{/* LEFT SIDE */}

<div className="brand-left">

<h1>
5000+ <br/> Brands Partnerships
</h1>

<div className="brand-box">
<p>
<b>TN eMart</b> connects local Tamil Nadu shops with customers across the state.
Our platform empowers neighborhood businesses to grow online, reach more
buyers, and strengthen the local economy through digital commerce.
</p>
</div>

</div>

{/* RIGHT SIDE */}

<div className="brand-right">

<p className="brand-sub">
Trusted by local businesses & partners across Tamil Nadu.
</p>

<button className="brand-btn">
Partner With Us →
</button>

<div className="brand-logos">

<div className="logo-card">Textile Shops</div>
<div className="logo-card">Electronics</div>
<div className="logo-card">Groceries</div>
<div className="logo-card">Furniture</div>
<div className="logo-card">Restaurants</div>
<div className="logo-card">Book Stores</div>

</div>

</div>

</div>

</div>

);

}

export default Brands;