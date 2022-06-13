import React from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import img from "../assets/images/img-01.jpg";
import avatar from "../assets/images/ava-01.png";
import { utils } from "near-api-js";
import "../styles/create-item.css";
// import { NFTStorage} from 'nft.storage';
import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'
import 'dotenv/config'

// const API_TOKEN = process.env.API_TOKEN;
const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYwMTQzZDA5RUI1MzQ4NzJGNDRiMTNCRDdlYjVDNDkyRjVBNjdEMDkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NDc4NTMzMTE1MiwibmFtZSI6Im5mdC10ZXN0In0.njpcXLyShGZJVQrnafDviw8JFpeOREU4-fSe3eEk3DI";

const item = {
  id: "01",
  title: "Staking Contract",
  desc: " repellat eum earum sint.",
  imgUrl: img,
  creator: "Trista Francis",
  creatorImg: avatar,
  currentBid: 7.89,
};

const Mint = () => {

  async function mintNFT() {
    document.getElementById("loading").style.visibility = "visible";

    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    const tags = document.getElementById("tags").value;
    const file = document.querySelector('input[type="file"]');
    if (!file.files.length) return console.log("No files selected");
    const storage = new NFTStorage({ token: API_TOKEN });
    // store img in IPFS storage
    try {
      const metadata = await storage.store({
        name: title,
        description: desc,
        image: file.files[0],
      });

      const imgUrl = metadata.embed().image.href
      const d = new Date();
      let id = d.getTime();
      const owner = window.accountId;
      try {
        await window.contractNFT.nft_mint(
          {
            token_id: id.toString(),
            metadata: {
              title: title,
              description: desc,
              media: imgUrl,
              extra: tags,
            },
            receiver_id: window.accountId,
            // perpetual_royalties: {
            //   owner: royalties
            // }
          },
          300000000000000, // attached GAS (optional)
          utils.format.parseNearAmount("0.01")
        );
        console.log("minted successfully");
      } catch (e) {
        console.log("Error: ", e);
      }
    } catch (err) {
      console.error(err);
    }

    // const d = new Date();
    // let id = d.getTime();
    // try {
    //   await window.contractNFT.nft_mint(
    //     {
    //       token_id: id.toString(),
    //       metadata: {
    //         title: title,
    //         description: desc,
    //         media:
    //           "https://bafkreiggryohzmtr2etai4dammqjbhztigyroetb2bb7xxkqy2mh4eaoja.ipfs.nftstorage.link/",
    //       },
    //       receiver_id: window.accountId,
    //     },
    //     300000000000000, // attached GAS (optional)
    //     utils.format.parseNearAmount("0.01")
    //   );
    // } catch (e) {
    //   console.log("Error: ", e);
    // }
  }

  return (
    <>
      <CommonSection title="Mint your NFT" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview</h5>
              {/* <NftCard item={item} /> */}
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <form className="form">

                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input id="title" type="text" placeholder="Enter title" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    <input type="file" className="upload__input" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id="desc"
                      rows="5"
                      placeholder="Enter description"
                      className="w-100"
                    ></textarea>
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Tags</label>
                    <textarea
                      name=""
                      id="tags"
                      rows="1"
                      placeholder="Enter tags"
                      className="w-100"
                    ></textarea>
                  </div>
                </form>

                <span className="d-flex" style={{visibility: 'hidden'}} id="loading"></span>
                <button
                  className="btn d-flex gap-2 align-items-center"
                  style={{ color: "white" }}
                  onClick={mintNFT}
                >
                  Mint
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Mint;
