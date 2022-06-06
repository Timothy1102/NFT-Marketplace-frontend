import React from "react";

import "./common-section.css";

import { Container } from "reactstrap";

const CommonSection = ({ title }) => {
  return (
    <section className="common__section">
      <Container className="text-center">
        <h2 style={{ color: 'orange'}}>{title}</h2>
      </Container>
    </section>
  );
};

export default CommonSection;
