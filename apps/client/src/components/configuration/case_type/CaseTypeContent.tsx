"use client";
import React, { useEffect, useState } from "react";
import { deletedCaseType, getCaseTypes } from "@/api/configuration/case_type";
import CreateCaseTypeButtonComponent from "./buttons/CreateCaseTypeButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsCaseType from "./table_columns/TableColumnsCaseType";
import {
  useDeleteCaseTypeMutation,
  useGetAllCaseTypesQuery,
} from "@/redux/apis/case_type/caseTypeApi";

const CaseTypeContent: React.FC = () => {
  const [loadingCaseType, setLoadingCaseType] = useState(true);
  const [caseType, setCaseType] = useState<CaseType[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [caseTypeRecord, setCaseTypeRecord] = useState<CaseType | null>(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

  const [deleteCaseType] = useDeleteCaseTypeMutation();

  const handleClickDelete = async (recordId: number) => {
    try {
      const response: any = await deleteCaseType(recordId);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allCaseTypesDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log("Error: ", error);
    } finally {
      allCaseTypesDataRefetch();
    }
  };
  return (
    <div style={{ padding: "32px" }}>
      {showErrorMessage && (
        <CustomMessage typeMessage="error" message={errorMessage} />
      )}
      {showSuccessMessage && (
        <CustomMessage typeMessage="success" message={successMessage} />
      )}
      <CustomTableFiltersAndSorting
        dataCustomTable={allCaseTypesData || []}
        onClickRechargeCustomTable={allCaseTypesDataRefetch}
        loading={allCaseTypesDataLoading || allCaseTypesDataFetching}
        customButton={
          <CreateCaseTypeButtonComponent
            onNewRegister={allCaseTypesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsCaseType({
          handleClickDelete, onRefetchRegister: allCaseTypesDataRefetch
        })}
      />
    </div>
  );
};

export default CaseTypeContent;
