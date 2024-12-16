"use client";

import React, { useState } from "react";

import CreateMovementReportButtonComponent from "@/components/configuration/movement_report/buttons/CreateMovementReportButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsMovementReport from "./table_columns/TableColumnsMovementReport";

import {
  useDeleteMovementReportMutation,
  useGetAllMovementReportsQuery,
} from "@/redux/apis/movement_report/movementReportApi";

const MovementReportContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allMovementReportsData,
    isFetching: allMovementReportsDataFetching,
    isLoading: allMovementReportsDataLoading,
    error: allMovementReportsDataError,
    refetch: allMovementReportsDataRefetch,
  } = useGetAllMovementReportsQuery(null);

  const [deleteMovementReport] = useDeleteMovementReportMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteMovementReport(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allMovementReportsDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      allMovementReportsDataRefetch();
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
        dataCustomTable={allMovementReportsData || []}
        onClickRechargeCustomTable={allMovementReportsDataRefetch}
        loading={
          allMovementReportsDataLoading || allMovementReportsDataFetching
        }
        customButton={
          <CreateMovementReportButtonComponent
            onNewRegister={allMovementReportsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsMovementReport({
          handleClickDelete,
          onRefetchRegister: allMovementReportsDataRefetch,
        })}
      />
    </div>
  );
};

export default MovementReportContent;
