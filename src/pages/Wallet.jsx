import React, { useState, useEffect } from "react";
import MyNftCard from "../components/ui/My-nft-card/MyNftCard";
import NftCard from "../components/ui/Nft-card/NftCard";
import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/wallet.css";

const wallet__data = [
  {
    title: "Bitcoin",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium accusamus repellat rerum consequatur explicabo? Reiciendis!",
    icon: "ri-bit-coin-line",
  },

  {
    title: "Coinbase",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium accusamus repellat rerum consequatur explicabo? Reiciendis!",
    icon: "ri-coin-line",
  },

  {
    title: "Metamask",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium accusamus repellat rerum consequatur explicabo? Reiciendis!",
    icon: "ri-money-cny-circle-line",
  },

  {
    title: "Authereum",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium accusamus repellat rerum consequatur explicabo? Reiciendis!",
    icon: "ri-bit-coin-line",
  },
];

const Wallet = () => {
  const [nfts, setNFTs] = useState([]);
  const [sellingNft, setSellingNft] = useState([]);

  useEffect(async () => {
    if (window.accountId) {
      let data = await window.contractNFT.nft_tokens_for_owner({
        account_id: window.accountId,
        from_index: "0",
        limit: 30,
      });
      setNFTs(data);
    }
  }, []);

  useEffect(async () => {
    if (window.accountId) {
      let selling_nft = await window.contractMarket.get_sales({
        from_index: 0,
        limit: 30,
      });
      let use_data = await window.contractMarket.get_uses({
        from_index: 0,
        limit: 30,
      });

      let use_condition = ""

      let mapItemData = selling_nft.map(async item => {
        let useMapData = use_data.map(async use_item => {
          if (use_item.token_id == item.token_id) {
            use_condition = use_item.use_conditions;
          }
        })

        return {
          ...item,
          use_condition,
        }
      });

      let dataNew = await Promise.all(mapItemData);
      setSellingNft(dataNew);
    }
  }, []);

  return (
    <>
      <CommonSection title="My NFTs" />
      <section style={{paddingBottom: 0}}>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <h3 className="trending__title">Selling Items</h3>
            </Col>
            {nfts.map((item) => {
              console.log(item);
              item.is_selling = false;
              sellingNft.map((selling_item) => {
                if (selling_item.token_id == item.token_id) {
                  item.is_selling = true;
                  item.selling_price = selling_item.sale_conditions;
                  item.using_price = selling_item.use_condition;
                }
              })
              return (
                <>
                  {item.is_selling &&
                    (<>
                      <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                        <MyNftCard
                          item={{
                            title: item.metadata.title,
                            id: item.token_id,
                            currentBid: "currentBID",
                            creator: item.owner_id,
                            tags: "selling",
                            desc: item.metadata.description,
                            is_selling: true,
                            selling_price: item.selling_price,
                            using_price: item.using_price
                          }}
                        />
                      </Col> </>)
                  }
                </>
              );
            })}
          </Row>
        </Container>
      </section>

      <section style={{marginTop: 0}}>
        <Container>
          <Row>
          <Col lg="12" className="mb-5">
              <h3 className="trending__title">Other Items</h3>
            </Col>
            {nfts.map((item) => {
              console.log(item);
              item.is_selling = false;
              sellingNft.map((selling_item) => {
                if (selling_item.token_id === item.token_id) {
                  item.is_selling = true;
                  item.selling_price = selling_item.sale_conditions;
                  item.using_price = selling_item.use_condition;
                }
              })
              return (
                <>
                  {(item.is_selling === false) &&
                    (<>
                      <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                        <MyNftCard
                          item={{
                            title: item.metadata.title,
                            id: item.token_id,
                            currentBid: "currentBID",
                            creator: item.owner_id,
                            tags: "selling",
                            desc: item.metadata.description,
                            is_selling: false
                          }}
                        />
                      </Col> </>)
                  }
                </>
              );
            })}

            <div></div><br />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Wallet;
