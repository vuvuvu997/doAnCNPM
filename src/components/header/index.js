import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userLogout } from "../../actions/userAction";
import { categoryAPI } from "../../api/categoryAPI";
import FormSearch from "../FormSearch";
import Notification from "../Notification";
import * as actionsPopupForm from "./../../actions/popup-form";
import "./Header.css";

function showMiniCart(list) {
  let result = null;
  if (list.length > 0) {
    result = list.map((item, index) => {
      return (
        <div className="header--bottom-has-cart__item" key={index}>
          <div className="header--bottom-has-cart__item__img">
            <img src={item.link_image} alt={item.name} />
          </div>
          <p className="header--bottom-has-cart__item__name">{item.name}</p>
          <p className="header--bottom-has-cart__item__price">
            <sup>đ </sup>
            {item.price}
          </p>
        </div>
      );
    });
  }
  return result;
}

function Header() {
  const user = useSelector((state) => state.user);
  const listCart = useSelector((state) => state.cart);
  const [categories, setCategories] = useState([]);
  const amountCartItem = listCart.length;
  useEffect(() => {
    let fetchCategoriesAPI = async () => {
      try {
        const response = await categoryAPI.getAll();
        setCategories(response.categories);
      } catch (error) {
        console.log(error);
      }
    }; //
    fetchCategoriesAPI();
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  function handleLogout() {
    dispatch(userLogout());
    localStorage.removeItem("authentication_token");
    history.push("/");
  }

  function showFormRegister() {
    dispatch(actionsPopupForm.popupRegister(true));
  }
  function showFormLogin() {
    console.log("hihi");
    dispatch(actionsPopupForm.popupLogin(true));
  }

  function handleRedirectToCartPage() {
    if (!user.isLogin) {
      dispatch(actionsPopupForm.popupLogin(true));
    } else {
      history.push("/cart/1");
    }
  }

  return (
    <div className="header">
      <div className="grid wide">
        <nav className="navbar">
          <ul className="navbar__list">
            <li className="navbar__list-item navbar__list-item--separated">
              <a href="#1" className="navbar__link">
                Kênh người bán
              </a>
            </li>
            <li className="navbar__list-item navbar__list-item--separated">
              <a href="#1" className="navbar__link">
                Tải ứng dụng
              </a>
              <div className="navbar__qr">
                <img
                  src="/images/qr-code.png"
                  alt=""
                  className="navbar__qr-code"
                />
                <div className="navbar__qr-link">
                  <a href="#1" className="navbar__qr-link-download">
                    <img src="/images/apple-store.png" alt="Apple store" />
                  </a>
                  <a href="#1" className="navbar__qr-link-download">
                    <img src="/images/ch-play.png" alt="Apple store" />
                  </a>
                </div>
              </div>
            </li>
            <li className="navbar__list-item">
              Kết nối
              <a href="#2" className="navbar__link mg-l-8">
                <i className="fa fa-facebook-square" aria-hidden="true"></i>
              </a>
              <a href="#4" className="navbar__link mg-l-8">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
          </ul>

          <ul className="navbar__list">
            <div className="row">
              <li className="navbar__list-item">
                <a href="#2" className="navbar__link">
                  <i className="fa fa-bell-o" aria-hidden="true"></i>
                  Thông báo
                </a>
                <Notification />
              </li>
              <li className="navbar__list-item">
                <a href="#1" className="navbar__link">
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
                  Trợ giúp
                </a>
              </li>
              {!user.isLogin ? (
                <div>
                  <li className="navbar__list-item navbar__list-item--separated">
                    <button
                      id="register-btn"
                      onClick={() => showFormRegister()}
                      className="navbar__link navbar__link--bold"
                    >
                      Đăng ký
                    </button>
                  </li>
                  <li className="navbar__list-item ">
                    <button
                      id="login-btn"
                      className="navbar__link navbar__link--bold"
                      onClick={showFormLogin}
                    >
                      Đăng nhập
                    </button>
                  </li>
                </div>
              ) : (
                <div>
                  <li className="navbar__list-item navbar__list-item--separated">
                    <Link
                      to="/user/account/edit"
                      className="navbar__link navbar__link--bold"
                    >
                      {user.email}
                    </Link>
                  </li>
                  <li className="navbar__list-item ">
                    <button
                      id="logout-btn"
                      onClick={handleLogout}
                      className="navbar__link navbar__link--bold"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </div>
              )}
            </div>
          </ul>
        </nav>
        <div className="header__bottom">
          <div className="row">
            <div className="col l-2">
              <Link to="/" className="header__bottom-image" href="#1">
                Shop Eco
              </Link>
            </div>
            <div className="col l-8 ">
              <div className="header__bottom-body">
                {/* component form search */}
                <FormSearch />

                <nav className="navbar">
                  <ul className="navbar__list">
                    <div className="row reset-mg">
                      {
                        // eslint-disable-next-line
                        categories.map((item, index) => {
                          if (index < 7) {
                            return (
                              <li className="navbar__list-item" key={index}>
                                <Link
                                  to={`/${item.id}/listProduct`}
                                  className="navbar__link navbar__link--small"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            );
                          }
                        })
                      }
                    </div>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col l-2">
              <div className="hearder__bottom-cart">
                <span className="header__bottom-cart__quantity">
                  {!user.isLogin ? "0" : amountCartItem}
                </span>
                <button
                  onClick={handleRedirectToCartPage}
                  className="btn--cart hearder__bottom-cart-link"
                  href="#1"
                >
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </button>
                <div className="header__bottom-show-cart">
                  {!user.isLogin ? (
                    <div className="header__bottom-no-cart">
                      <img
                        className="header__bottom-no-cart-img"
                        src="/images/no-product.png"
                        alt="No product"
                      />
                      <p className="header__bottom-no-cart-notify">
                        Chưa có sản phẩm
                      </p>
                    </div>
                  ) : amountCartItem > 0 ? (
                    <div className="header__bottom-has-cart">
                      {showMiniCart(listCart)}
                    </div>
                  ) : (
                    <div className="header__bottom-no-cart">
                      <img
                        className="header__bottom-no-cart-img"
                        src="/images/no-product.png"
                        alt="No product"
                      />
                      <p className="header__bottom-no-cart-notify">
                        Chưa có sản phẩm
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
