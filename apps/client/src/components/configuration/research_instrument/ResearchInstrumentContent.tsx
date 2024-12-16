"use client";

import React, { useEffect, useState } from "react";

import CreateResearchInstrumentButtonComponent from "@/components/configuration/research_instrument/buttons/CreateResearchInstrumentButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsResearchInstrument from "./table_columns/TableColumnsResearchInstrument";

import {
  deletedResearchInstrument,
  getResearchInstruments,
} from "@/api/configuration/research_instrument";
import {
  useDeleteResearchInstrumentMutation,
  useGetAllResearchInstrumentsQuery,
} from "@/redux/apis/research_instrument/researchInstrumentApi";

const ResearchInstrumentContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allResearchInstrumentsData,
    isFetching: allResearchInstrumentsDataFetching,
    isLoading: allResearchInstrumentsDataLoading,
    error: allResearchInstrumentsDataError,
    refetch: allResearchInstrumentsDataRefetch,
  } = useGetAllResearchInstrumentsQuery(null);

  const [deleteResearchInstrument] = useDeleteResearchInstrumentMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteResearchInstrument(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allResearchInstrumentsDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allResearchInstrumentsDataRefetch();
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
        dataCustomTable={allResearchInstrumentsData || []}
        onClickRechargeCustomTable={allResearchInstrumentsDataRefetch}
        loading={
          allResearchInstrumentsDataLoading ||
          allResearchInstrumentsDataFetching
        }
        customButton={
          <CreateResearchInstrumentButtonComponent
            onNewRegister={allResearchInstrumentsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsResearchInstrument({
          handleClickDelete,
          onRefetchRegister: allResearchInstrumentsDataRefetch,
        })}
      />
    </div>
  );
};

export default ResearchInstrumentContent;
