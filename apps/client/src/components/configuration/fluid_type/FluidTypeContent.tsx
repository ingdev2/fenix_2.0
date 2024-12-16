"use client";

import React, { useEffect, useState } from "react";

import { Button, Col, Empty, message, Row, Skeleton, Space, Table } from "antd";
import {
  ReloadOutlined,
  LoadingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CreateFluidTypeButtonComponent from "@/components/configuration/fluid_type/buttons/CreateFluidTypeButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsFluidType from "./table_columns/TableColumnsFluidType";

import {
  deletedFluidType,
  getFluidTypes,
} from "@/api/configuration/fluid_type";
import {
  useDeleteFluidTypeMutation,
  useGetAllFluidTypesQuery,
} from "@/redux/apis/fluid_type/fluidTypeApi";

const FluidTypeContent = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allFluidTypesDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allFluidTypesDataRefetch();
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
