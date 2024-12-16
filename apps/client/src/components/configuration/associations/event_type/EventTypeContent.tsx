"use client";
import React, { useState } from "react";
import CreateStrategyButtonComponent from "@/components/configuration/associations/event_type/buttons/CreateEventTypeButtonComponent";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsEventType from "./table_columns/TableColumsEventType";

import {
  useDeleteEventTypeMutation,
  useGetAllEventTypesQuery,
} from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetAllOncologyCategoriesQuery } from "@/redux/apis/oncology_category/oncologyCategory";
import { useGetAllCharacterizationCasesQuery } from "@/redux/apis/characterization_case/charecterizationCaseApi";

import { getNameOfCaseTypeMap } from "@/helpers/get_name_by_id/get_name_of_case_type";
import { getNameOfOncologyCategoryMap } from "@/helpers/get_name_by_id/get_name_of_oncology_category";
import { getNameOfCharacterizationCaseMap } from "@/helpers/get_name_by_id/get_name_of_characterization_case";

const EventTypeContent = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allEventTypesData,
    isFetching: allEventTypesDataFetching,
    isLoading: allEventTypesDataLoading,
    error: allEventTypesDataError,
    refetch: allEventTypesDataRefetch,
  } = useGetAllEventTypesQuery(null);

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

  const {
    data: allOncologyCategoriesData,
    isFetching: allOncologyCategoriesDataFetching,
    isLoading: allOncologyCategoriesDataLoading,
    error: allOncologyCategoriesDataError,
    refetch: allOncologyCategoriesDataRefetch,
  } = useGetAllOncologyCategoriesQuery(null);

  const {
    data: allCharacterizationCasesData,
    isFetching: allCharacterizationCasesDataFetching,
    isLoading: allCharacterizationCasesDataLoading,
    error: allCharacterizationCasesDataError,
    refetch: allCharacterizationCasesDataRefetch,
  } = useGetAllCharacterizationCasesQuery(null);

  const [deleteEventType] = useDeleteEventTypeMutation();

  const caseTypeGetName = getNameOfCaseTypeMap(allCaseTypesData);
  const oncologyCategoryGetName = getNameOfOncologyCategoryMap(
    allOncologyCategoriesData
  );
  const characterizationCaseGetName = getNameOfCharacterizationCaseMap(
    allCharacterizationCasesData
  );

  const transformedData = Array.isArray(allEventTypesData)
    ? allEventTypesData.map((req: EventType) => ({
        ...req,
        eve_t_casetype_id_fk: caseTypeGetName?.[req.eve_t_casetype_id_fk],
        eve_t_oncologycategory_id_fk:
          oncologyCategoryGetName?.[req.eve_t_oncologycategory_id_fk],
        eve_t_characterizationcase_id_fk:
          characterizationCaseGetName?.[req.eve_t_characterizationcase_id_fk],
      }))
    : [];

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteEventType(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allEventTypesDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allEventTypesDataRefetch();
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
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allEventTypesDataRefetch}
        loading={allEventTypesDataLoading || allEventTypesDataFetching}
        customButton={
          <CreateStrategyButtonComponent
            onNewRegister={allEventTypesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsEventType({
          handleClickDelete,
          onRefetchRegister: allEventTypesDataRefetch,
          caseTypeData: allCaseTypesData,
          oncologyCategoryData: allOncologyCategoriesData,
          characterizationCaseData: allCharacterizationCasesData
        })}
      />
    </div>
  );
};

export default EventTypeContent;
