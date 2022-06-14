import React from "react";

import "./common-section.css";

import { Container } from "reactstrap";

const CommonSection = ({ title, img }) => {
	return (
		<section className="common__section">
			{img && (
				<Container className="text-center" style={{marginBottom: 20}}>
					<img
						src={img}
						alt="nft thumbnail"
						className="d-inline-flex tw-rounded-full image-shadow tw-w-14 tw-h-14 "
						style={{
							width: 90,
							height: 90,
							borderRadius: "50px",
						}}
					/>
				</Container>
			)}
			<Container className="text-center">
				<h2 style={{ color: "white" }}>{title}</h2>
			</Container>
		</section>
	);
};

export default CommonSection;
