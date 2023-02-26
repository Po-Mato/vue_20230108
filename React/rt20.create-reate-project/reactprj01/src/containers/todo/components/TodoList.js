import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTodoList = styled.section`
  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
  }

  li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
  }

  li.checked {
    background: #bbb;
    color: #fff;
    text-decoration: line-through;
  }

  .checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
  }

  .saveBtn {
    margin-left: auto;
    color: #3f7fbf;
  }

  .modifyBtn {
    margin-left: auto;
    color: #bf9f3f;
  }

  .removeBtn {
    margin-left: 10px;
    color: #de4343;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }

  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
`;

function TodoList({ todoItems, callbackDoneToggle, callbackSaveToggle, callbackModifyToggle, callbackRemoveTodo }) {
  const refInputTodo = useRef(null);

  const handlerDoneToggle = (e) => {
    // click 이벤트 취소. 버블링 방지
    //
    const id = Number(e.target.dataset.id); // data-id. Number() : 문자열을 숫자로 변환
    const item = JSON.parse(e.target.dataset.item); // data-item

    e.stopPropagation(); // click 이벤트 취소. 버블링 막기

    // 부모 컴포넌트의 콜백 메서드 callbackDoneToggle 호출
    callbackDoneToggle(id);
  };

  const handlerSaveToggle = (e) => {
    // click 이벤트 취소. 버블링 방지
    //
    const id = Number(e.target.closest('li').dataset.id); // data-id. Number() : 문자열을 숫자로 변환
    const item = JSON.parse(e.target.closest('li').dataset.item); // data-item
    console.log(id);
    e.stopPropagation(); // click 이벤트 취소. 버블링 막기
    const todo = refInputTodo.current.value;
    console.log(todo);

    // 부모 컴포넌트의 콜백 메서드 callbackDoneToggle 호출
    callbackSaveToggle(id, todo);
  };

  const handlerModifyToggle = (e) => {
    // click 이벤트 취소. 버블링 방지
    //
    const id = Number(e.target.closest('li').dataset.id); // data-id. Number() : 문자열을 숫자로 변환
    const item = JSON.parse(e.target.closest('li').dataset.item); // data-item
    console.log(id);
    e.stopPropagation(); // click 이벤트 취소. 버블링 막기

    // 부모 컴포넌트의 콜백 메서드 callbackDoneToggle 호출
    callbackModifyToggle(id);
  };

  const handlerRemoveTodo = (e, id) => {
    // 부모 컴포넌트의 콜백 메서드 callbackRemoveTodo 호출
    callbackRemoveTodo(id);
  };

  let list =
    todoItems &&
    todoItems.map((item) => (
      <li
        key={item.id}
        className={item.done ? 'checked' : null}
        data-id={item.id}
        data-item={JSON.stringify(item)}
        onClick={handlerDoneToggle}
      >
        <i aria-hidden="true" className="checkBtn fas fa-check"></i>
        {item.modify ? (
          <input
            type="text"
            ref={refInputTodo}
            defaultValue={item.todo}
            onClick={(e) => e.stopPropagation()}
            onKeyUp={(e) => e.keyCode === 13 && handlerSaveToggle(e)}
          />
        ) : (
          item.todo
        )}
        {item.modify ? (
          <span type="button" className="saveBtn" onClick={handlerSaveToggle}>
            <i aria-hidden="true" className="far fa-save"></i>
          </span>
        ) : (
          <span type="button" className="modifyBtn" onClick={handlerModifyToggle}>
            <i aria-hidden="true" className="far fa-edit"></i>
          </span>
        )}
        <span
          type="button"
          className="removeBtn"
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 취소. 버블링 방지

            // 부모 컴포넌트의 콜백 메서드 callbackDoneToggle 호출
            handlerRemoveTodo(e, item.id);
          }}
        >
          <i aria-hidden="true" className="far fa-trash-alt"></i>
        </span>
      </li>
    ));
  return (
    <StyledTodoList>
      <ul>{list}</ul>
    </StyledTodoList>
  );
}

TodoList.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
  todoItems: PropTypes.array.isRequired,
  callbackDoneToggle: PropTypes.func.isRequired,
  callbackSaveToggle: PropTypes.func.isRequired,
  callbackModifyToggle: PropTypes.func.isRequired,
  handlerRemoveTodo: PropTypes.func.isRequired,
};
TodoList.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
  todoItems: [],
  callbackDoneToggle: () => {},
  callbackSaveToggle: () => {},
  callbackModifyToggle: () => {},
  handlerRemoveTodo: () => {},
};

export default React.memo(TodoList); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
