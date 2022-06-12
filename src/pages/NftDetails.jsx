import React, { useState, useEffect } from "react";
import {utils} from "near-api-js"
import CommonSection from "../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import Relevant from "../components/ui/Relevant-section/Relevant";

import "../styles/nft-details.css";

import { Link } from "react-router-dom";

import Modal from "../components/ui/Modal/Modal";

const NftDetails = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [singleNft, setSingleNft] = useState();
  const [selling_price, setSellingPrice] = useState("")
  const [using_price, setUsingPrice] = useState("")

  useEffect(async () => {
    let nft = await window.contractNFT.nft_token({
      token_id: id,
    });
    setSingleNft(nft);
  }, []);

  useEffect(async () => {
    try {
      let data = await window.contractMarket.get_sales({
        from_index: 0,
        limit: 20,
      });
      let use_data = await window.contractMarket.get_uses({
        from_index: 0,
        limit: 20,
      });
      data.map(async (item) => {
        use_data.map(async (use_item) => {
          if ((use_item.token_id == item.token_id) & (item.token_id == id)) {
            const sale = utils.format.formatNearAmount(item.sale_conditions);
            const use = utils.format.formatNearAmount(use_item.use_conditions);
            setSellingPrice(sale);
            setUsingPrice(use);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      {(singleNft !== undefined) &&
        (<>
          <CommonSection title={singleNft.metadata.title} />
          <section style={{ paddingTop: 30 }}>
        <Container>
          <Row>
            <Col
              lg="8"
              md="12"
              sm="12"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              <div className="single__nft__content">
                <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
                  <div className=" d-flex align-items-center gap-4 single__nft-seen">
                    <span>
                      <i class="ri-eye-line"></i> 234
                    </span>
                    <span>
                      <i class="ri-heart-line"></i> 123
                    </span>
                  </div>

                  <div className=" d-flex align-items-center gap-2 single__nft-more">
                    <span>
                      <i class="ri-global-line"></i>
                    </span>
                    <span>
                      <i class="ri-send-plane-line"></i>
                    </span>
                    <span>
                      <i class="ri-more-2-line"></i>
                    </span>
                  </div>
                </div>

                <div
                  className="nft__creator d-inline-flex gap-3 align-items-center"
                  style={{ display: "inline" }}
                >

                  <div className="creator__detail">
                    <p>Owner</p>
                    <h6>{singleNft.owner_id}</h6>
                  </div>
                </div>

                <h1
                  style={{
                    color: "white",
                    display: "inline",
                    marginLeft: 70,
                    marginTop: 100,
                  }}
                >
                  {selling_price}
                </h1>
                <h4
                  style={{ color: "gray", display: "inline", marginLeft: 15 }}
                >
                  NEAR
                </h4>

                <h1
                  style={{
                    color: "white",
                    display: "inline",
                    marginLeft: 70,
                    marginTop: 100,
                  }}
                >
                  {using_price}
                </h1>
                <h4
                  style={{ color: "gray", display: "inline", marginLeft: 15 }}
                >
                  NEAR
                </h4>

                <div style={{ marginTop: 50 }}>
                  <button
                    className="singleNft-btn d-inline-flex align-items-center gap-2 w-30"
                    style={{ float: "left", marginLeft: 300, color: "white" }}
                  >
                    <i class="ri-download-line"></i>Clone
                  </button>

                  <button
                    className="singleNft-btn d-inline-flex align-items-center gap-2 w-30"
                    style={{ float: "right", marginRight: 300, color: "white" }}
                    onClick={() => setShowModal(true)}
                  >
                    <i class="ri-shopping-cart-line"></i> Offer
                  </button>
                  {showModal && <Modal setShowModal={setShowModal} />}
                </div>

                <div
                  style={{
                    border: "0.2px solid #ffa500",
                    borderRadius: 20,
                    marginTop: 130,
                    paddingLeft: 40,
                    paddingRight: 40,
                  }}
                >
                  <h5 style={{ color: "white", marginTop: 30 }}>Brief</h5>
                  <p className="my-4">{singleNft.metadata.description}</p>
                  <p style={{ display: "inline" }}>Tags: </p>
                  <p style={{ display: "inline", color: "cyan" }}>
                    {" "}
                    {/* {singleNft.tags} */}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: 40,
                    border: "0.2px solid #ffa500",
                    borderRadius: 20,
                    paddingLeft: 40,
                    paddingRight: 40,
                  }}
                >
                  <h5 style={{ color: "white", marginTop: 30 }}>Description</h5>
                  <p>{singleNft.metadata.description}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
         </>)
      }

      <hr style={{ color: "white" }} />

      <div>{/* <Relevant /> */}</div>
    </>
  );
};

export default NftDetails;
