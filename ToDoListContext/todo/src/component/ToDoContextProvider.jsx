import { act, useContext, useEffect, useReducer } from "react";
import ToDoContext from "./ToDoContext";

const initialState = {
  todos: JSON.parse(localStorage.getItem("contextTodo")) || [],
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, todos: [...state.todos, action.payload] };

    case "update":
      return {
        ...state,
        todos: state.todos.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        ),
      };

    case "delete":
      return {
        ...state,
        todos: state.todos.filter((ele) => ele.id !== action.payload),
      };

    case "completed":
      return {
        ...state,
        todos: state.todos.map((ele) =>
          ele.id === action.payload
            ? { ...ele, isCompleted: !ele.isCompleted }
            : ele
        ),
      };

    default:
      return { ...state };
  }
}

function ToDoContextProvider({ children }) {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);

  function addTodo(newToDo) {
    dispatch({ type: "add", payload: newToDo });
  }

  function updateToDo(newToDo) {
    dispatch({ type: "update", payload: newToDo });
  }

  function deleteToDo(id) {
    dispatch({ type: "delete", payload: id });
  }

  function toComplete(id) {
    dispatch({ type: "completed", payload: id });
  }

  useEffect(() => {
    try {
      const stringifiedTodos = JSON.stringify(todos);
      localStorage.setItem("contextTodo", stringifiedTodos);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [todos]);

  return (
    <ToDoContext.Provider
      value={{ todos, dispatch, addTodo, updateToDo, deleteToDo, toComplete }}
    >
      {children}
    </ToDoContext.Provider>
  );
}

function useToDoContext() {
  return useContext(ToDoContext);
}
export { ToDoContextProvider, useToDoContext };
