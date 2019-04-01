import React from "react";
import styles from "./styles.module.css";
import { Element } from "react-scroll";

const Popup = props => {
  return (
    <div className={styles.popup}>
      <div className={styles.popup_inner}>
        <Element
          name="test7"
          className="element"
          id="containerElement"
          style={{
            position: "relative",
            height: "200px",
            overflow: "scroll",
            marginBottom: "100px"
          }}
        >
          <Element
            name="firstInsideContainer"
            style={{
              marginBottom: "200px"
            }}
          >
            {" "}
            <button onClick={props.closePopup}>close me</button>
            <h1>{props.text}</h1>
          </Element>

          <Element
            name="secondInsideContainer"
            style={{
              marginBottom: "200px"
            }}
          >
            second element inside container
          </Element>
        </Element>
      </div>
    </div>
  );
};

export default Popup;
