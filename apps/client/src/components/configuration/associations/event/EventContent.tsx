"use client";

import React, { useState } from "react";

import CreateEventButtonComponent from "./buttons/CreateEventButtonComponent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsEvent from "./table_columns/TableColumnsEvent";

import {
  useDeleteEventMutation,
  useGetAllEventsQuery,
} from "@/redux/apis/event/eventApi";

const EventContent: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: allEventsData,
    isFetching: allEventsDataFetching,
    isLoading: allEventsDataLoading,
    error: allEventsDataError,
    refetch: allEventsDataRefetch,
  } = useGetAllEventsQuery(null);

  const [deleteEvent] = useDeleteEventMutation();

  const handleClickDelete = async (id: number) => {
    try {
      const response = await deleteEvent(id);

      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        allEventsDataRefetch();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.log(error);
    } finally {
      allEventsDataRefetch();
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
        dataCustomTable={allEventsData || []}
        onClickRechargeCustomTable={allEventsDataRefetch}
        loading={allEventsDataLoading || allEventsDataFetching}
        customButton={
          <CreateEventButtonComponent onNewRegister={allEventsDataRefetch} />
        }
        columnsCustomTable={TableColumnsEvent({
          handleClickDelete,
          onRefetchRegister: allEventsDataRefetch,
          eventData: allEventsData,
        })}
      />
    </div>
  );
};

export default EventContent;
