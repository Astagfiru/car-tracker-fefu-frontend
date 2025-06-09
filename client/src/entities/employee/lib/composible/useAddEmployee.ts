import { EmployeeRequest, EmployeeForm } from "./../../types/employeeTypes";
import { ref, watch, Ref } from "vue";
import { useEmployeeStore } from "../model/employeeStore";
import { useFetch } from "@/shared";
import { addEmployee } from "../../api/addNewEmployee";
import { mapEmployeeUiToApi } from "../mappers";
import { AddEmployeeResponce } from "../../types/apiTypes";


interface AddEmployeeReturn {
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  addEmployee: () => void;
}

export const useAddEmployee = (newEmployee: EmployeeForm): AddEmployeeReturn => {
  const { responseData, error, isLoading, sendRequest } = useFetch<AddEmployeeResponce, EmployeeRequest>(addEmployee);

  const employeeStore = useEmployeeStore();

  const mappedEmployee = ref<EmployeeRequest>();

  const refetch = async () => {
    try {
      const mappedEmployee = mapEmployeeUiToApi(newEmployee);
      
      await sendRequest(mappedEmployee);
      employeeStore.addEmployee({
        id:Number(Date.now()),
        user_id:Number(Date.now()),
        ...newEmployee
      });

      if (responseData.value){
        employeeStore.addEmployee({
          id: Number(Date.now()),
          user_id:Number(Date.now()),
          ...newEmployee
        });
        console.log("there:")
        console.log(employeeStore)
      }

    } catch (err){
      console.error("Error adding employee:", err);
      throw err;
    }
  };

  watch(responseData, () => {
    if (responseData.value) {
    
    mappedEmployee.value = mapEmployeeUiToApi(newEmployee)

    employeeStore.addEmployee({
        id: Number(Date.now()),
        user_id:Number(Date.now()),
        ...newEmployee
    });
    
    }
  });

  return {
    error,
    isLoading,
    addEmployee: refetch,
  };
};
