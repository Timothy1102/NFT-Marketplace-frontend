import React from "react";

import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import img from "../assets/images/img-01.jpg";
import avatar from "../assets/images/ava-01.png";

import "../styles/create-item.css";

const item = {
  id: "01",
  title: "Staking Contract",
  desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
  imgUrl: img,
  creator: "Trista Francis",
  creatorImg: avatar,
  currentBid: 7.89,
};

const List = () => {
  return (
    <>
      <CommonSection title="List your Smart Contract on the Marketplace" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview</h5>
              <NftCard item={item} />
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <form className="form">
                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input type="text" placeholder="Enter title" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    <input type="file" className="upload__input" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Cloning price</label>
                    <input
                      type="number"
                      placeholder="Enter the price for cloning (NEAR)"
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Selling price</label>
                    <input type="number" placeholder="Enter the price for someone to take over your smart contract (NEAR)" />
                  </div>

                  {/* <div className=" d-flex align-items-center gap-4">
                    <div className="form__input w-50">
                      <label htmlFor="">Starting Date</label>
                      <input type="date" />
                    </div>

                    <div className="form__input w-50">
                      <label htmlFor="">Expiration Date</label>
                      <input type="date" />
                    </div>
                  </div> */}

                  <div className="form__input">
                    <label htmlFor="">brief description</label>
                    <textarea
                      name=""
                      id=""
                      rows="2"
                      placeholder="Enter brief description"
                      className="w-100"
                    ></textarea>
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      rows="10"
                      placeholder="Enter description"
                      className="w-100"
                    ></textarea>
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Tags</label>
                    <textarea
                      name=""
                      id=""
                      rows="1"
                      placeholder="Enter tags"
                      className="w-100"
                    ></textarea>
                  </div>

                  <button
                    className="btn d-flex gap-2 align-items-center" style={{ color: 'white'}} >
                    List
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default List;
