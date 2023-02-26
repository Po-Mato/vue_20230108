import React from 'react';
import CompStyle from '../containers/styled/CompStyle';
import CrudContainer from '../components/crud/CrudContainer';
import HomeContainer from '../containers/home/HomeContainer';
import TodoContainer from '../containers/todo/TodoContainer';
import styled from 'styled-components';
import { Routes, Route, NavLink } from 'react-router-dom';

const StyledPageHome = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
  > div > ul {
    display: flex;
    grid-gap: 10px;
    align-items: center;
    padding: 5px;
  }
  .active {
    background-color: aqua;
  }
  .inactive {
    background-color: none;
  }
`;

function PageHome({ ...props }) {
  return (
    <StyledPageHome>
      <div>
        <ul>
          <li>
            <NavLink to={'/test'}></NavLink>
          </li>
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/style'}>Style</NavLink>
          </li>
          <li>
            <NavLink to={'/crud'}>Crud</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/todo">
              Todo
            </NavLink>
          </li>
        </ul>
      </div>

      <Routes>
        <Route path={'/style'} element={<CompStyle />} />
        <Route path={'/crud'} element={<CrudContainer />} />
        <Route path={'/todo'} element={<TodoContainer />} />
        <Route path={'/'} element={<HomeContainer />} />
        <Route path={'*'} to="/" />
      </Routes>
    </StyledPageHome>
  );
}

export default React.memo(PageHome); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
