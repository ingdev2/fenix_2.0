"use client";

import React, { useState } from "react";

import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import CustomTags from "../common/custom_tags/CustomTags";
import { BiSolidLock, BiSolidLockOpen } from "react-icons/bi";

const MonitoringContent: React.FC = () => {
  const [loadingMonitoring, setLoadingMonitoring] = useState(false);
  const [monitoring, setMonitoring] = useState<UnsafeAction[]>([]);

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
        dataCustomTable={monitoring || []}
        onClickRechargeCustomTable={() => ({})}
        loading={loadingMonitoring}
        columnsCustomTable={[]}
        customTag={
          <>
            <CustomTags
              labelCustom="Planes abiertos "
              numberCustom={100}
              iconCustom={<BiSolidLockOpen size={15} />}
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
            <CustomTags
              labelCustom="Planes cerrados "
              numberCustom={500}
              iconCustom={<BiSolidLock size={15} />}
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

export default MonitoringContent;
