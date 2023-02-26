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

const StyledCrudListItem = styled.tr`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
  &.strong {
    color: red;
    font-weight: bold;
    font-size: 1.2em;
  }
`;

function CrudListItem({ item, callbackDel, callbackUp, callbackDown, callbackSave }) {
  let [isEditMode, setIsEditMode] = useState(false);
  let refInputName = useRef(null);
  let refInputPower = useRef(null);

  // 이벤트 핸들러 작성.
  const handlerDel = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);

    // 부모의 콜백 메서드 호출.
    // CrudContainer.callbackDel();
    callbackDel(item);
  };
  const handlerUp = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);

    // 부모의 콜백 메서드 호출.
    // CrudContainer.callbackUp();
    callbackUp(item);
  };
  const handlerDown = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);

    // 부모의 콜백 메서드 호출.
    // CrudContainer.callbackDown();
    callbackDown(item);
  };
  const handlerEdit = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);
    setIsEditMode(!isEditMode);
  };
  const handlerSave = (e) => {
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
      id: item.id,
      name: name,
      power: Number(power),
    };

    // 부모 콜백 메서드 호출
    callbackSave(newItem);

    setIsEditMode(!isEditMode);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html

  let strong = '';
  if (item.power >= 300) strong = 'strong';

  const formView = (
    <StyledCrudListItem className={strong}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.power}</td>
      <td>
        <button type="button" onClick={handlerDel}>
          Del
        </button>
        <button type="button" onClick={handlerUp}>
          Power Up
        </button>
        <button type="button" onClick={handlerDown}>
          Power Down
        </button>
        <button type="button" onClick={handlerEdit}>
          Edit
        </button>
      </td>
    </StyledCrudListItem>
  );

  const formEdit = (
    <StyledCrudListItem className={strong}>
      <td>{item.id}</td>
      <td>
        <input type="text" name="name" placeholder="이름을 입력하세요" defaultValue={item.name} ref={refInputName} />
      </td>
      <td>
        <input type="number" name="power" placeholder="숫자를 입력하세요" defaultValue={item.power} ref={refInputPower} />
      </td>
      <td>
        <button type="button" onClick={handlerUp}>
          Power Up
        </button>
        <button type="button" onClick={handlerDown}>
          Power Down
        </button>
        <button type="button" onClick={handlerSave}>
          Save
        </button>
      </td>
    </StyledCrudListItem>
  );

  return isEditMode ? formEdit : formView;
}

CrudListItem.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
  item: PropTypes.object.isRequired,
  callbackDel: PropTypes.func.isRequired,
  callbackUp: PropTypes.func.isRequired,
  callbackDown: PropTypes.func.isRequired,
  callbackSave: PropTypes.func.isRequired,
};
CrudListItem.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
  item: null,
  callbackDel: () => {},
  callbackUp: () => {},
  callbackDown: () => {},
  callbackSave: () => {},
};

export default React.memo(CrudListItem); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
