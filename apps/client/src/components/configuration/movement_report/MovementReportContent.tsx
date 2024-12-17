"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateMovementReportButtonComponent from "@/components/configuration/movement_report/buttons/CreateMovementReportButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsMovementReport from "./table_columns/TableColumnsMovementReport";

import {
  useDeleteMovementReportMutation,
  useGetAllMovementReportsQuery,
} from "@/redux/apis/movement_report/movementReportApi";

const MovementReportContent = () => {
  const dispatch = useDispatch();

  const {
    data: allMovementReportsData,
    isFetching: allMovementReportsDataFetching,
    isLoading: allMovementReportsDataLoading,
    error: allMovementReportsDataError,
    refetch: allMovementReportsDataRefetch,
  } = useGetAllMovementReportsQuery(null);

  const [deleteMovementReport] = useDeleteMovementReportMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteMovementReport(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allMovementReportsDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log("Error: ", error);
    } finally {
      allMovementReportsDataRefetch();
    }
  };

  return (
    <div style={{ padding: "22px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={allMovementReportsData || []}
        onClickRechargeCustomTable={allMovementReportsDataRefetch}
        loading={
          allMovementReportsDataLoading || allMovementReportsDataFetching
        }
        customButton={
          <CreateMovementReportButtonComponent
            onNewRegister={allMovementReportsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsMovementReport({
          handleClickDelete,
          onRefetchRegister: allMovementReportsDataRefetch,
        })}
      />
    </div>
  );
};

export default MovementReportContent;
