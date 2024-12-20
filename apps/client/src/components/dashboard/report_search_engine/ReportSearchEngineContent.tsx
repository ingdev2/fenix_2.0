"use client";

import React, { useEffect, useState } from "react";

import { Button, Col, Empty, Input, Modal, Row, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetAllMovementReportsQuery } from "@/redux/apis/movement_report/movementReportApi";
import { getNameOfCaseTypeMap } from "@/helpers/get_name_by_id/get_name_of_case_type";
import { getNameOfMovementReportMap } from "@/helpers/get_name_by_id/get_name_of_movement_report";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import TableColumnsReportSearchEngine from "./table_columns_report_search_engine/TableColumsReportSearchEngine";
import { useGetReportValidateByConsecutiveQuery } from "@/redux/apis/case_report_validate/caseReportValidateApi";

const ReportSearchEngineComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const {
    data: reportValidateByIdData,
    isFetching: reportValidateByIdDataFetching,
    isLoading: reportValidateByIdDataLoading,
    error: reportValidateByIdDataError,
    refetch: reportValidateByIdDataRefetch,
  } = useGetReportValidateByConsecutiveQuery(inputQuery || "", {
    skip: !inputQuery,
  });

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

  const {
    data: allMovementReportsData,
    isFetching: allMovementReportsDataFetching,
    isLoading: allMovementReportsDataLoading,
    error: allMovementReportsDataError,
    refetch: allMovementReportsDataRefetch,
  } = useGetAllMovementReportsQuery(null);

  const caseTypeGetName = getNameOfCaseTypeMap(allCaseTypesData);
  const movementReportGetName = getNameOfMovementReportMap(
    allMovementReportsData
  );

  const transformedData = Array.isArray(reportValidateByIdData)
    ? reportValidateByIdData?.map((req: CaseReportValidate) => ({
        ...req,
        val_cr_casetype_id_fk: caseTypeGetName?.[req.val_cr_casetype_id_fk],
        val_cr_statusmovement_id_fk:
          movementReportGetName?.[req.val_cr_statusmovement_id_fk],
      }))
    : [];

  useEffect(() => {
    setIsSearching(!!inputQuery);
  }, [inputQuery]);

  const handleCancel = () => {
    setInputQuery("");
    setIsModalOpen(false);
    setIsSearching(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(e.target.value);
    setIsSearching(!!e.target.value);
  };

  const handleClickSeeMore = async () => {};

  return (
    <>
      <Button
        icon={<SearchOutlined />}
        size={"middle"}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Buscar reporte por Consecutivo
      </Button>
      <Modal
        title="Búsqueda de reporte"
        open={isModalOpen}
        onCancel={handleCancel}
        onClose={handleCancel}
        width={1000}
        footer={null}
      >
        <div style={{ padding: "16px" }}>
          <Row style={{ marginBottom: "16px" }}>
            <Col flex={9}>
              <Input
                size={"middle"}
                autoFocus
                placeholder="# Reporte"
                onChange={handleInputChange}
                value={inputQuery}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {reportValidateByIdDataLoading ||
              reportValidateByIdDataFetching ? (
                <Skeleton active />
              ) : isSearching && transformedData.length > 0 ? (
                <div style={{ marginTop: "25px" }}>
                  <CustomTableFiltersAndSorting
                    dataCustomTable={transformedData || []}
                    onClickRechargeCustomTable={reportValidateByIdDataRefetch}
                    loading={
                      reportValidateByIdDataLoading ||
                      reportValidateByIdDataFetching
                    }
                    columnsCustomTable={TableColumnsReportSearchEngine({
                      caseTypeData: allCaseTypesData,
                      movementReportData: allMovementReportsData,
                      handleClickSeeMore,
                    })}
                  />
                </div>
              ) : inputQuery && transformedData.length === 0 ? (
                <Empty description="No se encontraron resultados" />
              ) : null}
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};
export default ReportSearchEngineComponent;
