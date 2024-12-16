"use client";

import React, { useState } from "react";

import CreateSubOriginButtonComponent from "@/components/configuration/sub_origin/buttons/CreateSubOriginButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsSubOrigin from "./table_columns/TableColumnsSubOrigin";

import {
  useDeleteSubOriginMutation,
  useGetAllSubOriginsQuery,
} from "@/redux/apis/sub_origin/subOriginApi";

const SubOriginContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allSubOriginsData,
    isFetching: allSubOriginsDataFetching,
    isLoading: allSubOriginsDataLoading,
    error: allSubOriginsDataError,
    refetch: allSubOriginsDataRefetch,
  } = useGetAllSubOriginsQuery(null);

  const [deleteSubOrigin] = useDeleteSubOriginMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteSubOrigin(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allSubOriginsDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allSubOriginsDataRefetch();
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
        dataCustomTable={allSubOriginsData || []}
        onClickRechargeCustomTable={allSubOriginsDataRefetch}
        loading={allSubOriginsDataLoading || allSubOriginsDataFetching}
        customButton={
          <CreateSubOriginButtonComponent
            onNewRegister={allSubOriginsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsSubOrigin({
          handleClickDelete,
          onRefetchRegister: allSubOriginsDataRefetch,
          subOriginData: allSubOriginsData
        })}
      />
    </div>
  );
};

export default SubOriginContent;
