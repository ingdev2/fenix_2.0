"use client";

import React, { useState } from "react";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import CustomButton from "../common/custom_button/CustomButton";
import { PlusOutlined } from "@ant-design/icons";

const PlansCreatedContent: React.FC = () => {
  const [loadingPlansCreated, setLoadingPlansCreated] = useState(false);
  const [plansCreated, setPlansCreated] = useState<UnsafeAction[]>([]);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div style={{ padding: "32px" }}>
      {showErrorMessage && (
        <CustomMessage typeMessage="error" message={errorMessage} />
      )}
      {showSuccessMessage && (
        <CustomMessage typeMessage="success" message={successMessage} />
      )}
      <CustomTableFiltersAndSorting
        dataCustomTable={plansCreated || []}
        onClickRechargeCustomTable={() => ({})}
        loading={loadingPlansCreated}
        customButton={
          <CustomButton
            classNameCustomButton="custom-button-create-action-plan"
            idCustomButton="custom-button-create-action-plan"
            titleCustomButton="Nuevo"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            iconCustomButton={<PlusOutlined />}
            onClickCustomButton={() => ({})}
            styleCustomButton={{
              marginLeft: "16px",
              background: "#f28322",
              color: "#ffffff",
              borderRadius: "16px",
            }}
            iconPositionCustomButton={"end"}
            sizeCustomButton={"small"}
          />
        }
        columnsCustomTable={[]}
      />
    </div>
  );
};

export default PlansCreatedContent;
