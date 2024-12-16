"use client";

import React, { useEffect, useState } from "react";

import CreatePriorityButtonComponent from "@/components/configuration/priority/buttons/CreatePriorityButtonComponent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsPriority from "./table_columns/TableColumnsPriority";

import {
  useDeletePriorityMutation,
  useGetAllPrioritiesQuery,
} from "@/redux/apis/priority/priorityApi";

const PriorityContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allPrioritiesData,
    isFetching: allPrioritiesDataFetching,
    isLoading: allPrioritiesDataLoading,
    error: allPrioritiesDataError,
    refetch: allPrioritiesDataRefetch,
  } = useGetAllPrioritiesQuery(null);

  const [deletePriority] = useDeletePriorityMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deletePriority(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allPrioritiesDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allPrioritiesDataRefetch();
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
        dataCustomTable={allPrioritiesData || []}
        onClickRechargeCustomTable={allPrioritiesDataRefetch}
        loading={allPrioritiesDataLoading || allPrioritiesDataFetching}
        customButton={
          <CreatePriorityButtonComponent
            onNewRegister={allPrioritiesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsPriority({
          handleClickDelete,
          onRefetchRegister: allPrioritiesDataRefetch,
          priorityData: allPrioritiesData
        })}
      />
    </div>
  );
};

export default PriorityContent;
