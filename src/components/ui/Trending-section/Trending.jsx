import React, {useState, useEffect} from "react";
import { Container, Row, Col } from "reactstrap";


import "./trending.css";

import NftCard from "../Nft-card/NftCard";

const Trending = () => {

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
            <h3 className="trending__title">Trending</h3>
          </Col>

          {data.map((item) => (
            <Col lg="3" md="4" sm="6" key={item.token_id} className="mb-4">
              <NftCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Trending;
