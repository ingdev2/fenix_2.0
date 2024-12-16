"use client";

import React, { useEffect, useState } from "react";

import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import { getSummaryReportsReview } from "@/api/case_report_validate";

const SummaryReportReviewContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [summaryReportsReview, setSummaryReportsReview] = useState<
    CaseReportValidate[]
  >([]);

  useEffect(() => {
    listSummaryReportsReview();
  }, []);

  const listSummaryReportsReview = async () => {
    setLoading(true);
    try {
      const response = await getSummaryReportsReview();
      setSummaryReportsReview(Array.isArray(response) ? response : []);
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
        dataCustomTable={summaryReportsReview || []}
        onClickRechargeCustomTable={listSummaryReportsReview}
        loading={loading}
        columnsCustomTable={[]}
      />
    </div>
  );
};

export default SummaryReportReviewContent;
