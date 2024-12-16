"use client";

import React, { useState } from "react";

import CreateDeviceTypeButtonComponent from "@/components/configuration/device_type/buttons/CreateDeviceTypeButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsDeviceType from "./table_columns/TableColumnsDeviceType";

import { useDeleteDeviceTypeMutation, useGetAllDeviceTypesQuery } from "@/redux/apis/device_type/deviceTypeApi";

const DeviceTypeContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allDeviceTypesDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allDeviceTypesDataRefetch();
    }
  };
  return (
    <div style={{ padding: "32px" }}>
      {showErrorMessage && (
        <CustomMessage typeMessage="error" message={errorMessage} />
      )}
      {showSuccessMessage && (
        <CustomMessage typeMessage="success" message={successMessage} />
      )}
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
