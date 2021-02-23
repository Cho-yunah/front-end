import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import LoaderIcon from 'react-loader-icon';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import detail from '../../../../modules/detail';

const ReservationBtn = styled.button`
  background: #d70466;
  color: white;
  min-width: 110px;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: none;
  text-align: center;
  line-height: 20px;
  font-size: 16px;
  font-weight: 600;
  padding: 14px 24px;
  white-space: nowrap;
  transition: 0.3s;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:active {
    transform: scale(0.95);
  }

  &:active {
    transform: scale(0.95);
  }

  ${(props) =>
    props.half &&
    css`
      width: fit-content;
    `}
`;

const ReserveBtn = ({
  modal,
  half,
  setModal,
  setFormState,
  DetailHeaderRef,
  bookingInfoRef,
  setIsCalendarOpen,
  setIsOpen,
  GuestModalRef,
  // moveToReserve,
  // NoBookingDate,
}) => {
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);
  const { startDate, endDate, numOfAdult } = useSelector(
    (state) => state.detail,
  );
  const history = useHistory();

  const makeUserHasDates = () => {
    if (half) bookingInfoRef.current.scrollIntoView({ behavior: 'smooth' });
    setIsCalendarOpen(true);
  }; // 날짜를 선택하도록 날짜 모달을 켜주는 함수

  const makeUserHasAudultGuest = () => {
    GuestModalRef.current.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(true);
  };

  const makeUserLoggedIn = () => {
    setModal(true);
    setFormState('login');
    localStorage.setItem('LFT', '/reserve');
  }; // 로그인 모달창을 띄워준다.

  const moveUserToReserve = () => {
    if (!startDate || !endDate) {
      makeUserHasDates(); // 날짜 선택하게 함.
      return;
    }
    if (numOfAdult === 0) {
      makeUserHasAudultGuest();
      return;
    } //guest 인원의 성인이 선택되지 않았을시에 선택하게 함.

    if (!localStorage.getItem('token')) {
      makeUserLoggedIn(); // 로그인 하게 함.
      return;
    }
    history.push('/reserve');
  };

  useEffect(() => {
    if (modal) setShowLoadingIcon(true);

    return () => {
      setShowLoadingIcon(false);
    };
  }, [modal]);

  return (
    <ReservationBtn
      half={half}
      ref={DetailHeaderRef}
      onClick={moveUserToReserve}
    >
      {showLoadingIcon ? (
        <LoaderIcon type={'bubbles'} size={26} color={'white'} />
      ) : !startDate || !endDate ? (
        '예약 가능 여부 보기'
      ) : (
        '예약하기'
      )}
    </ReservationBtn>
  );
};
export default ReserveBtn;
