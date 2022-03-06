import axios from "axios";
import { folderDataType } from "../recoil/atoms";
import { baseUrl } from "../utils/constants";

export async function fetchFolders(jwt: string) {
  try {
    const response = await axios.get(baseUrl + "/folders", {
      headers: {
        Authorization: jwt,
      },
    });
    return response.data || {};
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}

export async function updateFolders(folderData: folderDataType, jwt: string) {
  try {
    const response = await axios.post(baseUrl + "/update-folders", folderData, {
      headers: {
        Authorization: jwt,
      },
    });
    return response.data || {};
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
