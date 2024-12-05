import { createSlice, nanoid } from "@reduxjs/toolkit";

const iniitialState = {
  todos: [{ id: 1, text: "Hello Word" }],
  selected: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: iniitialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = { id: nanoid(), text: action.payload };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((ele) => ele.id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((ele) =>
        ele.id == state.selected.id ? (ele = action.payload) : ele
      );
    },
    selectedForUpdate: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { addTodo, removeTodo, updateTodo, selectedForUpdate } =
  todoSlice.actions;

export default todoSlice.reducer;
