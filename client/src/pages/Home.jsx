import React from "react";
import "../styles/home.css";

export default function Home() {
  return (
    <main className="home">
      {/* Top status/toolbar space is handled by padding in CSS */}
      <header className="home-header">
        <button className="icon-btn" aria-label="Go back">
          {/* back chevron */}
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="titles">
          <h1>Conversational AI</h1>
          <p className="subtitle">
            Practice your voice by chatting with AI. Train your voice where it matters the most
          </p>
        </div>
      </header>

      <section className="cards">
        {/* Card 1 */}
        <article className="card">
          <div className="card-media">
          </div>
          <div className="card-body">
            <h2 className="card-title">Order a Pizza</h2>
            <p className="card-text">
              Lorem ipsum dolor sit amet consectetur. Turpis et leo tincidunt sollicitudin pretium.
              Aliquet phasellus ullamcorper ornare tempor enim ut. Feugiat aliquet fringilla tincidunt
              vivamus.
            </p>
            <button className="btn btn--primary">Select</button>
          </div>
        </article>

        {/* Card 2 */}
        <article className="card">
          <div className="card-media friends">

          </div>
          <div className="card-body">
            <h2 className="card-title">Make a New Friend</h2>
            <p className="card-text">
              Practice small talk and introductions with friendly characters. Build confidence in
              everyday conversations.
            </p>
            <button className="btn btn--primary">Select</button>
          </div>
        </article>
        <article className="card">
          <div className="card-media directions">

          </div>
          <div className="card-body">
            <h2 className="card-title">Ask for Directions</h2>
            <p className="card-text">
                Navigate real-world scenarios by asking for and understanding directions. Improve your
                spatial awareness and problem-solving skills.
            </p>
            <button className="btn btn--primary">Select</button>
          </div>
        </article>
            {/* Card 4 */}
            <article className="card">
          <div className="card-media taxi" />
          <div className="card-body">
            <h2 className="card-title">Chat with taxi driver</h2>
            <p className="card-text">
                Enhance your travel conversations by chatting with a taxi driver. Learn to communicate
                effectively in transit situations.
            </p>
            <button className="btn btn--primary">Select</button>
          </div>
        </article>
      </section>
    </main>
  );
}
