"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateFluidTypeButtonComponent from "@/components/configuration/fluid_type/buttons/CreateFluidTypeButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsFluidType from "./table_columns/TableColumnsFluidType";

import {
  useDeleteFluidTypeMutation,
  useGetAllFluidTypesQuery,
} from "@/redux/apis/fluid_type/fluidTypeApi";

const FluidTypeContent = () => {
  const dispatch = useDispatch();

  const {
    data: allFluidTypesData,
    isFetching: allFluidTypesDataFetching,
    isLoading: allFluidTypesDataLoading,
    error: allFluidTypesDataError,
    refetch: allFluidTypesDataRefetch,
  } = useGetAllFluidTypesQuery(null);

  const [deleteFluidType] = useDeleteFluidTypeMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteFluidType(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allFluidTypesDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allFluidTypesDataRefetch();
    }
  };

  return (
    <div style={{ padding: "22px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={allFluidTypesData || []}
        onClickRechargeCustomTable={allFluidTypesDataRefetch}
        loading={allFluidTypesDataLoading || allFluidTypesDataFetching}
        customButton={
          <CreateFluidTypeButtonComponent
            onNewRegister={allFluidTypesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsFluidType({
          handleClickDelete,
          onRefetchRegister: allFluidTypesDataRefetch,
        })}
      />
    </div>
  );
};

export default FluidTypeContent;
