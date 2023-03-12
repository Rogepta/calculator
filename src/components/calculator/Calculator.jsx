import React, { useRef, useEffect } from "react";
import "./calculator.css";
import { btns, BTN_ACTIONS } from "./btbConfig";

export const Calculator = () => {
  const btnsRef = useRef(null);
  const expRef = useRef(null);

  useEffect(() => {
    const btns = Array.from(btnsRef.current.querySelectorAll("button"));

    btns.forEach((e) => (e.style.height = e.offsetWidth + "px"));
  }, []);

  const btnClick = (item) => {
    const expDiv = expRef.current;

    if (item.action === BTN_ACTIONS.THEME)
      document.body.classList.toggle("dark");

    if (item.action === BTN_ACTIONS.ADD) {
      addAnimSpan(item.display);
    }
  };

  const addAnimSpan = (content) => {
    const expDiv = expRef.current;
    const span = document.createElement("span");

    span.innerHTML = content;
    span.style.opacity = "0";
    expDiv.appendChild(span);

    const width = span.offsetWidth + "px";
    span.style.width = "0";

    expDiv.parentNode.querySelector(
      "div:last-child"
    ).style.transform = `translateY(${-expDiv.offsetHeight + "px"}) scale(0.4)`;

    setTimeout(() => {
      span.style.opacity = "1";
      span.style.width = width;
    }, 100);
  };

  return (
    <div className="calculator">
      <div className="calculator__result">
        <div ref={expRef} className="calculator__result__exp"></div>
        <div className="calculator__result__exp"></div>
      </div>
      <div ref={btnsRef} className="calculator__btns">
        {btns.map((item, index) => (
          <button
            onClick={() => btnClick(item)}
            key={index}
            className={item.class}
          >
            {item.display}
          </button>
        ))}
      </div>
    </div>
  );
};
