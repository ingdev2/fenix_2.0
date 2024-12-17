"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateRiskLevelButtonComponent from "@/components/configuration/risk_level/buttons/CreateRiskLevelButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsRiskLevel from "./table_columns/TableColumnsRiskLevel";

import {
  useDeleteRiskLevelMutation,
  useGetAllRiskLevelsQuery,
} from "@/redux/apis/risk_level/riskLevelApi";

const RiskLevelContent = () => {
  const dispatch = useDispatch();

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
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allRiskLevelsDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allRiskLevelsDataRefetch();
    }
  };

  return (
    <div style={{ padding: "22px" }}>
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
