export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch("http://localhost:4000/todos");
  const data = await res.json();

  return data;
}

export async function createTodo() {}
