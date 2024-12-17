import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import ValidateOthersReportContent from "@/components/validate_others_report/ValidateOthersReportContent";

const ValidateOtherReportPage: React.FC = () => {
  return (
    <div className="homepage-validate-other-report">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <ValidateOthersReportContent />
          </div>
        }
      />
    </div>
  );
};

export default ValidateOtherReportPage;
