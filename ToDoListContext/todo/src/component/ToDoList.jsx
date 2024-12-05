import { useToDoContext } from "./ToDoContextProvider";
import TodoItem from "./TodoItem";

function ToDoList() {
  const { todos } = useToDoContext();
  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id} className="w-full">
          <TodoItem todo={todo} />
        </div>
      ))}
    </>
  );
}

export default ToDoList;
