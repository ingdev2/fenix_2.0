"use client";
import React, { useEffect, useState } from "react";
import { getSummaryReportsValidator } from "@/api/case_report_validate";

import { CaseReportValidate } from "@/redux/utils/interfaces/case_report_validate/caseReportValidate.interface";

import CustomTableFiltersAndSorting from "../common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

const SummaryReportValidatorContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [summaryReportsValidator, setSummaryReportsValidator] = useState<
    CaseReportValidate[]
  >([]);

  useEffect(() => {
    listSummaryReportsValidator();
  }, []);

  const listSummaryReportsValidator = async () => {
    setLoading(true);
    try {
      const response = await getSummaryReportsValidator();
      setSummaryReportsValidator(Array.isArray(response) ? response : []);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "32px" }}>
      <CustomTableFiltersAndSorting
        dataCustomTable={summaryReportsValidator || []}
        onClickRechargeCustomTable={listSummaryReportsValidator}
        loading={loading}
        columnsCustomTable={[]}
      />
    </div>
  );
};

export default SummaryReportValidatorContent;
