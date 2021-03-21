import React from "react";
import { useDrop } from "react-dnd";
import TodoItem from "./TodoItem";

function TodosSection({ todos = [], id = "", title = "", onDrop }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ["todo"],
    drop: (e) => onDrop(e, id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className={`section ${id}`}>
      <div className="header">{title}</div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}

export default TodosSection;
