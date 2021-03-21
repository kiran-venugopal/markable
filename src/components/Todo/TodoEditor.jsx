import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { createTodo } from "../../APIs/todo";
import { todosState, userState } from "../../recoil/atoms";
import { AddTodoWrapper } from "../../styled-components";
import { Button, ModalActions } from "../../utils/styles";

const initialTodoContent = {
  title: "",
  description: "",
  status: "open",
};

function TodoEditor({ noteId = "", onSuccess = () => {} }) {
  const [todos, setTodos] = useRecoilState(todosState);
  const [userData, setUserData] = useRecoilState(userState);
  const [todoContent, setTodoContent] = useState(initialTodoContent);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {});

  const onInputChange = (e) => {
    setTodoContent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    if (!todoContent.title.trim()) alert("Todo title is required!!");
    let todo = {
      ...todoContent,
      createdAt: new Date().toISOString(),
    };
    await createTodo(todo, userData.token);
    setIsSending(false);
    onSuccess();
  };

  return (
    <AddTodoWrapper>
      <form onSubmit={onSubmit}>
        <div className="header">Add Todo</div>
        <div className="field">
          <div className="label">Title</div>
          <input
            type="text"
            name="title"
            value={todoContent.title}
            placeholder="Title of todo"
            onChange={onInputChange}
            required={true}
          />
        </div>
        <div className="field">
          <div className="label">Description</div>
          <textarea
            name="description"
            type="text"
            value={todoContent.description}
            placeholder="Description of your todo"
            onChange={onInputChange}
          />
        </div>
        <ModalActions>
          <Button type="button">Close</Button>
          <Button disabled={isSending}>
            {isSending ? "Creating.." : "Create Todo"}
          </Button>
        </ModalActions>
      </form>
    </AddTodoWrapper>
  );
}

export default TodoEditor;
