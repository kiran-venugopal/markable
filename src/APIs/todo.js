import axios from "axios";
import { baseUrl } from "../utils/constants";

export async function fetchTodos(jwt) {
  try {
    const res = await axios.get(`${baseUrl}/get-todos`, {
      headers: {
        Authorization: jwt,
      },
    });
    return res.data || {};
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function createTodo(todo, jwt) {
  try {
    const res = await axios.post(`${baseUrl}/create-todo`, todo, {
      headers: {
        Authorization: jwt,
      },
    });
    return res.data || {};
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function deleteTodo(todoId, jwt) {
  try {
    const res = await axios.delete(`${baseUrl}/delete-todo?id=${todoId}`, {
      headers: {
        Authorization: jwt,
      },
    });
    return res.data || {};
  } catch (err) {
    console.error(err);
    return {};
  }
}
