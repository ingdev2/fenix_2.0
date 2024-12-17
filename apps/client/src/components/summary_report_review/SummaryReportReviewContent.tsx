"use client";

import React from "react";

import { useParams } from "next/navigation";

import { Card, Col, Row, Typography } from "antd";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import Content_button_back_router from "../common/content_button_back_router/Content_button_back_router";

import PatientDataDetails from "../shared/patient_data_details/PatientDataDetails";
import ValidationInformationDataDetails from "../shared/validation_information_data_details/ValidationInformationDataDetails";
import CaseDataDetails from "../shared/case_data_details/CaseDataDetails";

import { FaFilePdf } from "react-icons/fa6";
import dayjs from "dayjs";

import { useGetReportValidateByIdQuery } from "@/redux/apis/case_report_validate/caseReportValidateApi";
import { useGetReportOriginalByIdQuery } from "@/redux/apis/case_report_original/caseReportOriginalApi";

const SummaryReportReviewContent = () => {
  const routerParams = useParams<Record<string, string>>();
  const { Title } = Typography;

  const {
    data: reportValidateByIdData,
    isFetching: reportValidateByIdDataFetching,
    isLoading: reportValidateByIdDataLoading,
    error: reportValidateByIdDataError,
    refetch: reportValidateByIdDataRefetch,
  } = useGetReportValidateByIdQuery(routerParams?.id || "", {
    skip: !routerParams?.id,
  });

  const {
    data: reportOriginalByIdData,
    isFetching: reportOriginalByIdDataFetching,
    isLoading: reportOriginalByIdDataLoading,
    error: reportOriginalByIdDataError,
    refetch: reportOriginalByIdDataRefetch,
  } = useGetReportOriginalByIdQuery(
    reportValidateByIdData?.val_cr_originalcase_id_fk!,
    {
      skip: !reportValidateByIdData?.val_cr_originalcase_id_fk,
    }
  );

  const handleClickDownloadSummary = () => {};

  return (
    <div className="validate-report-review" style={{ padding: "16px" }}>
      <div className="content-button-back-router">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24}>
            <Content_button_back_router />
          </Col>
        </Row>
      </div>

      <div className="generate-pdf-button">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24} style={{ display: "flex", justifyContent: "end" }}>
            <CustomButton
              idCustomButton="generate-pdf-button"
              typeCustomButton={"primary"}
              sizeCustomButton={"small"}
              onClickCustomButton={handleClickDownloadSummary}
              titleCustomButton={"Generar PDF"}
              iconCustomButton={<FaFilePdf />}
              styleCustomButton={{
                background: "#FF7F50",
                color: "#fff",
                fontSize: "12px",
                borderRadius: "16px",
              }}
            />
          </Col>
        </Row>
      </div>

      <Row justify="center">
        <Col>
          {reportValidateByIdDataLoading || reportValidateByIdDataFetching ? (
            <CustomSpin />
          ) : (
            <>
              <Row style={{ marginBottom: "16px" }}>
                <Col span={24}>
                  <Card
                    size="small"
                    style={{
                      width: "100%",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      background: "#D5E5FF",
                      textAlign: "center",
                    }}
                  >
                    <Row>
                      <Col span={8}>
                        <Title
                          level={5}
                          style={{
                            color: "#002140",
                          }}
                        >
                          Código de caso:{" "}
                          <Typography.Text>
                            # {reportValidateByIdData?.val_cr_filingnumber}
                          </Typography.Text>
                        </Title>

                        {/* <CustomBadgeHalfMoon
                          badgeTitle="Investigador:"
                          badgeContent="Camilo Salgado"
                        /> */}
                      </Col>

                      <Col span={8}>
                        <Title
                          level={5}
                          style={{
                            color: "#002140",
                          }}
                        >
                          Fecha Ocurrencia:{" "}
                          <Typography.Text>
                            {reportValidateByIdData?.val_cr_dateofcase}
                          </Typography.Text>
                        </Title>

                        {/* <CustomBadgeHalfMoon
                          badgeTitle="Tiempo de analista:"
                          badgeContent="30 Días"
                        /> */}
                      </Col>

                      <Col span={8}>
                        <Title
                          level={5}
                          style={{
                            color: "#002140",
                          }}
                        >
                          Fecha Reporte:{" "}
                          <Typography.Text>
                            {dayjs(reportValidateByIdData?.createdAt).format(
                              "YYYY-MM-DD"
                            )}
                          </Typography.Text>
                        </Title>

                        {/* <CustomBadgeHalfMoon
                          badgeTitle="Tiempo de investigador:"
                          badgeContent="15 Días"
                        /> */}
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <PatientDataDetails
                    caseValidateData={reportValidateByIdData}
                  />

                  <ValidationInformationDataDetails
                    caseValidateData={reportValidateByIdData}
                  />
                </Col>

                <Col
                  span={
                    reportValidateByIdData?.val_cr_associatedpatient ||
                    reportValidateByIdData?.val_cr_characterization_id_fk
                      ? 16
                      : 24
                  }
                >
                  <CaseDataDetails
                    caseValidateData={reportValidateByIdData}
                    caseOriginalData={reportOriginalByIdData}
                  />
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SummaryReportReviewContent;