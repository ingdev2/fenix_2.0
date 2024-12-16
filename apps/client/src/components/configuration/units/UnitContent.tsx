"use client";

import React, { useEffect, useState } from "react";

import CreateUnitButtonComponent from "@/components/configuration/units/buttons/CreateUnitButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsUnit from "./table_columns/TableColumnsUnit";

import {
  useDeleteUnitMutation,
  useGetAllUnitsQuery,
} from "@/redux/apis/unit/unitApi";

const UnitContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allUnitsData,
    isFetching: allUnitsDataFetching,
    isLoading: allUnitsDataLoading,
    error: allUnitsDataError,
    refetch: allUnitsDataRefetch,
  } = useGetAllUnitsQuery(null);

  const [deleteUnit] = useDeleteUnitMutation();

  const handleClickDelete = async (recordId: number) => {
    try {
      const response: any = await deleteUnit(recordId);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allUnitsDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log("Error:", error);
    } finally {
      allUnitsDataRefetch();
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
        dataCustomTable={allUnitsData || []}
        onClickRechargeCustomTable={allUnitsDataRefetch}
        loading={allUnitsDataLoading || allUnitsDataFetching}
        customButton={
          <CreateUnitButtonComponent onNewRegister={allUnitsDataRefetch} />
        }
        columnsCustomTable={TableColumnsUnit({
          handleClickDelete,
          onRefetchRegister: allUnitsDataRefetch,
        })}
      />
    </div>
  );
};

export default UnitContent;
