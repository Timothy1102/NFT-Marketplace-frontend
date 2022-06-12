import React, { useState } from "react";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { login } from "../../../utils";
import "./nft-card.css";
import {utils} from "near-api-js"
import getConfig from '../../../config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

const NftCard = (props) => {
  // const { title, id, selling_price, creatorImg, imgUrl, creator, tags, desc } =
  //   props.item;

  let item = props.item;

  const creator = props.item.owner_id;
  const id = props.item.token_id;
  const selling_price = props.item.sale_conditions;
  const using_price = props.item.use_condition;
  const title = props.item.itemData.metadata.title;
  const imgUrl = props.item.itemData.metadata.media;
  const desc = props.item.itemData.metadata.description;
  const tags = "near, blockchain";
  const is_selling = props.item.is_selling;
  const is_using = props.item.itemData.users;

  const nft_contract_id = nearConfig.nftContractName;

  function handleBuy() {
    submitBuy(item);
  }

  async function submitBuy(item) {
    console.log(item);
    try {
      if (!window.walletConnection.isSignedIn()) return login();
      let nearBalance = await window.account.getAccountBalance();
      if (nearBalance.available < parseInt(item.sale_conditions.amount)) {
        notification["warning"]({
          message: "You dont have enough NEAR",
          description:
            "your account does not have enough NEAR to purchase this item.",
        });

        return;
      }

      await window.contractMarket.offer(
        {
          nft_contract_id: item.nft_contract_id,
          token_id: item.token_id,
        },
        300000000000000,
        // 1
        item.sale_conditions
      );

      console.log("this is it");
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  function handelUse() {
    submitUse(nft_contract_id, id)
  }


  async function submitUse(nft_contract_id, token_id) {
    try {
      await window.contractMarket.apply_use(
        {
          nft_contract_id: nft_contract_id,
          token_id: token_id,
        },
        300000000000000,
        item.use_condition
      );
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  return (
    <div
      className="single__nft__card"
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
          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Owner</h6>
              <p style={{ color: "#b3acab" }}>{creator}</p>
            </div>

            <br />

          </div>
            <div className="d-flex align-items-center gap-1 single__nft-seen" style={{ marginBottom: 8}}>
              <span>
                <i className="ri-eye-line"></i> 234
              </span>
              <span>
                <i className="ri-heart-line"></i> 123
              </span>
              <span className="justify-content-between">
                <i className="ri-download-fill"></i> 13
              </span>
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

        <p style={{ height: 200, color: "#c7bfbf", fontSize: 15 }}>{desc}</p>
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

      <div className="creator__info-wrapper d-flex gap-3" style={{ marginTop: 10}}>
        <div className="creator__info w-100 d-flex align-items-center justify-content-between">
          <div>
            <h6>Selling price</h6>
            <p>{utils.format.formatNearAmount(selling_price)} NEAR</p>
          </div>
          <div>
            <h6>Using price</h6>
            <p>{utils.format.formatNearAmount(using_price)} NEAR</p>
            {/* <div className="d-inline-flex" style={{color:'gray'}}> NEAR</div> */}
          </div>
        </div>
      </div>

          {is_selling ? 
          (<div className=" d-inline-flex align-items-center justify-content-between">

          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handleBuy}
          >
            <i class="ri-close-circle-line"></i> Cancel
          </button>
        </div>) 
          : 
          (<div className=" d-inline-flex align-items-center justify-content-between">

        <button
          className="bid__btn d-flex align-items-center gap-1"
          onClick={handleBuy}
        >
           Buy
        </button>

        {is_using.includes(window.accountId) ? 
        (<button
          className="bid__btn d-flex btn btn-success"
          style={{ marginLeft: 110, padding: "4px 20px !important", borderRadius: 15}}
        >
          Using
        </button>)
         : 
         (<button
          className="bid__btn d-flex align-items-center gap-1"
          style={{ marginLeft: 90}}
          onClick={handelUse}
        >
          Use
        </button>)
         }
      </div>)
          }
    </div>
  );
};

export default NftCard;
