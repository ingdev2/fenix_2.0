"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateResearchInstrumentButtonComponent from "@/components/configuration/research_instrument/buttons/CreateResearchInstrumentButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsResearchInstrument from "./table_columns/TableColumnsResearchInstrument";

import {
  useDeleteResearchInstrumentMutation,
  useGetAllResearchInstrumentsQuery,
} from "@/redux/apis/research_instrument/researchInstrumentApi";

const ResearchInstrumentContent = () => {
  const dispatch = useDispatch();

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
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allResearchInstrumentsDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log(error);
    } finally {
      allResearchInstrumentsDataRefetch();
    }
  };

  return (
    <div style={{ padding: "22px" }}>
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
