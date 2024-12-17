"use client";
import React, { useState } from "react";

import CustomMessageState from "@/components/common/custom_messages/CustomMessageState";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import CustomButton from "../common/custom_button/CustomButton";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import CustomModalNoContent from "../common/custom_modal_no_content/CustomModalNoContent";

const RiskAnalysisContent: React.FC = () => {
  const [loadingRiskAnalysis, setLoadingRiskAnalysis] = useState(false);
  const [riskAnalysis, setRiskAnalysis] = useState<UnsafeAction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div style={{ padding: "22px" }}>
      {showErrorMessage && (
        <CustomMessageState typeMessage="error" message={errorMessage} />
      )}
      {showSuccessMessage && (
        <CustomMessageState typeMessage="success" message={successMessage} />
      )}
      <CustomTableFiltersAndSorting
        dataCustomTable={riskAnalysis || []}
        onClickRechargeCustomTable={() => ({})}
        loading={loadingRiskAnalysis}
        customButton={
          <>
            <CustomButton
              classNameCustomButton="open-modal-button"
              idCustomButton="open-modal-button"
              titleCustomButton="Análisis grupal"
              typeCustomButton="primary"
              htmlTypeCustomButton="button"
              iconCustomButton={<HiOutlineDocumentMagnifyingGlass />}
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
          </>
        }
        columnsCustomTable={[]}
      />
      <CustomModalNoContent
        key={"custom-modal-group-risk-analysis"}
        widthCustomModalNoContent={"50%"}
        minWidthCustomModalNoContent="500px"
        openCustomModalState={isModalOpen}
        closableCustomModal={true}
        maskClosableCustomModal={false}
        handleCancelCustomModal={() => setIsModalOpen(false)}
        contentCustomModal={<>Modal análisis grupal de riesgo</>}
      />
    </div>
  );
};

export default RiskAnalysisContent;
