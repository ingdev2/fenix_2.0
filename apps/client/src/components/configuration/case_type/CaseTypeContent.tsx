"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CreateCaseTypeButtonComponent from "./buttons/CreateCaseTypeButton";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import TableColumnsCaseType from "./table_columns/TableColumnsCaseType";

import {
  useDeleteCaseTypeMutation,
  useGetAllCaseTypesQuery,
} from "@/redux/apis/case_type/caseTypeApi";

const CaseTypeContent = () => {
  const dispatch = useDispatch();

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

  const [deleteCaseType] = useDeleteCaseTypeMutation();

  const handleClickDelete = async (recordId: number) => {
    try {
      const response: any = await deleteCaseType(recordId);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allCaseTypesDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log("Error: ", error);
    } finally {
      allCaseTypesDataRefetch();
    }
  };
  return (
    <div style={{ padding: "22px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={allCaseTypesData || []}
        onClickRechargeCustomTable={allCaseTypesDataRefetch}
        loading={allCaseTypesDataLoading || allCaseTypesDataFetching}
        customButton={
          <CreateCaseTypeButtonComponent
            onNewRegister={allCaseTypesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsCaseType({
          handleClickDelete,
          onRefetchRegister: allCaseTypesDataRefetch,
        })}
      />
    </div>
  );
};

export default CaseTypeContent;
