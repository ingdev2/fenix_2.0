import React from "react";

import {
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { MdOutlineDescription } from "react-icons/md";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import TextArea from "antd/es/input/TextArea";

const AdverseEventDataValidateReportReviewForm: React.FC<{
  form: FormInstance<any>;
  eventTypeIdLocalState: number;
  setEventTypeIdLocalState: (value: number) => void;
  eventIdLocalState: number;
  setEventIdLocalState: (value: number) => void;
  descriptionOthersLocalState: string;
  setDescriptionOthersLocalState: (value: string) => void;
  showDescriptionOthersLocalState: boolean;
  setShowDescriptionOthersLocalState: (value: boolean) => void;
  riskLevelIdLocalState: number;
  setRiskLevelIdLocalState: (value: number) => void;
  severityClasificationIdLocalState: number;
  setSeverityClasificationIdLocalState: (value: number) => void;
  descriptionCaseLocalState: string;
  setDescriptionCaseLocalState: (value: string) => void;
  inmediateActionsLocalState: string;
  setInmediateActionsLocalState: (value: string) => void;
  allEventTypeByCaseTypeIdDataLoading: boolean;
  allEventTypeByCaseTypeIdDataFetching: boolean;
  allEventsByEventTypeIdDataLoading: boolean;
  allEventsByEventTypeIdDataFetching: boolean;
  allRiskLevelDataLoading: boolean;
  allSeverityClasificationsDataLoading: boolean;
  allEventTypeByCaseTypeIdData: EventType[] | undefined;
  allEventsByEventTypeIdData: Events[] | undefined;
  allRiskLevelData: RiskLevel[] | undefined;
  allSeverityClasificationsData: SeverityClasification[] | undefined;
  handleChangeEvent: (value: number) => void;
}> = ({
  form,
  eventTypeIdLocalState,
  setEventTypeIdLocalState,
  eventIdLocalState,
  setEventIdLocalState,
  descriptionOthersLocalState,
  setDescriptionOthersLocalState,
  showDescriptionOthersLocalState,
  setShowDescriptionOthersLocalState,
  riskLevelIdLocalState,
  setRiskLevelIdLocalState,
  severityClasificationIdLocalState,
  setSeverityClasificationIdLocalState,
  descriptionCaseLocalState,
  setDescriptionCaseLocalState,
  inmediateActionsLocalState,
  setInmediateActionsLocalState,
  allEventTypeByCaseTypeIdDataLoading,
  allEventTypeByCaseTypeIdDataFetching,
  allEventsByEventTypeIdDataLoading,
  allEventsByEventTypeIdDataFetching,
  allRiskLevelDataLoading,
  allSeverityClasificationsDataLoading,
  allEventTypeByCaseTypeIdData,
  allEventsByEventTypeIdData,
  allRiskLevelData,
  allSeverityClasificationsData,
  handleChangeEvent,
}) => {
  const { Title } = Typography;
  return (
    <>
      <div>
        <Title
          level={5}
          style={{
            color: "#f28322",
            marginBottom: 0,
          }}
        >
          Datos del caso
        </Title>
      </div>
      <Divider style={{ marginTop: "8px", marginBottom: "15px" }} />
      <div>
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col xs={24} sm={12} md={8} lg={7}>
            <Form.Item
              label="Estrategia"
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
                placeholder={"Seleccione una opción"}
                onChange={(value) => {
                  setEventTypeIdLocalState(value);
                  setEventIdLocalState(0);
                  setDescriptionOthersLocalState("");
                  setShowDescriptionOthersLocalState(false);

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
              label="Suceso"
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
                    ? "Seleccione primero la estrategia"
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
                  allEventsByEventTypeIdDataLoading ||
                  allEventsByEventTypeIdDataFetching
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
                {Array.isArray(allEventsByEventTypeIdData) &&
                  allEventsByEventTypeIdData?.map((item: any) => (
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
                    setDescriptionOthersLocalState(e.target.value.toUpperCase())
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
        </Row>

        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          {/* nivel de riesgo */}
          <Col xs={24} sm={12} md={8} lg={10}>
            {/* <Space> */}
            <Form.Item
              label="Nivel de riesgo"
              id="risk-level-id"
              className="risk-level-id"
              name="risk-level-id"
              rules={[
                {
                  required: true,
                  message: "¡Seleccione una opción!",
                },
              ]}
              style={{ width: "100%", marginTop: "-15px" }}
            >
              {allRiskLevelDataLoading ? (
                <CustomSpin />
              ) : (
                <Radio.Group
                  onChange={(e) => setRiskLevelIdLocalState(e.target.value)}
                  value={riskLevelIdLocalState}
                >
                  {Array.isArray(allRiskLevelData) &&
                    allRiskLevelData?.map((item: any) => (
                      <Radio key={item.id} value={item.id}>
                        {item.ris_l_name}
                      </Radio>
                    ))}
                </Radio.Group>
              )}
            </Form.Item>
            {/* </Space> */}
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          {/* clasificación de severidad */}
          <Col xs={24} sm={17} md={17} lg={20}>
            <Form.Item
              label="Clasificación de severidad"
              id="severity-clasification-id"
              className="severity-clasification-id"
              name="severity-clasification-id"
              rules={[
                {
                  required: true,
                  message: "¡Seleccione una opción!",
                },
              ]}
              style={{
                width: "100%",
                marginTop: "-15px",
              }}
            >
              {allSeverityClasificationsDataLoading ? (
                <CustomSpin />
              ) : (
                <Radio.Group
                  onChange={(e) =>
                    setSeverityClasificationIdLocalState(e.target.value)
                  }
                  value={severityClasificationIdLocalState}
                >
                  {Array.isArray(allSeverityClasificationsData) &&
                    allSeverityClasificationsData?.map((item: any) => (
                      <Radio
                        key={item.id}
                        value={item.id}
                        style={{ display: "block" }}
                      >
                        {item.sev_c_description}
                        {severityClasificationIdLocalState === item.id && (
                          <CustomTags
                            labelCustom={item.sev_c_name}
                            colorCustom="#002140"
                            stylesCustom={{
                              borderRadius: "30px",
                              marginLeft: "15px",
                            }}
                          />
                        )}
                      </Radio>
                    ))}
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col xs={24} sm={25} md={12} lg={12}>
            <Form.Item
              label="Describa brevemente el Evento adverso (Hallazgo al examen físico, posibles consecuencias)"
              id="description-case"
              className="description-case"
              name="description-case"
              style={{
                width: "100%",
                marginTop: "-5px",
              }}
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
                  setDescriptionCaseLocalState(e.target.value.toUpperCase())
                }
                value={descriptionCaseLocalState}
                style={{ width: "100%", textTransform: "uppercase" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={25} md={12} lg={12}>
            <Form.Item
              label="Acciones inmediatas realizadas con el paciente (Tratamiento si aplica)"
              id="inmediate-actions"
              className="inmediate-actions"
              name="inmediate-actions"
              style={{
                width: "100%",
                marginTop: "-5px",
              }}
            >
              <TextArea
                rows={4}
                onChange={(e) =>
                  setInmediateActionsLocalState(e.target.value.toUpperCase())
                }
                value={inmediateActionsLocalState}
                style={{ width: "100%", textTransform: "uppercase" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdverseEventDataValidateReportReviewForm;
