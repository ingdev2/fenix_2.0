import React, { useState } from "react";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import {
  PlusOutlined,
  ClearOutlined,
  SaveOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCreateRiskLevelMutation } from "@/redux/apis/risk_level/riskLevelApi";

interface ButtonProps {
  onNewRegister: () => void;
}

const CreateRiskLevelButtonComponent: React.FC<ButtonProps> = ({
  onNewRegister,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [createRiskLevel, { isLoading: createdRiskLevelDataLoading }] =
    useCreateRiskLevelMutation();

  const handleClickClean = () => {
    form.resetFields();
    setName("");
    setDescription("");
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await createRiskLevel({
        ris_l_name: name,
        ris_l_description: description,
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
        key={"custom-modal-create-risk-level"}
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
              id="create-risk-level-form"
              name="create-risk-level-form"
              className="create-risk-level-form"
              initialValues={{ remember: false }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Nombre:"
                name="risk-level-name"
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
                  id="input-name-risk-level"
                  name="input-name-risk-level"
                  className="input-name-risk-level"
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  placeholder="Escribe..."
                  value={name}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Descripción:"
                name="fieldDescription"
                style={{ marginBottom: "16px" }}
              >
                <TextArea
                  id="textarea-description-risk-level"
                  name="textarea-description-risk-level"
                  className="textarea-description-risk-level"
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
                  classNameCustomButton="clean-risk-level-button"
                  idCustomButton="clean-risk-level-button"
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
                  classNameCustomButton="create-risk-level-button"
                  idCustomButton="create-risk-level-button"
                  titleCustomButton="Crear"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !createdRiskLevelDataLoading ? (
                      <SaveOutlined />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    !createdRiskLevelDataLoading ? false : true
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

export default CreateRiskLevelButtonComponent;
