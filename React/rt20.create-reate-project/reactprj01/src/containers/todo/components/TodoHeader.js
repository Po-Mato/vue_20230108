import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTodoHeader = styled.header`
  h1 {
    color: #2f3b52;
    font-weight: 900;
    margin: 2.5rem 0 1.5rem;
  }
`;

function TodoHeader({ ...props }) {
  return (
    <StyledTodoHeader>
      <h1>TODO it! Component</h1>
    </StyledTodoHeader>
  );
}

TodoHeader.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
};
TodoHeader.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
};

export default React.memo(TodoHeader); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
