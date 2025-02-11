import "./App.css";
import { type Todo } from "./test";

function App() {
  return <TodoList todoList={[]} />;
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
      <div>{id}</div>
      <div>{title}</div>
      <div>{completed}</div>
    </div>
  );
}

export default App;
