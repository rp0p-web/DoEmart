import React, { useState } from "react";
import CategoryCards from "../catagoryCards";

function ShopCategory() {

  // 🔥 GLOBAL SEARCH
  const [search, setSearch] = useState("");

  const data = [
    {
      title: "Departmental Stores",
      reverse: false
    },
    {
      title: "Medical Stores",
      reverse: true
    },
    {
      title: "Other Shops",
      reverse: false
    }
  ];

  return (
    <div style={{ background: "#0b0b0b", minHeight: "100vh" }}>

      {/* 🔥 SEARCH BAR (TOP ONLY ONE) */}
      <div style={{ textAlign: "center", paddingTop: "30px" }}>
        <input
          type="text"
          placeholder="Search shops by district..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          style={{
            padding: "12px 20px",
            width: "300px",
            borderRadius: "30px",
            border: "none",
            outline: "none",
            fontSize: "14px"
          }}
        />
      </div>

      {/* 🔥 CATEGORY SECTIONS */}
      {data.map((section, index)=>(
        <CategoryCards
          key={index}
          title={section.title}
          reverse={section.reverse}
          search={search}   // 🔥 PASS SEARCH HERE
        />
      ))}

    </div>
  );
}

export default ShopCategory;