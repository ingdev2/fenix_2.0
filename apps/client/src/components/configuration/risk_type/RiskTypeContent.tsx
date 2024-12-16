"use client";

import React, { useState } from "react";

import CreateRiskTypeButtonComponent from "@/components/configuration/risk_type/buttons/CreateRiskTypeButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsRiskType from "./table_columns/TableColumnsRiskType";

import {
  useDeleteRiskTypeMutation,
  useGetAllRiskTypesQuery,
} from "@/redux/apis/risk_type/riskTypeApi";

const RiskTypeContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allRiskTypeData,
    isFetching: allRiskTypeDataFetching,
    isLoading: allRiskTypeDataLoading,
    error: allRiskTypeDataError,
    refetch: allRiskTypeDataRefetch,
  } = useGetAllRiskTypesQuery(null);

  const [deleteRiskType] = useDeleteRiskTypeMutation();

  const handleClickDelete = async (recordId: number) => {
    try {
      const response: any = await deleteRiskType(recordId);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allRiskTypeDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log("Error:", error);
    } finally {
      allRiskTypeDataRefetch();
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
        dataCustomTable={allRiskTypeData || []}
        onClickRechargeCustomTable={allRiskTypeDataRefetch}
        loading={allRiskTypeDataLoading || allRiskTypeDataFetching}
        customButton={
          <CreateRiskTypeButtonComponent
            onNewRegister={allRiskTypeDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsRiskType({
          handleClickDelete,
          onRefetchRegister: allRiskTypeDataRefetch,
        })}
      />
    </div>
  );
};

export default RiskTypeContent;
