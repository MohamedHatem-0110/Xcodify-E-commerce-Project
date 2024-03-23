import React from "react";

const Section = ({ title }) => {
  return (
    <section className="flex-col">
      <h1 className="font-bold text-3xl">{title}</h1>
      <div className="grid grid-cols-3 gap-5 md:grid-cols-4">
        <div>2</div>
        <div>2</div>
        <div>1</div>
        <div>2</div>
        <div>1</div>
        <div>2</div>
        <div>1</div>
        <div>2</div>
      </div>
    </section>
  );
};

export default Section;
