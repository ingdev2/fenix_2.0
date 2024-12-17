"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateDeviceTypeButtonComponent from "@/components/configuration/device_type/buttons/CreateDeviceTypeButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsDeviceType from "./table_columns/TableColumnsDeviceType";

import {
  useDeleteDeviceTypeMutation,
  useGetAllDeviceTypesQuery,
} from "@/redux/apis/device_type/deviceTypeApi";

const DeviceTypeContent = () => {
  const dispatch = useDispatch();

  const {
    data: allDeviceTypesData,
    isFetching: allDeviceTypesDataFetching,
    isLoading: allDeviceTypesDataLoading,
    error: allDeviceTypesDataError,
    refetch: allDeviceTypesDataRefetch,
  } = useGetAllDeviceTypesQuery(null);

  const [deleteDeviceType] = useDeleteDeviceTypeMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response: any = await deleteDeviceType(id);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allDeviceTypesDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allDeviceTypesDataRefetch();
    }
  };
  return (
    <div style={{ padding: "22px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={allDeviceTypesData || []}
        onClickRechargeCustomTable={allDeviceTypesDataRefetch}
        loading={allDeviceTypesDataLoading || allDeviceTypesDataFetching}
        customButton={
          <CreateDeviceTypeButtonComponent
            onNewRegister={allDeviceTypesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsDeviceType({
          handleClickDelete,
          onRefetchRegister: allDeviceTypesDataRefetch,
        })}
      />
    </div>
  );
};

export default DeviceTypeContent;
