import React, { useRef, useEffect, useState } from "react";
import "./Footer.css";

function Footer(){

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
threshold:0.2
}
);

if(sectionRef.current){
observer.observe(sectionRef.current);
}

return ()=>observer.disconnect();

},[]);

return(

<footer
ref={sectionRef}
className={`footer reveal ${visible ? "show" : ""}`}
>

<div className="footer-container">

{/* LEFT */}

<div className="footer-brand">

<h2>TN eMart</h2>

<p>
Connecting local shops across Tamil Nadu with customers
through a powerful digital marketplace.
</p>

</div>

{/* LINKS */}

<div className="footer-links">

<h4>Quick Links</h4>

<ul>
<li>Home</li>
<li>Shops</li>
<li>Become a Seller</li>
<li>Contact</li>
</ul>

</div>

{/* SERVICES */}

<div className="footer-links">

<h4>Services</h4>

<ul>
<li>Local Shopping</li>
<li>Digital Storefront</li>
<li>Delivery Partners</li>
<li>Business Growth</li>
</ul>

</div>

{/* CONTACT */}

<div className="footer-links">

<h4>Contact</h4>

<ul>
<li>Email: support@tnemart.com</li>
<li>Phone: +91 9876543210</li>
<li>Tamil Nadu, India</li>
</ul>

</div>

</div>

<div className="footer-bottom">

<p>© 2026 TN eMart. All rights reserved.</p>

</div>

</footer>

);

}

export default Footer;