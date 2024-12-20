"use client";

import React, { useEffect, useState } from "react";

import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import { validateRequiredDate } from "@/helpers/validate_required_values/validate_required_files";

import ContentValidateExistenceCases from "@/components/case_reports/content_validate_existence_cases/ContentValidateExistenceCases";
import ContentReportGeneratedSuccessfully from "@/components/case_reports/content_report_generated_successfully/ContentReportGeneratedSuccessfully";
import PatientForm from "../patient_form/PatientForm";
import ReporterForm from "../reporter_form/ReporterForm";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomDatePicker from "@/components/common/custom_date_picker/CustomDatePicker";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import {
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  DatePickerProps,
} from "antd";
import { Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

import { LoadingOutlined } from "@ant-design/icons";
import { MdOutlineDescription } from "react-icons/md";
import { FaMagnifyingGlass, FaRegCircleCheck } from "react-icons/fa6";

import { useGetAllOriginsQuery } from "@/redux/apis/origin/originApi";
import { useGetAllSubOriginsByOriginIdQuery } from "@/redux/apis/sub_origin/subOriginApi";
import { useGetAllServicesQuery } from "@/redux/apis/service/serviceApi";
import { useGetEventTypeByCaseTypeIdQuery } from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllEventsByEventTypeIdAndUnitIdQuery } from "@/redux/apis/event/eventApi";
import { useFindSimilarsCaseReportValidateMutation } from "@/redux/apis/case_report_validate/caseReportValidateApi";
import { useFindPatientMutation } from "@/redux/apis/patient/patientApi";
import { useCreatecaseReportOriginalMutation } from "@/redux/apis/case_report_original/caseReportOriginalApi";
import { useGetAllDocumentTypesQuery } from "@/redux/apis/document-type/documentTypeApi";
import { DescriptionOtherEnum } from "@/utils/enums/description_other";
import { useGetUserActiveByIdNumberQuery } from "@/redux/apis/users_b_hub/verifyActiveUserApi";

