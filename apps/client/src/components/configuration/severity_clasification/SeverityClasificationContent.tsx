"use client";
import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateSeverityClasifButtonComponent from "@/components/configuration/severity_clasification/buttons/CreateSeverityClasificationButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsSeverityClasification from "./table_columns/TableColumnsSeverityClasification";

import {
  useDeleteSeverityClasificationMutation,
  useGetAllSeverityClasificationsQuery,
} from "@/redux/apis/severity_clasification/severityClasificationApi";

const SeverityClasificationContent: React.FC = () => {
  const dispatch = useDispatch();

  const {
    data: allSeverityClasificationData,
    isFetching: allSeverityClasificationDataFetching,
    isLoading: allSeverityClasificationDataLoading,
    error: allSeverityClasificationDataError,
    refetch: allSeverityClasificationDataRefetch,
  } = useGetAllSeverityClasificationsQuery(null);

  const [deleteSeverityClasification] =
    useDeleteSeverityClasificationMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response: any = await deleteSeverityClasification(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allSeverityClasificationDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log("Error :", error);
    } finally {
      allSeverityClasificationDataRefetch();
    }
  };
  return (
    <div style={{ padding: "22px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={allSeverityClasificationData || []}
        onClickRechargeCustomTable={allSeverityClasificationDataRefetch}
        loading={
          allSeverityClasificationDataLoading ||
          allSeverityClasificationDataFetching
        }
        customButton={
          <CreateSeverityClasifButtonComponent
            onNewRegister={allSeverityClasificationDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsSeverityClasification({
          handleClickDelete,
          onRefetchRegister: allSeverityClasificationDataRefetch,
        })}
      />
    </div>
  );
};

export default SeverityClasificationContent;
