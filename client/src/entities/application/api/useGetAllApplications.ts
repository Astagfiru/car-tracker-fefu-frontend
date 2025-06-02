import axios from "axios";
import type { ApplicationResponse} from "../types/applicationTypes"
import { APPLICATIONS_PATH } from "../consts/baseUrl";

export const useGetAllApplications = async (): Promise<ApplicationResponse[]> => {
  try {
    const response = await axios.get<ApplicationResponse[]>(APPLICATIONS_PATH);
    const { data } = response;

    return data;
  } catch (error) {
    return [];
  }
};
