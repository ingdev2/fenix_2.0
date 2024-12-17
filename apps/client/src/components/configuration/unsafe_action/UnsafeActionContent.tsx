"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateUnsafeActionButtonComponent from "@/components/configuration/unsafe_action/buttons/CreateUnsafeActionButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsUnsafeAction from "./table_columns/TableColumsUnsafeAction";

import {
  useDeleteUnsafeActionMutation,
  useGetAllUnsafeActionsQuery,
} from "@/redux/apis/unsafe_action/unsafeActionApi";

const UnsafeActionContent: React.FC = () => {
  const dispatch = useDispatch();

  const {
    data: allUnsafeActionsData,
    isFetching: allUnsafeActionsDataFetching,
    isLoading: allUnsafeActionsDataLoading,
    error: allUnsafeActionsDataError,
    refetch: allUnsafeActionsDataRefetch,
  } = useGetAllUnsafeActionsQuery(null);

  const [deleteUnsafeAction] = useDeleteUnsafeActionMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteUnsafeAction(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allUnsafeActionsDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allUnsafeActionsDataRefetch();
    }
  };

  return (
    <div style={{ padding: "22px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={allUnsafeActionsData || []}
        onClickRechargeCustomTable={allUnsafeActionsDataRefetch}
        loading={allUnsafeActionsDataLoading || allUnsafeActionsDataFetching}
        customButton={
          <CreateUnsafeActionButtonComponent
            onNewRegister={allUnsafeActionsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsUnsafeAction({
          handleClickDelete,
          onRefetchRegister: allUnsafeActionsDataRefetch,
        })}
      />
    </div>
  );
};

export default UnsafeActionContent;
