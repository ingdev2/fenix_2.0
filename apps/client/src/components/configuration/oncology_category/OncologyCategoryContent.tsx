"use client";

import React from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import CreateOncologyCategoryButtonComponent from "./buttons/CreateOncologyCategoryButton";

import TableColumnsOncologyCategory from "./table_columns/TableColumsOncologyCategory";

import {
  useDeleteOncologyCategoryMutation,
  useGetAllOncologyCategoriesQuery,
} from "@/redux/apis/oncology_category/oncologyCategoryApi";

const OncologyCategoryContent = () => {
  const dispatch = useDispatch();

  const {
    data: allOncologyCategoriesData,
    isFetching: allOncologyCategoriesDataFetching,
    isLoading: allOncologyCategoriesDataLoading,
    error: allOncologyCategoriesDataError,
    refetch: allOncologyCategoriesDataRefetch,
  } = useGetAllOncologyCategoriesQuery(null);

  const [deleteOncologyCategory] = useDeleteOncologyCategoryMutation();

  const handleClickDelete = async (recordId: number) => {
    try {
      const response: any = await deleteOncologyCategory(recordId);

      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        allOncologyCategoriesDataRefetch();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.log("Error: ", error);
    } finally {
      allOncologyCategoriesDataRefetch();
    }
  };
  return (
    <div style={{ padding: "22px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={allOncologyCategoriesData || []}
        onClickRechargeCustomTable={allOncologyCategoriesDataRefetch}
        loading={
          allOncologyCategoriesDataLoading || allOncologyCategoriesDataFetching
        }
        customButton={
          <CreateOncologyCategoryButtonComponent
            onNewRegister={allOncologyCategoriesDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsOncologyCategory({
          handleClickDelete,
          onRefetchRegister: allOncologyCategoriesDataRefetch,
        })}
      />
    </div>
  );
};

export default OncologyCategoryContent;
