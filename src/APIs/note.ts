import { axiosInstance } from ".";
import { baseUrl } from "../utils/constants";

export async function fetchNotes() {
  try {
    const res = await axiosInstance.get(`${baseUrl}/notes`);
    return res.data || {};
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function createNote(note: any) {
  try {
    const res = await axiosInstance.post(`${baseUrl}/create-note`, note);
    return res.data || {};
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function updateNoteData(noteId: any, note: any) {
  try {
    const res = await axiosInstance.post(
      `${baseUrl}/update-note?id=${noteId}`,
      note
    );
    return res.data || {};
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function updateLayouts(layouts: any) {
  try {
    const res = await axiosInstance.post(`${baseUrl}/update-layouts`, layouts);
    return res.data || {};
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function deleteNoteData(noteId: any) {
  try {
    const res = await axiosInstance.delete(
      `${baseUrl}/delete-note?id=${noteId}`
    );
    return res.data || {};
  } catch (err) {
    console.error(err);
    return {};
  }
}
