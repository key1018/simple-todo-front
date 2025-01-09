import './App.css';
import Todo from './Todo';
import React, { useEffect, useState } from 'react';
import { Container, List, Paper } from '@mui/material';
import AddTodo from './AddTodo.js';
import { call } from './service/ApiService.js';

function App() {
  const [
    items,
    setItems, // eslint-disable-line no-unused-vars
  ] = useState([]);

  // useEffect(() => {
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   };

  //   fetch('http://localhost:8090/todo', requestOptions)
  //     .then((response) => response.json())
  //     .then(
  //       (response) => {
  //         setItems(response.data);
  //       },
  //       (error) => {}
  //     );
  // }, []);

  useEffect(() => {
    call('/todo', 'GET', null).then((response) => setItems(response.data));
  }, []);

  const addItem = (item) => {
    // item.id = 'ID-' + items.length; // key를 위한 id
    // item.done = false; // done 초기화
    // // 업데이트는 반드시 setItems로 하고 새 배열을 만들어야 함
    // setItems([...items, item]);
    // console.log('items : ', items);
    call('/todo', 'POST', item).then((response) => setItems(response.data));
  };

  const deleteItem = (item) => {
    // // 삭제할 아이템을 찾는다
    // // id를 비교하여 item과 id가 같은 경우 제외한다
    // const newItems = items.filter((e) => e.id !== item.id);
    // // 삭제할 아이템을 제외한 아이템을 다시 배열에 저장한다
    // setItems([...newItems]);
    call('/todo', 'DELETE', item).then((response) => setItems(response.data));
  };

  // todo 리스트 수정
  const editItem = (item) => {
    // setItems([...items]);
    call('/todo', 'PUT', item).then((response) => setItems(response.data));
  };

  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo
            item={item}
            key={item.id}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        ))}
      </List>
    </Paper>
  );

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );
}

export default App;
