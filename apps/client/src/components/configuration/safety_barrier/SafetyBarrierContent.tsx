"use client";
import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateSafetyBarrierButtonComponent from "@/components/configuration/safety_barrier/buttons/CreateSafetyBarrierButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsSafetyBarrier from "./table_columns/TableColumnsSafetyBarrier";

import {
  useDeleteSafetyBarrierMutation,
  useGetAllSafetyBarriersQuery,
} from "@/redux/apis/safety_barrier/safetyBarrierApi";

const SafetyBarrierContent: React.FC = () => {
  const dispatch = useDispatch();

  const {
    data: allSafetyBarrierData,
    isFetching: allSafetyBarrierDataFetching,
    isLoading: allSafetyBarrierDataLoading,
    error: allSafetyBarrierDataError,
    refetch: allSafetyBarrierDataRefetch,
  } = useGetAllSafetyBarriersQuery(null);

  const [deleteSafetyBarrier] = useDeleteSafetyBarrierMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteSafetyBarrier(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allSafetyBarrierDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allSafetyBarrierDataRefetch();
    }
  };

  return (
    <div style={{ padding: "22px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={allSafetyBarrierData || []}
        onClickRechargeCustomTable={allSafetyBarrierDataRefetch}
        loading={allSafetyBarrierDataLoading || allSafetyBarrierDataFetching}
        customButton={
          <CreateSafetyBarrierButtonComponent
            onNewRegister={allSafetyBarrierDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsSafetyBarrier({
          handleClickDelete,
          onRefetchRegister: allSafetyBarrierDataRefetch,
        })}
      />
    </div>
  );
};

export default SafetyBarrierContent;
