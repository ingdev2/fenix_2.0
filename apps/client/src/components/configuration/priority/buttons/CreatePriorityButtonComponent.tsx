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

import { useCreatePriorityMutation } from "@/redux/apis/priority/priorityApi";
import { useGetAllSeverityClasificationsQuery } from "@/redux/apis/severity_clasification/severityClasificationApi";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import TextArea from "antd/es/input/TextArea";

const CreatePriorityButtonComponent: React.FC<{
  onNewRegister: () => void;
}> = ({ onNewRegister }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [severityClasificationId, setSeverityClasificationId] = useState(0);
  const [responseTime, setResponseTime] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [createPriority, { isLoading: createdPriorityDataLoading }] =
    useCreatePriorityMutation();

  const {
    data: allSeverityClasificationsData,
    isFetching: allSeverityClasificationsDataFetching,
    isLoading: allSeverityClasificationsDataLoading,
    error: allSeverityClasificationsDataError,
    refetch: allSeverityClasificationsDataRefetch,
  } = useGetAllSeverityClasificationsQuery(null);

  const handleClickClean = () => {
    form.resetFields();
    setName("");
    setDescription("");
    setSeverityClasificationId(0);
    setResponseTime("");
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createPriority({
        prior_name: name,
        prior_description: description,
        prior_severityclasif_id_fk: severityClasificationId,
        prior_responsetime: Number(responseTime),
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
        key={"custom-modal-create-priority"}
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
              id="create-priority-form"
              name="create-priority-form"
              className="create-priority-form"
              initialValues={{ remember: false }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Clasificación de severidad:"
                id="severity-clasification-id"
                className="severity-clasification-id"
                name="severity-clasification-id"
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
                name="severity-clasification-name"
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
                name="severity-clasification-response-time"
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
                  onChange={(e) => setResponseTime(e.target.value)}
                  placeholder="Escribe..."
                  value={responseTime}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Descripción:"
                id="fieldDescription"
                className="fieldDescription"
                name="fieldDescription"
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
                  classNameCustomButton="clean-priority-button"
                  idCustomButton="clean-priority-button"
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
                  classNameCustomButton="create-priority-button"
                  idCustomButton="create-priority-button"
                  titleCustomButton="Crear"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdPriorityDataLoading ? (
                      <SaveOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    !createdPriorityDataLoading ? false : true
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
export default CreatePriorityButtonComponent;
