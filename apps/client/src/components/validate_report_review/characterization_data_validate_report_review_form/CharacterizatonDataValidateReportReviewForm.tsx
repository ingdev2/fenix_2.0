import { Col, Form, FormInstance, Radio, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const CharacterizatonDataValidateReportReviewForm: React.FC<{
  form: FormInstance<any>;
  characterizationIdLocalState: number;
  setCharacterizationIdLocalState: (value: number) => void;
  infoprovidedFamilyLocalState: boolean;
  setInfoprovidedFamilyLocalState: (value: boolean) => void;
  clinicalFollowRequiredLocalState: boolean;
  setClinicalFollowRequiredLocalState: (value: boolean) => void;
  observationsCharacterizationLocalState: string;
  setObservationsCharacterizationLocalState: (value: string) => void;
  allCharacterizationCasesData: CharacterizationCase[] | undefined;
  allCharacterizationCasesDataLoading: boolean;
  allCharacterizationCasesDataFetching: boolean;
}> = ({
  form,
  characterizationIdLocalState,
  setCharacterizationIdLocalState,
  infoprovidedFamilyLocalState,
  setInfoprovidedFamilyLocalState,
  clinicalFollowRequiredLocalState,
  setClinicalFollowRequiredLocalState,
  observationsCharacterizationLocalState,
  setObservationsCharacterizationLocalState,
  allCharacterizationCasesData,
  allCharacterizationCasesDataLoading,
  allCharacterizationCasesDataFetching,
}) => {
  //   const [form] = Form.useForm();
  return (
    <>
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        <Col xs={24} sm={12} md={8} lg={7}>
          <Form.Item
            label="Caracterización de los casos"
            id="characterization-case-id"
            className="characterization-case-id"
            name="characterization-case-id"
            rules={[
              {
                required: true,
                message: "¡Por favor seleccione una opción!",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Select
              placeholder={"Seleccione una opción"}
              onChange={(value) => {
                setCharacterizationIdLocalState(value);
              }}
              value={characterizationIdLocalState}
              showSearch
              allowClear
              size="small"
              loading={
                allCharacterizationCasesDataLoading ||
                allCharacterizationCasesDataFetching
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
              {Array.isArray(allCharacterizationCasesData) &&
                allCharacterizationCasesData?.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.cha_c_name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8} lg={7}>
          <Form.Item
            label="¿Se brindó información del Suceso a la familia?"
            id="infoprovided-family"
            className="infoprovided-family"
            name="infoprovided-family"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "¡Por favor seleccione una opción!",
              },
            ]}
          >
            <Radio.Group
              onChange={(e) => {
                setInfoprovidedFamilyLocalState(e.target.value);
                form.setFieldsValue({ "infoprovided-family": e.target.value });
              }}
              value={infoprovidedFamilyLocalState}
            >
              <Radio value={true}>Si</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8} lg={7}>
          <Form.Item
            label="¿Se requiere seguimiento clínico?"
            id="clinical-follow-required"
            className="clinical-follow-required"
            name="clinical-follow-required"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "¡Por favor seleccione una opción!",
              },
            ]}
          >
            <Radio.Group
              onChange={(e) => {
                setClinicalFollowRequiredLocalState(e.target.value);
                form.setFieldsValue({
                  "clinical-follow-required": e.target.value,
                });
              }}
              value={clinicalFollowRequiredLocalState}
            >
              <Radio value={true}>Si</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        <Col xs={24} sm={25} md={12} lg={12}>
          <Form.Item
            label="Observaciones"
            id="observations-characterization"
            className="observations-characterization"
            name="observations-characterization"
            style={{
              width: "100%",
              marginTop: "-5px",
            }}
          >
            <TextArea
              rows={4}
              onChange={(e) =>
                setObservationsCharacterizationLocalState(
                  e.target.value.toUpperCase()
                )
              }
              value={observationsCharacterizationLocalState}
              style={{ width: "100%", textTransform: "uppercase" }}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default CharacterizatonDataValidateReportReviewForm;
