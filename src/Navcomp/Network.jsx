import React, { useRef, useEffect, useState } from "react";
import "./network.css";

function Network(){

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
className={`network-section reveal ${visible ? "show" : ""}`}
>

<div className="network-container">

{/* LEFT CARD */}

<div className="network-left">

<h2>We operate across Tamil Nadu</h2>

<div className="city-grid">

<span>Chennai</span>
<span>Coimbatore</span>

<span>Madurai</span>
<span>Salem</span>

<span>Tiruchirappalli</span>
<span>Erode</span>

<span>Vellore</span>
<span>Tirunelveli</span>

<span>Thoothukudi</span>
<span>Thanjavur</span>

</div>

</div>

{/* RIGHT CARD */}

<div className="network-right">

<h2>TN eMart Local Network</h2>

<p>
TN eMart connects neighborhood shops across Tamil Nadu
with customers through a powerful digital marketplace.
Our platform helps small businesses grow online,
reach nearby customers, and strengthen the local economy.
</p>

<button className="network-btn">
Join as a Shop →
</button>

</div>

</div>

</div>

);

}

export default Network;