import React, { useEffect, useState } from "react";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useUpdateRiskFactorMutation } from "@/redux/apis/risk_factor/riskFactorApi";

const EditRiskFactorButtonComponent: React.FC<{
  dataRecord: RiskFactor;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [updateRiskFactor, { isLoading: updateRiskFactorDataLoading }] =
    useUpdateRiskFactorMutation();

  useEffect(() => {
    if (isModalOpen) {
      setName(dataRecord.ris_f_name);
      setDescription(dataRecord.ris_f_description);

      form.setFieldsValue({
        fieldName: dataRecord.ris_f_name,
        fieldDescription: dataRecord.ris_f_description,
      });
    }
  }, [isModalOpen, dataRecord]);

  const areDataDifferent = (
    initialData: { dataName: string; dataDescription: string },
    currentData: { dataName: string; dataDescription: string }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataDescription !== currentData.dataDescription
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: dataRecord.ris_f_name,
      dataDescription: dataRecord.ris_f_description,
    };

    const currentData = {
      dataName: name,
      dataDescription: description,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateRiskFactor({
        id: dataRecord.id,
        updateRiskFactor: {
          ris_f_name: name,
          ris_f_description: description,
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
        key={"custom-modal-edit-risk-factor"}
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
              id="edit-risk-factor-form"
              name="edit-risk-factor-form"
              className="edit-risk-factor-form"
              initialValues={{ remember: true }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
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
                  id="input-name-risk-factor"
                  name="input-name-risk-factor"
                  className="input-name-risk-factor"
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
                  id="textarea-description-risk-factor"
                  name="textarea-description-risk-factor"
                  className="textarea-description-risk-factor"
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
                  classNameCustomButton="edit-risk-factor-button"
                  idCustomButton="edit-risk-factor-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateRiskFactorDataLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updateRiskFactorDataLoading ? false : true
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

export default EditRiskFactorButtonComponent;
