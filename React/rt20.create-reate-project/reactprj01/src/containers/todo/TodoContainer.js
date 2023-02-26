import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { BrowserRouter, Routes, Route, NavLink, useParams, useLocation, useHistory, useNavigate } from 'react-router-dom';
import TodoHeader from './components/TodoHeader';
import TodoFooter from './components/TodoFooter';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import TodoSearch from './components/TodoSearch';

const StyledTodoContainer = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
  @charset "utf-8";

  * {
    box-sizing: border-box;
  }

  body {
    text-align: center;
    background-color: #f6f6f8;
  }

  button {
    border-style: groove;
  }
`;

function TodoContainer({ ...props }) {
  const [todoItems, setTodoItems] = useState([
    { id: 1, todo: '영화보기', done: false, modify: false },
    { id: 2, todo: '주말 산책', done: true, modify: false },
    { id: 3, todo: 'ES6 학습', done: false, modify: false },
    { id: 4, todo: '잠실 야구장', done: false, modify: false },
  ]);
  const [todoSearchedItems, setTodoSearchedItems] = useState(todoItems);

  const callbackAddTodo = useCallback(
    (value) => {
      // ap03-11.객체배열.html 참조
      // map과 reduce 를 사용하여 max id 구하기 ==> newid 만들기
      // todoItems 추가할 객체 만들기
      // 배열에 추가. todoItems = [...todoItems, newTodo];
      const maxid =
        todoItems &&
        todoItems
          .map((item) => item.id) // [1,2,3,4]
          .reduce((pvalue, cvalue) => {
            // 큰값 반환하기
            if (pvalue > cvalue) return pvalue;
            else return cvalue;
          }, 0); // 최대값 찾기

      const newTodo = {
        id: maxid + 1,
        todo: value,
        done: false,
      };

      // todoItems.push(newItem);
      // todoItems = [...todoItems, newTodo];
      setTodoItems([...todoItems, newTodo]); // todoItems = [...todoItems, newTodo];
    },
    [todoItems],
  );

  const callbackSearchTodo = useCallback(
    (value) => {
      let newTodoSearchedItems = todoItems.filter((item) => value == '' || item.todo.includes(value));
      setTodoSearchedItems(newTodoSearchedItems);
    },
    [todoSearchedItems],
  );

  const callbackDoneToggle = useCallback(
    (id) => {
      // state 변경 코드를 완성하시오.

      const newTodos =
        todoItems &&
        todoItems.map((item) => {
          if (item.id === id) {
            item.done = !item.done;
          }
          return item;
        });

      setTodoItems(newTodos); // todoItems = newTodos;
    },
    [todoItems],
  );

  const callbackSaveToggle = useCallback(
    (id, todo) => {
      const newTodos =
        todoItems &&
        todoItems.map((item) => {
          if (item.id === id) {
            item.todo = todo;
            item.modify = !item.modify;
          }
          return item;
        });

      setTodoItems(newTodos); // todoItems = newTodos;
    },
    [todoItems],
  );

  const callbackModifyToggle = useCallback(
    (id) => {
      // state 변경 코드를 완성하시오.

      const newTodos =
        todoItems &&
        todoItems.map((item) => {
          if (item.id === id) {
            item.modify = !item.modify;
          }
          return item;
        });

      setTodoItems(newTodos); // todoItems = newTodos;
    },
    [todoItems],
  );

  const callbackRemoveTodo = useCallback(
    (id) => {
      // state 변경 코드를 완성하시오.

      // filter 메서드를 이용한 삭제 방법 실습.
      const newTodos =
        todoItems &&
        todoItems.filter((item) => {
          if (item.id === id) {
            return false;
          }
          return true;
        });

      setTodoItems(newTodos);
    },
    [todoItems],
  );

  const callbackClearAll = useCallback(() => {
    // state 변경

    // 직접 코드를 완성하시오.
    // setTodoItems 는  todoItems 상태를 바꾸기 위한 setter 메서드
    // todoItems = [];
    setTodoItems([]);
  }, [todoItems]);

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledTodoContainer>
      <div id="app">
        {/* TodoHeader */}
        <TodoHeader></TodoHeader>

        {/* TodoInput */}
        <TodoInput callbackAddTodo={callbackAddTodo}></TodoInput>

        {/* TodoList */}
        <TodoList
          todoItems={todoSearchedItems}
          callbackDoneToggle={callbackDoneToggle}
          callbackSaveToggle={callbackSaveToggle}
          callbackModifyToggle={callbackModifyToggle}
          callbackRemoveTodo={callbackRemoveTodo}
        ></TodoList>

        {/* TodoHeader */}
        <TodoFooter callbackClearAll={callbackClearAll}></TodoFooter>

        <TodoSearch callbackSearchTodo={callbackSearchTodo}></TodoSearch>
      </div>
    </StyledTodoContainer>
  );
}

TodoContainer.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
};
TodoContainer.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
};

export default React.memo(TodoContainer); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
