"use client";

import React, { useState } from "react";

import CreateSeverityClasifButtonComponent from "@/components/configuration/severity_clasification/buttons/CreateSeverityClasificationButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsSeverityClasification from "./table_columns/TableColumnsSeverityClasification";

import {
  useDeleteSeverityClasificationMutation,
  useGetAllSeverityClasificationsQuery,
} from "@/redux/apis/severity_clasification/severityClasificationApi";

const SeverityClasificationContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allSeverityClasificationData,
    isFetching: allSeverityClasificationDataFetching,
    isLoading: allSeverityClasificationDataLoading,
    error: allSeverityClasificationDataError,
    refetch: allSeverityClasificationDataRefetch,
  } = useGetAllSeverityClasificationsQuery(null);

  const [deleteSeverityClasification] =
    useDeleteSeverityClasificationMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response: any = await deleteSeverityClasification(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allSeverityClasificationDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log("Error :", error);
    } finally {
      allSeverityClasificationDataRefetch();
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
        dataCustomTable={allSeverityClasificationData || []}
        onClickRechargeCustomTable={allSeverityClasificationDataRefetch}
        loading={
          allSeverityClasificationDataLoading ||
          allSeverityClasificationDataFetching
        }
        customButton={
          <CreateSeverityClasifButtonComponent
            onNewRegister={allSeverityClasificationDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsSeverityClasification({
          handleClickDelete,
          onRefetchRegister: allSeverityClasificationDataRefetch
        })}
      />
    </div>
  );
};

export default SeverityClasificationContent;
