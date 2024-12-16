"use client";

import React, { useEffect, useState } from "react";

import CreateOriginButtonComponent from "@/components/configuration/origin/buttons/CreateOriginButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsOrigin from "./table_columns/TableColumnsOrigin";

import {
  useDeleteOriginMutation,
  useGetAllOriginsQuery,
} from "@/redux/apis/origin/originApi";

const OriginContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allOriginsData,
    isFetching: allOriginsDataFetching,
    isLoading: allOriginsDataLoading,
    error: allOriginsDataError,
    refetch: allOriginsDataRefetch,
  } = useGetAllOriginsQuery(null);

  const [deleteOrigin] = useDeleteOriginMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response: any = await deleteOrigin(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allOriginsDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allOriginsDataRefetch();
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
        dataCustomTable={allOriginsData || []}
        onClickRechargeCustomTable={allOriginsDataRefetch}
        loading={allOriginsDataLoading || allOriginsDataFetching}
        customButton={
          <CreateOriginButtonComponent onNewRegister={allOriginsDataRefetch} />
        }
        columnsCustomTable={TableColumnsOrigin({
          handleClickDelete,
          onRefetchRegister: allOriginsDataRefetch,
        })}
      />
    </div>
  );
};

export default OriginContent;
