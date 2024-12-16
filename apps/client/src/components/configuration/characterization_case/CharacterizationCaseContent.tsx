"use client";

import React, { useState } from "react";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CreateCharacterizationCaseButtonComponent from "./buttons/CreateCharacterizationCaseButton";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsCharacterizationCase from "./table_colums/TableColumnsCharacterizationCase";

import {
  useDeleteCharacterizationCaseMutation,
  useGetAllCharacterizationCasesQuery,
} from "@/redux/apis/characterization_case/charecterizationCaseApi";

const CharacterizationCaseContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allCharacterizationCasesData,
    isFetching: allCharacterizationCasesDataFetching,
    isLoading: allCharacterizationCasesDataLoading,
    error: allCharacterizationCasesDataError,
    refetch: allCharacterizationCasesDataRefetch,
  } = useGetAllCharacterizationCasesQuery(null);

  const [deleteCharacterizationCase] = useDeleteCharacterizationCaseMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response: any = await deleteCharacterizationCase(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allCharacterizationCasesDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allCharacterizationCasesDataRefetch();
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
        dataCustomTable={allCharacterizationCasesData || []}
        onClickRechargeCustomTable={allCharacterizationCasesDataRefetch}
        loading={
          allCharacterizationCasesDataLoading ||
          allCharacterizationCasesDataFetching
        }
        customButton={
          <CreateCharacterizationCaseButtonComponent
            onNewRegister={allCharacterizationCasesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsCharacterizationCase({
          handleClickDelete,
          onRefetchRegister: allCharacterizationCasesDataRefetch
        })}
      />
    </div>
  );
};

export default CharacterizationCaseContent;
