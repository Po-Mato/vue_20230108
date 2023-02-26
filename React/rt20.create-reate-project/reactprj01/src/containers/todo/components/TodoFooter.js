import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTodoFooter = styled.footer`
  &.clearAllContainer {
    width: 16rem;
    height: 50px;
    line-height: 50px;
    background-color: white;
    border-radius: 5px;
    margin: 0 auto;
  }

  .clearAllBtn {
    color: #e20303;
    display: block;
    text-align: center;
  }
`;

function TodoFooter({ callbackClearAll }) {
  const handlerClearAll = (e) => {
    console.log(e.target);
    // debugger;

    // 부모 컴포넌트의 콜백 메서드 callbackClearAll 호출.
    callbackClearAll();
  };

  return (
    <StyledTodoFooter className="clearAllContainer">
      <span className="clearAllBtn" onClick={handlerClearAll}>
        Clear All
      </span>
    </StyledTodoFooter>
  );
}

TodoFooter.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
  callbackClearAll: PropTypes.func.isRequired,
};
TodoFooter.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
  callbackClearAll: () => {},
};

export default React.memo(TodoFooter); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
