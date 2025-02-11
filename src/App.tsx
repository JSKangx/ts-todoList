import { useEffect, useState } from "react";
import "./App.css";
import { getTodos, type Todo } from "./test";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]); // todoList 상태관리
  const [title, setTitle] = useState<string>(""); // todo input 상태관리

  // 컴포넌트 마운트 이후 todoList fetching
  useEffect(() => {
    getTodos().then((data) => setTodoList(data));
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

  return (
    <>
      <TodoList todoList={todoList} />
      <input type="text" value={title} onChange={(e) => handleTitleChange(e)} />
      <button onClick={handleAddTodo}>등록하기</button>
    </>
  );
}

type TodoListProps = { todoList: Todo[] };
function TodoList({ todoList }: TodoListProps) {
  return (
    <>
      {todoList.map((item) => (
        <TodoItem key={item.id} {...item} />
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
      <button>삭제</button> <br />
      ----------------------
    </div>
  );
}

export default App;
