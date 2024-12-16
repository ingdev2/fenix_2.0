"use client";

import React, { useEffect, useState } from "react";

import CreateProtocolButtonComponent from "@/components/configuration/protocol/buttons/CreateProtocolButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsProtocol from "./table_columns/TableColumnsProtocol";

import {
  useDeleteProtocolMutation,
  useGetAllProtocolsQuery,
} from "@/redux/apis/protocol/protocolApi";

const ProtocolContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allProtocolsData,
    isFetching: allProtocolsDataFetching,
    isLoading: allProtocolsDataLoading,
    error: allProtocolsDataError,
    refetch: allProtocolsDataRefetch,
  } = useGetAllProtocolsQuery(null);

  const [deleteProtocol] = useDeleteProtocolMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteProtocol(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allProtocolsDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allProtocolsDataRefetch();
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
        dataCustomTable={allProtocolsData || []}
        onClickRechargeCustomTable={allProtocolsDataRefetch}
        loading={allProtocolsDataLoading || allProtocolsDataFetching}
        customButton={
          <CreateProtocolButtonComponent
            onNewRegister={allProtocolsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsProtocol({
          handleClickDelete,
          onRefetchRegister: allProtocolsDataRefetch,
        })}
      />
    </div>
  );
};

export default ProtocolContent;
