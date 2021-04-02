import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { FaEllipsisH } from "react-icons/fa";
import { useRecoilState, useSetRecoilState } from "recoil";
import { deleteTodo, updateTodo } from "../../APIs/todo";
import { todosState, userState } from "../../recoil/atoms";
import DropDownMenu from "./DropDownMenu/DropDownMenu";

function TodoItem({ todo }) {
  const [, drag] = useDrag(
    () => ({
      type: "todo",
      item: { todo },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    []
  );
  const [userData] = useRecoilState(userState);
  const setTodos = useSetRecoilState(todosState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function delTodo() {
    await deleteTodo(todo._id, userData.token);
    setTodos((prev) => ({
      ...prev,
      isLoading: true,
    }));
  }

  async function updateStatus(status) {
    setTodos((prev) => {
      let otherTodos = prev.todos.filter((t) => t._id !== todo._id);
      return {
        ...prev,
        todos: [
          ...otherTodos,
          {
            ...todo,
            status,
          },
        ],
      };
    });
    let todoItem = {
      ...todo,
      status: status,
    };
    await updateTodo(todo._id, todoItem, userData.token);
  }

  return (
    <div className="todo-item" ref={drag}>
      <div className="todo-header">
        <span onClick={() => setIsMenuOpen((prev) => !prev)}>
          <FaEllipsisH />
        </span>
        <DropDownMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          {todo.status !== "open" && (
            <div onClick={() => updateStatus("open")} className="menu-item">
              Mark as Open
            </div>
          )}
          {todo.status !== "inprogress" && (
            <div
              onClick={() => updateStatus("inprogress")}
              className="menu-item"
            >
              Mark as In Progress
            </div>
          )}
          {todo.status !== "done" && (
            <div onClick={() => updateStatus("done")} className="menu-item">
              Mark as Done
            </div>
          )}
          <div className="menu-item" onClick={delTodo}>
            Delete
          </div>
        </DropDownMenu>
      </div>
      {todo.title}
    </div>
  );
}

export default TodoItem;
