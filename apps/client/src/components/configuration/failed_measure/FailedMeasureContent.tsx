"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateFailedMeasureButtonComponent from "@/components/configuration/failed_measure/buttons/CreateFailedMeasureButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsFailedMeasure from "./table_columns/TableColumnsFailedMeasure";

import {
  useDeleteFailedMeasureMutation,
  useGetAllFailedMeasuresQuery,
} from "@/redux/apis/failed_measure/failedMeasureApi";

const FailedMeasureContent = () => {
  const dispatch = useDispatch();

  const {
    data: allFailedMeasuresData,
    isFetching: allFailedMeasuresDataFetching,
    isLoading: allFailedMeasuresDataLoading,
    error: allFailedMeasuresDataError,
    refetch: allFailedMeasuresDataRefetch,
  } = useGetAllFailedMeasuresQuery(null);

  const [deleteFailedMeasure] = useDeleteFailedMeasureMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteFailedMeasure(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allFailedMeasuresDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allFailedMeasuresDataRefetch();
    }
  };

  return (
    <div style={{ padding: "22px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={allFailedMeasuresData || []}
        onClickRechargeCustomTable={allFailedMeasuresDataRefetch}
        loading={allFailedMeasuresDataLoading || allFailedMeasuresDataFetching}
        customButton={
          <CreateFailedMeasureButtonComponent
            onNewRegister={allFailedMeasuresDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsFailedMeasure({
          handleClickDelete,
          onRefetchRegister: allFailedMeasuresDataRefetch,
        })}
      />
    </div>
  );
};

export default FailedMeasureContent;
