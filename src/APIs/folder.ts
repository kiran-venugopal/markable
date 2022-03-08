import { axiosInstance } from ".";
import { folderDataType } from "../recoil/atoms";
import { baseUrl } from "../utils/constants";

export async function fetchFolders() {
  try {
    const response = await axiosInstance.get(baseUrl + "/folders");
    return response.data || {};
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}

export async function updateFolders(folderData: folderDataType) {
  try {
    const response = await axiosInstance.post(
      baseUrl + "/update-folders",
      folderData
    );
    return response.data || {};
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
