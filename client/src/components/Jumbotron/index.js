import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 150, clear: "both", paddingTop: 50, textAlign: "center", marginTop: "20px", font: "Lobster Two" }}
      className="jumbotron bg-light shadow-sm mb-7 rounded"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
