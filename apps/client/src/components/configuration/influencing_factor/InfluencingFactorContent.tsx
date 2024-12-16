"use client";

import React, { useState } from "react";

import CreateInfluencingFactorButtonComponent from "./buttons/CreateInfluencingFactorButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsInfluencyFactor from "./table_colums/TableColumnsInfluencingFactor";

import {
  useDeleteInfluencingFactorMutation,
  useGetAllInfluencingFactorsQuery,
} from "@/redux/apis/influencing_factor/influencingFactorApi";

const InfluencingFactorContent = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allInfluencingFactorsData,
    isFetching: allInfluencingFactorsDataFetching,
    isLoading: allInfluencingFactorsDataLoading,
    error: allInfluencingFactorsDataError,
    refetch: allInfluencingFactorsDataRefetch,
  } = useGetAllInfluencingFactorsQuery(null);

  const [DeleteInfluencingFactor] = useDeleteInfluencingFactorMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await DeleteInfluencingFactor(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allInfluencingFactorsDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allInfluencingFactorsDataRefetch();
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
        dataCustomTable={allInfluencingFactorsData || []}
        onClickRechargeCustomTable={allInfluencingFactorsDataRefetch}
        loading={
          allInfluencingFactorsDataLoading || allInfluencingFactorsDataFetching
        }
        customButton={
          <CreateInfluencingFactorButtonComponent
            onNewRegister={allInfluencingFactorsDataRefetch}
          />
        }
        columnsCustomTable={TableColumnsInfluencyFactor({
          handleClickDelete,
          onRefetchRegister: allInfluencingFactorsDataRefetch,
        })}
      />
    </div>
  );
};

export default InfluencingFactorContent;
