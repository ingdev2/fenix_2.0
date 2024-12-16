"use client";
import React, { useState } from "react";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import {
  useDeleteOncologyCategoryMutation,
  useGetAllOncologyCategoriesQuery,
} from "@/redux/apis/oncology_category/oncologyCategory";
import CreateOncologyCategoryButtonComponent from "./buttons/CreateOncologyCategoryButton";
import TableColumnsOncologyCategory from "./table_columns/TableColumsOncologyCategory";

const OncologyCategoryContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allOncologyCategoriesDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log("Error: ", error);
    } finally {
      allOncologyCategoriesDataRefetch();
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
