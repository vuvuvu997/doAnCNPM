// eslint-disable-next-line
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { orderAPI } from "../../api/orderAPI";
import Order from "../../components/order";
import { formatter } from "../../helpers/formatToPriceMoney";
import "./style.css";
// eslint-disable-next-line
import { message, Steps, Form, Input, Button } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { clearListOrder } from "../../actions/order-actions";
import { deleteProductListWhenOrdered } from "../../actions/cartAction";
//import Modal from "antd/lib/modal/Modal";

const { Step } = Steps;
function calTotalMoney(list) {
  let result = 0;
  if (list.length > 0) {
    result = list.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }
  return result;
}

function Checkout(props) {
  const orderList = useSelector((state) => state.order);

  const userProfile = useSelector((state) => state.user);
  //const [typePayment, setTypePayment] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  // const [numberCard, setNumberCard] = useState("");
  // const [nameBank, setNameBank] = useState("");
  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  // const onFinish = (values) => {
  //   setNameBank(values.nameBank);
  //   setNumberCard(values.numberCard);
  //   setIsModalVisible(false);
  // };

  async function handleSubmitOrder() {
    const product_ids = orderList.map((item) => {
      return { id: item.id + "", count_product_cart: item.quantity + "" };
    });
    const fullName = userProfile.first_name + " " + userProfile.last_name;
    const data = {
      full_name: fullName,
      phone_number: userProfile.phone_number,
      address: userProfile.address,
      // pay_method_name: typePayment,
      product_ids: product_ids,
      voucher_ids: [2],
    };
    // if (typePayment === "Th??? t??nh d???ng") {
    //   data.name_bank = nameBank;
    //   data.number_card = numberCard;
    // }
    // if (!typePayment) {
    //   message.warning("Please choose a payment method!");
    // } else {
    try {
      const res = await orderAPI.postOrder(data);
      if (res.data.message === "order has created") {
        dispatch(deleteProductListWhenOrdered());
        dispatch(clearListOrder());
        history.push("/carts/users");
        message.success("B???n ???? ?????t h??ng th??nh c??ng!");
      } else {
        message.warning("Oop! ???? x???y ra l???i");
      }
    } catch (error) {
      console.log(error);
    }
    // }
  }
  return (
    <>
      <div className="grid wide">
        <div className="order__step">
          <Steps>
            <Step status="finish" title="Login" icon={<UserOutlined />} />
            <Step
              status="finish"
              title="Added Address"
              icon={<SolutionOutlined />}
            />
            <Step
              status="process"
              title="Choose Payment"
              icon={<LoadingOutlined />}
            />
            <Step status="wait" title="Done" icon={<SmileOutlined />} />
          </Steps>
        </div>
      </div>
      <div className="order">
        <div className="grid wide">
          <h1 className="order__title">Thanh to??n</h1>
          <div className="box-info-user">
            <h2 className="box-info-user__title">
              <i className="fa fa-map-marker" aria-hidden="true"></i> ?????a Ch???
              Nh???n H??ng
            </h2>
            <p className="box-info-user__detail">
              <span>
                {userProfile.first_name + " " + userProfile.last_name}
              </span>
              <span> (+84) {userProfile.phone_number}</span>
              <span>{userProfile.address}</span>
              <span>M???c ?????nh</span>
              <Link className="box-info-user__link" to="/user/address">
                THAY ?????I
              </Link>
            </p>
          </div>
          <Order order={orderList} />
          <div className="order__paymemnt">
            {/* <div className="order__payment__control">
              <h2>Ph????ng th???c thanh to??n : </h2>
              <div className="order__paymemnt__type">
                <input
                  type="radio"
                  id="tienmat"
                  name="typePayment"
                  value="Thanh to??n khi nh???n h??ng"
                  onChange={(event) => setTypePayment(event.target.value)}
                />
                <label htmlFor="tienmat" className="btn-pay">
                  B???ng ti???n m???t
                </label>
                <input
                  type="radio"
                  id="the"
                  name="typePayment"
                  value="Th??? t??nh d???ng"
                  onChange={(event) => setTypePayment(event.target.value)}
                  onClick={showModal}
                />
                <label htmlFor="the" className="btn-pay">
                  Th??? ng??n h??ng
                </label>
                <Modal
                  title="Enter Information Card"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={""}
                >
                  <Form
                    name="paymentByCard"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label="Name Bank"
                      name="nameBank"
                      rules={[
                        {
                          required: true,
                          message: "Please input your name bank!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Number Card"
                      name="numberCard"
                      rules={[
                        {
                          required: true,
                          message: "Please input your number card!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </div> */}
            <div className="order__payment__bill">
              <div className="order__payment__bill__detail">
                <div className="row">
                  <div className="col l-9"></div>
                  <div className="col l-3">
                    <div className="order__payment__bill__info">
                      <p>
                        T???ng ti???n h??ng{" "}
                        <span>
                          {" "}
                          {formatter.format(calTotalMoney(orderList))}
                        </span>
                      </p>
                      <p>
                        Ph?? v???n chuy???n <span>??? 0</span>
                      </p>
                      <p className="order__payment__total">
                        T???ng thanh to??n:{" "}
                        <span>
                          {formatter.format(calTotalMoney(orderList))}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order__payment__bill__submit">
                <p>
                  Nh???n "?????t h??ng" ?????ng ngh??a v???i vi???c b???n ?????ng ?? tu??n theo{" "}
                  <a href="#!">??i???u kho???n Shopee</a>
                </p>
                <button
                  className="btn checkout-info__submit btn--order"
                  onClick={handleSubmitOrder}
                >
                  ?????t h??ng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
