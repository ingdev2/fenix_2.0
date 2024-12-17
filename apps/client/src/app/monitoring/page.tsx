import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import MonitoringContent from "@/components/monitoring/monitoringContent";

const MonitoringPage: React.FC = () => {
  return (
    <div className="homepage-monitoring">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <MonitoringContent />
          </div>
        }
      />
    </div>
  );
};

export default MonitoringPage;
