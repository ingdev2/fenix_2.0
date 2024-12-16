import React, { useState } from "react";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

const PsicologicalFollowUp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [psicologicalFollowUp, setPsicologicalFollowUp] = useState<
    CaseReportValidate[]
  >([]);

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
        dataCustomTable={psicologicalFollowUp || []}
        onClickRechargeCustomTable={() => ({})}
        loading={false}
        columnsCustomTable={[]}
      />
    </div>
  );
};

export default PsicologicalFollowUp;
