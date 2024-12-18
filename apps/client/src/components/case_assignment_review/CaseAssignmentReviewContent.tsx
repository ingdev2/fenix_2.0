"use client";

import React, { useState } from "react";

import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hook";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import { Card, Col, Row, Typography } from "antd";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import Content_button_back_router from "../common/content_button_back_router/Content_button_back_router";

import dayjs from "dayjs";

import {
  useCancelCaseReportValidateMutation,
  useGetReportValidateByIdQuery,
} from "@/redux/apis/case_report_validate/caseReportValidateApi";
import { useGetReportOriginalByIdQuery } from "@/redux/apis/case_report_original/caseReportOriginalApi";
import { useGetAllReasonCancellationCasesQuery } from "@/redux/apis/reason_cancellation_case/reasonCancellationCaseApi";
import { useCreateObservationCancellationCaseMutation } from "@/redux/apis/observation_cancellation_case/observationCancellationCaseApi";

import PatientDataDetails from "../shared/patient_data_details/PatientDataDetails";
import ValidationInformationDataDetails from "../shared/validation_information_data_details/ValidationInformationDataDetails";
import CaseDataDetails from "../shared/case_data_details/CaseDataDetails";
import OptionsCaseAssignmentReviewButton from "./options_case_assignment_review_button/OptionsCaseAssignmentReviewButton";
import CustomModalNoContent from "../common/custom_modal_no_content/CustomModalNoContent";
import ContentConfirmCancelCase from "../shared/content_confirm_cancel_case/ContentConfirmCancelCase";
import ContentAssignResearcher from "./content_assign_researcher/ContentAssignResearcher";
import {
  setmodalIsOpen,
  setSuccessFullMessage,
} from "@/redux/features/common/modal/modalSlice";
import ContentMessageSuccessfully from "../shared/content_message_successfully/ContentAssignedAnalystSuccessfully";
import ContentConfirmReturnCaseToValidator from "./content_confirm_return_case_to_validator/ContentConfirmReturnCaseToValidator";
import {
  useGetAllReasonReturnCasesQuery,
  useGetReasonReturnCaseByRoleIdQuery,
} from "@/redux/apis/reason_return_case/reasonReturnCaseApi";
import { useGetRoleByNameQuery } from "@/redux/apis/role/roleApi";
import { UserRolesEnum } from "@/utils/enums/user_roles.enum";
import { useCreateObservationReturnCaseMutation } from "@/redux/apis/observation_return_case/observationReturnCaseApi";
import { useReturnCaseToValidatorMutation } from "@/redux/apis/report_analyst_assignment/reportAnalystAssignmentApi";

