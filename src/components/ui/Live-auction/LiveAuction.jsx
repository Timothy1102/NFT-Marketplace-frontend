import React, {useEffect, useState} from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import MyNftCard from "../My-nft-card/MyNftCard";
import NftCard from "../Nft-card/NftCard";
import "./live-auction.css";

const LiveAuction = () => {

  const [data, setData] = useState([]); 

  useEffect(async () => {
    try {
      let data = await window.contractMarket.get_sales(
        {
          from_index: 0,
          limit: 8
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
      console.log("Data market: ", dataNew);
      setData(dataNew);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__auction__top d-flex align-items-center justify-content-between ">
              <h3>Most Popular</h3>
              <span>
                <Link to="/market">Explore more</Link>
              </span>
            </div>
          </Col>

          {data.map((item) => (
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
  );
};

export default LiveAuction;
