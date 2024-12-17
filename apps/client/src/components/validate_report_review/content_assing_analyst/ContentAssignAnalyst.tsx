import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

import { Card, Input, Space, Divider, Switch } from "antd";
import {
  HiMiniMagnifyingGlass,
  HiOutlineDocumentMagnifyingGlass,
} from "react-icons/hi2";
import { LoadingOutlined } from "@ant-design/icons";
import { GrSelect } from "react-icons/gr";
import { titleStyleCss } from "@/theme/text_styles";

import CustomButton from "@/components/common/custom_button/CustomButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

import { useAssignAnalystMutation } from "@/redux/apis/report_analyst_assignment/reportAnalystAssignmentApi";
import { useCreateSynergyMutation } from "@/redux/apis/synergy/synergyApi";

import { setShowMessage } from "@/redux/features/common/message/messageStateSlice";
import {
  setmodalIsOpen,
  setSuccessFullMessage,
} from "@/redux/features/common/modal/modalSlice";
import { useAllActiveUsersQuery } from "@/redux/apis/users_b_hub/verifyActiveUserApi";
import { useGetCaseTypeByIdQuery } from "@/redux/apis/case_type/caseTypeApi";
import { CaseTypeReportEnum } from "@/utils/enums/case_type_color.enum";
import { useGetSeverityClasificationByIdQuery } from "@/redux/apis/severity_clasification/severityClasificationApi";
import { SeverityClasificationEnum } from "@/utils/enums/severity_clasif.enum";

