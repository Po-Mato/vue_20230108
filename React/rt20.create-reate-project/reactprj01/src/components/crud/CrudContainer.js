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
import CrudInput from './CrudInput';
import CrudList from './CrudList';

const StyledCrudContainer = styled.div`
  label {
    display: inline-block;
    width: 80px;
  }
  #app > div {
    margin: 5px 0;
  }
`;

function CrudContainer({ ...props }) {
  // useState 를 사용한 컴포넌트의 상태값 설정
  const [변수명, set변수명] = useState('기본값'); // 상태값이 기본타입인 경우
  const [state, setState] = useState({ id: 0, name: '', age: 0 }); // 상태값이 참조타입 경우

  const [items, setItems] = useState([
    { id: 1, name: '슈퍼맨', power: 100 },
    { id: 2, name: '아쿠아맨', power: 300 },
    { id: 3, name: '스파이더맨', power: 500 },
    { id: 4, name: '배트맨', power: 30 },
  ]);

  // useReducer 를 사용한 컴포넌트의 상태값 설정. 리듀서는 현재 상태를 받아서 새 상태를 반환하는 함수다
  const [리듀서, set리듀서] = useReducer((oldvalue, newvalue) => ({ ...oldvalue, ...newvalue }), { id: 0, name: '', age: 0 }); // 리듀서(reducer) 방식의 상태값 설정

  // ref 만들기.
  // const refInput = useRef();

  // refIsMounted는 생명주기의 마운트와 업데이트를 구분하기 위한 ref
  const refIsMounted = useRef(false);
  useEffect(
    () => {
      if (refIsMounted.current) {
        // 업데이트 될 때마다 실행됨. 여러번. state 가 변경될 때마다
        // console.log('CrudContainer >> componentDidUpdate');
      } else {
        // 마운트 완료 후에 실행됨. 한번만. focus 줄때
        // console.log('CrudContainer >> componentDidMount');
        refIsMounted.current = true;
      }
      return () => {
        // 언마운트 직전에 한번만 실행됨.
        // console.log('CrudContainer >> componentWillUmount');
      };
    },
    [
      /* 연관배열: 메서드와 연관되는 상태(변수)명들을 기술 */
    ],
  );

  const callbackDel = useCallback(
    (item) => {
      // items 배열에서 삭제. Array.filter() 를 사용한다
      // ...생략
      console.log(item);
      const newItems = items.filter((itemOri) => itemOri.id != item.id);
      setItems(newItems);
    },
    [/* 메서드와 연관되는 상태(변수)명들을 기술 */ items],
  );

  const callbackUp = useCallback(
    (item) => {
      //100씩 증가. Array.map() 을 사용한다
      // item.power = item.power + 100;
      // ...생략
      const newItems = items.map((itemOri) => {
        if (itemOri.id == item.id) itemOri.power += 100;
        return itemOri;
      });
      setItems(newItems);
    },
    [/* 메서드와 연관되는 상태(변수)명들을 기술 */ items],
  );

  const callbackDown = useCallback(
    (item) => {
      // 50씩 감소.  Array.map() 을 사용한다
      // item.power = item.power - 50;
      // ...생략
      const newItems = items.map((itemOri) => {
        if (itemOri.id == item.id) itemOri.power -= 50;
        return itemOri;
      });
      setItems(newItems);
    },
    [/* 메서드와 연관되는 상태(변수)명들을 기술 */ items],
  );

  const callbackSave = useCallback(
    (newitem) => {
      // newitem 으로 바뀐 새로운 배열 만들기. Array.map() 을 사용한다
      // ...생략
      const newItems = items.map((item) => (item.id == newitem.id ? newitem : item));
      setItems(newItems);
    },
    [/* 메서드와 연관되는 상태(변수)명들을 기술 */ items],
  );

  const callbackAdd = useCallback(
    (newitem) => {
      // items에서 최대 id 값을 구하는 방법.
      // 방법1. items.map()과 items.reduce()를 사용하여 max id를 찾는 방법
      let maxid = items.reduce((acc, item) => Math.max(acc, item.id), 0);
      const newid = maxid + 1;
      console.log(maxid, newid);

      // param 에  id값 추가
      newitem.id = newid;

      /// items.push(param);
      setItems([...items, newitem]);
    },
    [/* 메서드와 연관되는 상태(변수)명들을 기술 */ items],
  );

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledCrudContainer>
      <div id="app">
        <h1>Creat Read Update Delete</h1>
        <CrudInput callbackAdd={callbackAdd}></CrudInput>
        <hr />
        <CrudList
          items={items}
          callbackDel={callbackDel}
          callbackUp={callbackUp}
          callbackDown={callbackDown}
          callbackSave={callbackSave}
        ></CrudList>
      </div>
    </StyledCrudContainer>
  );
}

CrudContainer.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
};
CrudContainer.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
};

export default React.memo(CrudContainer); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
