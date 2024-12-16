"use client";

import React, { useState } from "react";

import CustomMessage from "../common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "../common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

const CaseAssignmentContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<CaseReportValidate[]>([]);

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
        dataCustomTable={cases || []}
        onClickRechargeCustomTable={() => ({})}
        loading={false}
        customButton={<>{/* Button "Equipo" */}</>}
        columnsCustomTable={[]}
      />
    </div>
  );
};

export default CaseAssignmentContent;
