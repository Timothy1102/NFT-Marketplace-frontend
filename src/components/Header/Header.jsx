import React, { useRef, useEffect } from "react";
import "./header.css";
import { Container } from "reactstrap";
import {utils} from "near-api-js"
import { login, logout, conlog } from "../../utils";

import { NavLink, Link } from "react-router-dom";

import { Layout, Menu, Button, Dropdown } from "antd";
import "antd/dist/antd.css";

let NAV__LINKS = [];

const Header = () => {
	if (window.walletConnection.isSignedIn()) {
		NAV__LINKS = [
			{
				display: "HOME",
				url: "/home",
			},
			{
				display: "MARKET",
				url: "/market",
			},
			// {
			// 	display: "CREATE",
			// 	url: "/create",
			// },
			{
				display: "MINT",
				url: "/mint",
			},
			{
				display: "CONTACT",
				url: "/contact",
			},
			{
				display: "PROFILE",
				url: "/wallet",
			},
		];
	} else {
		NAV__LINKS = [
			{
				display: "Home",
				url: "/home",
			},
			{
				display: "Market",
				url: "/market",
			},
			{
				display: "Contact",
				url: "/contact",
			},
		];
	}

	const menu = (
		<Menu style={{ background: "#5142fc"}}>
			<Menu.Item>
				<div onClick={logout} style={{fontSize: 18, color: "orange"}}>Logout</div>
			</Menu.Item>
			<Menu.Item>
				<div onClick={deposit} style={{fontSize: 18, color: "orange"}}>Deposit Storage Balance</div>
			</Menu.Item>
		</Menu>
	);

	async function deposit () {
		await window.contractMarket.storage_deposit({}, 30000000000000, utils.format.parseNearAmount("0.1"))
	}

	const headerRef = useRef(null);

	const menuRef = useRef(null);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (
				document.body.scrollTop > 80 ||
				document.documentElement.scrollTop > 80
			) {
				headerRef.current.classList.add("header__shrink");
			} else {
				headerRef.current.classList.remove("header__shrink");
			}
		});

		return () => {
			window.removeEventListener("scroll");
		};
	}, []);

	const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

	return (
		<header className="header" ref={headerRef}>
			<Container>
				<div className="navigation">
					<div className="logo">
						<Link
              style={{ textDecoration: "none"}}
							to={`/`}
						>
						<h2 className=" d-flex gap-2 align-items-center ">
							<span>
								<i className="ri-fire-fill"></i>
							</span>
							DHub
						</h2>
						</Link>
					</div>

					<div
						className="nav__menu"
						ref={menuRef}
						onClick={toggleMenu}
					>
						<ul className="nav__list">
							{NAV__LINKS.map((item, index) => (
								<li className="nav__item" key={index} style={{fontWeight: 'bold'}}>
									<NavLink
										to={item.url}
										className={(navClass) =>
											navClass.isActive ? "active" : ""
										}
									>
										{item.display}
									</NavLink>
								</li>
							))}
							<li className="nav__item"  style={{fontWeight: 'bold'}}>
								<a target="_blank" href="http://45.76.185.234:8080/">CREATE</a>
							</li>
						</ul>
					</div>

					<div className="nav__right d-flex align-items-center gap-5 ">
						{window.walletConnection.isSignedIn() ? (
							<Dropdown
								overlay={menu}
								placement="bottomLeft"
								arrow
							>
								<button
									className="btn d-flex gap-2 align-items-center"
									style={{
										color: "white",
										fontSize: ".8rem",
									}}
								>
									<span>
										<i className="ri-wallet-line"></i>
									</span>

									{window.accountId}
								</button>
							</Dropdown>
						) : (
							<button
								className="btn d-flex gap-2 align-items-center"
								style={{ color: "white", fontSize: ".8rem" }}
								onClick={login}
							>
								<span>
									<i className="ri-wallet-line"></i>
								</span>
								Login
							</button>
						)}

						<span className="mobile__menu">
							<i
								className="ri-menu-line"
								onClick={toggleMenu}
							></i>
						</span>
					</div>
				</div>
			</Container>
		</header>
	);
};

export default Header;
