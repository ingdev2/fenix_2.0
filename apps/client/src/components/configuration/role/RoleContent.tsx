"use client";

import React, { useState } from "react";

import CreateRoleButtonComponent from "@/components/configuration/role/buttons/CreateRoleButton";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsRole from "./table_columns/TableColumnsRole";

import {
  useDeleteRoleMutation,
  useGetAllRolesQuery,
} from "@/redux/apis/role/roleApi";

const RoleContent = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allRolesData,
    isFetching: allRolesDataFetching,
    isLoading: allRolesDataLoading,
    error: allRolesDataError,
    refetch: allRolesDataRefetch,
  } = useGetAllRolesQuery(null);

  const [deleteRole] = useDeleteRoleMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response: any = await deleteRole(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allRolesDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allRolesDataRefetch();
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
        dataCustomTable={allRolesData || []}
        onClickRechargeCustomTable={allRolesDataRefetch}
        loading={allRolesDataLoading || allRolesDataFetching}
        customButton={
          <CreateRoleButtonComponent onNewRegister={allRolesDataRefetch} />
        }
        columnsCustomTable={TableColumnsRole({
          handleClickDelete,
          onRefetchRegister: allRolesDataRefetch,
        })}
      />
    </div>
  );
};

export default RoleContent;
