"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";

import { titleStyleCss } from "@/theme/text_styles";

import { Card, Col, Row, Typography } from "antd";
import ResolutionSynergyForm from "../resolution_synergy_form/ResolutionSynergyForm";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { useGetUserActiveByIdNumberQuery } from "@/redux/apis/users_b_hub/verifyActiveUserApi";
import CustomButton from "@/components/common/custom_button/CustomButton";
import { MdOutlineEdit } from "react-icons/md";
import { useResolutionSynergyMutation } from "@/redux/apis/synergy/synergyApi";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

const ContentResolutionSynergy: React.FC<{
  onCloseModal: () => void;
  onRefetch: () => void;
}> = ({ onCloseModal, onRefetch }) => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const idSynergyState = useAppSelector((state) => state.synergy.id);
  const idNumberResponsibleSynergyState = useAppSelector(
    (state) => state.synergy.syn_analystidnumber
  );
  const patientContentSynergyState = useAppSelector(
    (state) => state.synergy.syn_patientcontent
  );
  const possibleFaultsSynergyState = useAppSelector(
    (state) => state.synergy.syn_possiblefaults
  );
  const consequencesSynergyState = useAppSelector(
    (state) => state.synergy.syn_consequences
  );
  const clinicalManagementSynergyState = useAppSelector(
    (state) => state.synergy.syn_clinicalmanagement
  );
  const whomWasNotifiedSynergyState = useAppSelector(
    (state) => state.synergy.syn_whomwasnotified
  );
  const observationsSynergyState = useAppSelector(
    (state) => state.synergy.syn_observations
  );
  const statusSynergyState = useAppSelector(
    (state) => state.synergy.syn_status
  );

  const filingNumberCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_filingnumber
  );

  const identificationPatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_documentpatient
  );

  const firstNamePatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_firstnamepatient
  );

  const firstLastNamePatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_firstlastnamepatient
  );

  const secondNamePatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_secondnamepatient
  );

  const secondLastNamePatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_secondlastnamepatient
  );

  const agePatientCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_agepatient
  );

  const descriptionCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_description
  );

  const [patientContentLocalState, setPatientContentLocalState] = useState("");
  const [possibleFaultsLocalState, setPossibleFaultsLocalState] = useState("");
  const [consequencesLocalState, setConsequencesLocalState] = useState("");
  const [clinicalManagementLocalState, setClinicalManagementLocalState] =
    useState("");
  const [whomWasNotifiedLocalState, setWhomWasNotifiedLocalState] =
    useState("");

  const [fullNameResponsibleLocalState, setFullNameResponsibleLocalState] =
    useState("");
  const [
    fullLastNameResponsibleLocalState,
    setFullLastNameResponsibleLocalState,
  ] = useState("");

  const [managinSynergyLocalState, setManaginSynergyLocalState] =
    useState(false);

  const {
    data: userVerifyData,
    isFetching: userVerifyFetching,
    isLoading: userVerifyLoading,
    error: userVerifyError,
  } = useGetUserActiveByIdNumberQuery(Number(idNumberResponsibleSynergyState), {
    skip: !idNumberResponsibleSynergyState,
  });

  const [resolutionSynergyData, { isLoading: resolutionSynergyLoading }] =
    useResolutionSynergyMutation();

  useEffect(() => {
    if (userVerifyData) {
      setFullNameResponsibleLocalState(userVerifyData.name!);
      setFullLastNameResponsibleLocalState(userVerifyData.last_name!);
    }
  }, [userVerifyData]);

  const handleClickSubmit = async () => {
    try {
      const response: any = await resolutionSynergyData({
        id: idSynergyState,
        idValidator: idNumberUserSessionState,
        resolutionSynergy: {
          syn_analystidnumber: idNumberResponsibleSynergyState,
          syn_patientcontent: patientContentLocalState,
          syn_possiblefaults: possibleFaultsLocalState,
          syn_consequences: consequencesLocalState,
          syn_clinicalmanagement: clinicalManagementLocalState,
          syn_whomwasnotified: whomWasNotifiedLocalState,
        },
      });

      let isError = response.error;
      let isSuccess = response.data;

      if (isError) {
        const errorMessage = isError?.data.message;
        dispatch(
          setShowMessage({
            type: "error",
            content: errorMessage,
          })
        );
      }

      if (isSuccess && !isError) {
        onCloseModal();
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        onRefetch();
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar el formulario", error);
    }
  };

  return (
    <>
      {!filingNumberCaseReportValidateState ||
      !identificationPatientCaseReportValidateState ||
      !firstNamePatientCaseReportValidateState ||
      !secondNamePatientCaseReportValidateState ||
      !firstLastNamePatientCaseReportValidateState ||
      !secondLastNamePatientCaseReportValidateState ||
      !agePatientCaseReportValidateState ||
      !agePatientCaseReportValidateState ||
      !idNumberResponsibleSynergyState ||
      !fullNameResponsibleLocalState ||
      !fullLastNameResponsibleLocalState ||
      !observationsSynergyState ? (
        <CustomSpin />
      ) : (
        <div className="content-resolution-synergy">
          <div className="title-modal-resolution-synergy">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h2
                className="title-modal-resolution-synergy"
                style={{
                  ...titleStyleCss,
                  textAlign: "left",
                  fontSize: "20px",
                  marginBottom: "15px",
                }}
              >
                Resolución de caso #{filingNumberCaseReportValidateState} en
                sinergia
              </h2>

              {!statusSynergyState && (
                <>
                  {!managinSynergyLocalState && (
                    <CustomButton
                      classNameCustomButton="resolution-case-button"
                      idCustomButton="resolution-case-button"
                      titleCustomButton="Gestionar"
                      typeCustomButton="primary"
                      htmlTypeCustomButton="button"
                      iconCustomButton={<MdOutlineEdit />}
                      onClickCustomButton={() =>
                        setManaginSynergyLocalState(true)
                      }
                      styleCustomButton={{
                        background: "#f28322",
                        color: "#fff",
                        fontSize: "12px",
                        borderRadius: "16px",
                        marginBottom: "15px",
                        marginLeft: "15px",
                      }}
                      iconPositionCustomButton={"end"}
                      sizeCustomButton={"small"}
                    />
                  )}
                </>
              )}
            </div>
          </div>

          <div>
            <Card
              size="small"
              style={{
                width: "100%",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                marginTop: "10px",
                marginBottom: "20px",
                background: "#D5E5FF",
              }}
            >
              <div>
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <Title
                      level={5}
                      style={{
                        color: "#002140",
                      }}
                    >
                      Datos del paciente:
                    </Title>
                    <Typography.Text>
                      {identificationPatientCaseReportValidateState} -{" "}
                      {firstNamePatientCaseReportValidateState}{" "}
                      {secondNamePatientCaseReportValidateState}{" "}
                      {firstLastNamePatientCaseReportValidateState}{" "}
                      {secondLastNamePatientCaseReportValidateState}
                    </Typography.Text>
                  </Col>

                  <Col span={4}>
                    <Title
                      level={5}
                      style={{
                        color: "#002140",
                      }}
                    >
                      Edad del paciente:
                    </Title>
                    <Typography.Text>
                      {agePatientCaseReportValidateState}
                    </Typography.Text>
                  </Col>

                  <Col span={8}>
                    <Title
                      level={5}
                      style={{
                        color: "#002140",
                      }}
                    >
                      Datos del responsable:
                    </Title>
                    <Typography.Text>
                      {idNumberResponsibleSynergyState} -{" "}
                      {fullNameResponsibleLocalState}{" "}
                      {fullLastNameResponsibleLocalState}
                    </Typography.Text>
                  </Col>

                  <Col span={6}>
                    <Title
                      level={5}
                      style={{
                        color: "#002140",
                      }}
                    >
                      Observación:
                    </Title>
                    <Typography.Text>
                      {observationsSynergyState}
                    </Typography.Text>
                  </Col>

                  <Col span={24}>
                    <Title
                      level={5}
                      style={{
                        color: "#002140",
                      }}
                    >
                      Descriprición del caso:
                    </Title>
                    <Typography.Text>
                      {descriptionCaseReportValidateState}
                    </Typography.Text>
                  </Col>
                </Row>
              </div>
            </Card>
          </div>

          <div>
            <ResolutionSynergyForm
              onChangePatientContentFormData={(e) =>
                setPatientContentLocalState(e.target.value.toUpperCase())
              }
              patientContentFormData={patientContentSynergyState}
              onChangesPossibleFaultsFormData={(e) =>
                setPossibleFaultsLocalState(e.target.value.toUpperCase())
              }
              possibleFaultsFormData={possibleFaultsSynergyState}
              onChangeConsequencesFormData={(e) =>
                setConsequencesLocalState(e.target.value.toUpperCase())
              }
              consequencesFormData={consequencesSynergyState}
              onChangeClinicalManagementFormData={(e) =>
                setClinicalManagementLocalState(e.target.value.toUpperCase())
              }
              clinicalManagementFormData={clinicalManagementSynergyState}
              onChangesWhomWasNotifiedFormData={(e) =>
                setWhomWasNotifiedLocalState(e.target.value.toUpperCase())
              }
              whomWasNotifiedFormData={whomWasNotifiedSynergyState}
              managinSynergyFormData={managinSynergyLocalState}
              resolutionSynergyLoading={resolutionSynergyLoading}
              statusSynergy={statusSynergyState}
              handleClickSubmit={handleClickSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ContentResolutionSynergy;
