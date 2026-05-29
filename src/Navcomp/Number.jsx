import React, { useEffect, useRef, useState } from "react";
import "./Number.css";

function Stats(){

const sectionRef = useRef(null);
const [visible,setVisible] = useState(false);

const [shops,setShops] = useState(0);
const [cities,setCities] = useState(0);
const [customers,setCustomers] = useState(0);
const [orders,setOrders] = useState(0);

useEffect(()=>{

const observer = new IntersectionObserver(
(entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
setVisible(true);
startCounters();
}
});
},
{
threshold:0.2
}
);

if(sectionRef.current){
observer.observe(sectionRef.current);
}

return ()=>observer.disconnect();

},[]);

const startCounters = () => {

animateValue(0,5000,setShops,2000);
animateValue(0,50,setCities,2000);
animateValue(0,100000,setCustomers,2000);
animateValue(0,25000,setOrders,2000);

};

const animateValue = (start,end,setter,duration) => {

let startTime = null;

const step = (currentTime)=>{

if(!startTime) startTime = currentTime;

const progress = Math.min((currentTime-startTime)/duration,1);

setter(Math.floor(progress*(end-start)+start));

if(progress < 1){
requestAnimationFrame(step);
}

};

requestAnimationFrame(step);

};

return(

<div
ref={sectionRef}
className={`stats-section reveal ${visible ? "show" : ""}`}
>

<p className="stats-tag">TN eMart in Numbers</p>

<h1 className="stats-title">
Empowering local businesses <br/>
across Tamil Nadu
</h1>

<div className="stats-grid">

<div className="stat-box">
<h2>{shops.toLocaleString()}+</h2>
<p>Local shops registered on TN eMart</p>
</div>

<div className="stat-box">
<h2>{customers.toLocaleString()}+</h2>
<p>Customers using the platform</p>
</div>

<div className="stat-box">
<h2>{cities}+</h2>
<p>Cities across Tamil Nadu connected</p>
</div>

<div className="stat-box">
<h2>{orders.toLocaleString()}+</h2>
<p>Orders placed through TN eMart</p>
</div>

</div>

</div>

);

}

export default Stats;