const ContentAssignAnalyst: React.FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const caseReportValidateIdState = useAppSelector(
    (state) => state.caseReportValidate.id
  );

  const caseTypeIdCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_casetype_id_fk
  );

  const severityClasificationIdCaseReportValidateState = useAppSelector(
    (state) => state.caseReportValidate.val_cr_severityclasif_id_fk
  );

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const [selectedPositionNameState, setSelectedPositionNameLocalState] =
    useState("");
  const [selectedAnalystLocalState, setSelectedAnalystLocalState] =
    useState<Partial<IUserActiveBHub> | null>(null);
  const [
    selectedAnalystIdNumberLocalState,
    setSelectedAnalystIdNumberLocalState,
  ] = useState("");
  const [searchAnalystLocalState, setSearchAnalystLocalState] = useState("");
  const [synergyObservationLocalState, setSynergyObservationLocalState] =
    useState("");
  const [isElevatedCaseToSynergyState, setIsElevatedCaseToSynergyState] =
    useState(false);

  const {
    data: allActiveUsersData,
    isFetching: allActiveUsersFetching,
    isLoading: allActiveUsersLoading,
    error: allActiveUsersError,
    refetch: allActiveUsersRefetch,
  } = useAllActiveUsersQuery(null);

  const {
    data: caseTypeByIdData,
    isFetching: caseTypeByIdDataFetching,
    isLoading: caseTypeByIdDataLoading,
    error: caseTypeByIdDataError,
    refetch: caseTypeByIdDataRefetch,
  } = useGetCaseTypeByIdQuery(caseTypeIdCaseReportValidateState, {
    skip: !caseTypeIdCaseReportValidateState,
  });

  const {
    data: severityClasificationByIdData,
    isFetching: severityClasificationByIdDataFetching,
    isLoading: severityClasificationByIdDataLoading,
    error: severityClasificationByIdDataError,
    refetch: severityClasificationByIdDataRefetch,
  } = useGetSeverityClasificationByIdQuery(
    severityClasificationIdCaseReportValidateState!,
    {
      skip: !severityClasificationIdCaseReportValidateState,
    }
  );

  const [assignAnalyst, { isLoading: assignAnalystDataLoading }] =
    useAssignAnalystMutation();

  const [createSynergy, { isLoading: createSynergyDataLoading }] =
    useCreateSynergyMutation();

  const filteredAnalyst = Array.isArray(allActiveUsersData)
    ? allActiveUsersData?.filter(
        (analyst: Partial<IUserActiveBHub>) =>
          (analyst.name
            ?.toLocaleUpperCase()
            .includes(searchAnalystLocalState.toLocaleUpperCase()) ??
            false) ||
          (analyst.last_name
            ?.toLocaleUpperCase()
            .includes(searchAnalystLocalState.toLocaleUpperCase()) ??
            false)
      )
    : [];

  const handleClickSubmit = async () => {
    try {
      const assignAnalystResponse: any = await assignAnalyst({
        idValidator: idNumberUserSessionState,
        idNumberAnalist: selectedAnalystIdNumberLocalState,
        newAnalystAssigned: {
          ana_validatedcase_id_fk: caseReportValidateIdState,
          ana_positionname: selectedPositionNameState,
        },
      });

      let isAssignAnalystError = assignAnalystResponse.error;
      let isAssignAnalystSuccess = assignAnalystResponse.data;

      if (isAssignAnalystError) {
        const errorMessage = isAssignAnalystError?.data.message;
        dispatch(
          setShowMessage({
            type: "error",
            content: errorMessage,
          })
        );
        return;
      }

      let successMessage = `${isAssignAnalystSuccess?.message} `;

      if (isElevatedCaseToSynergyState) {
        const createSynergyResponse: any = await createSynergy({
          idValidator: idNumberUserSessionState,
          newSynergy: {
            syn_validatedcase_id_fk: caseReportValidateIdState,
            syn_analystidnumber: selectedAnalystIdNumberLocalState,
            syn_observations: synergyObservationLocalState,
          },
        });

        let isCreateSynergyError = createSynergyResponse.error;
        let isCreateSynergySuccess = createSynergyResponse.data;

        if (isCreateSynergyError) {
          const errorMessage = isCreateSynergyError?.data.message;
          dispatch(
            setShowMessage({
              type: "error",
              content: errorMessage,
            })
          );
          return;
        }

        if (isCreateSynergySuccess) {
          successMessage += ` y ${isCreateSynergySuccess.message}`;
        }
      }

      if (successMessage) {
        onCloseModal();
        dispatch(setSuccessFullMessage(successMessage));
        dispatch(setmodalIsOpen(true));
      }
    } catch (error) {
      dispatch(setShowMessage({ type: "error", content: "ERROR INTERNO" }));
      console.error("Error al asignar", error);
    }
  };

  return (
    <div
      className="content-assign-analyst"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "500px",
      }}
    >
      {/* Icono y Título */}
      <Space
        size="small"
        style={{ textAlign: "left", marginBottom: "15px", width: "100%" }}
      >
        <HiOutlineDocumentMagnifyingGlass color="#015E90" size={25} />
        <h2
          className="title-modal-assign-analyst"
          style={{ ...titleStyleCss, textAlign: "left", fontSize: "300" }}
        >
          Asignar Caso
        </h2>
      </Space>

      {/* Sección dividida en dos columnas */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "45%",
            padding: "5px",
          }}
        >
          {/* Lista de Analistas*/}
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              width: "100%",
              border: "1px #ddd",
            }}
          >
            <div>
              <Input
                id="search-analyst"
                className="search-analyst"
                size="small"
                placeholder="Buscar analista"
                value={searchAnalystLocalState}
                onChange={(e) => setSearchAnalystLocalState(e.target.value)}
                style={{ marginBottom: "10px" }}
                prefix={<HiMiniMagnifyingGlass />}
                autoComplete="off"
              />
            </div>

            {allActiveUsersLoading ? (
              <div style={{ marginTop: "10px" }}>
                <CustomSpin />
              </div>
            ) : (
              <>
                {Array.isArray(filteredAnalyst) &&
                  filteredAnalyst.map((item) => (
                    <Card
                      key={item.id}
                      style={{
                        marginBottom: "5px",
                        width: "100%",
                        textAlign: "left",
                        borderRadius: "16px",
                        cursor: "pointer",
                        backgroundColor:
                          selectedAnalystLocalState?.id === item.id
                            ? "#94f798"
                            : "#ddd",
                      }}
                      onClick={() => {
                        setSelectedAnalystLocalState(item);
                        setSelectedAnalystIdNumberLocalState(item.id_number!);
                        setSelectedPositionNameLocalState(
                          item.collaborator_position!
                        );
                      }}
                    >
                      <h2
                        className="title-modal-assign-analyst"
                        style={{
                          ...titleStyleCss,
                          textAlign: "center",
                          fontSize: "10px",
                        }}
                      >
                        {item.name} {item.last_name}
                      </h2>
                    </Card>
                  ))}
              </>
            )}
          </div>
        </div>

        <Divider type="vertical" style={{ height: "100%" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            padding: "15px",
            border: "1px #ddd",
            textAlign: "left",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {selectedAnalystLocalState ? (
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                width: "100%",
                border: "1px #ddd",
              }}
            >
              {caseTypeByIdData?.cas_t_name ===
                CaseTypeReportEnum.ADVERSE_EVENT && (
                <>
                  {severityClasificationByIdData?.sev_c_name !==
                    SeverityClasificationEnum.MILD_SEVERITY && (
                    <>
                      <div
                        className="elevated-case-to-synergy-switch"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Switch
                          checked={isElevatedCaseToSynergyState}
                          onChange={(checked) =>
                            setIsElevatedCaseToSynergyState(checked)
                          }
                        />
                        <span>
                          {isElevatedCaseToSynergyState
                            ? "No escalar a sinergia"
                            : "Escalar a sinergia"}
                        </span>
                      </div>
                      {isElevatedCaseToSynergyState && (
                        <div>
                          <Input.TextArea
                            id="search-analyst"
                            className="search-analyst"
                            size="small"
                            placeholder="Observación"
                            value={synergyObservationLocalState}
                            onChange={(e) =>
                              setSynergyObservationLocalState(
                                e.target.value.toUpperCase()
                              )
                            }
                            style={{
                              marginTop: "10px",
                              textTransform: "uppercase",
                            }}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </div>
                      )}

                      <Divider />
                    </>
                  )}
                </>
              )}

              <>
                <Card
                  key={selectedAnalystIdNumberLocalState}
                  style={{
                    marginBottom: "5px",
                    width: "100%",
                    textAlign: "left",
                    borderRadius: "16px",
                    cursor: "pointer",
                    backgroundColor: "#94f798",
                  }}
                  onClick={() => {}}
                >
                  <h2
                    className="title-modal-assign-analyst"
                    style={{
                      ...titleStyleCss,
                      textAlign: "center",
                      fontSize: "10px",
                    }}
                  >
                    {selectedPositionNameState}
                  </h2>
                </Card>
              </>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                color: "#aaa",
              }}
            >
              <GrSelect size={30} />
              <p>Seleccione un analista para ver el cargo</p>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: "auto" }}>
        <Space
          direction="horizontal"
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <CustomButton
            classNameCustomButton="cancel-button-custom-modal"
            idCustomButton="cancel-button-custom-modal"
            titleCustomButton="Cancelar"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            onClickCustomButton={onCloseModal}
            sizeCustomButton={"small"}
            styleCustomButton={{
              backgroundColor: "#6C757D",
              color: "#f2f2f2",
              borderRadius: "16px",
              padding: "3px 17px",
            }}
          />
          <CustomButton
            classNameCustomButton="confirm-button-custom-modal"
            idCustomButton="confirm-button-custom-modal"
            titleCustomButton="Asignar"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            onClickCustomButton={handleClickSubmit}
            sizeCustomButton={"small"}
            iconCustomButton={assignAnalystDataLoading && <LoadingOutlined />}
            iconPositionCustomButton="end"
            disabledCustomButton={
              !assignAnalystDataLoading && selectedAnalystLocalState
                ? false
                : true
            }
            styleCustomButton={{
              backgroundColor: assignAnalystDataLoading ? "#6C757D" : "#f28322",
              color: "#f2f2f2",
              borderRadius: "16px",
              padding: "3px 17px",
            }}
          />
        </Space>
      </div>
    </div>
  );
};

export default ContentAssignAnalyst;
