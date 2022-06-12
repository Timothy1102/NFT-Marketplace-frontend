import React, { useState, useEffect } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../assets/data/data";

import Relevant from "../components/ui/Relevant-section/Relevant";

import "../styles/nft-details.css";

import { Link } from "react-router-dom";

import Modal from "../components/ui/Modal/Modal";

// import { Modal, Button } from 'antd';

const NftDetails = () => {
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [singleNft, setSingleNft] = useState("this is it");

  useEffect(async () => {
      let nft = await window.contractNFT.nft_token({
        token_id: id
      });
      // setSingleNft(data);
      let data = "changed to this"
      console.log("nft: ", data)
  });

  let data = "changed to this"
  console.log("nft: ", data)
  // let nft = window.contractNFT.nft_token({token_id: id.toString()});
    // setSingleNft(nft);
    // setSingleNft("changed it");
    // let dataNew =  Promise.all(nft);
    // console.log("log: ", nft)

  // useEffect(async () => {
  //   let nft =  window.contractNFT.nft_token({token_id: id.toString()});
  //   // setSingleNft(nft);
  //   setSingleNft("changed it");
  //   console.log("log: ", nft)
  // }, []);

  // console.log("nft: ", singleNft)
    // console.log("id: ", id.toString())
  // const singleNft = NFT__DATA.find((item) => item.id === id);

  return (
    <>
      {/* <CommonSection title={singleNft.title} /> */}
      <CommonSection title="title" />

      {/* <section style={{paddingTop: 30}}>
        <Container>
          <Row>
            <Col lg="8" md="12" sm="12" style={{marginLeft: 'auto', marginRight: 'auto'}}>
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
                  <div className="creator__img">
                    <img src={singleNft.creatorImg} alt="" className="w-100" />
                  </div>

                  <div className="creator__detail">
                    <p>Owner</p>
                    <h6>{singleNft.creator}</h6>
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
                  {singleNft.currentBid}
                </h1>
                <h4
                  style={{ color: "gray", display: "inline", marginLeft: 15 }}
                >
                  NEAR
                </h4>

                <div style={{marginTop: 50}}>
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
                  <i class="ri-shopping-cart-line"></i>  Offer
                  </button>
                  {showModal && <Modal setShowModal={setShowModal} />}
                </div>

                <div style={{ border: "0.2px solid #ffa500", borderRadius: 20, marginTop: 130, paddingLeft: 40, paddingRight: 40}}>
                  <h5 style={{ color: "white", marginTop: 30 }}>Brief</h5>
                  <p className="my-4">{singleNft.desc}</p>
                  <p style={{display: "inline"}}>Tags:  </p>
                  <p style={{display: "inline", color: "cyan" }}> {singleNft.tags}</p>
                </div>

                <div style={{ marginTop: 40, border: "0.2px solid #ffa500", borderRadius: 20, paddingLeft: 40, paddingRight: 40 }}>
                  <h5 style={{ color: "white", marginTop: 30 }}>Description</h5>
                  <p>{singleNft.desc}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}

      <hr style={{color: 'white'}} />

      <div >
      <Relevant />
      </div>
    </>
  );
};

export default NftDetails;
