import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import IncidentContent from "@/components/case_reports/incident/IncidentContent";

const IncidentReportPage: React.FC = () => {
  return (
    <div className="homepage-incident-report">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <IncidentContent />
          </div>
        }
      />
    </div>
  );
};

export default IncidentReportPage;
