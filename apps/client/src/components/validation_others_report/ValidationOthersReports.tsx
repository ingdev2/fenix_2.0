"use client";

import React from "react";

import CustomTableFiltersAndSorting from "../common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import { getNameOfCaseTypeMap } from "@/helpers/get_name_by_id/get_name_of_case_type";
import { getNameOfEventMap } from "@/helpers/get_name_by_id/get_name_of_event";
import { getNameOfPriorityMap } from "@/helpers/get_name_by_id/get_name_of_priority";
import { getNameOfMovementReportMap } from "@/helpers/get_name_by_id/get_name_of_movement_report";

import TableColumnsSummaryReportsReview from "./table_columns_summary_report_review/TableColumnsSummaryReportReview";

import { useGetAllSummaryReportsForReviewQuery } from "@/redux/apis/case_report_validate/caseReportValidateApi";
import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetAllEventsQuery } from "@/redux/apis/event/eventApi";
import { useGetAllPrioritiesQuery } from "@/redux/apis/priority/priorityApi";
import { useGetAllMovementReportsQuery } from "@/redux/apis/movement_report/movementReportApi";

const ValidationOthersReports: React.FC = () => {
  const {
    data: allSummaryReportsForReviewData,
    isFetching: allSummaryReportsForReviewDataFetching,
    isLoading: allSummaryReportsForReviewDataLoading,
    error: allSummaryReportsForReviewDataError,
    refetch: allSummaryReportsForReviewDataRefetch,
  } = useGetAllSummaryReportsForReviewQuery(null);

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

  const {
    data: allEventsData,
    isFetching: allEventsDataFetching,
    isLoading: allEventsDataLoading,
    error: allEventsDataError,
    refetch: allEventsDataRefetch,
  } = useGetAllEventsQuery(null);

  const {
    data: allPrioritiesData,
    isFetching: allPrioritiesDataFetching,
    isLoading: allPrioritiesDataLoading,
    error: allPrioritiesDataError,
    refetch: allPrioritiesDataRefetch,
  } = useGetAllPrioritiesQuery(null);

  const {
    data: allMovementReportsData,
    isFetching: allMovementReportsDataFetching,
    isLoading: allMovementReportsDataLoading,
    error: allMovementReportsDataError,
    refetch: allMovementReportsDataRefetch,
  } = useGetAllMovementReportsQuery(null);

  const caseTypeGetName = getNameOfCaseTypeMap(allCaseTypesData);
  const eventGetName = getNameOfEventMap(allEventsData);
  const priorityGetName = getNameOfPriorityMap(allPrioritiesData);
  const movementReportGetName = getNameOfMovementReportMap(
    allMovementReportsData
  );

  const transformedData = Array.isArray(allEventsData)
    ? allSummaryReportsForReviewData?.map((req: CaseReportValidate) => ({
        ...req,
        val_cr_casetype_id_fk: caseTypeGetName?.[req.val_cr_casetype_id_fk],
        val_cr_statusmovement_id_fk:
          movementReportGetName?.[req.val_cr_statusmovement_id_fk],
        val_cr_event_id_fk: eventGetName?.[req.val_cr_event_id_fk],
        val_cr_priority_id_fk:
          req.val_cr_priority_id_fk !== null
            ? priorityGetName?.[req.val_cr_priority_id_fk]
            : null,
      }))
    : [];

  return (
    <div style={{ padding: "22px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={allSummaryReportsForReviewDataRefetch}
        loading={
          allSummaryReportsForReviewDataLoading ||
          allSummaryReportsForReviewDataFetching
        }
        columnsCustomTable={TableColumnsSummaryReportsReview({
          caseTypeData: allCaseTypesData,
          eventData: allEventsData,
          priorityData: allPrioritiesData,
          movementReportData: allMovementReportsData,
        })}
      />
    </div>
  );
};

export default ValidationOthersReports;
