import React, { useEffect, useState } from "react";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useUpdateReasonReturnCaseMutation } from "@/redux/apis/reason_return_case/reasonReturnCase";
import { useGetAllRolesQuery } from "@/redux/apis/role/roleApi";

const EditReasonReturnCaseButtonComponent: React.FC<{
  dataRecord: ReasonReturnCase;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [roleId, setRoleId] = useState(0);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [
    updateReasonReturnCase,
    { isLoading: updateReasonReturnCaseDataLoading },
  ] = useUpdateReasonReturnCaseMutation();

  const {
    data: allRolesData,
    isFetching: allRolesDataFetching,
    isLoading: allRolesDataLoading,
    error: allRolesDataError,
    refetch: allRolesDataRefetch,
  } = useGetAllRolesQuery(null);

  useEffect(() => {
    if (isModalOpen) {
      setName(dataRecord.rec_r_cause);
      setDescription(dataRecord.rec_r_description);
      setRoleId(dataRecord.rec_r_role_id_fk);

      form.setFieldsValue({
        fieldName: dataRecord.rec_r_cause,
        fieldDescription: dataRecord.rec_r_description,
        fieldRoleId: dataRecord.rec_r_role_id_fk,
      });
    }
  }, [isModalOpen, dataRecord]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataDescription: string;
      dataRoleId: number;
    },
    currentData: {
      dataName: string;
      dataDescription: string;
      dataRoleId: number;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataDescription !== currentData.dataDescription ||
      initialData.dataRoleId !== currentData.dataRoleId
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: dataRecord.rec_r_cause,
      dataDescription: dataRecord.rec_r_description,
      dataRoleId: dataRecord.rec_r_role_id_fk,
    };

    const currentData = {
      dataName: name,
      dataDescription: description,
      dataRoleId: roleId,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateReasonReturnCase({
        id: dataRecord.id,
        updateReasonReturnCase: {
          rec_r_cause: name,
          rec_r_description: description,
          rec_r_role_id_fk: roleId,
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
        key={"custom-modal-edit-reason-return-case"}
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
              id="edit-reason-return-case-form"
              name="edit-reason-return-case-form"
              className="edit-reason-return-case-form"
              initialValues={{ remember: true }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Rol:"
                name="fieldRoleId"
                rules={[
                  {
                    required: true,
                    message: "¡Por favor seleccione una opción!",
                  },
                ]}
              >
                <Select
                  id="select-role-id"
                  className="select-role-id"
                  showSearch
                  placeholder={"Seleccione una opción"}
                  onChange={(value) => setRoleId(value)}
                  value={roleId}
                  loading={allRolesDataLoading || allRolesDataFetching}
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
                  {allRolesData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.role_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

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
                  id="input-name-reason-return-case"
                  name="input-name-reason-return-case"
                  className="input-name-reason-return-case"
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  placeholder="Escribe..."
                  value={name}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Descripción:"
                id="fieldDescription"
                name="fieldDescription"
                style={{ marginBottom: "16px" }}
              >
                <TextArea
                  id="textarea-description-reason-return-case"
                  name="textarea-description-reason-return-case"
                  className="textarea-description-reason-return-case"
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
                  classNameCustomButton="edit-reason-return-case-button"
                  idCustomButton="edit-reason-return-case-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateReasonReturnCaseDataLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updateReasonReturnCaseDataLoading
                      ? false
                      : true
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

export default EditReasonReturnCaseButtonComponent;
