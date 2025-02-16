import { useEffect, useState } from "react";
import { getTodos, type Todo } from "./test";
import "./App.css";

type ToggleTodo = Omit<Todo, "title">;

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]); // todoList 상태관리
  const [title, setTitle] = useState<string>(""); // todo input 상태관리

  // 컴포넌트 마운트 이후 todoList fetching
  useEffect(() => {
    getTodos().then((data) => setTodoList(data.data));
  }, []);

  // todo의 title을 handling 하는 함수
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  // 새로운 todo를 추가하는 함수
  const handleAddTodo = async () => {
    // 유효성 검사
    if (title === "") return;

    // 새로운 todo 객체 생성
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    // 새로 생성한 todo를 서버로 보내기
    await fetch("http://localhost:4000/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
    });

    // 새로 만든 Todo를 추가하여 todoList 상태에 업데이트
    setTodoList((prev) => [...prev, newTodo]);
    setTitle(""); // input 초기화
  };

  // todo를 삭제하는 함수
  const handleDeleteTodo = async (id: Todo["id"]) => {
    // 서버 데이터 삭제
    await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
    });

    // todoList 상태 업데이트
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  };

  // 완료 상태를 토글하는 함수
  const handleToggleTodo = async ({ id, completed }: ToggleTodo) => {
    // completed 속성을 반전하여 서버에 전송
    await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !completed,
      }),
    });

    // todoList 상태 업데이트
    setTodoList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !completed,
          };
        }
        return item;
      })
    );
  };

  return (
    <>
      <TodoList
        todoList={todoList}
        onDeleteClick={handleDeleteTodo}
        onToggleClick={handleToggleTodo}
      />
      <input type="text" value={title} onChange={(e) => handleTitleChange(e)} />
      <button onClick={handleAddTodo}>등록하기</button>
    </>
  );
}

type TodoListProps = {
  todoList: Todo[];
  onDeleteClick: (id: Todo["id"]) => void;
  onToggleClick: (toggleTodo: ToggleTodo) => void;
};
function TodoList({ todoList, onDeleteClick, onToggleClick }: TodoListProps) {
  return (
    <>
      {todoList.map((item) => (
        <TodoItem
          key={item.id}
          {...item}
          onDeleteClick={onDeleteClick}
          onToggleClick={onToggleClick}
        />
      ))}
    </>
  );
}

type TodoItemProps = Todo & {
  onDeleteClick: (id: Todo["id"]) => void;
  onToggleClick: (toggleTodo: ToggleTodo) => void;
};
function TodoItem({
  id,
  title,
  completed,
  onDeleteClick,
  onToggleClick,
}: TodoItemProps) {
  return (
    <div>
      <div>id: {id}.</div>
      <div onClick={() => onToggleClick({ id, completed })}>title: {title}</div>
      <div>completed: {`${completed}`}</div>
      <button onClick={() => onDeleteClick(id)}>삭제</button> <br />
      ----------------------
    </div>
  );
}

export default App;
