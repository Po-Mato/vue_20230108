import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { BrowserRouter, Routes, Route, NavLink, useParams, useLocation, useHistory, useNavigate } from 'react-router-dom';

const StyledCrudInput = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
`;

function CrudInput({ callbackAdd }) {
  const refInputName = useRef(null);
  const refInputPower = useRef(null);

  // 이벤트 핸들러 작성.
  const handlerAdd = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);

    const name = refInputName.current.value;
    if (!name.trim()) {
      // 유효성 검사
      alert('NAME에 값을 입력하세요.');
      refInputName.current.focus(); // 포커스 주기
      e.preventDefault(); // 이벤트 취소
      e.stopPropagation(); // 이벤트 취소
      return false;
    }

    const power = refInputPower.current.value;
    if (!power.trim()) {
      // 유효성 검사
      alert('POWER에 값을 입력하세요.');
      refInputPower.current.focus(); // 포커스 주기
      e.preventDefault(); // 이벤트 취소
      e.stopPropagation(); // 이벤트 취소
      return false;
    }

    if (isNaN(Number(power))) {
      alert('파워에 숫자를 입력하세요.');
      refInputPower.current.focus(); // 포커스 주기
      e.preventDefault(); // 이벤트 취소
      e.stopPropagation(); // 이벤트 취소
      return false;
    }

    let newItem = {
      id: null,
      name: name,
      power: Number(power),
    };

    // 부모 콜백 메서드 호출
    callbackAdd(newItem);

    refInputName.current.value = '';
    refInputPower.current.value = 0;
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledCrudInput>
      <div>
        <div>
          <label htmlFor="">Name : </label>
          <input type="text" name="name" placeholder="이름을 입력하세요" defaultValue={''} ref={refInputName} />
        </div>
        <div>
          <label htmlFor="">Power : </label>
          <input type="number" name="power" placeholder="숫자를 입력하세요" defaultValue={0} ref={refInputPower} />
        </div>
        <button type="button" onClick={handlerAdd}>
          Add
        </button>
      </div>
    </StyledCrudInput>
  );
}

CrudInput.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
  callbackAdd: PropTypes.func.isRequired,
};
CrudInput.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
  callbackAdd: () => {},
};

export default React.memo(CrudInput); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
