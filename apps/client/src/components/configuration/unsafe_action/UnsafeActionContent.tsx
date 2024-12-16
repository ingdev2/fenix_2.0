"use client";

import React, { useState } from "react";

import CreateUnsafeActionButtonComponent from "@/components/configuration/unsafe_action/buttons/CreateUnsafeActionButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsUnsafeAction from "./table_columns/TableColumsUnsafeAction";

import {
  useDeleteUnsafeActionMutation,
  useGetAllUnsafeActionsQuery,
} from "@/redux/apis/unsafe_action/unsafeActionApi";

const UnsafeActionContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allUnsafeActionsData,
    isFetching: allUnsafeActionsDataFetching,
    isLoading: allUnsafeActionsDataLoading,
    error: allUnsafeActionsDataError,
    refetch: allUnsafeActionsDataRefetch,
  } = useGetAllUnsafeActionsQuery(null);

  const [deleteUnsafeAction] = useDeleteUnsafeActionMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteUnsafeAction(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allUnsafeActionsDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allUnsafeActionsDataRefetch();
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
        dataCustomTable={allUnsafeActionsData || []}
        onClickRechargeCustomTable={allUnsafeActionsDataRefetch}
        loading={allUnsafeActionsDataLoading || allUnsafeActionsDataFetching}
        customButton={
          <CreateUnsafeActionButtonComponent
            onNewRegister={allUnsafeActionsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsUnsafeAction({
          handleClickDelete,
          onRefetchRegister: allUnsafeActionsDataRefetch,
        })}
      />
    </div>
  );
};

export default UnsafeActionContent;
