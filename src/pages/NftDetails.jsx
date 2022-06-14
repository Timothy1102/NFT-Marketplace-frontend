import React, { useState, useEffect } from "react";
import { utils } from "near-api-js";
import CommonSection from "../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import {CheckCircleTwoTone,HeartTwoTone,SmileTwoTone} from "@ant-design/icons";
import Relevant from "../components/ui/Relevant-section/Relevant";
import "../styles/nft-details.css";
import Modal from "../components/ui/Modal/Modal";
import getConfig from "../config";
import { login } from "../utils";
import { notification } from "antd";

const nearConfig = getConfig(process.env.NODE_ENV || "development");

const NftDetails = () => {
	const { id } = useParams();
	const [showModal, setShowModal] = useState(false);
	const [singleNft, setSingleNft] = useState();
	const [datanft, setData] = useState();
	const [selling_price, setSellingPrice] = useState("");
	const [using_price, setUsingPrice] = useState("");

	useEffect(async () => {
		let nft = await window.contractNFT.nft_token({
			token_id: id,
		});
		setSingleNft(nft);
	}, []);

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
        if (item.token_id == id) {
          let itemData = await window.contractNFT.nft_token({ token_id: item.token_id });
          let useMapData = use_data.map(async use_item => {
            if (use_item.token_id == item.token_id) {
              use_condition = use_item.use_conditions;
              setData({...item, itemData, use_condition})
            }
          })
          return {
            ...item,
            itemData,
            use_condition,
          }
        }
      });
      let dataNew = await Promise.all(mapItemData);
      console.log("nft detail: ", datanft);
    } catch (e) {
      console.log(e);
    }
  }, []);

  // sorry for this complicated code @.@
	useEffect(async () => {
		try {
			let data = await window.contractMarket.get_sales({
				from_index: 0,
				limit: 20,
			});
			let use_data = await window.contractMarket.get_uses({
				from_index: 0,
				limit: 20,
			});
			data.map(async (item) => {
				use_data.map(async (use_item) => {
					if (
						(use_item.token_id == item.token_id) &
						(item.token_id == id)
					) {
						const sale = utils.format.formatNearAmount(
							item.sale_conditions
						);
						const use = utils.format.formatNearAmount(
							use_item.use_conditions
						);
						setSellingPrice(sale);
						setUsingPrice(use);
					}
				});
			});
		} catch (e) {
			console.log(e);
		}
	}, []);

  const nft_contract_id = nearConfig.nftContractName;
	function handleBuy() {
		submitBuy(datanft);
	}

	async function submitBuy(item) {
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
		} catch (e) {
			console.log("Error: ", e);
		}
	}

  function handelUse() {
		submitUse(nft_contract_id, id);
	}

	async function submitUse(nft_contract_id, token_id) {
		try {
			await window.contractMarket.apply_use(
				{
					nft_contract_id: nft_contract_id,
					token_id: token_id,
				},
				300000000000000,
				datanft.use_condition
			);
		} catch (e) {
			console.log("Error: ", e);
		}
	}

	return (
		<>
			{singleNft !== undefined && (
				<>
					<CommonSection
						title={singleNft.metadata.title}
						img={singleNft.metadata.media}
					/>
					<section style={{ paddingTop: 30 }}>
						<Container>
							<Row>
								<Col
									lg="8"
									md="12"
									sm="12"
									style={{
										marginLeft: "auto",
										marginRight: "auto",
									}}
								>
									<div className="single__nft__content">
										<div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
											<div className=" d-flex align-items-center gap-4 single__nft-seen">
												<span>
													<i class="ri-eye-line"></i>{" "}
													234
												</span>
												<span>
													<i class="ri-heart-line"></i>{" "}
													123
												</span>
												<SmileTwoTone />
												<HeartTwoTone twoToneColor="#eb2f96" />
												<CheckCircleTwoTone twoToneColor="#52c41a" />
											</div>

											<div className=" d-flex align-items-center gap-2 single__nft-more">
												<span>
													<a
														href={
															singleNft.metadata
																.reference
														}
														target="_blank"
													>
														<i class="ri-global-line"></i>
													</a>
												</span>
												<span>
													<i class="ri-send-plane-line"></i>
												</span>
												<span>
													<i class="ri-discord-fill"></i>
												</span>
												<span>
													<i class="ri-more-2-line"></i>
												</span>
											</div>
										</div>

										<div
											className="nft__creator d-inline-flex gap-3 align-items-center"
											style={{ display: "inline" }}
										>
											<div className="creator__detail">
												<p>Owner</p>
												<h6>{singleNft.owner_id}</h6>
											</div>
										</div>

										<h1
											style={{
												color: "white",
												display: "inline",
												marginLeft: 50,
												marginTop: 100,
											}}
										>
											{selling_price}
										</h1>
										<h4
											style={{
												color: "gray",
												display: "inline",
												marginLeft: 15,
											}}
										>
											NEAR
										</h4>

										<h1
											style={{
												color: "white",
												display: "inline",
												marginLeft: 20,
												marginTop: 100,
											}}
										>
											{using_price}
										</h1>
										<h4
											style={{
												color: "gray",
												display: "inline",
												marginLeft: 15,
											}}
										>
											NEAR
										</h4>

										<div style={{ marginTop: 50 }}>
											<button
												className="singleNft-btn d-inline-flex align-items-center gap-2 w-30"
												style={{
													float: "left",
													marginLeft: 200,
													color: "white",
												}}
                        onClick={handleBuy}
											>
												Buy
											</button>

											<button
												className="singleNft-btn d-inline-flex align-items-center gap-2 w-30"
												style={{
													float: "right",
													marginRight: 200,
													color: "white",
												}}
												onClick={handelUse}
											>
												Use
											</button>

                      <button
												className="singleNft-btn d-inline-flex align-items-center gap-2 w-30"
												style={{
													float: "right",
													marginRight: 110,
													color: "white",
												}}
												onClick={() =>
													setShowModal(true)
												}
											>
												Offer
											</button>

											{showModal && (
												<Modal
													setShowModal={setShowModal}
												/>
											)}
										</div>

										<div
											style={{
												border: "0.2px solid #ffa500",
												borderRadius: 20,
												marginTop: 130,
												paddingLeft: 40,
												paddingRight: 40,
											}}
										>
											<h5
												style={{
													color: "white",
													marginTop: 30,
												}}
											>
												Description
											</h5>
											<p
												className="my-4"
												style={{
													whiteSpace: "pre-wrap",
												}}
											>
												{singleNft.metadata.description}
											</p>
											<p style={{ display: "inline" }}>
												Tags:{" "}
											</p>
											<p
												style={{
													display: "inline",
													color: "cyan",
												}}
											>
												{singleNft.metadata.extra}
											</p>
										</div>
									</div>
								</Col>
							</Row>
						</Container>
					</section>
				</>
			)}

			<hr style={{ color: "white" }} />

			<div>{/* <Relevant /> */}</div>
		</>
	);
};

export default NftDetails;
