import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useGetAllOriginsQuery } from "@/redux/apis/origin/originApi";
import {
  useGetSubOriginByIdQuery,
  useUpdateSubOriginMutation,
} from "@/redux/apis/sub_origin/subOriginApi";

const EditSubOriginButtonComponent: React.FC<{
  dataRecord: SubOrigin;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [nameLocalState, setNameLocalState] = useState("");
  const [descriptionLocalState, setDescriptionLocalState] = useState("");
  const [originIdLocalState, setOriginIdLocalState] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [updateSubOrigin, { isLoading: updateSubOriginDataLoading }] =
    useUpdateSubOriginMutation();

  const {
    data: SubOriginData,
    isFetching: SubOriginDataFetching,
    isLoading: SubOriginDataLoading,
    error: SubOriginDataError,
    refetch: SubOriginDataRefetch,
  } = useGetSubOriginByIdQuery(dataRecord.id);

  const {
    data: allOriginsData,
    isFetching: allOriginsDataFetching,
    isLoading: allOriginsDataLoading,
    error: allOriginsDataError,
    refetch: allOriginsDataRefetch,
  } = useGetAllOriginsQuery(null);

  useEffect(() => {
    if (isModalOpen && SubOriginData) {
      setNameLocalState(SubOriginData.sub_o_name);
      setDescriptionLocalState(SubOriginData.sub_o_description);
      setOriginIdLocalState(SubOriginData.sub_o_origin_id_fk);

      form.setFieldsValue({
        fieldName: SubOriginData.sub_o_name,
        fieldDescription: SubOriginData.sub_o_description,
        fieldOriginId: SubOriginData.sub_o_origin_id_fk,
      });
    }
  }, [isModalOpen, SubOriginData]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataDescription: string;
      dataOriginId: number;
    },
    currentData: {
      dataName: string;
      dataDescription: string;
      dataOriginId: number;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataDescription !== currentData.dataDescription ||
      initialData.dataOriginId !== currentData.dataOriginId
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: SubOriginData?.sub_o_name || "",
      dataDescription: SubOriginData?.sub_o_description || "",
      dataOriginId: SubOriginData?.sub_o_origin_id_fk || 0,
    };

    const currentData = {
      dataName: nameLocalState,
      dataDescription: descriptionLocalState,
      dataOriginId: originIdLocalState,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      const response: any = await updateSubOrigin({
        id: dataRecord.id,
        updateSubOrigin: {
          sub_o_name: nameLocalState,
          sub_o_description: descriptionLocalState,
          sub_o_origin_id_fk: originIdLocalState,
        },
      });
      if (response.data.status === 200) {
        dispatch(
          setShowMessage({ type: "success", content: response.data.message })
        );
        setIsModalOpen(false);
        onRefectRegister();
        SubOriginDataRefetch();
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
        key={"custom-modal-edit-sub-origin"}
        widthCustomModalNoContent={"30%"}
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={
          <>
            <Form
              form={form}
              id="edit-sub-origin-form"
              name="edit-sub-origin-form"
              className="edit-sub-origin-form"
              initialValues={{ remember: true }}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Origen:"
                name="fieldOriginId"
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
                  id="select-origin-id"
                  className="select-origin-id"
                  showSearch
                  placeholder={"Seleccione origen"}
                  onChange={(value) => setOriginIdLocalState(value)}
                  value={originIdLocalState}
                  loading={allOriginsDataLoading || allOriginsDataFetching}
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
                  {allOriginsData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.orig_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Nombre:"
                name="fieldName"
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
                  id="input-name-sub-origin"
                  name="input-name-sub-origin"
                  className="input-name-sub-origin"
                  onChange={(e) =>
                    setNameLocalState(e.target.value.toUpperCase())
                  }
                  placeholder="Escribe..."
                  value={nameLocalState}
                  style={{ width: "100%", textTransform: "uppercase" }}
                />
              </Form.Item>

              <Form.Item
                label="Descripción:"
                name="fieldDescription"
                style={{
                  marginBottom: "16px",
                }}
              >
                <TextArea
                  id="textarea-description-sub-origin"
                  name="textarea-description-sub-origin"
                  className="textarea-description-sub-origin"
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
                  classNameCustomButton="edit-sub-origin-button"
                  idCustomButton="edit-sub-origin-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateSubOriginDataLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updateSubOriginDataLoading ? false : true
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

export default EditSubOriginButtonComponent;
