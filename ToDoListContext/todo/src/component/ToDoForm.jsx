import { useState } from "react";
import { useToDoContext } from "./ToDoContextProvider";

function TodoForm() {
  const [todoText, setTodoText] = useState("");
  const { addTodo } = useToDoContext();
  function handelSubmit(e) {
    e.preventDefault();
    addTodo({ id: Date.now(), todo: todoText, isCompleted: false });
    setTodoText("");
  }

  return (
    <form className="flex" onSubmit={handelSubmit}>
      <input
        type="text"
        placeholder="Write Todo..."
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
