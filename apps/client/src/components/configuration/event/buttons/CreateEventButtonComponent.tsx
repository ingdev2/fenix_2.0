"use client";

import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import {
  PlusOutlined,
  ClearOutlined,
  SaveOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { Form, Input, Select } from "antd";

import { CaseTypeReportEnum } from "@/utils/enums/case_type_color.enum";

import { useCreateEventMutation } from "@/redux/apis/event/eventApi";
import { useGetAllUnitsQuery } from "@/redux/apis/unit/unitApi";
import { useGetAllEventTypesQuery } from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllOncologyCategoriesQuery } from "@/redux/apis/oncology_category/oncologyCategoryApi";
import { useGetAllCharacterizationCasesQuery } from "@/redux/apis/characterization_case/charecterizationCaseApi";

const CreateEventButtonComponent: React.FC<{ onNewRegister: () => void }> = ({
  onNewRegister,
}) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [eventTypeIdLocalState, setEventTypeIdLocalState] = useState(0);
  const [unitIdLocalState, setUnitIdLocalState] = useState(0);
  const [oncologyCategoryIdLocalState, setOncologyCategoryIdLocalState] =
    useState(0);
  const [
    characterizationCaseIdLocalState,
    setCharacterizationCaseIdLocalState,
  ] = useState(0);

  const [showUnit, setShowUnit] = useState(false);
  const [showCharacterization, setShowCharacterization] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [createEvent, { isLoading: createdEventDataLoading }] =
    useCreateEventMutation();

  const {
    data: allUnitsData,
    isFetching: allUnitsDataFetching,
    isLoading: allUnitsDataLoading,
    error: allUnitsDataError,
    refetch: allUnitsDataRefetch,
  } = useGetAllUnitsQuery(null);

  const {
    data: allEventTypesData,
    isFetching: allEventTypesDataFetching,
    isLoading: allEventTypesDataLoading,
    error: allEventTypesDataError,
    refetch: allEventTypesDataRefetch,
  } = useGetAllEventTypesQuery(null);

  const {
    data: allOncologyCategoriesData,
    isFetching: allOncologyCategoriesDataFetching,
    isLoading: allOncologyCategoriesDataLoading,
    error: allOncologyCategoriesDataError,
    refetch: allOncologyCategoriesDataRefetch,
  } = useGetAllOncologyCategoriesQuery(null);

  const {
    data: allCharacterizationCasesData,
    isFetching: allCharacterizationCasesDataFetching,
    isLoading: allCharacterizationCasesDataLoading,
    error: allCharacterizationCasesDataError,
    refetch: allCharacterizationCasesDataRefetch,
  } = useGetAllCharacterizationCasesQuery(null);

  const handleClickClean = () => {
    form.resetFields();
    setNameLocalState("");
    setUnitIdLocalState(0);
    setEventTypeIdLocalState(0);
    setOncologyCategoryIdLocalState(0);
    setCharacterizationCaseIdLocalState(0);
    setShowUnit(false);
    setShowCharacterization(false);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createEvent({
        eve_name: nameLocalState,
        eve_eventtype_id_fk: eventTypeIdLocalState,
        eve_unit_id_fk: unitIdLocalState === 0 ? null : unitIdLocalState,
        eve_oncologycategory_id_fk: oncologyCategoryIdLocalState,
        eve_characterizationcase_id_fk:
          characterizationCaseIdLocalState === 0
            ? null
            : characterizationCaseIdLocalState,
      });

      if (response.data.status === 201) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        handleClickClean();
        setIsModalOpen(false);
        onNewRegister();
      } else {
        dispatch(
          setShowMessage({ type: "error", content: response.data.message })
        );
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al enviar el formulario", error);
    }
  };

  const onChangeEventType = (value: number) => {
    if (value === null) {
      setShowUnit(false);
      setShowCharacterization(false);
      setEventTypeIdLocalState(0);
      setUnitIdLocalState(0);
      setCharacterizationCaseIdLocalState(0);
      return;
    }

    setEventTypeIdLocalState(value);

    const selectedEventType = allEventTypesData?.find(
      (item) => item.id === value
    );

    if (
      selectedEventType &&
      selectedEventType.caseType &&
      selectedEventType.caseType.cas_t_name === CaseTypeReportEnum.RISK
    ) {
      setShowUnit(true);
      setShowCharacterization(false);
      setCharacterizationCaseIdLocalState(0);
    } else {
      setShowCharacterization(true);
      setShowUnit(false);
      setUnitIdLocalState(0);
    }
  };

  return (
    <>
      <CustomButton
        classNameCustomButton="open-modal-button"
        idCustomButton="open-modal-button"
        titleCustomButton="Nuevo"
        typeCustomButton="primary"
        htmlTypeCustomButton="button"
        iconCustomButton={<PlusOutlined />}
        onClickCustomButton={() => setIsModalOpen(true)}
        styleCustomButton={{
          marginLeft: "16px",
          background: "#f28322",
          color: "#ffffff",
          borderRadius: "16px",
        }}
        iconPositionCustomButton={"end"}
        sizeCustomButton={"small"}
      />
      <CustomModalNoContent
        key={"custom-modal-create-event"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="create-event-form"
              name="create-event-form"
              className="create-event-form"
              initialValues={{ remember: false }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Estrategia:"
                id="event-type-id"
                className="event-type-id"
                name="event-type-id"
                rules={[
                  {
                    required: true,
                    message: "¡Por favor seleccione una opción!",
                  },
                ]}
              >
                <Select
                  id="select-event-type-id"
                  className="select-event-type-id"
                  showSearch
                  placeholder={"Seleccione una opción"}
                  onChange={(value) => onChangeEventType(value)}
                  value={eventTypeIdLocalState}
                  loading={
                    allEventTypesDataLoading || allEventTypesDataFetching
                  }
                  allowClear
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
                  {allEventTypesData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.eve_t_name} - {item.caseType.cas_t_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {showUnit && (
                <Form.Item
                  label="Unidad:"
                  id="unit-id"
                  className="unit-id"
                  name="unit-id"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor seleccione una opción!",
                    },
                  ]}
                  style={{
                    marginBottom: "16px",
                  }}
                >
                  <Select
                    id="select-unit-id"
                    className="select-unit-id"
                    showSearch
                    placeholder={"Seleccione una opción"}
                    onChange={(value) => setUnitIdLocalState(value)}
                    value={unitIdLocalState}
                    loading={allUnitsDataLoading || allUnitsDataFetching}
                    allowClear
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
                    {allUnitsData?.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.unit_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}

              <Form.Item
                label="Categoría:"
                id="oncology-category-id"
                className="oncology-category-id"
                name="oncology-category-id"
                rules={[
                  {
                    required: true,
                    message: "¡Por favor seleccione una opción!",
                  },
                ]}
                style={{ marginBottom: "16px" }}
              >
                <Select
                  id="select-oncology-category-id"
                  className="select-oncology-category-id"
                  showSearch
                  placeholder={"Seleccione una opción"}
                  onChange={(value) => setOncologyCategoryIdLocalState(value)}
                  value={oncologyCategoryIdLocalState}
                  loading={
                    allOncologyCategoriesDataLoading ||
                    allOncologyCategoriesDataFetching
                  }
                  allowClear
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
                  {allOncologyCategoriesData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.onc_c_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {showCharacterization && (
                <Form.Item
                  label="Caracterización:"
                  id="characterization-id"
                  className="characterization-id"
                  name="characterization-id"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor seleccione una opción!",
                    },
                  ]}
                  style={{
                    marginBottom: "16px",
                  }}
                >
                  <Select
                    id="select-characterization-id"
                    className="select-characterization-id"
                    showSearch
                    placeholder={"Seleccione una opción"}
                    onChange={(value) =>
                      setCharacterizationCaseIdLocalState(value)
                    }
                    value={characterizationCaseIdLocalState}
                    loading={
                      allCharacterizationCasesDataLoading ||
                      allCharacterizationCasesDataFetching
                    }
                    allowClear
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
                    {allCharacterizationCasesData?.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.cha_c_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}

              <Form.Item
                label="Nombre:"
                id="event-name"
                className="event-name"
                name="event-name"
                style={{
                  marginBottom: "16px",
                }}
                rules={[
                  {
                    required: true,
                    message: "El nombre es obligatorio.",
                  },
                  {
                    pattern: /^[$a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/,
                    message:
                      "El nombre no puede tener numeros ni caracteres especiales.",
                  },
                ]}
              >
                <Input
                  id="input-name-event"
                  name="input-name-event"
                  className="input-name-event"
                  onChange={(e) =>
                    setNameLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={nameLocalState}
                  style={{ width: "100%", textTransform: "uppercase" }}
                />
              </Form.Item>

              <Form.Item
                style={{
                  textAlign: "center",
                  marginTop: "16px",
                  marginBottom: "-10px",
                }}
              >
                <CustomButton
                  classNameCustomButton="clean-event-button"
                  idCustomButton="clean-event-button"
                  titleCustomButton="Limpiar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="button"
                  iconCustomButton={<ClearOutlined />}
                  onClickCustomButton={handleClickClean}
                  styleCustomButton={{
                    color: "#ffffff",
                    background: "#DC1600",
                    marginRight: "16px",
                    borderRadius: "16px",
                  }}
                  iconPositionCustomButton={"end"}
                  sizeCustomButton={"small"}
                />
                <CustomButton
                  classNameCustomButton="create-event-button"
                  idCustomButton="create-event-button"
                  titleCustomButton="Crear"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdEventDataLoading ? (
                      <SaveOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={!createdEventDataLoading ? false : true}
                  onClickCustomButton={() => ({})}
                  styleCustomButton={{
                    color: "#ffffff",
                    borderRadius: "16px",
                  }}
                  iconPositionCustomButton={"end"}
                  sizeCustomButton={"small"}
                />
              </Form.Item>
            </Form>
          </>
        }
      />
    </>
  );
};
export default CreateEventButtonComponent;
