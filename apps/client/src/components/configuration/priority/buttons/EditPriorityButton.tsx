import React, { useEffect, useState } from "react";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useUpdatePriorityMutation } from "@/redux/apis/priority/priorityApi";
import { useGetAllSeverityClasificationsQuery } from "@/redux/apis/severity_clasification/severityClasificationApi";

const EditPriorityButtonComponent: React.FC<{
  dataRecord: Priority;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [severityClasificationId, setSeverityClasificationId] = useState(0);
  const [responseTime, setResponseTime] = useState(0);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [updatePriority, { isLoading: updatePriorityDataLoading }] =
    useUpdatePriorityMutation();

  const {
    data: allSeverityClasificationsData,
    isFetching: allSeverityClasificationsDataFetching,
    isLoading: allSeverityClasificationsDataLoading,
    error: allSeverityClasificationsDataError,
    refetch: allSeverityClasificationsDataRefetch,
  } = useGetAllSeverityClasificationsQuery(null);

  useEffect(() => {
    if (isModalOpen) {
      setName(dataRecord.prior_name);
      setDescription(dataRecord.prior_description);
      setSeverityClasificationId(dataRecord.prior_severityclasif_id_fk);
      setResponseTime(dataRecord.prior_responsetime);

      form.setFieldsValue({
        fieldName: dataRecord.prior_name,
        fieldDescription: dataRecord.prior_description,
        fieldSeverityClasificationId: dataRecord.prior_severityclasif_id_fk,
        fieldResponseTime: dataRecord.prior_responsetime,
      });
    }
  }, [isModalOpen, dataRecord]);

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
      dataName: dataRecord.prior_name,
      dataDescription: dataRecord.prior_description,
      dataUnitId: dataRecord.prior_severityclasif_id_fk,
      dataResponseTime: dataRecord.prior_responsetime,
    };

    const currentData = {
      dataName: name,
      dataDescription: description,
      dataUnitId: severityClasificationId,
      dataResponseTime: responseTime,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updatePriority({
        id: dataRecord.id,
        updatePriority: {
          prior_name: name,
          prior_description: description,
          prior_severityclasif_id_fk: severityClasificationId,
          prior_responsetime: responseTime,
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
            {showErrorMessage && (
              <CustomMessage typeMessage="error" message={errorMessage} />
            )}
            {showSuccessMessage && (
              <CustomMessage typeMessage="success" message={successMessage} />
            )}

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
                  onChange={(value) => setSeverityClasificationId(value)}
                  value={severityClasificationId}
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
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  placeholder="Escribe..."
                  value={name}
                  style={{ width: "100%" }}
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
                  onChange={(e) => setResponseTime(Number(e.target.value))}
                  placeholder="Escribe..."
                  value={responseTime}
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
                  onChange={(e) => setDescription(e.target.value.toUpperCase())}
                  placeholder="Escribe..."
                  value={description || ""}
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
