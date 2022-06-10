import React, { useRef, useEffect } from "react";
import "./header.css";
import { Container } from "reactstrap";

import { login, logout, conlog } from "../../utils";

import { NavLink, Link } from "react-router-dom";

import { Layout, Menu, Button, Dropdown } from "antd";
import "antd/dist/antd.css";

const NAV__LINKS = [
  {
    display: "Home",
    url: "/home",
  },
  {
    display: "Market",
    url: "/market",
  },
  {
    display: "Create",
    url: "/create",
  },
  {
    display: "Mint",
    url: "/mint",
  },
  {
    display: "List",
    url: "/list",
  },
  {
    display: "Contact",
    url: "/contact",
  },
  {
    display: "Profile",
    url: "/wallet",
  },
];

const Header = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={logout}>Logout</div>
      </Menu.Item>
    </Menu>
  );

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
            <h2 className=" d-flex gap-2 align-items-center ">
              <span>
                <i class="ri-fire-fill"></i>
              </span>
              Smart Contracts
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
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
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            {window.walletConnection.isSignedIn() ? (
              <Dropdown overlay={menu} placement="bottomLeft" arrow>
                <button
                  className="btn d-flex gap-2 align-items-center"
                  style={{ color: "white", fontSize: ".8rem" }}
                >
                  <span>
                    <i class="ri-wallet-line"></i>
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
                  <i class="ri-wallet-line"></i>
                </span>
                Login
              </button>
            )}

            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
