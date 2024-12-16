"use client";

import React, { useState } from "react";

import CreateFailedMeasureButtonComponent from "@/components/configuration/failed_measure/buttons/CreateFailedMeasureButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsFailedMeasure from "./table_columns/TableColumnsFailedMeasure";

import {
  useDeleteFailedMeasureMutation,
  useGetAllFailedMeasuresQuery,
} from "@/redux/apis/failed_measure/failedMeasureApi";

const FailedMeasureContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allFailedMeasuresData,
    isFetching: allFailedMeasuresDataFetching,
    isLoading: allFailedMeasuresDataLoading,
    error: allFailedMeasuresDataError,
    refetch: allFailedMeasuresDataRefetch,
  } = useGetAllFailedMeasuresQuery(null);

  const [deleteFailedMeasure] = useDeleteFailedMeasureMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteFailedMeasure(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allFailedMeasuresDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allFailedMeasuresDataRefetch();
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
        dataCustomTable={allFailedMeasuresData || []}
        onClickRechargeCustomTable={allFailedMeasuresDataRefetch}
        loading={allFailedMeasuresDataLoading || allFailedMeasuresDataFetching}
        customButton={
          <CreateFailedMeasureButtonComponent
            onNewRegister={allFailedMeasuresDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsFailedMeasure({
          handleClickDelete,
          onRefetchRegister: allFailedMeasuresDataRefetch,
        })}
      />
    </div>
  );
};

export default FailedMeasureContent;
