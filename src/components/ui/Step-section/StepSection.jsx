import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./step-section.css";

const STEP__DATA = [
  {
    title: "DnD Smart Contract",
    desc: "Creating your own Smart Contract has never been easier with Drag & Drop interface.",
    icon: "ri-drag-drop-line",
  },

  {
    title: "Mint your NFTs/dApps",
    desc: "Mint NFTs that associated with your Smart Contract/dApps.",
    icon: "ri-hammer-line",
  },

  {
    title: "List them for sale",
    desc: "Make money by listing your dApps on our Marketplace so that everyone can use or buy them.",
    icon: "ri-money-dollar-circle-line",
  },

  {
    title: "Use/Buy other dApps",
    desc: "Browse dApps developed by our community that fit your needs.",
    icon: "ri-shopping-cart-line",
  },
];

const StepSection = () => {
  return (
    <section style={{padding: "10px 0px"}}>
      <Container>
        <Row>
          <Col lg="12" className="mb-4">
            <h3 className="step__title">Features</h3>
          </Col>

          {STEP__DATA.map((item, index) => (
            <Col lg="3" md="4" sm="6" key={index} className=" mb-4">
              <div className="single__step__item">
                <span>
                  <i className={item.icon}></i>
                </span>
                <h5>
                  {item.title}
                </h5>
                <div className="step__item__content">
                  <p className="mb-0">{item.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default StepSection;
