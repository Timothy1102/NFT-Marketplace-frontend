import React, { useState, useEffect } from "react";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import MyNftCard from "../components/ui/My-nft-card/MyNftCard";
import { Container, Row, Col } from "reactstrap";
import {utils} from "near-api-js"

import "../styles/market.css";

const Market = () => {
  const [data, setData] = useState([]);

  const handleCategory = () => { };

  const handleItems = () => { };

  useEffect(async () => {
    try {
      let data = await window.contractMarket.get_sales(
        {
          from_index: 0,
          limit: 30
        }
      );
      let use_data = await window.contractMarket.get_uses(
        {
          from_index: 0,
          limit: 30
        }
      );
      let use_condition = ""
      let mapItemData = data.map(async item => {
        let itemData = await window.contractNFT.nft_token({ token_id: item.token_id });
        let useMapData = use_data.map(async use_item => {
          if (use_item.token_id === item.token_id) {
            use_condition = use_item.use_conditions;
          }
        })
        return {
          ...item,
          itemData,
          use_condition,
        }
      });
      let dataNew = await Promise.all(mapItemData);
      console.log("Data market: ", dataNew);
      setData(dataNew);
    } catch (e) {
      console.log(e);
    }
  }, []);

  // ====== SORTING DATA BY HIGH, MID, LOW RATE =========
  const handleSort = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "high") {
      const filterData = data.filter((item) => parseFloat(utils.format.formatNearAmount(item.use_condition)) >= 5
      );
      setData(filterData);
    }

    if (filterValue === "mid") {
      const filterData = data.filter(
        (item) => parseFloat(utils.format.formatNearAmount(item.use_condition)) >= 3 && parseFloat(utils.format.formatNearAmount(item.use_condition)) < 5
      );
      setData(filterData);
    }

    if (filterValue === "low") {
      const filterData = data.filter(
        (item) => parseFloat(utils.format.formatNearAmount(item.use_condition)) <3
      );
      setData(filterData);
    }
  };

  return (
    <>
      <CommonSection title={"MarketPlace"} />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="market__product__filter d-flex align-items-center justify-content-between">
                <div className="filter__left d-flex align-items-center gap-5">
                  <div className="all__category__filter">
                    <select onChange={handleCategory}>
                      <option>All Categories</option>
                      <option value="art">NFT</option>
                      <option value="music">Staking</option>
                      <option value="domain-name">RUST</option>
                      <option value="virtual-world">AssemblyScript</option>
                      <option value="trending-card">Voting</option>
                      <option value="trending-card">Whitelist</option>
                      <option value="trending-card">Token</option>
                    </select>
                  </div>

                  <div className="all__items__filter">
                    <select onChange={handleItems}>
                      <option>All Items</option>
                      <option value="single-item">Only Backend</option>
                      <option value="bundle">Frontend + Backend</option>
                    </select>
                  </div>
                </div>

                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option>Sort By</option>
                    <option value="latest">Latest</option>
                    <option value="high">High Price</option>
                    <option value="mid">Mid Price</option>
                    <option value="low">Low Price</option>
                  </select>
                </div>
              </div>
            </Col>

            {data?.map((item) => (
              ((item.owner_id !== window.accountId) ? 
                (
                  <>
                    <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                      <NftCard item={item} />
                    </Col>
                  </>
                )
                :
                (
                  <>
                    <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                        <MyNftCard
                          item={{
                            title: item.itemData.metadata.title,
                            id: item.token_id,
                            creator: item.owner_id,
                            tags: item.itemData.metadata.extra,
                            desc: item.itemData.metadata.description,
                            is_selling: true,
                            selling_price: item.sale_conditions,
                            using_price: item.use_condition,
                            imgUrl: item.itemData.metadata.media,
                          }}
                        />
                    </Col> 
                  </>
                )
              )
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Market;
