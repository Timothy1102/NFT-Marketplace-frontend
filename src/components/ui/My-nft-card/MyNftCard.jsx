import React, { useState } from "react";
import { Link } from "react-router-dom";
import { utils } from "near-api-js";
import "./my-nft-card.css";
import ModalTransferNft from "../Modal-transfer-nft/ModalTransferNFT";
import ModalListNft from "../Modal-list-nft/ModalListNFT";
import getConfig from "../../../config";
import { Row, Col } from "reactstrap";

const nearConfig = getConfig(process.env.NODE_ENV || "development");

const MyNftCard = (props) => {
	const {
		title,
		id,
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
		removeSale(nft_contract_id, id);
	}

	return (
		<div className="single__nft__card">
			{/* <div className="nft__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div> */}

			{/* <div className="nft__content">

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
				</div>
			</div> */}

			<div className="nft__content ">
				<Row>
					<Col lg="3" style={{ marginRight: 15 }}>
						<img
							src={imgUrl}
							alt="nft thumbnail"
							className="d-inline-flex tw-rounded-full image-shadow tw-w-14 tw-h-14 "
							style={{
								width: 60,
								height: 60,
								borderRadius: "50px",
								marginRight: 20,
							}}
						/>
					</Col>
					<Col>
						<h5 className="nft__title" style={{ marginBottom: 0 }}>
							<Link
								style={{ color: "white", fontSize: 20 }}
								to={`/market/${id}`}
							>
								{title}
							</Link>
						</h5>
						<div className="tags">
							<p
								style={{
									display: "inline",
									fontSize: 15,
									color: "#40a9ff",
								}}
							>
								{tags}
							</p>
						</div>
					</Col>
				</Row>
			</div>

			<div
				className="contract_des"
				style={{
					height: 160,
					border: "0.3px solid #ffa500",
					padding: "5px 10px",
					marginTop: 10,
					borderRadius: 15,
				}}
			>
				<p
					style={{
						height: 150,
						color: "#c7bfbf",
						fontSize: 13,
						textOverflow: "ellipsis",
						overflow: "auto",
						maxHeight: "40ch",
						maxWidth: "40ch",
					}}
				>
					{desc}
				</p>
			</div>

			<p style={{ color: "gray", marginBottom: "0rem", fontSize: 14 }}>
				Owner: {creator}
			</p>

			{is_selling && (
				<div
					className="creator__info-wrapper d-flex gap-3"
					style={{ marginTop: 10 }}
				>
					<div className="creator__info w-100 d-flex align-items-center justify-content-between">
						<div>
							<h6>Selling price</h6>
							<p style={{color: 'orange'}}>
								{utils.format.formatNearAmount(selling_price)}
								<span style={{color:'#b1b3b1'}}> NEAR</span>
							</p>
						</div>
						<div>
							<h6>Using price</h6>
							<p style={{color: 'orange'}}>
								{utils.format.formatNearAmount(using_price)}
								<span style={{color:'#b1b3b1'}}> NEAR</span>
							</p>
						</div>
					</div>
				</div>
			)}

			{is_selling ? (
				<div
					className=" d-inline-flex align-items-center justify-content-between"
					style={{ marginLeft: 75 }}
				>
					<button
						className="bid__btn d-flex align-items-center gap-1"
						style={{ background: "#e250e5", border: "none" }}
						onClick={handelCancel}
					>
						<i className="ri-close-circle-line"></i> Delist
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
						<ModalTransferNft
							setShowModal={setShowModal}
							token_id={id}
						/>
					)}
					{showListModal && (
						<ModalListNft
							setShowListModal={setShowListModal}
							token_id={id}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default MyNftCard;
