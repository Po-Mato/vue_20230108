import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { BrowserRouter, Routes, Route, NavLink, useParams, useLocation, useHistory, useNavigate } from 'react-router-dom';

const StyledHomeContainer = styled.div``;

function HomeContainer({ ...props }) {
  return (
    <StyledHomeContainer>
      <div>HomeContainer</div>
    </StyledHomeContainer>
  );
}

export default React.memo(HomeContainer); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
