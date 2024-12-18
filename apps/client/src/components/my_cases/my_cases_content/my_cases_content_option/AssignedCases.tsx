"use client";

import React from "react";
import { useAppSelector } from "@/redux/hook";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import CustomTags from "@/components/common/custom_tags/CustomTags";

import { HiFlag } from "react-icons/hi";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetAllEventsQuery } from "@/redux/apis/event/eventApi";
import { useGetAllPrioritiesQuery } from "@/redux/apis/priority/priorityApi";
import { useGetAllMovementReportsQuery } from "@/redux/apis/movement_report/movementReportApi";
import { useGetReportsForAssignCasesQuery } from "@/redux/apis/report_analyst_assignment/reportAnalystAssignmentApi";

import { getNameOfCaseTypeMap } from "@/helpers/get_name_by_id/get_name_of_case_type";
import { getNameOfEventMap } from "@/helpers/get_name_by_id/get_name_of_event";
import { getNameOfPriorityMap } from "@/helpers/get_name_by_id/get_name_of_priority";
import { getNameOfMovementReportMap } from "@/helpers/get_name_by_id/get_name_of_movement_report";
import TableColumnsAssignedCases from "./table_columns_assigned_cases/TableColumnsAssignedCases";
import { useGetReportsAssignedByIdNumberResearcherQuery } from "@/redux/apis/report_researcher_assignment/reportResearcherAssignmentApi";

const AssignedCases: React.FC = () => {
  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const {
    data: reportsAssignedByIdNumberResearcherData,
    isFetching: reportsAssignedByIdNumberResearcherFetching,
    isLoading: reportsAssignedByIdNumberResearcherLoading,
    error: reportsAssignedByIdNumberResearchertError,
    refetch: reportsAssignedByIdNumberResearcherRefetch,
  } = useGetReportsAssignedByIdNumberResearcherQuery(
    idNumberUserSessionState.toString(),
    {
      skip: !idNumberUserSessionState,
    }
  );

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

  const caseTypeGetName = getNameOfCaseTypeMap(allCaseTypesData);
  const eventGetName = getNameOfEventMap(allEventsData);
  const priorityGetName = getNameOfPriorityMap(allPrioritiesData);

  const transformedData = Array.isArray(reportsAssignedByIdNumberResearcherData)
    ? reportsAssignedByIdNumberResearcherData?.map(
        (req: CaseReportValidate) => ({
          ...req,
          val_cr_casetype_id_fk: caseTypeGetName?.[req.val_cr_casetype_id_fk],
          val_cr_event_id_fk: eventGetName?.[req.val_cr_event_id_fk],
          val_cr_priority_id_fk:
            req.val_cr_priority_id_fk !== null
              ? priorityGetName?.[req.val_cr_priority_id_fk]
              : null,
        })
      )
    : [];

  const handleClickSeeMore = (id: string) => {};

  const handleSelectionChange = (selection: {
    selectedRowKeys: React.Key[];
    selectedRows: any[];
  }) => {
    console.log("Filas seleccionadas:", selection.selectedRows);
  };

  return (
    <div className="assigned-case-table" style={{ padding: "22px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={transformedData || []}
        onClickRechargeCustomTable={reportsAssignedByIdNumberResearcherRefetch}
        loading={
          reportsAssignedByIdNumberResearcherLoading ||
          reportsAssignedByIdNumberResearcherFetching
        }
        enableRowSelection={true}
        onSelectionChange={handleSelectionChange}
        customButton={
          <CustomButton
            classNameCustomButton="apply-research-button"
            idCustomButton="apply-research-button"
            titleCustomButton="Aplicar investigación"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            iconCustomButton={<HiOutlineClipboardDocumentCheck />}
            onClickCustomButton={() => ({})}
            styleCustomButton={{
              marginLeft: "16px",
              background: "#f28322",
              color: "#ffffff",
              borderRadius: "16px",
            }}
            iconPositionCustomButton={"end"}
            sizeCustomButton={"small"}
          />
        }
        columnsCustomTable={TableColumnsAssignedCases({
          caseTypeData: allCaseTypesData,
          priorityData: allPrioritiesData,
          handleClickSeeMore,
        })}
        customTag={
          <>
            <CustomTags
              labelCustom="Posible plan de investigación asociado"
              iconCustom={<HiFlag size={15} />}
              colorCustom="orange"
              stylesCustom={{
                color: "#f28322",
                padding: "3px 10px",
                borderRadius: "30px",
                fontSize: "10px",
                fontWeight: "bold",
                marginTop: "16px",
              }}
            />
          </>
        }
      />
    </div>
  );
};

export default AssignedCases;
