import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import IndicationUnsafeCareContent from "@/components/case_reports/indications_unsafe_care/IndicationsUnsafeCareContent";

const IndicationsUnsafeCareReportReportPage: React.FC = () => {
  return (
    <div className="homepage-indication-unsafe-care-report">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <IndicationUnsafeCareContent />
          </div>
        }
      />
    </div>
  );
};

export default IndicationsUnsafeCareReportReportPage;
