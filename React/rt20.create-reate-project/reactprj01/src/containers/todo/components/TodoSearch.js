import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTodoSearch = styled.header`
  display: flex;
  grid-gap: 10px;
  align-items: center;

  > input {
    flex: 1;
    font-size: 12pt;
    padding: 10px;
  }
`;

function TodoSearch({ callbackSearchTodo }) {
  const refSearcbTodo = useRef(null);

  const handlerSearchTodo = (e) => {
    // click 이벤트 취소. 버블링 방지
    e.stopPropagation();

    const value = refSearcbTodo.current.value;
    callbackSearchTodo(value);
  };

  const handlerClearSearch = (e) => {
    refSearcbTodo.current.value = '';
    handlerSearchTodo(e);
  };

  return (
    <StyledTodoSearch>
      <input
        type="text"
        ref={refSearcbTodo}
        placeholder="Todo Search"
        onKeyUp={(e) => e.keyCode === 13 && handlerSearchTodo(e)}
      />
      <span className="addContainer" onClick={handlerSearchTodo}>
        <i aria-hidden="true" className="addBtn fas fa-search"></i>
      </span>
      <span className="addContainer" onClick={handlerClearSearch}>
        <i aria-hidden="true" className="addBtn fas fa-trash-alt"></i>
      </span>
    </StyledTodoSearch>
  );
}

TodoSearch.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
  callbackSearchTodo: PropTypes.func.isRequired,
};
TodoSearch.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
  callbackSearchTodo: () => {},
};

export default React.memo(TodoSearch); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
