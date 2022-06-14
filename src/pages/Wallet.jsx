import React, { useState, useEffect } from "react";
import MyNftCard from "../components/ui/My-nft-card/MyNftCard";
import NftCard from "../components/ui/Nft-card/NftCard";
import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/wallet.css";

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

  console.log("my nft: ", nfts)

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
        let itemData = await window.contractNFT.nft_token({ token_id: item.token_id });
        let useMapData = use_data.map(async use_item => {
          if (use_item.token_id == item.token_id) {
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
      setSellingNft(dataNew);
      // console.log("selling nft: ", sellingNft)
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
              console.log("sellingNft: ", sellingNft);
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
                      <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                        <MyNftCard
                          item={{
                            title: item.metadata.title,
                            id: item.token_id,
                            creator: item.owner_id,
                            tags: item.metadata.extra,
                            desc: item.metadata.description,
                            is_selling: true,
                            selling_price: item.selling_price,
                            using_price: item.using_price,
                            imgUrl: item.metadata.media
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

      <section style={{paddingBottom: 0}}>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <h3 className="trending__title">Using Items</h3>
            </Col>
            {sellingNft.map((item) => {
                if (item.itemData.users.includes(window.accountId)) {
                  item.selling_price = item.sale_conditions;
                  item.using_price = item.use_condition;
                  return (
                    <>
                      <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                        <NftCard
                          item={item}
                        />
                      </Col>
                    </>
                  )
                }
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
                      <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                        <MyNftCard
                          item={{
                            title: item.metadata.title,
                            id: item.token_id,
                            creator: item.owner_id,
                            tags: item.metadata.extra,
                            desc: item.metadata.description,
                            is_selling: false,
                            imgUrl: item.metadata.media
                          }}
                        />
                      </Col> 
                      </>)
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