const RiskContent = () => {
  const [originIdLocalState, setOriginIdLocalState] = useState(0);
  const [subOriginIdLocalState, setSubOriginIdLocalState] = useState(0);
  const [reportingServiceIdLocalState, setReportingServiceIdLocalState] =
    useState(0);
  const [originServiceIdLocalState, setOriginServiceIdLocalState] = useState(0);
  const [eventTypeIdLocalState, setEventTypeIdLocalState] = useState(0);
  const [eventIdLocalState, setEventIdLocalState] = useState(0);
  const [unitIdLocalState, setUnitIdLocalState] = useState(0);

  const [isAnonimousReporterLocalState, setIsAnonimousReporterLocalState] =
    useState(false);
  const [identificationUserLocalState, setIdentificationUserLocalState] =
    useState("11224512");
  const [fullNameUserLocalState, setFullNameUserLocalState] = useState(
    "ANDRES FELIPE SIERRA YEPEZ"
  );
  const [chargeUserLocalState, setChargeUserLocalState] = useState(
    "DESARROLLADOR DE SOFTWARE"
  );

  const [dateCaseLocalState, setDateCaseLocalState] = useState("");
  const [isAssociatedPatientLocalState, setIsAssociatedPatientLocalState] =
    useState(true);
  const [identificationPatientLocalState, setIdentificationPatientLocalState] =
    useState("");
  const [
    identificationTypePatientLocalState,
    setIdentificationTypePatientLocalState,
  ] = useState("");
  const [firstNamePatientLocalState, setFirstNamePatientLocalState] =
    useState("");
  const [secondNamePatientLocalState, setSecondNamePatientLocalState] =
    useState("");
  const [firstLastNamePatientLocalState, setFirstLastNamePatientLocalState] =
    useState("");
  const [secondLastNamePatientLocalState, setSecondLastNamePatientLocalState] =
    useState("");
  const [agePatientLocalState, setAgePatientLocalState] = useState("");
  const [genderPatientLocalState, setGenderPatientLocalState] = useState("");
  const [epsPatientLocalState, setEpsPatientLocalState] = useState("");
  const [diagnosticCodeLocalState, setDiagnosticCodeLocalState] = useState("");
  const [diagnosticDescriptionLocalState, setDiagnosticDescriptionLocalState] =
    useState("");
  const [consecutivePatientLocalState, setConsecutivePatientLocalState] =
    useState(0);
  const [folioPatientLocalState, setFolioPatientLocalState] = useState("");

  const [descriptionOthersLocalState, setDescriptionOthersLocalState] =
    useState("");
  const [showDescriptionOthersLocalState, setShowDescriptionOthersLocalState] =
    useState(false);
  const [descriptionRiskLocalState, setDescriptionRiskLocalState] =
    useState("");

  const [findSimilarReportDataLocalState, setFindSimilarReportDataLocalState] =
    useState([]);
  const [
    findAdmissionsPatientDataLocalState,
    setFindAdmissionsPatientDataLocalState,
  ] = useState([]);

  const [
    messageReportGeneratedSuccessfullLocalState,
    setMessageReportGeneratedSuccessfullLocalState,
  ] = useState("");

  const [isPatientFound, setIsPatientFound] = useState(false);
  const [isModalVisibleValidateExistence, setIsModalVisibleValidateExistence] =
    useState(false);
  // const [
  //   isConfirmContinueToGenerateReport,
  //   setIsConfirmContinueToGenerateReport,
  // ] = useState(false);
  const [
    isModalVisibleReportGeneratedSuccessfully,
    setIsModalVisibleReportGeneratedSuccessfully,
  ] = useState(false);

  const idOfCaseTypeState = useAppSelector(
    (state) => state.changeOfCaseType.idOfCaseTypeRisk
  );

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const dispatch = useDispatch();

  const { Title } = Typography;

  const [form] = Form.useForm();

  const {
    data: allOriginsData,
    isFetching: allOriginsDataFetching,
    isLoading: allOriginsDataLoading,
    error: allOriginsDataError,
    refetch: allOriginsDataRefetch,
  } = useGetAllOriginsQuery(null);

  const {
    data: allSubOriginsByOriginIdData,
    isFetching: allSubOriginsByOriginIdDataFetching,
    isLoading: allSubOriginsByOriginIdDataLoading,
    error: allSubOriginsByOriginIdDataError,
    refetch: allSubOriginsByOriginIdDataRefetch,
  } = useGetAllSubOriginsByOriginIdQuery(originIdLocalState, {
    skip: !originIdLocalState,
  });

  const {
    data: allServicesData,
    isFetching: allServicesDataFetching,
    isLoading: allServicesDataLoading,
    error: allServicesByDataError,
    refetch: allServicesDataRefetch,
  } = useGetAllServicesQuery(null);

  const {
    data: allEventTypeByCaseTypeIdData,
    isFetching: allEventTypeByCaseTypeIdDataFetching,
    isLoading: allEventTypeByCaseTypeIdDataLoading,
    error: allEventTypeByCaseTypeIdDataError,
    refetch: allEventTypeByCaseTypeIdDataRefetch,
  } = useGetEventTypeByCaseTypeIdQuery(idOfCaseTypeState);

  const {
    data: allEventsByEventTypeIdAndUnitIdData,
    isFetching: allEventsByEventTypeIdAndUnitIdDataFetching,
    isLoading: allEventsByEventTypeIdAndUnitIdDataLoading,
    error: allEventsByEventTypeIdAndUnitIdDataError,
    refetch: allEventsByEventTypeIdAndUnitIdDataRefetch,
  } = useGetAllEventsByEventTypeIdAndUnitIdQuery(
    { eventTypeId: eventTypeIdLocalState, unitId: unitIdLocalState },
    { skip: !eventTypeIdLocalState }
  );

  const {
    data: allDocumentTypeData,
    isFetching: allDocumentTypeDataFetching,
    isLoading: allDocumentTypeDataLoading,
    error: allDocumentTypeDataError,
    refetch: allDocumentTypeDataRefetch,
  } = useGetAllDocumentTypesQuery(null);

  const {
    data: userVerifyData,
    isFetching: userVerifyFetching,
    isLoading: userVerifyLoading,
    error: userVerifyError,
  } = useGetUserActiveByIdNumberQuery(Number(idNumberUserSessionState), {
    skip: !idNumberUserSessionState,
  });

  const [getPatient, { isLoading: patientDataLoading }] =
    useFindPatientMutation();

  const [findSimilarReports] = useFindSimilarsCaseReportValidateMutation();

  const [
    createCaseReportOriginal,
    { isLoading: createdCaseReportOriginalDataLoading },
  ] = useCreatecaseReportOriginalMutation();

  useEffect(() => {
    if (userVerifyData) {
      setIdentificationUserLocalState(userVerifyData.id_number || "");
      setFullNameUserLocalState(
        `${userVerifyData.name || ""} ${userVerifyData.last_name || ""}`
      );
      setChargeUserLocalState(userVerifyData.collaborator_position || "");
    }
  }, [userVerifyData]);

  const handleChangeService = (value: number) => {
    setReportingServiceIdLocalState(value);
    setEventTypeIdLocalState(0);
    setEventIdLocalState(0);
    setDescriptionOthersLocalState("");
    setShowDescriptionOthersLocalState(false);
    setFindSimilarReportDataLocalState([]);
    // setIsConfirmContinueToGenerateReport(false);

    form.setFieldsValue({ "event-id": undefined });
    form.setFieldsValue({ "event-type-id": undefined });
    form.setFieldsValue({ "description-others": undefined });

    const selectedOptionService = allServicesData?.find(
      (item) => item.id === value
    );

    if (selectedOptionService && selectedOptionService.serv_unit_id_fk) {
      setUnitIdLocalState(selectedOptionService.serv_unit_id_fk);
    }
  };

  const onChangeDateCase: DatePickerProps["onChange"] = (date, dateString) => {
    setDateCaseLocalState(dateString.toString());
  };

  const handleChangeEvent = async (value: number) => {
    setEventIdLocalState(value);
    setDescriptionOthersLocalState("");
    setFindSimilarReportDataLocalState([]);

    form.setFieldsValue({ "description-others": undefined });

    try {
      const response = await findSimilarReports({
        val_cr_doctypepatient:
          identificationTypePatientLocalState === ""
            ? null
            : identificationTypePatientLocalState,
        val_cr_documentpatient:
          identificationPatientLocalState === ""
            ? null
            : identificationPatientLocalState,
        val_cr_casetype_id_fk: idOfCaseTypeState,
        val_cr_eventtype_id_fk: eventTypeIdLocalState,
        val_cr_event_id_fk: value,
        val_cr_reportingservice_id_fk: reportingServiceIdLocalState,
      });

      if (response && response.data) {
        const responseData = response.data.data;

        dispatch(
          setShowMessage({ type: "info", content: response.data.message })
        );

        setFindSimilarReportDataLocalState(responseData || []);

        // if (responseData.length === 0) {
        //   setIsConfirmContinueToGenerateReport(true);
        // } else {
        //   setIsConfirmContinueToGenerateReport(false);
        // }
      }
    } catch (error) {
      console.log("Error: ", error);
    }

    const selectedOptionEvent = allEventsByEventTypeIdAndUnitIdData?.find(
      (item) => item.id === value
    );

    setShowDescriptionOthersLocalState(
      selectedOptionEvent?.eve_name ===
        DescriptionOtherEnum.DESCRIPTION_EVENT_RISK_OTHER
    );
  };

  // const handleClickNegationValidateExistenceCase = () => {
  //   setIsModalVisibleValidateExistence(false);
  //   // setIsConfirmContinueToGenerateReport(false);
  //   setDescriptionRiskLocalState("");
  //   setDescriptionOthersLocalState("");

  //   form.setFieldsValue({
  //     "description-risk": undefined,
  //     "description-others": undefined,
  //   });
  // };

  const onCleanPatientForm = () => {
    setFirstNamePatientLocalState("");
    setSecondNamePatientLocalState("");
    setFirstLastNamePatientLocalState("");
    setSecondLastNamePatientLocalState("");
    setAgePatientLocalState("");
    setGenderPatientLocalState("");
    setEpsPatientLocalState("");
    setDiagnosticCodeLocalState("");
    setDiagnosticDescriptionLocalState("");
    setConsecutivePatientLocalState(0);
    setFolioPatientLocalState("");
    setFindAdmissionsPatientDataLocalState([]);
    setEventTypeIdLocalState(0);
    setEventIdLocalState(0);
    setDescriptionOthersLocalState("");

    form.setFieldsValue({
      "first-name-patient": undefined,
      "second-name-patient": undefined,
      "first-last-name-patient": undefined,
      "second-last-name-patient": undefined,
      "age-patient": undefined,
      "gender-patient": undefined,
      "eps-patient": undefined,
      "diagnostic-code-patient": undefined,
      "diagnostic-description-patient": undefined,
      "consecutive-patient": undefined,
      "folio-patient": undefined,
      "event-id": undefined,
      "event-type-id": undefined,
      "description-others": undefined,
    });
  };

  const onCleanAllForm = () => {
    onCleanPatientForm();

    setDateCaseLocalState("");
    setOriginIdLocalState(0);
    setSubOriginIdLocalState(0);
    setReportingServiceIdLocalState(0);
    setOriginServiceIdLocalState(0);
    setIdentificationTypePatientLocalState("");
    setIdentificationPatientLocalState("");
    setDescriptionRiskLocalState("");
    setIsAnonimousReporterLocalState(false);
    setIsAssociatedPatientLocalState(true);

    form.resetFields();
  };

  const onResetEventTypeAndEvent = () => {
    setEventTypeIdLocalState(0);
    setEventIdLocalState(0);
    setFindSimilarReportDataLocalState([]);
    setDescriptionOthersLocalState("");
    setShowDescriptionOthersLocalState(false);
    // setIsConfirmContinueToGenerateReport(false);

    form.setFieldsValue({
      "event-id": undefined,
      "event-type-id": undefined,
      "description-others": undefined,
    });
  };

  const handleClickConfirmValidateExistenceCase = () => {
    // setIsConfirmContinueToGenerateReport(true);
    setIsModalVisibleValidateExistence(false);
  };

  const handleClickFindPatientData = async () => {
    onResetEventTypeAndEvent();
    try {
      const response: any = await getPatient({
        idNumber: identificationPatientLocalState,
        type: identificationTypePatientLocalState,
      });

      if (response?.data) {
        setIsPatientFound(true);
        setFindAdmissionsPatientDataLocalState(response.data.admissions);

        setFirstNamePatientLocalState(response.data.patientFirstName);
        setSecondNamePatientLocalState(response.data.patientSecondName);
        setFirstLastNamePatientLocalState(response.data.patientSurname);
        setSecondLastNamePatientLocalState(response.data.patientLastname);
        setAgePatientLocalState(response.data.patientAge);
        setGenderPatientLocalState(response.data.patientGender);
        setEpsPatientLocalState(response.data.patientCompanyDescription);
        setDiagnosticCodeLocalState(response.data.diagnosisCode);
        setDiagnosticDescriptionLocalState(response.data.diagnosisDescription);

        form.setFieldsValue({
          "first-name-patient": response.data.patientFirstName,
          "second-name-patient": response.data.patientSecondName,
          "first-last-name-patient": response.data.patientSurname,
          "second-last-name-patient": response.data.patientLastname,
          "age-patient": response.data.patientAge,
          "gender-patient": response.data.patientGender,
          "eps-patient": response.data.patientCompanyDescription,
          "diagnostic-code-patient": response.data.diagnosisCode,
          "diagnostic-description-patient": response.data.diagnosisDescription,
        });
      } else if (response?.error) {
        dispatch(
          setShowMessage({
            type: "error",
            content: response.error.data.message,
          })
        );
        setIsPatientFound(false);
        onCleanPatientForm();
        setFindSimilarReportDataLocalState([]);
        // setIsConfirmContinueToGenerateReport(false);
      } else {
        dispatch(
          setShowMessage({
            type: "error",
            content: "¡Error en la petición!",
          })
        );
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createCaseReportOriginal({
        ori_cr_dateofcase: dateCaseLocalState,
        ori_cr_casetype_id_fk: idOfCaseTypeState,
        ori_cr_anonymoususer: isAnonimousReporterLocalState,
        ori_cr_fullnamereporter: !isAnonimousReporterLocalState
          ? fullNameUserLocalState
          : null,
        ori_cr_documentreporter: !isAnonimousReporterLocalState
          ? identificationUserLocalState
          : null,
        ori_cr_origin_id_fk: originIdLocalState,
        ori_cr_suborigin_id_fk: subOriginIdLocalState,
        ori_cr_originservice_id_fk: originServiceIdLocalState,
        ori_cr_reportingservice_id_fk: reportingServiceIdLocalState,
        ori_cr_associatedpatient: isAssociatedPatientLocalState,
        ori_cr_documentpatient: isAssociatedPatientLocalState
          ? identificationPatientLocalState
          : null,
        ori_cr_doctypepatient: isAssociatedPatientLocalState
          ? identificationTypePatientLocalState
          : null,
        ori_cr_firstnamepatient: isAssociatedPatientLocalState
          ? firstNamePatientLocalState
          : null,
        ori_cr_secondnamepatient: isAssociatedPatientLocalState
          ? secondNamePatientLocalState
          : null,
        ori_cr_firstlastnamepatient: isAssociatedPatientLocalState
          ? firstLastNamePatientLocalState
          : null,
        ori_cr_secondlastnamepatient: isAssociatedPatientLocalState
          ? secondLastNamePatientLocalState
          : null,
        ori_cr_agepatient: isAssociatedPatientLocalState
          ? agePatientLocalState
          : null,
        ori_cr_genderpatient: isAssociatedPatientLocalState
          ? genderPatientLocalState
          : null,
        ori_cr_epspatient: isAssociatedPatientLocalState
          ? epsPatientLocalState
          : null,
        ori_cr_diagnosticcodepatient: isAssociatedPatientLocalState
          ? diagnosticCodeLocalState
          : null,
        ori_cr_diagnosticdescriptionpatient: isAssociatedPatientLocalState
          ? diagnosticDescriptionLocalState
          : null,
        ori_cr_admconsecutivepatient:
          isAssociatedPatientLocalState &&
          consecutivePatientLocalState &&
          isPatientFound
            ? consecutivePatientLocalState
            : null,
        ori_cr_foliopatient:
          isAssociatedPatientLocalState &&
          consecutivePatientLocalState &&
          isPatientFound
            ? folioPatientLocalState
            : null,
        ori_cr_eventtype_id_fk: eventTypeIdLocalState,
        ori_cr_event_id_fk: eventIdLocalState,
        ori_cr_descriptionothers: descriptionOthersLocalState
          ? descriptionOthersLocalState
          : null,
        ori_cr_description: descriptionRiskLocalState,
      });

      let isError = response.error;
      let isSuccess = response.data;

      if (isError) {
        setIsModalVisibleReportGeneratedSuccessfully(false);
        const errorMessage = isError?.data.message;
        dispatch(
          setShowMessage({
            type: "error",
            content: errorMessage,
          })
        );
      }

      if (isSuccess && !isError) {
        setMessageReportGeneratedSuccessfullLocalState(response.data.message);
        setIsModalVisibleReportGeneratedSuccessfully(true);
        // setIsConfirmContinueToGenerateReport(false);
        setIsPatientFound(false);
        onCleanAllForm();
      }
    } catch (error) {
      setIsModalVisibleReportGeneratedSuccessfully(false);
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar el formulario", error);
    }
  };

  return (
    <div className="case-report-risk" style={{ padding: "16px" }}>
      <Form
        form={form}
        id="create-case-report-form"
        name="create-case-report-form"
        className="create-report-form"
        layout="vertical"
        initialValues={{ remember: false }}
        autoComplete="off"
        onFinish={handleClickSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col>
            <Form.Item
              label="Fuente"
              id="origin-id"
              className="origin-id"
              name="origin-id"
              rules={[
                {
                  required: true,
                  message: "¡Por favor seleccione una opción!",
                },
              ]}
              style={{ minWidth: "200px", marginBottom: "1px" }}
            >
              <Select
                placeholder="Seleccione una opción"
                onChange={(value) => {
                  setOriginIdLocalState(value);
                  setSubOriginIdLocalState(0);

                  form.setFieldsValue({ "sub-origin-id": undefined });
                  form.validateFields(["sub-origin-id"]);
                }}
                value={originIdLocalState}
                allowClear
                size="small"
                loading={allOriginsDataLoading || allOriginsDataFetching}
                style={{ width: "100%" }}
              >
                {Array.isArray(allOriginsData) &&
                  allOriginsData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.orig_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Sub fuente"
              id="sub-origin-id"
              className="sub-origin-id"
              name="sub-origin-id"
              rules={[
                {
                  required: true,
                  message: "¡Por favor seleccione una opción!",
                },
              ]}
              style={{ minWidth: "200px", marginBottom: "1px" }}
            >
              <Select
                placeholder={
                  !originIdLocalState
                    ? "Seleccione primero la fuente"
                    : "Seleccione una opción"
                }
                onChange={(value) => setSubOriginIdLocalState(value)}
                value={subOriginIdLocalState || undefined}
                allowClear
                size="small"
                disabled={
                  originIdLocalState === 0 || originIdLocalState === undefined
                }
                loading={
                  allSubOriginsByOriginIdDataLoading ||
                  allSubOriginsByOriginIdDataFetching
                }
                style={{ width: "100%" }}
              >
                {Array.isArray(allSubOriginsByOriginIdData) &&
                  allSubOriginsByOriginIdData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.sub_o_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Title
            level={5}
            style={{
              color: "#002140",
              marginTop: "10px",
              marginRight: "10px",
            }}
          >
            ¿Deseas enviar el reporte de forma anónima?
          </Title>
          <Space>
            <Radio.Group
              onChange={(e) => setIsAnonimousReporterLocalState(e.target.value)}
              value={isAnonimousReporterLocalState}
            >
              <Radio value={true}>Si</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Space>
        </Row>

        {!isAnonimousReporterLocalState && (
          <>
            <Title
              level={5}
              style={{
                color: "#f28322",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Datos del reportante
            </Title>
            <ReporterForm
              identificationUserLocalState={identificationUserLocalState}
              setIdentificationUserLocalState={setIdentificationUserLocalState}
              fullNameUserLocalState={fullNameUserLocalState}
              setFullNameUserLocalState={setFullNameUserLocalState}
              chargeUserLocalState={chargeUserLocalState}
              setChargeUserLocalState={setChargeUserLocalState}
              userVerifyLoading={userVerifyLoading}
            />
          </>
        )}

        <Card
          style={{
            // display: "flex",
            width: "100%",
            height: "100%",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            marginTop: "10px",
          }}
          bordered={false}
        >
          <Row gutter={[16, 16]} style={{ width: "100%" }}>
            {/* Fecha del caso */}
            <Col xs={24} sm={12} md={8} lg={4}>
              <Form.Item
                label="Fecha del caso"
                id="date-case"
                className="date-case"
                name="date-case"
                rules={[
                  {
                    required: true,
                    validator: validateRequiredDate(
                      dateCaseLocalState,
                      "¡Seleccione una fecha!"
                    ),
                  },
                ]}
                style={{
                  width: "100%",
                  marginTop: "-5px",
                  marginBottom: "-5px",
                }}
              >
                <CustomDatePicker
                  onChangeDateCustomDatePicker={onChangeDateCase}
                />
              </Form.Item>
            </Col>

            {/* Servicio de origen */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Servicio de origen"
                id="origin-service-id"
                className="origin-service-id"
                name="origin-service-id"
                rules={[
                  {
                    required: true,
                    message: "¡Seleccione una opción!",
                  },
                ]}
                style={{
                  width: "100%",
                  marginTop: "-5px",
                  marginBottom: "-5px",
                }}
              >
                <Select
                  placeholder={"Seleccione una opción"}
                  onChange={(value) => setOriginServiceIdLocalState(value)}
                  value={originServiceIdLocalState}
                  showSearch
                  allowClear
                  size="small"
                  loading={allServicesDataLoading || allServicesDataFetching}
                  filterOption={(input, option) => {
                    return (
                      (option?.children &&
                        option.children
                          .toString()
                          .toUpperCase()
                          .includes(input.toUpperCase())) ||
                      false
                    );
                  }}
                  style={{ width: "100%" }}
                >
                  {Array.isArray(allServicesData) &&
                    allServicesData?.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.serv_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Servicio que reporta */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Servicio que reporta"
                id="reporting-service-id"
                className="reporting-service-id"
                name="reporting-service-id"
                rules={[
                  {
                    required: true,
                    message: "¡Seleccione una opción!",
                  },
                ]}
                style={{
                  width: "100%",
                  marginTop: "-5px",
                  marginBottom: "-5px",
                }}
              >
                <Select
                  placeholder={"Seleccione una opción"}
                  onChange={handleChangeService}
                  value={reportingServiceIdLocalState}
                  showSearch
                  allowClear
                  size="small"
                  loading={allServicesDataLoading || allServicesDataFetching}
                  filterOption={(input, option) => {
                    return (
                      (option?.children &&
                        option.children
                          .toString()
                          .toUpperCase()
                          .includes(input.toUpperCase())) ||
                      false
                    );
                  }}
                  style={{ width: "100%" }}
                >
                  {Array.isArray(allServicesData) &&
                    allServicesData?.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.serv_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Row>
          <Title
            level={5}
            style={{
              color: "#002140",
              marginTop: "10px",
              marginRight: "10px",
            }}
          >
            ¿Esta asociado a un paciente?
          </Title>
          <Space>
            <Radio.Group
              onChange={(e) => setIsAssociatedPatientLocalState(e.target.value)}
              value={isAssociatedPatientLocalState}
            >
              <Radio value={true}>Si</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Space>
        </Row>

        {isAssociatedPatientLocalState && (
          <>
            <Title
              level={5}
              style={{
                color: "#f28322",
                marginBottom: "10px",
                // marginTop: "5px",
              }}
            >
              Datos del paciente
            </Title>

            <PatientForm
              isAdverseEvent={false}
              patientDataLoading={patientDataLoading}
              identificationPatientLocalState={identificationPatientLocalState}
              setIdentificationPatientLocalState={
                setIdentificationPatientLocalState
              }
              identificationTypePatientLocalState={
                identificationTypePatientLocalState
              }
              setIdentificationTypePatientLocalState={
                setIdentificationTypePatientLocalState
              }
              firstNamePatientLocalState={firstNamePatientLocalState}
              setFirstNamePatientLocalState={setFirstNamePatientLocalState}
              secondNamePatientLocalState={secondNamePatientLocalState}
              setSecondNamePatientLocalState={setSecondNamePatientLocalState}
              firstLastNamePatientLocalState={firstLastNamePatientLocalState}
              setFirstLastNamePatientLocalState={
                setFirstLastNamePatientLocalState
              }
              secondLastNamePatientLocalState={secondLastNamePatientLocalState}
              setSecondLastNamePatientLocalState={
                setSecondLastNamePatientLocalState
              }
              agePatientLocalState={agePatientLocalState}
              setAgePatientLocalState={setAgePatientLocalState}
              genderPatientLocalState={genderPatientLocalState}
              setGenderPatientLocalState={setGenderPatientLocalState}
              epsPatientLocalState={epsPatientLocalState}
              setEpsPatientLocalState={setEpsPatientLocalState}
              diagnosticCodeLocalState={diagnosticCodeLocalState}
              setDiagnosticCodeLocalState={setDiagnosticCodeLocalState}
              diagnosticDescriptionLocalState={diagnosticDescriptionLocalState}
              setDiagnosticDescriptionLocalState={
                setDiagnosticDescriptionLocalState
              }
              consecutivePatientLocalState={consecutivePatientLocalState}
              setConsecutivePatientLocalState={setConsecutivePatientLocalState}
              folioPatientLocalState={folioPatientLocalState}
              setFolioPatientLocalState={setFolioPatientLocalState}
              handleClickFindPatientData={handleClickFindPatientData}
              findAdmissionsPatientDataLocalState={
                findAdmissionsPatientDataLocalState
              }
              allDocumentTypeData={allDocumentTypeData}
              allDocumentTypeDataLoading={allDocumentTypeDataLoading}
              allDocumentTypeDataFetching={allDocumentTypeDataFetching}
            />
          </>
        )}

        <Title
          level={5}
          style={{
            color: "#f28322",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          Datos del caso
        </Title>
        <Card
          style={{
            // display: "flex",
            width: "100%",
            height: "100%",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
          }}
          bordered={false}
        >
          <Row gutter={[16, 16]} style={{ width: "100%" }}>
            {/* estrategia */}
            <Col xs={24} sm={12} md={8} lg={7}>
              <Form.Item
                label="Subsistema"
                id="event-type-id"
                className="event-type-id"
                name="event-type-id"
                rules={[
                  {
                    required: true,
                    message: "¡Por favor seleccione una opción!",
                  },
                ]}
                style={{ width: "100%", marginTop: "-10px" }}
              >
                <Select
                  placeholder={
                    !reportingServiceIdLocalState
                      ? "Seleccione primero el servicio que reporta"
                      : "Seleccione una opción"
                  }
                  onChange={(value) => {
                    setEventTypeIdLocalState(value);
                    setEventIdLocalState(0);
                    setDescriptionOthersLocalState("");
                    setShowDescriptionOthersLocalState(false);
                    setFindSimilarReportDataLocalState([]);
                    // setIsConfirmContinueToGenerateReport(false);

                    form.setFieldsValue({
                      "event-id": undefined,
                      "description-others": undefined,
                    });
                    form.validateFields(["event-id"]);
                  }}
                  value={eventTypeIdLocalState}
                  showSearch
                  allowClear
                  size="small"
                  disabled={
                    reportingServiceIdLocalState === 0 ||
                    reportingServiceIdLocalState === undefined ||
                    (!isPatientFound && isAssociatedPatientLocalState)
                  }
                  loading={
                    allEventTypeByCaseTypeIdDataLoading ||
                    allEventTypeByCaseTypeIdDataFetching
                  }
                  filterOption={(input, option) => {
                    return (
                      (option?.children &&
                        option.children
                          .toString()
                          .toUpperCase()
                          .includes(input.toUpperCase())) ||
                      false
                    );
                  }}
                  style={{ width: "100%" }}
                >
                  {Array.isArray(allEventTypeByCaseTypeIdData) &&
                    allEventTypeByCaseTypeIdData?.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.eve_t_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            {/* suceso */}
            <Col xs={24} sm={12} md={8} lg={7}>
              <Form.Item
                label="Riesgo"
                id="event-id"
                className="event-id"
                name="event-id"
                rules={[
                  {
                    required: true,
                    message: "¡Por favor seleccione una opción!",
                  },
                ]}
                style={{ width: "100%", marginTop: "-10px" }}
              >
                <Select
                  placeholder={
                    !eventTypeIdLocalState
                      ? "Seleccione primero el subsistema"
                      : "Seleccione una opción"
                  }
                  onChange={handleChangeEvent}
                  value={eventIdLocalState}
                  showSearch
                  allowClear
                  size="small"
                  disabled={
                    eventTypeIdLocalState === 0 ||
                    eventTypeIdLocalState === undefined
                  }
                  loading={
                    allEventsByEventTypeIdAndUnitIdDataLoading ||
                    allEventsByEventTypeIdAndUnitIdDataFetching
                  }
                  filterOption={(input, option) => {
                    return (
                      (option?.children &&
                        option.children
                          .toString()
                          .toUpperCase()
                          .includes(input.toUpperCase())) ||
                      false
                    );
                  }}
                  style={{ width: "100%" }}
                >
                  {Array.isArray(allEventsByEventTypeIdAndUnitIdData) &&
                    allEventsByEventTypeIdAndUnitIdData?.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.eve_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            {showDescriptionOthersLocalState && (
              <Col xs={24} sm={12} md={8} lg={5}>
                <Form.Item
                  label="Describe otros"
                  id="description-others"
                  className="description-others"
                  name="description-others"
                  style={{ width: "100%", marginTop: "-10px" }}
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor ingresa la descripción!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) =>
                      setDescriptionOthersLocalState(
                        e.target.value.toUpperCase()
                      )
                    }
                    type="text"
                    value={descriptionOthersLocalState}
                    prefix={<MdOutlineDescription />}
                    placeholder="Describe..."
                    size="small"
                    style={{ width: "100%", textTransform: "uppercase" }}
                  />
                </Form.Item>
              </Col>
            )}

            {findSimilarReportDataLocalState.length > 0 ? (
              <Col xs={24} sm={12} md={8} lg={5}>
                <Form.Item style={{ width: "100%", marginTop: "19px" }}>
                  <CustomButton
                    classNameCustomButton="validate-stocks-report-button"
                    idCustomButton="validate-stocks-report-button"
                    titleCustomButton="Validar existencias"
                    typeCustomButton="primary"
                    htmlTypeCustomButton="button"
                    iconCustomButton={<FaMagnifyingGlass />}
                    onClickCustomButton={() =>
                      setIsModalVisibleValidateExistence(true)
                    }
                    styleCustomButton={{
                      background: "#f28322",
                      color: "#fff",
                      fontSize: "12px",
                      borderRadius: "16px",
                    }}
                    iconPositionCustomButton={"end"}
                    sizeCustomButton={"small"}
                    disabledCustomButton={false}
                  />
                </Form.Item>
              </Col>
            ) : null}
          </Row>

          {/* {isConfirmContinueToGenerateReport && ( */}
          <>
            <Row gutter={[16, 16]} style={{ width: "100%" }}>
              <Col xs={24} sm={25} md={12} lg={12}>
                <Form.Item
                  label="Describa brevemente el riesgo (Hallazgo al examen físico, posibles consecuencias)"
                  id="description-risk"
                  className="description-risk"
                  name="description-risk"
                  style={{ width: "100%", marginTop: "-5px" }}
                  rules={[
                    {
                      required: true,
                      message: "Escribe la descripción del caso!",
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    onChange={(e) =>
                      setDescriptionRiskLocalState(e.target.value.toUpperCase())
                    }
                    value={descriptionRiskLocalState}
                    style={{ width: "100%", textTransform: "uppercase" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row
              gutter={[16, 16]}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Col>
                <Form.Item style={{ width: "100%", marginBottom: "-5px" }}>
                  <CustomButton
                    classNameCustomButton="generate-report-button"
                    idCustomButton="generate-report-button"
                    titleCustomButton="Generar reporte"
                    typeCustomButton="primary"
                    htmlTypeCustomButton="submit"
                    iconCustomButton={
                      !createdCaseReportOriginalDataLoading ? (
                        <FaRegCircleCheck />
                      ) : (
                        <LoadingOutlined />
                      )
                    }
                    onClickCustomButton={() => ({})}
                    styleCustomButton={{
                      background: !createdCaseReportOriginalDataLoading
                        ? "#002140"
                        : "#6C757D",
                      color: "#fff",
                      fontSize: "12px",
                      borderRadius: "16px",
                    }}
                    iconPositionCustomButton={"end"}
                    sizeCustomButton={"small"}
                    disabledCustomButton={
                      !createdCaseReportOriginalDataLoading ? false : true
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
          {/* )} */}
        </Card>
      </Form>
      <CustomModalNoContent
        key={"custom-modal-validate-existence-cases"}
        widthCustomModalNoContent="98%"
        openCustomModalState={isModalVisibleValidateExistence}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() =>
          setIsModalVisibleValidateExistence(false)
        }
        contentCustomModal={
          <ContentValidateExistenceCases
            findSimilarReportData={findSimilarReportDataLocalState || []}
            onConfirm={handleClickConfirmValidateExistenceCase}
            // onCancel={handleClickNegationValidateExistenceCase}
          />
        }
      />
      <CustomModalNoContent
        key={"custom-modal-report-generated-successfully"}
        widthCustomModalNoContent="35%"
        openCustomModalState={isModalVisibleReportGeneratedSuccessfully}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() =>
          setIsModalVisibleReportGeneratedSuccessfully(false)
        }
        contentCustomModal={
          <ContentReportGeneratedSuccessfully
            messageData={messageReportGeneratedSuccessfullLocalState}
          />
        }
      />
    </div>
  );
};

export default RiskContent;
