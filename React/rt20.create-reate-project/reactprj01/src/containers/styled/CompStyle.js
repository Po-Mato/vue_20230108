import React from 'react';
import styled, { css } from 'styled-components';

const StyledCompStyle = styled.div`
  .App {
    display: inline-block;
    background-color: gray;
    border: 10px solid black;
    height: 63px;
    width: 300px;
  }
`;

// import styled, { css } from 'styled-components';
const StyledCircle = styled.div`
  /* https://styled-components.com/docs/basics#adapting-based-on-props */
  width: 5rem;
  height: 5rem;
  background: ${(props) => props.color || 'black'};
  border-radius: 50%;
  margin: auto;

  ${(props) =>
    props.huge &&
    css`
      width: 10rem;
      height: 10rem;
    `}
`;

function CompStyle({ ...props }) {
  return (
    <StyledCompStyle>
      <h2>styled-components 로 만든</h2>
      <div className="App">styled-components 스타일로 만든</div>
      <hr />

      <StyledCircle></StyledCircle>
      <hr />

      <StyledCircle color={'blue'}></StyledCircle>
      <hr />

      <StyledCircle color={'aqua'} huge={false}></StyledCircle>
      <hr />

      <StyledCircle color={'red'} huge={true}></StyledCircle>
    </StyledCompStyle>
  );
}

export default CompStyle;
