import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../assets/data/data";

import LiveAuction from "../components/ui/Live-auction/LiveAuction";

import "../styles/nft-details.css";

import { Link } from "react-router-dom";

const NftDetails = () => {
  const { id } = useParams();

  const singleNft = NFT__DATA.find((item) => item.id === id);

  return (
    <>
      <CommonSection title={singleNft.title} />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img
                src={singleNft.imgUrl}
                alt=""
                className="w-100 single__nft-img"
              />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2 style={{color:'white'}}>{singleNft.title}</h2>

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
                      <i class="ri-send-plane-line"></i>
                    </span>
                    <span>
                      <i class="ri-more-2-line"></i>
                    </span>
                  </div>
                </div>

                <div className="nft__creator d-inline-flex gap-3 align-items-center" style={{display: 'inline'}}>
                  <div className="creator__img">
                    <img src={singleNft.creatorImg} alt="" className="w-100" />
                  </div>

                  <div className="creator__detail">
                    <p>Created By</p>
                    <h6>{singleNft.creator}</h6>
                  </div>
                </div>

                <h1 style={{color: 'white', display: 'inline', marginLeft: 70, marginTop: 100}}>{singleNft.currentBid}</h1>
                <h4 style={{color: 'gray', display: 'inline', marginLeft: 15}}>NEAR</h4>

                <p className="my-4">{singleNft.desc}</p>
                <button className="singleNft-btn d-inline-flex align-items-center gap-2 w-30">
                  <i class="ri-shopping-bag-line"></i>
                  <Link to="/wallet">Clone</Link>
                  {/* <h6>{singleNft.currentBid}</h6> */}
                </button>
                <button className="singleNft-btn d-inline-flex align-items-center gap-2 w-30" style={{marginLeft: 50}}>
                  <i class="ri-shopping-bag-line"></i>
                  <Link to="/wallet">Offer</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <LiveAuction />
    </>
  );
};

export default NftDetails;
