import axios from "axios";
import { baseUrl } from "../utils/constants";

export async function fetchNotes(jwt) {
  try {
    const res = await axios.get(`${baseUrl}/get-notes`, {
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

export async function createNote(note, jwt) {
  try {
    const res = await axios.post(`${baseUrl}/create-note`, note, {
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

export async function updateNote(noteId, note, jwt) {
  try {
    const res = await axios.post(`${baseUrl}/update-note?id=${noteId}`, note, {
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

export async function updateLayouts(layouts, jwt) {
  try {
    const res = await axios.post(`${baseUrl}/update-layouts`, layouts, {
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

export async function deleteNote(noteId, jwt) {
  try {
    const res = await axios.delete(`${baseUrl}/delete-note?id=${noteId}`, {
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
