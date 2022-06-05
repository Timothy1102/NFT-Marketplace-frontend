import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./nft-card.css";

const NftCard = (props) => {
  const { title, id, currentBid, creatorImg, imgUrl, creator, tags } =
    props.item;

  return (
    <div className="single__nft__card" style={{ height: 430, border: "0.3px solid #5142fc",}}>
      {/* <div className="nft__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div> */}

      <div className="nft__content">
        <h5 className="nft__title" style={{ display: "inline" }}>
          <Link style={{ color: "orange" }} to={`/market/${id}`}>
            {title}
          </Link>
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Owner</h6>
              <p style={{ color: "#b3acab" }}>{creator}</p>
              {/* <h6>{creator}</h6> */}
            </div>

            <div>
              <h6>Price</h6>
              <p>{currentBid} NEAR</p>
              {/* <div className="d-inline-flex" style={{color:'gray'}}> NEAR</div> */}
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
        {/* <img src={imgUrl} alt="" className="w-100" /> */}

        <p style={{ height: 200, color: "#c7bfbf", fontSize: 15 }}>
          - This contract can: ... <br />
          - Useful for: ... <br />
          - Note: ... <br />
          ...
        </p>
      </div>

      <div className="tags" style={{ marginTop: 4 }}>
        <p style={{ display: "inline", color: "gray" }}>Tags: </p>
        <p style={{ display: "inline", fontSize: 15, color: "#40a9ff" }}>
          {tags}
        </p>
        {/* {(typeof(tags) === "object") &&
            (tags.map(item => {
              return (
                <p style={{display: 'inline', fontSize: 15, color: '#40a9ff'}}>{item}, </p>
                // <Tag color="blue">{item}</Tag>
              )
            }) 
          ) } */}
      </div>

      <div
          className="d-flex align-items-center gap-1 single__nft-seen"
        >
          <span>
            <i class="ri-eye-line"></i> 234
          </span>
          <span >
            <i class="ri-heart-line"></i> 123
          </span>
          <span className="justify-content-between">
            <i class="ri-download-fill"></i> 13
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z" fill="rgba(220,167,167,1)"/></svg> 13 */}
          </span>
        </div>

      <div className=" mt-3 d-inline-flex align-items-center " >
        <button
          className="bid__btn d-flex align-items-center gap-1"
        >
          {/* <i class="ri-shopping-bag-line"></i> Clone */}
          <i class="ri-download-line"></i> Clone
        </button>
      </div>

    </div>
  );
};

export default NftCard;
