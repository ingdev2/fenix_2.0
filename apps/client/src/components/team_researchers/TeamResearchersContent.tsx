"use client";

import React from "react";

import { Card, Col, Row } from "antd";

import Content_button_back_router from "../common/content_button_back_router/Content_button_back_router";
import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetAllEventsQuery } from "@/redux/apis/event/eventApi";
import { useGetAllPrioritiesQuery } from "@/redux/apis/priority/priorityApi";
import { useGetAllMovementReportsQuery } from "@/redux/apis/movement_report/movementReportApi";
import { getNameOfCaseTypeMap } from "@/helpers/get_name_by_id/get_name_of_case_type";
import { getNameOfEventMap } from "@/helpers/get_name_by_id/get_name_of_event";
import { getNameOfPriorityMap } from "@/helpers/get_name_by_id/get_name_of_priority";
import { getNameOfMovementReportMap } from "@/helpers/get_name_by_id/get_name_of_movement_report";

const TeamResearchersContent: React.FC = () => {
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

  // const transformedData = Array.isArray(reportForAssignCasesByIdAnalystData)
  //   ? reportForAssignCasesByIdAnalystData?.map((req: CaseReportValidate) => ({
  //       ...req,
  //       val_cr_casetype_id_fk: caseTypeGetName?.[req.val_cr_casetype_id_fk],
  //       val_cr_statusmovement_id_fk:
  //         movementReportGetName?.[req.val_cr_statusmovement_id_fk],
  //       val_cr_event_id_fk: eventGetName?.[req.val_cr_event_id_fk],
  //       val_cr_priority_id_fk:
  //         req.val_cr_priority_id_fk !== null
  //           ? priorityGetName?.[req.val_cr_priority_id_fk]
  //           : null,
  //     }))
  //   : [];

  return (
    <div className="team-researcher" style={{ padding: "16px" }}>
      <div className="content-button-back-router">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24}>
            <Content_button_back_router />
          </Col>
        </Row>
      </div>

      <div>
        <Card
          size="small"
          style={{
            width: "100%",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            marginTop: "10px",
            background: "#D5E5FF",
          }}
        >
          <div
            className="team-researchers-table"
            style={{ padding: "32px" }}
          ></div>
        </Card>
      </div>
    </div>
  );
};

export default TeamResearchersContent;
