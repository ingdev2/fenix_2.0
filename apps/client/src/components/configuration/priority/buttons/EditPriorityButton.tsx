"use client";

import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

import {
  useGetPriorityByIdQuery,
  useUpdatePriorityMutation,
} from "@/redux/apis/priority/priorityApi";
import { useGetAllSeverityClasificationsQuery } from "@/redux/apis/severity_clasification/severityClasificationApi";

const EditPriorityButtonComponent: React.FC<{
  dataRecord: Priority;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");
  const [
    severityClasificationIdLocalState,
    setSeverityClasificationIdLocalState,
  ] = useState(0);
  const [responseTimeLocalState, setResponseTimeLocalState] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [updatePriority, { isLoading: updatePriorityDataLoading }] =
    useUpdatePriorityMutation();

  const {
    data: allSeverityClasificationsData,
    isFetching: allSeverityClasificationsDataFetching,
    isLoading: allSeverityClasificationsDataLoading,
    error: allSeverityClasificationsDataError,
    refetch: allSeverityClasificationsDataRefetch,
  } = useGetAllSeverityClasificationsQuery(null);

  const {
    data: priorityData,
    isFetching: priorityDataFetching,
    isLoading: priorityDataLoading,
    error: priorityDataError,
    refetch: priorityDataRefetch,
  } = useGetPriorityByIdQuery(dataRecord.id);

  useEffect(() => {
    if (isModalOpen && priorityData) {
      setNameLocalState(priorityData.prior_name);
      setDescriptionLocalState(priorityData.prior_description);
      setSeverityClasificationIdLocalState(
        priorityData.prior_severityclasif_id_fk
      );
      setResponseTimeLocalState(priorityData.prior_responsetime);

      form.setFieldsValue({
        fieldName: priorityData.prior_name,
        fieldDescription: priorityData.prior_description,
        fieldSeverityClasificationId: priorityData.prior_severityclasif_id_fk,
        fieldResponseTime: priorityData.prior_responsetime,
      });
    }
  }, [isModalOpen, priorityData]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataDescription: string;
      dataUnitId: number;
      dataResponseTime: number;
    },
    currentData: {
      dataName: string;
      dataDescription: string;
      dataUnitId: number;
      dataResponseTime: number;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataDescription !== currentData.dataDescription ||
      initialData.dataUnitId !== currentData.dataUnitId ||
      initialData.dataResponseTime !== currentData.dataResponseTime
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: priorityData?.prior_name || "",
      dataDescription: priorityData?.prior_description || "",
      dataUnitId: priorityData?.prior_severityclasif_id_fk || 0,
      dataResponseTime: priorityData?.prior_responsetime || 0,
    };

    const currentData = {
      dataName: nameLocalState,
      dataDescription: descriptionLocalState,
      dataUnitId: severityClasificationIdLocalState,
      dataResponseTime: responseTimeLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      console.log("name", nameLocalState);
      console.log("description", descriptionLocalState);
      console.log("severityClasificationId", severityClasificationIdLocalState);
      console.log("responseTime", responseTimeLocalState);

      const response: any = await updatePriority({
        id: dataRecord.id,
        updatePriority: {
          prior_name: nameLocalState,
          prior_description: descriptionLocalState,
          prior_severityclasif_id_fk: severityClasificationIdLocalState,
          prior_responsetime: responseTimeLocalState,
        },
      });
      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        setIsModalOpen(false);
        onRefectRegister();
        priorityDataRefetch();
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
        key={"custom-modal-edit-priority"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-priority-form"
              name="edit-priority-form"
              className="edit-priority-form"
              initialValues={{ remember: true }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Clasificación de severidad:"
                name="fieldSeverityClasificationId"
                style={{ marginBottom: "16px" }}
                rules={[
                  {
                    required: true,
                    message: "¡Por favor seleccione una opción!",
                  },
                ]}
              >
                <Select
                  id="select-severity-clasification-id"
                  className="select-severity-clasification-id"
                  showSearch
                  placeholder={"Seleccione una opción"}
                  onChange={(value) =>
                    setSeverityClasificationIdLocalState(value)
                  }
                  value={severityClasificationIdLocalState}
                  loading={
                    allSeverityClasificationsDataLoading ||
                    allSeverityClasificationsDataFetching
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
                  {allSeverityClasificationsData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.sev_c_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Nombre:"
                id="fieldName"
                className="fieldName"
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
                  id="input-name-priority"
                  name="input-name-priority"
                  className="input-name-priority"
                  onChange={(e) =>
                    setNameLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={nameLocalState}
                  style={{ width: "100%", textTransform: "uppercase" }}
                />
              </Form.Item>

              <Form.Item
                label="Tiempo:"
                id="fieldResponseTime"
                className="fieldResponseTime"
                name="fieldResponseTime"
                style={{
                  marginBottom: "16px",
                }}
                normalize={(value) => {
                  if (!value) return "";

                  return value.replace(/[^0-9]/g, "");
                }}
                rules={[
                  {
                    required: true,
                    message: "El tiempo de respuesta es obligatorio.",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message:
                      "El tiempo no puede tener letras ni caracteres especiales.",
                  },
                ]}
              >
                <Input
                  id="input-response-time-priority"
                  name="input-response-time-priority"
                  className="input-response-time-priority"
                  onChange={(e) =>
                    setResponseTimeLocalState(Number(e.target.value))
                  }
                  placeholder="1234..."
                  value={responseTimeLocalState}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Descripción:"
                id="fieldDescription"
                className="fieldDescription"
                style={{ marginBottom: "16px" }}
              >
                <TextArea
                  id="textarea-description-priority"
                  name="textarea-description-priority"
                  className="textarea-description-priority"
                  onChange={(e) =>
                    setDescriptionLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={descriptionLocalState || ""}
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
                  classNameCustomButton="edit-priority-button"
                  idCustomButton="edit-priority-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updatePriorityDataLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updatePriorityDataLoading ? false : true
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

export default EditPriorityButtonComponent;
