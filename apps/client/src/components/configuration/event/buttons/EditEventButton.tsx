"use client";

import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input, Select } from "antd";

import { CaseTypeReportEnum } from "@/utils/enums/case_type_color.enum";

import { useGetAllUnitsQuery } from "@/redux/apis/unit/unitApi";
import {
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "@/redux/apis/event/eventApi";
import { useGetAllEventTypesQuery } from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllOncologyCategoriesQuery } from "@/redux/apis/oncology_category/oncologyCategoryApi";
import { useGetAllCharacterizationCasesQuery } from "@/redux/apis/characterization_case/charecterizationCaseApi";

const EditEventButtonComponent: React.FC<{
  dataRecord: Events;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [eventTypeIdLocalState, setEventTypeIdLocalState] = useState(0);
  const [unitIdLocalState, setUnitIdLocalState] = useState(0);
  const [showCharacterization, setShowCharacterization] = useState(false);
  const [oncologyCategoryIdLocalState, setOncologyCategoryIdLocalState] =
    useState(0);
  const [
    characterizationCaseIdLocalState,
    setCharacterizationCaseIdLocalState,
  ] = useState(0);

  const [showUnit, setShowUnit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [updateEvent, { isLoading: updateEventDataLoading }] =
    useUpdateEventMutation();

  const {
    data: EventData,
    isFetching: EventTypeFetching,
    isLoading: EventTypeLoading,
    error: EventTypeError,
    refetch: EventTypeRefetch,
  } = useGetEventByIdQuery(dataRecord.id);

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

  useEffect(() => {
    if (isModalOpen && EventData) {
      setNameLocalState(EventData.eve_name);
      setUnitIdLocalState(EventData.eve_unit_id_fk ?? 0);
      setEventTypeIdLocalState(EventData.eve_eventtype_id_fk);
      setOncologyCategoryIdLocalState(EventData.eve_oncologycategory_id_fk);
      setCharacterizationCaseIdLocalState(
        EventData.eve_characterizationcase_id_fk ?? 0
      );

      form.setFieldsValue({
        fieldName: EventData.eve_name,
        fieldEventTypeId: EventData.eve_eventtype_id_fk,
        fieldUnitId: EventData.eve_unit_id_fk ?? undefined,
        fieldOncologyCategoryId: EventData.eve_oncologycategory_id_fk,
        fieldCharacterizationId:
          EventData.eve_characterizationcase_id_fk ?? undefined,
      });

      const selectedEventType = allEventTypesData?.find(
        (item) => item.id === EventData.eve_eventtype_id_fk
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
    }
  }, [isModalOpen, allEventTypesData, EventData]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataUnitId: number | null;
      dataEventTypeId: number;
      dataOncologyCategoryId: number;
      dataCharacterizationCaseId: number | null;
    },
    currentData: {
      dataName: string;
      dataUnitId: number | null;
      dataEventTypeId: number;
      dataOncologyCategoryId: number;
      dataCharacterizationCaseId: number | null;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataUnitId !== currentData.dataUnitId ||
      initialData.dataEventTypeId !== currentData.dataEventTypeId ||
      initialData.dataOncologyCategoryId !==
        currentData.dataOncologyCategoryId ||
      initialData.dataCharacterizationCaseId !==
        currentData.dataCharacterizationCaseId
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: EventData?.eve_name || "",
      dataEventTypeId: EventData?.eve_eventtype_id_fk || 0,
      dataUnitId: EventData?.eve_unit_id_fk || 0,
      dataOncologyCategoryId: EventData?.eve_oncologycategory_id_fk || 0,
      dataCharacterizationCaseId:
        EventData?.eve_characterizationcase_id_fk || 0,
    };

    const currentData = {
      dataName: nameLocalState,
      dataEventTypeId: eventTypeIdLocalState,
      dataUnitId: unitIdLocalState,
      dataOncologyCategoryId: oncologyCategoryIdLocalState,
      dataCharacterizationCaseId: characterizationCaseIdLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateEvent({
        id: dataRecord.id,
        updateEvent: {
          eve_name: nameLocalState,
          eve_eventtype_id_fk: eventTypeIdLocalState,
          eve_unit_id_fk: unitIdLocalState === 0 ? null : unitIdLocalState,
          eve_oncologycategory_id_fk: oncologyCategoryIdLocalState,
          eve_characterizationcase_id_fk:
            characterizationCaseIdLocalState === 0
              ? null
              : characterizationCaseIdLocalState,
        },
      });
      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        setIsModalOpen(false);
        onRefectRegister();
        EventTypeRefetch();
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
        classNameCustomButton="open-modal-edit-button"
        idCustomButton="open-modal-edit-button"
        typeCustomButton="primary"
        htmlTypeCustomButton="button"
        iconCustomButton={<EditOutlined />}
        onClickCustomButton={() => setIsModalOpen(true)}
        titleTooltipCustomButton="Ver"
        shapeCustomButton="circle"
        sizeCustomButton={"small"}
      />

      <CustomModalNoContent
        key={"custom-modal-edit-service"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-service-form"
              name="edit-service-form"
              className="edit-service-form"
              initialValues={{ remember: true }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Estrategia:"
                name="fieldEventTypeId"
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
                  name="fieldUnitId"
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
                name="fieldOncologyCategoryId"
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
                  name="fieldCharacterizationId"
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
                name="fieldName"
                style={{ marginBottom: "16px" }}
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
                  id="input-name-service"
                  name="input-name-service"
                  className="input-name-service"
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
                  classNameCustomButton="edit-service-button"
                  idCustomButton="edit-service-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateEventDataLoading ? <BiEdit /> : <LoadingOutlined />
                  }
                  disabledCustomButton={
                    hasChanges() && !updateEventDataLoading ? false : true
                  }
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

export default EditEventButtonComponent;
