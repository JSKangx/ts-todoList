import { useEffect, useState } from "react";
import "./App.css";
import { getTodos, type Todo } from "./test";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  useEffect(() => {
    getTodos().then((data) => setTodoList(data));
  }, []);
  return <TodoList todoList={todoList} />;
}

type TodoListProps = { todoList: Todo[] };
function TodoList({ todoList }: TodoListProps) {
  return (
    <>
      {todoList.map((item) => (
        <TodoItem {...item} />
      ))}
    </>
  );
}

type TodoItemProps = Todo;
function TodoItem({ id, title, completed }: TodoItemProps) {
  return (
    <div>
      <div>id: {id}.</div>
      <div>title: {title}</div>
      <div>completed: {`${completed}`}</div>
    </div>
  );
}

export default App;
