"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { Card, Col, Row, Space } from "antd";
import styles from "./CaseTypeOptionComponent.module.css";
import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";
import { FaCirclePlus } from "react-icons/fa6";
import { LuFileQuestion } from "react-icons/lu";

import CustomTags from "@/components/common/custom_tags/CustomTags";
import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useCreateCompressionConceptReportMutation } from "@/redux/apis/compression_concept_report/compressionConceptReportApi";

import { setIdOfCaseType } from "@/redux/features/common/change_of_case_type/changeOfCaseTypeSlice";

import { caseTypeReport } from "@/utils/enums/caseTypeColor.enum";

const CaseTypeOptionComponent: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [userIdLocalState, setUserIdLocalState] = useState(
    "77757048-2cc5-4671-8a3c-8ed4ea4c3bcd"
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCaseTypeName, setSelectedCaseTypeName] = useState<
    string | null
  >(null);
  const [selectedCaseTypeId, setSelectedCaseTypeId] = useState<number | null>(
    null
  );

  const [
    createCompressionConceptReport,
    { isLoading: createdCompressionConceptReportDataLoading },
  ] = useCreateCompressionConceptReportMutation();

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

  const handleContinueCaseTypeReport = async (
    isConfirmConceptCaseTypeReport: boolean
  ) => {
    if (!isConfirmConceptCaseTypeReport) {
      try {
        await createCompressionConceptReport({
          comp_c_user_id: userIdLocalState,
          comp_c_casetype_id_fk: selectedCaseTypeId,
        });
      } catch (error) {
        console.error("Error en la petición", error);
      }
    }

    if (selectedCaseTypeName) {
      switch (selectedCaseTypeName) {
        case caseTypeReport.ADVERSE_EVENT:
          router.push(`/adverse_event_report`);
          break;

        case caseTypeReport.INCIDENT:
          router.push(`/incident_report`);
          break;

        case caseTypeReport.RISK:
          router.push(`/risk_report`);
          break;

        case caseTypeReport.INDICATING_UNSAFE_CARE:
          router.push(`/indications_unsafe_care_report`);
          break;

        case caseTypeReport.COMPLICATIONS:
          router.push(`/complications_report`);
          break;

        default:
          break;
      }
    }
    setIsModalVisible(false);
  };

  return (
    <div>
      <CustomTags
        labelCustom="Elige que tipo de caso deseas reportar"
        colorCustom="orange"
        stylesCustom={{
          ...titleStyleCss,
          color: "#f28322",
          marginBottom: "22px",
        }}
      />

      <Row gutter={[24, 24]} style={{ justifyContent: "center" }}>
        {allCaseTypesDataLoading || allCaseTypesDataFetching ? (
          <CustomSpin />
        ) : (
          <>
            {allCaseTypesData?.length
              ? allCaseTypesData?.map((caseTypeData, index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={5}>
                    <Card id="case-type-options-card" className={styles.card}>
                      <div
                        id="case-type-options-card-details"
                        className={styles.cardDetails}
                      >
                        <img
                          id="case-type-options-images"
                          src={caseTypeData.cas_t_image}
                          alt={caseTypeData.cas_t_name}
                          className={styles.icon}
                        />
                        <p
                          id="case-type-options-card-titles"
                          className={styles.textTitle}
                        >
                          {caseTypeData.cas_t_name}
                        </p>
                        <p
                          id="case-type-options-card-body"
                          className={styles.textBody}
                        >
                          {caseTypeData.cas_t_description}
                        </p>
                      </div>

                      <CustomButton
                        sizeCustomButton={"middle"}
                        iconPositionCustomButton={"start"}
                        classNameCustomButton={styles.cardButton}
                        idCustomButton="open-modal-confirmation-concept-report-button"
                        titleCustomButton="Crear reporte"
                        typeCustomButton="primary"
                        htmlTypeCustomButton="button"
                        iconCustomButton={<FaCirclePlus />}
                        onClickCustomButton={() => {
                          setIsModalVisible(true);
                          setSelectedCaseTypeId(caseTypeData.id);
                          setSelectedCaseTypeName(caseTypeData.cas_t_name);

                          dispatch(setIdOfCaseType(caseTypeData.id));
                        }}
                      />
                    </Card>
                  </Col>
                ))
              : null}
          </>
        )}
      </Row>

      <CustomModalNoContent
        key={"custom-modal-confirm-concept-type-report"}
        widthCustomModalNoContent="30%"
        openCustomModalState={isModalVisible}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalVisible(false)}
        contentCustomModal={
          <div
            className="content-modal-confirm-concept-type-report"
            style={{
              paddingBlock: "13px",
            }}
          >
            <Space
              direction="vertical"
              size="small"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div style={{ marginBlock: 2 }}>
                <LuFileQuestion color="#015E90" size={77} />
              </div>

              <h2
                className="title-modal-confirm-concept-type-report"
                style={{ ...titleStyleCss, textAlign: "center" }}
              >
                Confirmación
              </h2>

              <h4
                className="subtitle-modal-confirm-concept-type-report"
                style={{ ...subtitleStyleCss }}
              >
                ¿Te quedó claro con el concepto de este tipo de reporte?
              </h4>

              <h4
                className="subtitle-modal-case-type-name"
                style={{ ...subtitleStyleCss, color: "#015E90" }}
              >
                {selectedCaseTypeName}
              </h4>

              <Space
                direction="horizontal"
                size="large"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  marginTop: 13,
                }}
              >
                <CustomButton
                  classNameCustomButton="negation-button-custom-modal"
                  idCustomButton="negation-button-custom-modal"
                  titleCustomButton="No"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="button"
                  onClickCustomButton={() =>
                    handleContinueCaseTypeReport(false)
                  }
                  sizeCustomButton={"small"}
                  styleCustomButton={{
                    backgroundColor: "#6C757D",
                    color: "#f2f2f2",
                    borderRadius: "16px",
                    padding: "3px 17px",
                  }}
                  disabledCustomButton={
                    createdCompressionConceptReportDataLoading
                  }
                />
                <CustomButton
                  classNameCustomButton="confirm-button-custom-modal"
                  idCustomButton="confirm-button-custom-modal"
                  titleCustomButton="Si, continuar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="button"
                  onClickCustomButton={() => handleContinueCaseTypeReport(true)}
                  sizeCustomButton={"small"}
                  styleCustomButton={{
                    backgroundColor: "#f28322",
                    color: "#f2f2f2",
                    borderRadius: "16px",
                    padding: "3px 17px",
                  }}
                  disabledCustomButton={
                    createdCompressionConceptReportDataLoading
                  }
                />
              </Space>
            </Space>
          </div>
        }
      />
    </div>
  );
};

export default CaseTypeOptionComponent;
