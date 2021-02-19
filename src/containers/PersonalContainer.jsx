import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import axios from '../../node_modules/axios/index';
import PersonalTemplate from '../components/templates/templates-personal/PersonalTemplate';
import { changeInputPerson, changeInputPersonSubmit } from '../modules/user';

const PersonalContainer = () => {
  const [fix, setFix] = useState('');
  const { token } = useSelector((state) => state.auth);
  const { name, email, birth, imageUrl } = useSelector(
    (state) => state.user.userRes,
  );

  const dispatch = useDispatch();
  const fixInfoBtn = (e) => {
    if (!e.target.matches('.btn')) return;
    if (e.target.name === 'name') {
      setFix((state) => ({
        name: true,
        img: false,
        birth: false,
        emailAddress: false,
        cancel: true,
      }));
    } else if (e.target.name === 'imageUrl') {
      setFix((state) => ({
        name: false,
        img: true,
        birth: false,
        emailAddress: false,
        cancel: true,
      }));
    } else if (e.target.name === 'birth') {
      setFix((state) => ({
        name: false,
        img: false,
        birth: true,
        emailAddress: false,
        cancel: true,
      }));
    } else if (e.target.name === 'emailAddress') {
      setFix((state) => ({
        name: false,
        img: false,
        birth: false,
        emailAddress: true,
        cancel: true,
      }));
    }
  };

  const fixInfoBtnCancel = () => {
    setFix((state) => ({
      name: false,
      img: false,
      birth: false,
      emailAddress: false,
      cancel: true,
    }));
  };
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  const cancelclick = (e) => {
    if (!e.target.matches('.btn')) return;
    if (e.target.name === 'name') {
      dispatch(changeInputPerson(e.target.name, userInfo.name));
    } else if (e.target.name === 'imageUrl') {
      dispatch(changeInputPerson(e.target.name, userInfo.unageUrl));
    } else if (e.target.name === 'emailAddress') {
      dispatch(changeInputPerson('email', userInfo.email));
    }
    setFix((state) => '');
  };

  const inputFocus = (e) => {};
  const ChangeInputBtn = () => {
    dispatch(changeInputPersonSubmit({ token, name, email, birth }));
    setFix((state) => ({
      name: false,
      img: false,
      birth: false,
      emailAddress: false,
      cancel: true,
    }));
    sessionStorage.setItem(
      'userInfo',
      JSON.stringify({ name, email, birth, imageUrl }),
    );
  };
  const personInfoChange = (e) => {
    if (e.target.name === 'imageUrl') {
      const imgArr = e.target.files[0];
      console.log(imgArr);
      return;
    } else {
      dispatch(changeInputPerson(e.target.name, e.target.value));
    }
  };
  return (
    <PersonalTemplate
      fixInfoBtnCancel={fixInfoBtnCancel}
      fixInfoBtn={fixInfoBtn}
      fix={fix}
      setFix={setFix}
      cancelclick={cancelclick}
      personInfoChange={personInfoChange}
      name={name}
      email={email}
      birth={birth}
      imageUrl={imageUrl}
      inputFocus={inputFocus}
      ChangeInputBtn={ChangeInputBtn}
      userInfo={userInfo}
    />
  );
};

export default PersonalContainer;
