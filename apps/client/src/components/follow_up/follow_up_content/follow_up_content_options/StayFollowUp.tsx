import React, { useState } from "react";
import CustomMessageState from "@/components/common/custom_messages/CustomMessageState";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

const StayFollowUp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stayFollowUp, setStayFollowUp] = useState<CaseReportValidate[]>([]);

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
        dataCustomTable={stayFollowUp || []}
        onClickRechargeCustomTable={() => ({})}
        loading={false}
        columnsCustomTable={[]}
      />
    </div>
  );
};

export default StayFollowUp;
