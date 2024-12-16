import React, { useState } from "react";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { HiFlag } from "react-icons/hi";

const AssignedCases: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [assignedCases, setAssignedCases] = useState<CaseReportValidate[]>([]);

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
        dataCustomTable={assignedCases || []}
        onClickRechargeCustomTable={() => ({})}
        loading={false}
        customButton={<>{/* Button "inv. Clinica grupal" */}</>}
        columnsCustomTable={[]}
        customTag={
          <>
            <CustomTags
              labelCustom="Posible plan de investigación asociado"
              iconCustom={<HiFlag size={15} />}
              colorCustom="orange"
              stylesCustom={{
                color: "#f28322",
                padding: "3px 10px",
                borderRadius: "30px",
                fontSize: "10px",
                fontWeight: "bold",
                marginTop: "16px",
              }}
            />
          </>
        }
      />
    </div>
  );
};

export default AssignedCases;
