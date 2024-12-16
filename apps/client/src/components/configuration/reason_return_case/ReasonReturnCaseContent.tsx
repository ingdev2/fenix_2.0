"use client";

import React, { useEffect, useState } from "react";

import CreateReasonReturnCaseButtonComponent from "@/components/configuration/reason_return_case/buttons/CreateReasonReturnCaseButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsReasonReturnCase from "./table_columns/TableColumnsReasonReturnCase";

import {
  deletedReasonReturnCase,
  getReasonReturnCases,
} from "@/api/configuration/ReasonReturnCase";
import {
  useDeleteReasonReturnCaseMutation,
  useGetAllReasonReturnCasesQuery,
} from "@/redux/apis/reason_return_case/reasonReturnCase";

const ReasonReturnCaseContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allReasonReturnCasesData,
    isFetching: allReasonReturnCasesDataFetching,
    isLoading: allReasonReturnCasesDataLoading,
    error: allReasonReturnCasesDataError,
    refetch: allReasonReturnCasesDataRefetch,
  } = useGetAllReasonReturnCasesQuery(null);

  const [deleteReasonReturnCase] = useDeleteReasonReturnCaseMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteReasonReturnCase(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allReasonReturnCasesDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allReasonReturnCasesDataRefetch();
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
        dataCustomTable={allReasonReturnCasesData || []}
        onClickRechargeCustomTable={allReasonReturnCasesDataRefetch}
        loading={
          allReasonReturnCasesDataLoading || allReasonReturnCasesDataFetching
        }
        customButton={
          <CreateReasonReturnCaseButtonComponent
            onNewRegister={allReasonReturnCasesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsReasonReturnCase({
          handleClickDelete,
          onRefetchRegister: allReasonReturnCasesDataRefetch,
          ReasonReturnCaseData: allReasonReturnCasesData
        })}
      />
    </div>
  );
};

export default ReasonReturnCaseContent;