const CaseAssignmentReviewContent = () => {
  const dispatch = useDispatch();
  const routerParams = useParams<Record<string, string>>();
  const router = useRouter();
  const { Title } = Typography;

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const isModalOpenState = useAppSelector((state) => state.modal.modalIsOpen);

  const successfullMessageState = useAppSelector(
    (state) => state.modal.successfullMessage
  );

  const [isModalAssignResearch, setIsModalAssignResearch] = useState(false);
  const [isModalConfirmCancelCase, setIsModalConfirmCancelCase] =
    useState(false);
  const [
    isModalConfirmReturnCaseToValidator,
    setIsModalConfirmReturnCaseToValidator,
  ] = useState(false);

  const [observationCancellationCase, setObservationCancellationCase] =
    useState("");
  const [reasonCancellationCaseId, setReasonCancellationCaseId] = useState(0);
  const [
    observationReturnToValidatorCase,
    setObservationReturnToValidatorCase,
  ] = useState("");
  const [reasonReturnCaseToValidatorId, setReasonReturnCaseToValidatorId] =
    useState(0);

  const [isSubmittingCancellationCase, setIsSubmittingCancellationCase] =
    useState(false);
  const [
    isSubmittingReturnCaseToValidatorCase,
    setIsSubmittingReturnCaseToValidatorCase,
  ] = useState(false);

  let caseValidateId = routerParams?.id;

  const {
    data: reportValidateByIdData,
    isFetching: reportValidateByIdDataFetching,
    isLoading: reportValidateByIdDataLoading,
    error: reportValidateByIdDataError,
    refetch: reportValidateByIdDataRefetch,
  } = useGetReportValidateByIdQuery(caseValidateId || "", {
    skip: !caseValidateId,
  });

  const {
    data: reportOriginalByIdData,
    isFetching: reportOriginalByIdFetching,
    isLoading: reportOriginalByIdLoading,
    error: reportOriginalByIdError,
    refetch: reportOriginalByIdRefetch,
  } = useGetReportOriginalByIdQuery(
    reportValidateByIdData?.val_cr_originalcase_id_fk!,
    {
      skip: !reportValidateByIdData?.val_cr_originalcase_id_fk,
    }
  );

  const {
    data: allReasonCancellationData,
    isFetching: allReasonCancellationFetching,
    isLoading: allReasonCancellationLoading,
    error: allReasonCancellationDataError,
    refetch: allReasonCancellationDataRefetch,
  } = useGetAllReasonCancellationCasesQuery(null);

  const {
    data: roleByNameData,
    isFetching: roleByNameFetching,
    isLoading: roleByNameLoading,
    error: roleByNameDataError,
    refetch: roleByNameDataRefetch,
  } = useGetRoleByNameQuery(UserRolesEnum.ANALYST);

  const {
    data: allReasonReturnCaseByRoleIdData,
    isFetching: allReasonReturnCaseByRoleIdFetching,
    isLoading: allReasonReturnCaseByRoleIdLoading,
    error: allReasonReturnCaseByRoleIdError,
    refetch: allReasonReturnCaseByRoleIdRefetch,
  } = useGetReasonReturnCaseByRoleIdQuery(roleByNameData?.id!, {
    skip: !roleByNameData?.id,
  });

  const [
    cancelCaseReportValidate,
    { isLoading: cancelCaseReportValidateDataLoading },
  ] = useCancelCaseReportValidateMutation();

  const [
    createObservationCancellationCase,
    { isLoading: createObservationCancellationCaseLoading },
  ] = useCreateObservationCancellationCaseMutation();

  const [
    returnCaseToValidator,
    { isLoading: returnCaseToValidatorDataLoading },
  ] = useReturnCaseToValidatorMutation();

  const [
    createObservationReturnCase,
    { isLoading: createObservationReturnCaseLoading },
  ] = useCreateObservationReturnCaseMutation();

  const handleClickReturnCaseToValidator = async () => {
    try {
      setIsSubmittingReturnCaseToValidatorCase(true);

      const returnCaseToValidatorResponse: any = await returnCaseToValidator({
        idCaseValidate: reportValidateByIdData?.id!,
        idAnalyst: idNumberUserSessionState.toString(),
      });

      let isReturnCaseError = returnCaseToValidatorResponse.error;
      let isReturnCaseSuccess = returnCaseToValidatorResponse.data;

      if (isReturnCaseError) {
        const errorMessage = isReturnCaseError?.data.message;
        dispatch(
          setShowMessage({
            type: "error",
            content: errorMessage,
          })
        );
        return;
      }

      if (isReturnCaseSuccess) {
        await createObservationReturnCase({
          idUser: idNumberUserSessionState.toString(),
          idCaseValidate: reportValidateByIdData?.id!,
          newReasonReturnCase: {
            rec_o_reasonreturn_id_fk: reasonReturnCaseToValidatorId,
            rec_o_observation: observationReturnToValidatorCase,
          },
        });

        const successMessage = isReturnCaseSuccess?.message;
        dispatch(
          setShowMessage({
            type: "success",
            content: successMessage,
          })
        );

        router.push(`/case_assignment`);
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar los datos", error);
    } finally {
      setIsSubmittingReturnCaseToValidatorCase(false);
    }
  };

  const handleCLickCancelCase = async () => {
    try {
      setIsSubmittingCancellationCase(true);
      const cancelResponse: any = await cancelCaseReportValidate({
        id: reportValidateByIdData?.id!,
        idUser: idNumberUserSessionState.toString(),
      });

      let isCancelError = cancelResponse.error;
      let isCancelSuccess = cancelResponse.data;

      if (isCancelError) {
        const errorMessage = isCancelError?.data.message;
        dispatch(
          setShowMessage({
            type: "error",
            content: errorMessage,
          })
        );
        return;
      }

      if (isCancelSuccess) {
        await createObservationCancellationCase({
          idUser: idNumberUserSessionState.toString(),
          idCaseValidate: reportValidateByIdData?.id!,
          newReasonCancellationCase: {
            cac_o_reasoncancellation_id_fk: reasonCancellationCaseId,
            cac_o_observation: observationCancellationCase,
          },
        });

        const successMessage = isCancelSuccess?.message;
        dispatch(
          setShowMessage({
            type: "success",
            content: successMessage,
          })
        );

        router.push(`/case_assignment`);
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar los datos", error);
    } finally {
      setIsSubmittingCancellationCase(false);
    }
  };

  const handleClickCLoseModalAssignedResearcherSuccesfull = () => {
    router.push(`/case_assignment`);
    dispatch(setmodalIsOpen(false));
    dispatch(setSuccessFullMessage(""));
  };

  return (
    <div className="case-assignment-review" style={{ padding: "16px" }}>
      <div className="content-button-back-router">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24}>
            <Content_button_back_router />
          </Col>
        </Row>
      </div>

      <div className="options-case-assignment-review-button">
        <OptionsCaseAssignmentReviewButton
          handleCLickCancelCase={() => setIsModalConfirmCancelCase(true)}
          handleClickAssignResearch={() => setIsModalAssignResearch(true)}
          handleClickReturnCaseToValidator={() =>
            setIsModalConfirmReturnCaseToValidator(true)
          }
          reportResearcherAssignment={
            reportValidateByIdData?.reportResearcherAssignment
          }
        />
      </div>

      <Row justify="center">
        <Col>
          {reportValidateByIdDataLoading || reportValidateByIdDataFetching ? (
            <div style={{ marginTop: "10px" }}>
              <CustomSpin />
            </div>
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
                      marginTop: "10px",
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
      <CustomModalNoContent
        key={"custom-modal-assign-researcher"}
        widthCustomModalNoContent="50%"
        openCustomModalState={isModalAssignResearch}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalAssignResearch(false)}
        contentCustomModal={
          <ContentAssignResearcher
            onCloseModal={() => setIsModalAssignResearch(false)}
            caseValidateId={routerParams?.id!}
          />
        }
      />

      <CustomModalNoContent
        key={"custom-modal-assigned-analyst-successfully"}
        widthCustomModalNoContent="35%"
        openCustomModalState={isModalOpenState}
        closableCustomModal={false}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => {
          dispatch(setmodalIsOpen(false));
          dispatch(setSuccessFullMessage(""));
        }}
        contentCustomModal={
          <ContentMessageSuccessfully
            messageData={successfullMessageState}
            handleClickCLoseModal={
              handleClickCLoseModalAssignedResearcherSuccesfull
            }
          />
        }
      />

      <CustomModalNoContent
        key={"custom-modal-confirm-cancel-case"}
        widthCustomModalNoContent="25%"
        openCustomModalState={isModalConfirmCancelCase}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalConfirmCancelCase(false)}
        contentCustomModal={
          <ContentConfirmCancelCase
            observationCancellationCase={observationCancellationCase}
            setObservationCancellationCase={setObservationCancellationCase}
            reasonCancellationCaseId={reasonCancellationCaseId}
            setReasonCancellationCaseId={setReasonCancellationCaseId}
            allReasonCancellationData={allReasonCancellationData}
            onCloseModal={() => setIsModalConfirmCancelCase(false)}
            handleCLickCancelCase={handleCLickCancelCase}
            isSubmittinCancellationCase={isSubmittingCancellationCase}
            allReasonCancellationDataFetching={allReasonCancellationFetching}
            allReasonCancellationDataLoading={allReasonCancellationLoading}
          />
        }
      />

      <CustomModalNoContent
        key={"custom-modal-confirm-return-case-to-validator"}
        widthCustomModalNoContent="25%"
        openCustomModalState={isModalConfirmReturnCaseToValidator}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() =>
          setIsModalConfirmReturnCaseToValidator(false)
        }
        contentCustomModal={
          <ContentConfirmReturnCaseToValidator
            observationReturnToValidatorCase={observationReturnToValidatorCase}
            setObservationReturnToValidatorCase={
              setObservationReturnToValidatorCase
            }
            reasonReturnCaseToValidatorId={reasonReturnCaseToValidatorId}
            setReasonReturnCaseToValidatorId={setReasonReturnCaseToValidatorId}
            isSubmittingReturnToValidatorCase={
              isSubmittingReturnCaseToValidatorCase
            }
            allReasonReturnCaseByRoleIdData={allReasonReturnCaseByRoleIdData}
            allReasonReturnCaseByRoleIdLoading={
              allReasonReturnCaseByRoleIdLoading
            }
            allReasonReturnCaseByRoleIdFetching={
              allReasonReturnCaseByRoleIdFetching
            }
            onCloseModal={() => setIsModalConfirmReturnCaseToValidator(false)}
            handleClickReturnCaseToValidator={handleClickReturnCaseToValidator}
          />
        }
      />
    </div>
  );
};

export default CaseAssignmentReviewContent;
