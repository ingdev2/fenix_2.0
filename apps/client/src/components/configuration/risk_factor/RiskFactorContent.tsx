"use client";

import React, { useState } from "react";

import CreateRiskFactorButtonComponent from "@/components/configuration/risk_factor/buttons/CreateRiskFactorButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsRiskFactor from "./table_columns/TableColumnsRiskFactor";

import {
  useDeleteRiskFactorMutation,
  useGetAllRiskFactorsQuery,
} from "@/redux/apis/risk_factor/riskFactorApi";

const RiskFactorContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: alltAllRiskFactorsData,
    isFetching: alltAllRiskFactorsDataFetching,
    isLoading: alltAllRiskFactorsDataLoading,
    error: alltAllRiskFactorsDataError,
    refetch: alltAllRiskFactorsDataRefetch,
  } = useGetAllRiskFactorsQuery(null);

  const [deleteRiskFactor] = useDeleteRiskFactorMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteRiskFactor(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        alltAllRiskFactorsDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      alltAllRiskFactorsDataRefetch();
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
        dataCustomTable={alltAllRiskFactorsData || []}
        onClickRechargeCustomTable={alltAllRiskFactorsDataRefetch}
        loading={
          alltAllRiskFactorsDataLoading || alltAllRiskFactorsDataFetching
        }
        customButton={
          <CreateRiskFactorButtonComponent
            onNewRegister={alltAllRiskFactorsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsRiskFactor({
          handleClickDelete,
          onRefetchRegister: alltAllRiskFactorsDataRefetch,
        })}
      />
    </div>
  );
};

export default RiskFactorContent;
