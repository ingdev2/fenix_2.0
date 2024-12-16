import React, { useState } from "react";

import {
  PlusOutlined,
  ClearOutlined,
  SaveOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { Form, Input, Select } from "antd";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { caseTypeReport } from "@/utils/enums/caseTypeColor.enum";

import { useCreateEventMutation } from "@/redux/apis/event/eventApi";
import { useGetAllUnitsQuery } from "@/redux/apis/unit/unitApi";
import { useGetAllEventTypesQuery } from "@/redux/apis/event_type/eventTypeApi";

const CreateEventButtonComponent: React.FC<{ onNewRegister: () => void }> = ({
  onNewRegister,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eventTypeId, setEventTypeId] = useState(0);
  const [unitId, setUnitId] = useState(0);
  const [showUnit, setShowUnit] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

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

  const handleClickClean = () => {
    form.resetFields();
    setName("");
    setDescription("");
    setUnitId(0);
    setEventTypeId(0);
    setShowUnit(false);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createEvent({
        eve_name: name,
        eve_description: description,
        eve_unit_id_fk: unitId,
        eve_eventtype_id_fk: eventTypeId,
      });

      if (response.data.status === 201) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        handleClickClean();
        setIsModalOpen(false);
        onNewRegister();
      } else {
        setShowErrorMessage(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage("ERROR INTERNO");
      console.error("Error al enviar el formulario", error);
    }
  };

  const onChangeEventType = (value: number) => {
    if (value === null) {
      setShowUnit(false);
      setEventTypeId(0);
      setUnitId(0);
      return;
    }

    setEventTypeId(value);

    const selectedEventType = allEventTypesData?.find(
      (item) => item.id === value
    );

    if (selectedEventType?.caseType.cas_t_name === caseTypeReport.RISK) {
      setShowUnit(true);
    } else {
      setShowUnit(false);
      setUnitId(0);
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
            {showErrorMessage && (
              <CustomMessage typeMessage="error" message={errorMessage} />
            )}
            {showSuccessMessage && (
              <CustomMessage typeMessage="success" message={successMessage} />
            )}
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
                  value={eventTypeId}
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
                    onChange={(value) => setUnitId(value)}
                    value={unitId}
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
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  placeholder="Escribe..."
                  value={name}
                  style={{ width: "100%" }}
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
