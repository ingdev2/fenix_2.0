"use client";

import React, { useState } from "react";

import CreateServiceButtonComponent from "@/components/configuration/service/buttons/CreateServiceButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsService from "./table_columns/TableColumnsService";

import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "@/redux/apis/service/serviceApi";

const ServiceContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allServicesData,
    isFetching: allServicesDataFetching,
    isLoading: allServicesDataLoading,
    error: allServicesDataError,
    refetch: allServicesDataRefetch,
  } = useGetAllServicesQuery(null);
  
  const [deleteService] = useDeleteServiceMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteService(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allServicesDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allServicesDataRefetch();
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
        dataCustomTable={allServicesData || []}
        onClickRechargeCustomTable={allServicesDataRefetch}
        loading={allServicesDataLoading || allServicesDataFetching}
        customButton={
          <CreateServiceButtonComponent onNewRegister={allServicesDataRefetch} />
        }
        columnsCustomTable={TableColumnsService({
          handleClickDelete,
          onRefetchRegister: allServicesDataRefetch,
          serviceData: allServicesData
        })}
      />
    </div>
  );
};

export default ServiceContent;
