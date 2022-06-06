import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import NftCard from "../Nft-card/NftCard";
import { NFT__DATA } from "../../../assets/data/data.js";

import "./relevant.css";

const Relevant = () => {
  return (
    <section>
      <Container>
        <Row style={{border: "0.3px solid orange", borderRadius: 20, marginTop: 40}}>
          <Col lg="12" className="mb-5">
            <div className="live__auction__top d-flex align-items-center justify-content-between ">
              <h3>Relevant</h3>
              <span>
                <Link to="/market">Explore more</Link>
              </span>
            </div>
          </Col>

          {NFT__DATA.slice(0, 4).map((item) => (
            <Col lg="3" md="4" sm="6" className="mb-4">
              <NftCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Relevant;
