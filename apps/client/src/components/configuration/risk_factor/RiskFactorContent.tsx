"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateRiskFactorButtonComponent from "@/components/configuration/risk_factor/buttons/CreateRiskFactorButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsRiskFactor from "./table_columns/TableColumnsRiskFactor";

import {
  useDeleteRiskFactorMutation,
  useGetAllRiskFactorsQuery,
} from "@/redux/apis/risk_factor/riskFactorApi";

const RiskFactorContent = () => {
  const dispatch = useDispatch();

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
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        alltAllRiskFactorsDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      alltAllRiskFactorsDataRefetch();
    }
  };
  return (
    <div style={{ padding: "22px" }}>
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
