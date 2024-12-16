import React, { useEffect, useState } from "react";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input, Select } from "antd";

import { useGetAllUnitsQuery } from "@/redux/apis/unit/unitApi";
import { useUpdateEventMutation } from "@/redux/apis/event/eventApi";
import { useGetAllEventTypesQuery } from "@/redux/apis/event_type/eventTypeApi";
import { caseTypeReport } from "@/utils/enums/caseTypeColor.enum";

const EditEventButtonComponent: React.FC<{
  dataRecord: Event;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eventTypeId, setEventTypeId] = useState(0);
  const [unitId, setUnitId] = useState<number | null>(null);
  const [showUnit, setShowUnit] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [updateEvent, { isLoading: updateEventDataLoading }] =
    useUpdateEventMutation();

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

  useEffect(() => {
    if (isModalOpen) {
      setName(dataRecord.eve_name);
      setDescription(dataRecord.eve_description);
      setUnitId(dataRecord.eve_unit_id_fk);
      setEventTypeId(dataRecord.eve_eventtype_id_fk);

      form.setFieldsValue({
        fieldName: dataRecord.eve_name,
        fieldDescription: dataRecord.eve_description,
        fieldEventTypeId: dataRecord.eve_eventtype_id_fk,
        fieldUnitId: dataRecord.eve_unit_id_fk,
      });

      const selectedEventType = allEventTypesData?.find(
        (item) => item.id === dataRecord.eve_eventtype_id_fk
      );

      if (selectedEventType?.caseType.cas_t_name === caseTypeReport.RISK) {
        setShowUnit(true);
      } else {
        setShowUnit(false);
        setUnitId(null);
      }
    }
  }, [isModalOpen, dataRecord, allEventTypesData]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataDescription: string;
      dataUnitId: number | null;
      dataEventTypeId: number;
    },
    currentData: {
      dataName: string;
      dataDescription: string;
      dataUnitId: number | null;
      dataEventTypeId: number;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataDescription !== currentData.dataDescription ||
      initialData.dataUnitId !== currentData.dataUnitId ||
      initialData.dataEventTypeId !== currentData.dataEventTypeId
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: dataRecord.eve_name,
      dataDescription: dataRecord.eve_description,
      dataEventTypeId: dataRecord.eve_eventtype_id_fk,
      dataUnitId: dataRecord.eve_unit_id_fk,
    };

    const currentData = {
      dataName: name,
      dataDescription: description,
      dataEventTypeId: eventTypeId,
      dataUnitId: unitId,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateEvent({
        id: dataRecord.id,
        updateEvent: {
          eve_name: name,
          eve_description: description,
          eve_eventtype_id_fk: eventTypeId,
          eve_unit_id_fk: unitId,
        },
      });
      if (response.data.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage(response.data.message);
        setIsModalOpen(false);
        onRefectRegister();
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
      setUnitId(null);
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
      setUnitId(null);
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
            {showErrorMessage && (
              <CustomMessage typeMessage="error" message={errorMessage} />
            )}
            {showSuccessMessage && (
              <CustomMessage typeMessage="success" message={successMessage} />
            )}

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
                      {item.eve_t_name}
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
