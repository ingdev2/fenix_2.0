"use client";

import React, { useState } from "react";

import CreateSafetyBarrierButtonComponent from "@/components/configuration/safety_barrier/buttons/CreateSafetyBarrierButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsSafetyBarrier from "./table_columns/TableColumnsSafetyBarrier";

import {
  useDeleteSafetyBarrierMutation,
  useGetAllSafetyBarriersQuery,
} from "@/redux/apis/safety_barrier/safetyBarrierApi";

const SafetyBarrierContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allSafetyBarrierDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allSafetyBarrierDataRefetch();
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
