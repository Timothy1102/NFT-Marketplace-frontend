import React from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import { utils } from "near-api-js";
import "../styles/create-item.css";
// import { NFTStorage} from 'nft.storage';
import { NFTStorage } from "nft.storage/dist/bundle.esm.min.js";
import "dotenv/config";
import { LoadingOutlined } from "@ant-design/icons";

// personal api key for nft.storage
// const API_TOKEN = process.env.API_TOKEN;
const API_TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYwMTQzZDA5RUI1MzQ4NzJGNDRiMTNCRDdlYjVDNDkyRjVBNjdEMDkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NDc4NTMzMTE1MiwibmFtZSI6Im5mdC10ZXN0In0.njpcXLyShGZJVQrnafDviw8JFpeOREU4-fSe3eEk3DI";

const Mint = () => {
	async function mintNFT() {
		document.getElementById("spin").style.visibility = "visible";

		const title = document.getElementById("title").value;
		const desc = document.getElementById("desc").value;
		const tags = document.getElementById("tags").value;
		const website = document.getElementById("website").value;
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

			const imgUrl = metadata.embed().image.href;
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
							reference: website,
						},
						receiver_id: window.accountId,
						// perpetual_royalties: {
						//   owner: royalties
						// }
					},
					300000000000000, // attached GAS (optional)
					utils.format.parseNearAmount("0.05")
				);
				console.log("minted successfully");
			} catch (e) {
				console.log("Error: ", e);
			}
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<>
			<CommonSection title="Mint your NFT" />
			<section>
				<Container>
					<Row>
						<Col lg="9" md="8" sm="6" style={{marginLeft: "auto", marginRight: "auto"}}>
							<div className="create__item">
								<form className="form">
									<div className="form__input">
										<label htmlFor="">Title</label>
										<input
											id="title"
											type="text"
											placeholder="Enter title"
										/>
									</div>

									<div className="form__input">
										<label htmlFor="">Upload File</label>
										<input
											type="file"
											className="upload__input"
										/>
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

									<div className="form__input">
										<label htmlFor="">Website</label>
										<textarea
											name=""
											id="website"
											rows="1"
											placeholder="link website"
											className="w-100"
										></textarea>
									</div>
								</form>

								<LoadingOutlined id="spin" style={{ color: "white", fontSize: 35, visibility: "hidden" }} />

								<button
									className="btn d-flex gap-2 align-items-center"
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
