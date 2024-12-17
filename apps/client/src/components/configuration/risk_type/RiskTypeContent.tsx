"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateRiskTypeButtonComponent from "@/components/configuration/risk_type/buttons/CreateRiskTypeButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsRiskType from "./table_columns/TableColumnsRiskType";

import {
  useDeleteRiskTypeMutation,
  useGetAllRiskTypesQuery,
} from "@/redux/apis/risk_type/riskTypeApi";

const RiskTypeContent: React.FC = () => {
  const dispatch = useDispatch();

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
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allRiskTypeDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log("Error:", error);
    } finally {
      allRiskTypeDataRefetch();
    }
  };

  return (
    <div style={{ padding: "22px" }}>
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
