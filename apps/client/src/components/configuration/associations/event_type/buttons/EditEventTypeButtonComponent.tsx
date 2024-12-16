import React, { useEffect, useState } from "react";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";

import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";

import { Form, Input, Select } from "antd";

import {
  useGetEventTypeByIdQuery,
  useUpdateEventTypeMutation,
} from "@/redux/apis/event_type/eventTypeApi";
import { useGetAllCaseTypesQuery } from "@/redux/apis/case_type/caseTypeApi";
import { useGetAllOncologyCategoriesQuery } from "@/redux/apis/oncology_category/oncologyCategory";
import { useGetAllCharacterizationCasesQuery } from "@/redux/apis/characterization_case/charecterizationCaseApi";

const EditEventTypeButtonComponent: React.FC<{
  dataRecord: EventType;
  onRefectRegister: () => void;
}> = ({ dataRecord, onRefectRegister }) => {
  const [name, setName] = useState("");
  const [caseTypeId, setCaseTypeId] = useState(0);
  const [oncologyCategoryId, setOncologyCategoryId] = useState(0);
  const [characterizationCaseId, setCharacterizationCaseId] = useState(0);
  const [listEventTypeData, setListEventTypeData] = useState<EventType>()

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [updateEventType, { isLoading: updateEventTypeDataLoading }] =
    useUpdateEventTypeMutation();

  const {
    data: EventTypeData,
    isFetching: EventTypeDataFetching,
    isLoading: EventTypeDataLoading,
    error: EventTypeDataError,
    refetch: EventTypeDataRefetch,
  } = useGetEventTypeByIdQuery(dataRecord.id);

  const {
    data: allCaseTypesData,
    isFetching: allCaseTypesDataFetching,
    isLoading: allCaseTypesDataLoading,
    error: allCaseTypesDataError,
    refetch: allCaseTypesDataRefetch,
  } = useGetAllCaseTypesQuery(null);

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
    if (isModalOpen) {
      setName(dataRecord.eve_t_name);
      setCaseTypeId(dataRecord.eve_t_casetype_id_fk);
      setOncologyCategoryId(dataRecord.eve_t_oncologycategory_id_fk);
      setCharacterizationCaseId(dataRecord.eve_t_characterizationcase_id_fk);

      form.setFieldsValue({
        fieldName: dataRecord.eve_t_name,
        fieldDescription: dataRecord.eve_t_description,
        fieldCaseTypeId: dataRecord.eve_t_casetype_id_fk,
        fieldOncologyCategoryId: dataRecord.eve_t_oncologycategory_id_fk,
        fieldCharacterizationId: dataRecord.eve_t_characterizationcase_id_fk,
      });
    }
  }, [isModalOpen, dataRecord]);

  const areDataDifferent = (
    initialData: {
      dataName: string;
      dataCaseTypeId: number;
      dataOncologyCategoryId: number;
      dataCharacterizationCaseId: number;
    },
    currentData: {
      dataName: string;
      dataCaseTypeId: number;
      dataOncologyCategoryId: number;
      dataCharacterizationCaseId: number;
    }
  ): boolean => {
    return (
      initialData.dataName !== currentData.dataName ||
      initialData.dataCaseTypeId !== currentData.dataCaseTypeId ||
      initialData.dataOncologyCategoryId !==
        currentData.dataOncologyCategoryId ||
      initialData.dataCharacterizationCaseId !==
        currentData.dataCharacterizationCaseId
    );
  };

  const hasChanges = () => {
    const initialData = {
      dataName: dataRecord.eve_t_name,
      dataCaseTypeId: dataRecord.eve_t_casetype_id_fk,
      dataOncologyCategoryId: dataRecord.eve_t_oncologycategory_id_fk,
      dataCharacterizationCaseId: dataRecord.eve_t_characterizationcase_id_fk,
    };

    const currentData = {
      dataName: name,
      dataCaseTypeId: caseTypeId,
      dataOncologyCategoryId: oncologyCategoryId,
      dataCharacterizationCaseId: characterizationCaseId,
    };

    return areDataDifferent(initialData, currentData);
  };

  const handleClickSubmit = async () => {
    try {
      console.log("name", name);
      console.log("caseTypeId", caseTypeId);
      console.log("oncologyCategoryId", oncologyCategoryId);
      console.log("characterizationCaseId", characterizationCaseId);
      const response: any = await updateEventType({
        id: dataRecord.id,
        updateEventType: {
          eve_t_name: name,
          eve_t_casetype_id_fk: caseTypeId,
          eve_t_oncologycategory_id_fk: oncologyCategoryId,
          eve_t_characterizationcase_id_fk: characterizationCaseId,
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
        key={"custom-modal-edit-event-type"}
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
              id="edit-event-type-form"
              name="edit-event-type-form"
              className="edit-event-type-form"
              initialValues={{ remember: true }}
              autoComplete="off"
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={handleClickSubmit}
            >
              <Form.Item
                label="Tipo de caso:"
                name="fieldCaseTypeId"
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
                  id="select-case-type-id"
                  className="select-case-type-id"
                  showSearch
                  placeholder={"Seleccione una opción"}
                  onChange={(value) => setCaseTypeId(value)}
                  value={caseTypeId}
                  loading={allCaseTypesDataLoading || allCaseTypesDataFetching}
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
                  {allCaseTypesData?.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.cas_t_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Categoría oncológica:"
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
                  onChange={(value) => setOncologyCategoryId(value)}
                  value={oncologyCategoryId}
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
                  onChange={(value) => setCharacterizationCaseId(value)}
                  value={characterizationCaseId}
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
                  id="input-name-event-type"
                  name="input-name-event-type"
                  className="input-name-event-type"
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
                  classNameCustomButton="edit-event-type-button"
                  idCustomButton="edit-event-type-button"
                  titleCustomButton="Actualizar"
                  typeCustomButton="primary"
                  htmlTypeCustomButton="submit"
                  iconCustomButton={
                    !updateEventTypeDataLoading ? (
                      <BiEdit />
                    ) : (
                      <LoadingOutlined />
                    )
                  }
                  disabledCustomButton={
                    hasChanges() && !updateEventTypeDataLoading ? false : true
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

export default EditEventTypeButtonComponent;
