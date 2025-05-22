import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { ApplicationResponse, ApplicationStatuses } from "../index";

const APPLICATIONS_STORE_NAME = "applicationsStore";

interface ApplicationsStore {
  applications: ApplicationResponse[] | null;
  newApplication: ApplicationResponse | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const applicationsStoreInitialState: ApplicationsStore = {
  applications: null,
  newApplication: null,
  isLoading: false,
  errorMessage: null,
};

export const useApplicationsStore = defineStore(APPLICATIONS_STORE_NAME, () => {
  const state = reactive<ApplicationsStore>({
    ...applicationsStoreInitialState,
  });

  const { applications } = toRefs(state);

  const saveAllApplications = (newApplications: ApplicationResponse[]): void => {
    state.applications = newApplications;
  };

  const addApplication = (newApplication: ApplicationResponse) => {
    applications.value?.unshift(newApplication);
  };

  return {
    ...toRefs(state),
    saveAllApplications,
    addApplication,
  };
});