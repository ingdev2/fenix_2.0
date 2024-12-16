"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/redux/hook";

import { validateRequiredDate } from "@/helpers/validate_required_values/validate_required_files";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomDatePicker from "@/components/common/custom_date_picker/CustomDatePicker";

import {
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Upload,
  DatePickerProps,
} from "antd";
import { Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

import { IdcardOutlined, UserOutlined } from "@ant-design/icons";
import {
  MdOutlineDescription,
  MdOutlinePersonalInjury,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { FaRegBuilding, FaRegCircleCheck } from "react-icons/fa6";
import { BsFillFileMedicalFill, BsGenderAmbiguous } from "react-icons/bs";
import { IoMedicalOutline } from "react-icons/io5";

import { useGetAllOriginsQuery } from "@/redux/apis/origin/originApi";
import { useGetAllSubOriginsByOriginIdQuery } from "@/redux/apis/sub_origin/subOriginApi";
import { useGetAllServicesQuery } from "@/redux/apis/service/serviceApi";
import { useGetEventTypeByCaseTypeIdQuery } from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllEventsByEventTypeIdAndUnitIdQuery } from "@/redux/apis/event/eventApi";

const RiskContent: React.FC = () => {
  const [originId, setOriginId] = useState(0);
  const [subOriginId, setSubOriginId] = useState(0);
  const [reportingServiceId, setReportingServiceId] = useState(0);
  const [originServiceId, setOriginServiceId] = useState(0);
  const [eventTypeId, setEventTypeId] = useState(0);
  const [eventId, setEventId] = useState(0);
  const [unitId, setUnitId] = useState(0);

  const [userId, setUserId] = useState("");
  const [isAnonimousReporter, setIsAnonimousReporter] = useState(false);
  const [identificationUser, setIdentificationUser] = useState("");
  const [fullNameUser, setFullNameUser] = useState("");

  const [dateCase, setDateCase] = useState("");
  const [isAssociatedPatient, setIsAssociatedPatient] = useState(true);
  const [identificationPatient, setIdentificationPatient] = useState("");
  const [identificationTypePatient, setIdentificationTypePatient] =
    useState("");
  const [firstNamePatient, setFirstNamePatient] = useState("");
  const [secondNamePatient, setSecondNamePatient] = useState("");
  const [firstLastNamePatient, setFirstLastNamePatient] = useState("");
  const [secondLastNamePatient, setSecondLastNamePatient] = useState("");
  const [agePatient, setAgePatient] = useState("");
  const [genderPatient, setGenderPatient] = useState("");
  const [epsPatient, setEpsPatient] = useState("");
  const [consecutivePatient, setConsecutivePatient] = useState(0);
  const [diagnosticCode, setDiagnosticCode] = useState("");
  const [diagnosticDescription, setDiagnosticDescription] = useState("");

  const [descriptionOthers, setDescriptionOthers] = useState("");
  const [showDescriptionOthers, setShowDescriptionOthers] = useState(false);
  const [descriptionRisk, setDescriptionRisk] = useState("");

  const idOfCaseTypeState = useAppSelector(
    (state) => state.changeOfCaseType.idOfCaseType
  );

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
  } = useGetAllSubOriginsByOriginIdQuery(originId, { skip: !originId });

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
    { eventTypeId, unitId },
    { skip: !eventTypeId }
  );

  const handleChangeService = (value: number) => {
    setReportingServiceId(value);
    setEventTypeId(0);
    setEventId(0);
    setDescriptionOthers("");
    setShowDescriptionOthers(false);

    form.setFieldsValue({ "event-id": undefined });
    form.setFieldsValue({ "event-type-id": undefined });
    form.setFieldsValue({ "description-others": undefined });

    const selectedOptionService = allServicesData?.find(
      (item) => item.id === value
    );

    if (selectedOptionService && selectedOptionService.serv_unit_id_fk) {
      setUnitId(selectedOptionService.serv_unit_id_fk);
    }
  };

  const handleChangeEvent = (value: number) => {
    setEventId(value);
    setDescriptionOthers("");

    form.setFieldsValue({ "description-others": undefined });

    const selectedOptionEvent = allEventsByEventTypeIdAndUnitIdData?.find(
      (item) => item.id === value
    );

    setShowDescriptionOthers(selectedOptionEvent?.eve_name === "OTROS");
  };

  const onChangeDateCase: DatePickerProps["onChange"] = (date, dateString) => {
    setDateCase(dateString.toString());
  };

  const handleClickSubmit = () => {};

  return (
    <div className="case-report-risk" style={{ padding: "16px" }}>
      <Title level={5} style={{ color: "#f28322" }}>
        Datos del reportante
      </Title>
      <div>
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
                    setOriginId(value);
                    setSubOriginId(0);

                    form.setFieldsValue({ "sub-origin-id": undefined });
                    form.validateFields(["sub-origin-id"]);
                  }}
                  value={originId}
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
                    !originId
                      ? "Seleccione primero la fuente"
                      : "Seleccione una opción"
                  }
                  onChange={(value) => setSubOriginId(value)}
                  value={subOriginId || undefined}
                  allowClear
                  size="small"
                  disabled={originId === 0 || originId === undefined}
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
                marginBottom: "10px",
              }}
            >
              ¿Deseas enviar el reporte de forma anónima?
            </Title>
            <Space>
              <Radio.Group
                onChange={(e) => setIsAnonimousReporter(e.target.value)}
                value={isAnonimousReporter}
              >
                <Radio value={true}>Si</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Space>
          </Row>

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
              {!isAnonimousReporter && (
                <>
                  {/* Identificación reportante*/}
                  <Col xs={24} sm={12} md={8} lg={3}>
                    <Form.Item
                      label="Identificación"
                      id="identification-user"
                      className="identification-user"
                      name="identification-user"
                      style={{
                        width: "100%",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                    >
                      <Input
                        onChange={(e) => setIdentificationUser(e.target.value)}
                        value={identificationUser}
                        prefix={<IdcardOutlined />}
                        placeholder="1148752699"
                        size="small"
                        disabled
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Nombre completo reportante*/}
                  <Col xs={24} sm={12} md={8} lg={5}>
                    <Form.Item
                      label="Nombre Completo:"
                      id="full-name-user"
                      className="full-name-user"
                      name="full-name-user"
                      style={{
                        width: "100%",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                    >
                      <Input
                        onChange={(e) => setFullNameUser(e.target.value)}
                        value={fullNameUser}
                        prefix={<UserOutlined />}
                        placeholder="CAMILO SALGADO"
                        size="small"
                        disabled
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Cargo*/}
                  <Col xs={24} sm={12} md={8} lg={5}>
                    <Form.Item
                      label="Cargo:"
                      id="position-user"
                      className="position-user"
                      name="position-user"
                      style={{
                        width: "100%",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                    >
                      <Input
                        onChange={(e) => setFullNameUser(e.target.value)}
                        value={fullNameUser}
                        prefix={<MdOutlineWorkOutline />}
                        placeholder="COORDINADOR PROYECTOS"
                        size="small"
                        disabled
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </>
              )}

              {/* Fecha del caso */}
              <Col xs={24} sm={12} md={8} lg={3}>
                <Form.Item
                  label="Fecha del caso"
                  id="date-case"
                  className="date-case"
                  name="date-case"
                  rules={[
                    {
                      required: true,
                      validator: validateRequiredDate(
                        dateCase,
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
              <Col xs={24} sm={12} md={8} lg={4}>
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
                    onChange={(value) => setOriginServiceId(value)}
                    value={originServiceId}
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
              <Col xs={24} sm={12} md={8} lg={4}>
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
                    value={reportingServiceId}
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
                onChange={(e) => setIsAssociatedPatient(e.target.value)}
                value={isAssociatedPatient}
              >
                <Radio value={true}>Si</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Space>
          </Row>

          {isAssociatedPatient && (
            <>
              <Title
                level={5}
                style={{
                  color: "#f28322",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                Datos del paciente
              </Title>
              <Card
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "16px",
                }}
                bordered={false}
              >
                <Row gutter={[16, 16]} style={{ width: "100%" }}>
                  {/* tipo identificacion paciente*/}
                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Form.Item
                      label="Tipo de identificación"
                      id="identification-type-patient"
                      className="identification-type-patient"
                      name="identification-type-patient"
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
                        placeholder="Seleccione una opción"
                        onChange={(value) =>
                          setIdentificationTypePatient(value)
                        }
                        value={identificationTypePatient}
                        size="small"
                        showSearch
                        allowClear
                        // loading
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
                        <Select.Option value="1">
                          CEDULA CIUDADANIA
                        </Select.Option>
                        <Select.Option value="2">
                          CEDULA EXTRANJERA
                        </Select.Option>
                        <Select.Option value="3">
                          TARJETA DE IDENTIDAD
                        </Select.Option>
                        <Select.Option value="4">PASAPORTE</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Identificación paciente*/}
                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Form.Item
                      label="Identificación"
                      id="identification-patient"
                      className="identification-patient"
                      name="identification-patient"
                      style={{
                        width: "100%",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                      normalize={(value) => {
                        if (!value) return "";

                        return value.replace(/[^0-9]/g, "");
                      }}
                      rules={[
                        {
                          required: true,
                          message: "¡Ingresa tu número de identificación!",
                        },
                        {
                          pattern: /^[0-9]+$/,
                          message:
                            "¡Ingresa número de identificación sin puntos, ni comas!",
                        },
                        {
                          min: 7,
                          message: "¡Ingresa mínimo 7 números!",
                        },
                        {
                          max: 11,
                          message: "¡Ingresa máximo 11 números!",
                        },
                      ]}
                    >
                      <Input
                        placeholder={
                          !identificationTypePatient
                            ? "Seleccione el tipo de identificación"
                            : "Escribe..."
                        }
                        onChange={(e) =>
                          setIdentificationPatient(e.target.value)
                        }
                        disabled={
                          identificationTypePatient === "" ||
                          identificationTypePatient === undefined
                        }
                        value={identificationPatient}
                        prefix={<IdcardOutlined />}
                        size="small"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Primer nombre paciente*/}
                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Form.Item
                      label="Primer nombre:"
                      id="first-name-patient"
                      className="first-name-patient"
                      name="first-name-patient"
                      style={{
                        width: "100%",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                    >
                      <Input
                        onChange={(e) => setFirstNamePatient(e.target.value)}
                        value={firstNamePatient}
                        prefix={<MdOutlinePersonalInjury />}
                        placeholder="MARIA"
                        size="small"
                        disabled
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Segundo nombre paciente*/}
                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Form.Item
                      label="Segundo nombre:"
                      id="second-name-patient"
                      className="second-name-patient"
                      name="second-name-patient"
                      style={{
                        width: "100%",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                    >
                      <Input
                        onChange={(e) => setSecondNamePatient(e.target.value)}
                        value={secondNamePatient}
                        prefix={<MdOutlinePersonalInjury />}
                        placeholder="EUGENIA"
                        size="small"
                        disabled
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Primer apellido paciente*/}
                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Form.Item
                      label="Primer apellido:"
                      id="first-last-name-patient"
                      className="first-last-name-patient"
                      name="first-last-name-patient"
                      style={{
                        width: "100%",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                    >
                      <Input
                        onChange={(e) =>
                          setFirstLastNamePatient(e.target.value)
                        }
                        value={firstLastNamePatient}
                        prefix={<MdOutlinePersonalInjury />}
                        placeholder="GONZALES"
                        size="small"
                        disabled
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Segundo apellido paciente*/}
                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Form.Item
                      label="Segundo apellido:"
                      id="second-last-name-patient"
                      className="second-last-name-patient"
                      name="second-last-name-patient"
                      style={{
                        width: "100%",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                    >
                      <Input
                        onChange={(e) =>
                          setSecondLastNamePatient(e.target.value)
                        }
                        value={secondLastNamePatient}
                        prefix={<MdOutlinePersonalInjury />}
                        placeholder="CAMARGO"
                        size="small"
                        disabled
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Edad paciente*/}
                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Form.Item
                      label="Edad:"
                      id="age-patient"
                      className="age-patient"
                      name="age-patient"
                      style={{
                        width: "100%",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                    >
                      <Input
                        onChange={(e) => setAgePatient(e.target.value)}
                        value={agePatient}
                        prefix={<MdOutlinePersonalInjury />}
                        placeholder="58"
                        size="small"
                        disabled
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* genero paciente*/}
                  <Col xs={24} sm={12} md={8} lg={2}>
                    <Form.Item
                      label="Genero:"
                      id="gender-patient"
                      className="gender-patient"
                      name="gender-patient"
                      style={{
                        width: "100%",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                    >
                      <Input
                        onChange={(e) => setGenderPatient(e.target.value)}
                        value={genderPatient}
                        prefix={<BsGenderAmbiguous />}
                        placeholder="F"
                        size="small"
                        disabled
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* eps paciente*/}
                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Form.Item
                      label="Empresa (EPS):"
                      id="eps-patient"
                      className="eps-patient"
                      name="eps-patient"
                      style={{
                        width: "100%",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                    >
                      <Input
                        onChange={(e) => setEpsPatient(e.target.value)}
                        value={epsPatient}
                        prefix={<FaRegBuilding />}
                        placeholder="SURA"
                        size="small"
                        disabled
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* codigo diagnostico */}
                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Form.Item
                      label="Código diagnóstico:"
                      id="diagnostic-code-patient"
                      className="diagnostic-code-patient"
                      name="diagnostic-code-patient"
                      style={{
                        width: "100%",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                    >
                      <Input
                        onChange={(e) => setDiagnosticCode(e.target.value)}
                        value={diagnosticCode}
                        prefix={<IoMedicalOutline />}
                        placeholder="A254"
                        size="small"
                        disabled
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* descripcion diagnostico */}
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item
                      label="Descripción diagnóstico:"
                      id="diagnostic-description-patient"
                      className="diagnostic-description-patient"
                      name="diagnostic-description-patient"
                      style={{
                        width: "100%",
                        marginTop: "-5px",
                        marginBottom: "-5px",
                      }}
                    >
                      <Input
                        onChange={(e) =>
                          setDiagnosticDescription(e.target.value)
                        }
                        value={diagnosticDescription}
                        prefix={<BsFillFileMedicalFill />}
                        placeholder="HIPERPLASIA DE LA PROSTATA"
                        size="small"
                        disabled
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* consecutivo paciente */}
                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Form.Item
                      label="Consecutivo"
                      id="consecutive-patient"
                      className="consecutive-patient"
                      name="consecutive-patient"
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
                        placeholder="Seleccione una opción"
                        onChange={(value) => setConsecutivePatient(value)}
                        value={consecutivePatient}
                        size="small"
                        allowClear
                        // loading
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
                        <Select.Option value="opcion1">Opción 1</Select.Option>
                        <Select.Option value="opcion2">Opción 2</Select.Option>
                        <Select.Option value="opcion3">Opción 3</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
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
                  style={{ width: "100%", marginTop: "-5px" }}
                >
                  <Select
                    placeholder={
                      !reportingServiceId
                        ? "Seleccione primero el servicio que reporta"
                        : "Seleccione una opción"
                    }
                    onChange={(value) => {
                      setEventTypeId(value);
                      setEventId(0);
                      setDescriptionOthers("");
                      setShowDescriptionOthers(false);

                      form.setFieldsValue({ "event-id": undefined });
                      form.setFieldsValue({ "description-others": undefined });
                      form.validateFields(["event-id"]);
                    }}
                    value={eventTypeId}
                    showSearch
                    allowClear
                    size="small"
                    disabled={
                      reportingServiceId === 0 ||
                      reportingServiceId === undefined
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
                  style={{ width: "100%", marginTop: "-5px" }}
                >
                  <Select
                    placeholder={
                      !eventTypeId
                        ? "Seleccione primero el subsistema"
                        : "Seleccione una opción"
                    }
                    onChange={handleChangeEvent}
                    value={eventId}
                    showSearch
                    allowClear
                    size="small"
                    disabled={eventTypeId === 0 || eventTypeId === undefined}
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

              {showDescriptionOthers && (
                <Col xs={24} sm={12} md={8} lg={7}>
                  <Form.Item
                    label="Describe otros"
                    id="description-others"
                    className="description-others"
                    name="description-others"
                    style={{ width: "100%", marginTop: "-5px" }}
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor ingresa la descripción!",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) =>
                        setDescriptionOthers(e.target.value.toUpperCase())
                      }
                      type="text"
                      value={descriptionOthers}
                      prefix={<MdOutlineDescription />}
                      placeholder="Describe..."
                      size="small"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>

            <Row gutter={[16, 16]} style={{ width: "100%" }}>
              <Col xs={24} sm={25} md={12} lg={12}>
                <Form.Item
                  label="Describa brevemente el riesgo (Hallazgo al examen físico, posibles consecuencias)"
                  id="description-risk"
                  className="description-risk"
                  name="description-risk"
                  style={{ width: "100%", marginTop: "-5px" }}
                >
                  <TextArea
                    rows={4}
                    onChange={(e) => setDescriptionRisk(e.target.value)}
                    value={descriptionRisk}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* <Row>
              <Title
                level={5}
                style={{
                  color: "#002140",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
              >
                ¿Se materializó el riesgo?
              </Title>
              <Space>
                <Radio.Group
                  onChange={(e) => setIsMaterializedRisk(e.target.value)}
                  value={isMaterializedRisk}
                  style={{ marginBottom: "10px" }}
                >
                  <Radio value={true}>Si</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Space>
            </Row> */}

            <Row>
              <Col>Cargar imagen</Col>
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
                    iconCustomButton={<FaRegCircleCheck />}
                    onClickCustomButton={() => ({})}
                    styleCustomButton={{
                      background: "#002140",
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
            </Row>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default RiskContent;
