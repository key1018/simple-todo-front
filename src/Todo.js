import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteOutlin from '@mui/icons-material/DeleteOutline';

const Todo = (props) => {
  const [
    item,
    setItem, // eslint-disable-line no-unused-vars
  ] = useState(props.item);
  const [
    readOnly,
    setReadOnly, // eslint-disable-line no-unused-vars
  ] = useState(true);

  const deleteItem = props.deleteItem;
  const editItem = props.editItem;

  // deleteEventHandler 작성
  const deleteEventHandler = () => {
    deleteItem(item);
  };

  // turnOffReadOnly 작성
  const turnOffReadOnly = () => {
    setReadOnly(false);
  };

  const editEventHandler = (e) => {
    // item.title = e.target.value;
    // editItem();
    setItem({ ...item, title: e.target.value });
  };

  // turnOnReadOnly 작성
  // item값을 완전히 수정해야지 editItem 함수 호출
  const turnOnReadOnly = (e) => {
    if (e.key === 'Enter' && readOnly === false) {
      setReadOnly(true);
      editItem(item);
    }
  };

  const checkboxEventHandler = (e) => {
    item.done = e.target.checked;
    editItem(item);
  };

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{ 'aria-label': 'naked', readOnly: readOnly }}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo" onClick={deleteEventHandler}>
          <DeleteOutlin />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
