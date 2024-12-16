"use client";

import React, { useState } from "react";

import CreateDamageTypeButtonComponent from "./buttons/CreateDamageTypeButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsDamageType from "./table_columns/TableColumnsDamageType";

import {
  useDeleteDamageTypeMutation,
  useGetAllDamageTypesQuery,
} from "@/redux/apis/damage_type/damageTypeApi";

const DamageTypeContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allDamageTypesData,
    isFetching: allDamageTypesDataFetching,
    isLoading: allDamageTypesDataLoading,
    error: allDamageTypesDataError,
    refetch: allDamageTypesDataRefetch,
  } = useGetAllDamageTypesQuery(null);

  const [deleteDamageType] = useDeleteDamageTypeMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response: any = await deleteDamageType(id);

      if (response.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.message);
        allDamageTypesDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allDamageTypesDataRefetch();
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
        dataCustomTable={allDamageTypesData || []}
        onClickRechargeCustomTable={allDamageTypesDataRefetch}
        loading={allDamageTypesDataLoading || allDamageTypesDataFetching}
        customButton={
          <CreateDamageTypeButtonComponent
            onNewRegister={allDamageTypesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsDamageType({
          handleClickDelete,
          onRefetchRegister: allDamageTypesDataRefetch,
        })}
      />
    </div>
  );
};

export default DamageTypeContent;
