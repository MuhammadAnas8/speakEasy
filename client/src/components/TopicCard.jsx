import React from 'react';
import "../styles/home.css";

const TopicCard = ({ title, text, bgImage }) => {
  return (
    <article className="card">
      <div
        className="card-media"
        style={{ background: `url(${bgImage}) center/cover  no-repeat` }}
      />
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{text}</p>
        <button className="btn btn--primary">Select</button>
      </div>
    </article>
  );
};

export default TopicCard;
