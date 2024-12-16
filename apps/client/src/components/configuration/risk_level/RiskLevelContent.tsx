"use client";

import React, { useState } from "react";

import CreateRiskLevelButtonComponent from "@/components/configuration/risk_level/buttons/CreateRiskLevelButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsRiskLevel from "./table_columns/TableColumnsRiskLevel";

import {
  useDeleteRiskLevelMutation,
  useGetAllRiskLevelsQuery,
} from "@/redux/apis/risk_level/riskLevelApi";

const RiskLevelContent = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allRiskLevelsData,
    isFetching: allRiskLevelsDataFetching,
    isLoading: allRiskLevelsDataLoading,
    error: allRiskLevelsDataError,
    refetch: allRiskLevelsDataRefetch,
  } = useGetAllRiskLevelsQuery(null);

  const [deleteRiskLevel] = useDeleteRiskLevelMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response: any = await deleteRiskLevel(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allRiskLevelsDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allRiskLevelsDataRefetch();
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
        dataCustomTable={allRiskLevelsData || []}
        onClickRechargeCustomTable={allRiskLevelsDataRefetch}
        loading={allRiskLevelsDataLoading || allRiskLevelsDataFetching}
        customButton={
          <CreateRiskLevelButtonComponent
            onNewRegister={allRiskLevelsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsRiskLevel({
          handleClickDelete,
          onRefetchRegister: allRiskLevelsDataRefetch,
        })}
      />
    </div>
  );
};

export default RiskLevelContent;
