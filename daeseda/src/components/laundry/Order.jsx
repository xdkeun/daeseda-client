// 세탁 신청서 작성 컴포넌트
import styled from "styled-components";
import Check from "../common/Check";
import truck from "../../assets/images/truck.png";
import bill from "../../assets/images/bill.png";
import change from "../../assets/images/change.png";
import Button from "../common/Button";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import WarningMessage from "../common/WarningMessage";
function Order() {
  //Request에서 보낸 데이터를 state 초기값으로 저장
  const location = useLocation();
  const [normalLaundry, setNormalLaundry] = useState(
    location.state.normalLaundry
  );
  const [specialLaundry, setSpecialLaundry] = useState(
    location.state.specialLaundry
  );
  const [date, setDate] = useState(location.state.date);
  const [password, setPassword] = useState("");
  const [firstTerms, setFirstTerms] = useState(false);
  const [secondTerms, setSecondTerms] = useState(false);
  const [firstTermsWarningMessage, setFirstTermsWarningMessage] =
    useState(false);
  const [secondTermsWarningMessage, setSecondTermsWarningMessage] =
    useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("문 앞");
  // 요일을 반환하는 함수 선언식으로 정의
  function getDayOfWeek(date) {
    const daysOfWeek = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    return daysOfWeek[date.getDay()];
  }

  function formattedDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = getDayOfWeek(date);

    return `${year}년 ${month < 10 ? `0${month}` : month}월 ${
      day < 10 ? `0${day}` : day
    }일 ${dayOfWeek}`;
  }

  function deliveryLocationChangeHandler() {
    if (deliveryLocation === "문 앞") {
      setDeliveryLocation("경비실");
    } else if (deliveryLocation === "경비실") {
      setDeliveryLocation("로비");
    } else if (deliveryLocation === "로비") {
      setDeliveryLocation("문 앞");
    }
  }

  function orderHandler() {
    if (!firstTerms) setFirstTermsWarningMessage(true);
    else setFirstTermsWarningMessage(false);
    if (!secondTerms) setSecondTermsWarningMessage(true);
    else setSecondTermsWarningMessage(false);
    if (firstTerms && secondTerms) {
      // axios 코드 추가하기
    }
  }
  return (
    <OrderLayout>
      <Title>주문내용</Title>
      <Row>
        <p>세탁서비스</p>
        {normalLaundry && specialLaundry ? (
          <p>일반세탁, 특수세탁</p>
        ) : normalLaundry ? (
          <p>일반세탁</p>
        ) : specialLaundry ? (
          <p>특수세탁</p>
        ) : null}
      </Row>
      <RequestMessage type="text" placeholder="요청사항 입력하기" />
      <Title>수거/배송정보</Title>
      <Row>
        <p>수거시간</p>
        <RowRight>
          <p>
            <p>{formattedDate(date)}</p>
          </p>
          <Change src={change} />
        </RowRight>
      </Row>

      <Row>
        <p>배송주소</p>
        <RowRight>
          <p>서울시 노원구 101동 101호</p>
          <Change src={change} />
        </RowRight>
      </Row>

      <Row style={{ borderBottom: "1px solid #111111", paddingBottom: "20px" }}>
        <p>수거/배송위치</p>
        <RowRight>
          <p>{deliveryLocation}</p>
          <Change src={change} onClick={deliveryLocationChangeHandler} />
        </RowRight>
      </Row>

      {/* <Title>공동현관비밀번호</Title>
      <PasswordRow>
        <Check onClick={() => {}} />
        <input
          type="text"
          placeholder="예) 1234**"
          style={{ outline: "none" }}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          value={password}
        />
      </PasswordRow>
      <PasswordRow
        style={{ borderBottom: "1px solid #111111", paddingBottom: "20px" }}
      >
        <Check onClick={() => {setPassword("")}} />
        <button>비밀번호 없음</button>
      </PasswordRow> */}
      <Title>이용안내</Title>
      <Guide>
        <GuideImg src={truck} alt="" />
        <p>9/11(월) 오후 11시까지 세탁물을 문 앞에 위치시켜주세요</p>
        <Check
          onClick={() => {
            setFirstTerms(!firstTerms);
          }}
        />
        {firstTermsWarningMessage ? (
          <WarningMessage text="이용안내 사항을 확인하고 동의하세요" />
        ) : null}
      </Guide>
      <Guide style={{ marginBottom: "20px" }}>
        <GuideImg src={bill} alt="" />
        <p>
          세탁비는 수거 후 인수증에서 요금을 확인하신 후 7일 이내 결제해주세요
        </p>
        <Check
          onClick={() => {
            setSecondTerms(!secondTerms);
          }}
        />
        {secondTermsWarningMessage ? (
          <WarningMessage text="이용안내 사항을 확인하고 동의하세요" />
        ) : null}
      </Guide>
      <Button text="세탁 신청하기" onClick={orderHandler} />
    </OrderLayout>
  );
}

const OrderLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 48px;
  gap: 8px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RowRight = styled.div`
  display: flex;
  gap: 10px;
`;

const Change = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const RequestMessage = styled.input`
  padding: 12px 0;
  font-size: 18px;
  border-bottom: 1px solid #d9d9d9;
  outline: none;
`;
const PasswordRow = styled.div`
  display: flex;
  gap: 4px;
`;

const Guide = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const GuideImg = styled.img`
  width: 40px;
  height: 40px;
`;

export default Order;
