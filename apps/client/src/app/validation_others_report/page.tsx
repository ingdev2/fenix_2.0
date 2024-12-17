import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import ValidationOthersReports from "@/components/validation_others_report/ValidationOthersReports";

const SummaryReportPage: React.FC = () => {
  return (
    <div className="homepage-summary-report">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <ValidationOthersReports />
          </div>
        }
      />
    </div>
  );
};

export default SummaryReportPage;
