import React, { useState } from "react";
import { Link } from "react-router-dom";
import { utils } from "near-api-js";
import "./my-nft-card.css";
import ModalTransferNft from "../Modal-transfer-nft/ModalTransferNFT";
import ModalListNft from "../Modal-list-nft/ModalListNFT";
import getConfig from '../../../config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

const MyNftCard = (props) => {
  const {
    title,
    id,
    currentBid,
    creatorImg,
    imgUrl,
    creator,
    tags,
    desc,
    is_selling,
    selling_price,
    using_price,
  } = props.item;

  const nft_contract_id = nearConfig.nftContractName;
  const [showModal, setShowModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  async function removeSale(nft_contract_id, token_id) {
    try {
      await window.contractMarket.remove_sale(
        {
          nft_contract_id: nft_contract_id,
          token_id: token_id,
        },
        30000000000000,
        1
      );
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  function handelCancel() {
    removeSale(nft_contract_id, id)
  }

  return (
    <div
      className="single__nft__card"
      // style={{ height: 460, border: "0.3px solid #5142fc" }}
    >
      {/* <div className="nft__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div> */}

      <div className="nft__content">
        <h5 className="nft__title" style={{ display: "inline" }}>
          <Link style={{ color: "orange" }} to={`/market/${id}`}>
            {title}
            <span style={{ color: "gray", fontSize: "small" }}> #{id}</span>
          </Link>
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__info w-100 d-flex align-items-center justify-content-between gap-3">
            <div>
              <h6>Owner</h6>
              <p style={{ color: "#b3acab" }}>{creator}</p>
            </div>

            <br />

            <div>
              <div
                className="d-flex align-items-center gap-1 single__nft-seen"
                style={{ marginBottom: 8 }}
              >
                <span>
                  <i class="ri-eye-line"></i> 234
                </span>
                <span>
                  <i class="ri-heart-line"></i> 123
                </span>
                <span className="justify-content-between">
                  <i class="ri-download-fill"></i> 13
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="contract_des"
        style={{
          height: 200,
          border: "0.3px solid #ffa500",
          padding: "5px 10px",
          marginTop: 10,
          borderRadius: 20,
        }}
      >
        <p style={{ height: 200, color: "#c7bfbf", fontSize: 15 }}>{desc}</p>
      </div>

      <div className="tags" style={{ marginTop: 4 }}>
        <p style={{ display: "inline", color: "gray" }}>Tags: </p>
        <p style={{ display: "inline", fontSize: 15, color: "#40a9ff" }}>
          {tags}
        </p>
      </div>

      {is_selling && (
        <div
          className="creator__info-wrapper d-flex gap-3"
          style={{ marginTop: 10 }}
        >
          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Selling price</h6>
              <p>{utils.format.formatNearAmount(selling_price)} NEAR</p>
            </div>
            <div>
              <h6>Using price</h6>
              <p>{utils.format.formatNearAmount(using_price)} NEAR</p>
            </div>
          </div>
        </div>
      )}

      {is_selling ? (
        <div className=" d-inline-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handelCancel}
          >
            <i class="ri-download-line"></i> Cancel
          </button>
        </div>
      ) : (
        <div className=" mt-3 d-inline-flex align-items-center ">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => setShowListModal(true)}
          >
            List
          </button>

          <button
            className="bid__btn d-flex align-items-center gap-1"
            style={{ marginLeft: 40 }}
            onClick={() => setShowModal(true)}
          >
            Transfer
          </button>
          {showModal && (
            <ModalTransferNft setShowModal={setShowModal} token_id={id} />
          )}
          {showListModal && (
            <ModalListNft setShowListModal={setShowListModal} token_id={id} />
          )}
        </div>
      )}
    </div>
  );
};

export default MyNftCard;
