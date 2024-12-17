import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import SeverityClasificationContent from "@/components/configuration/severity_clasification/SeverityClasificationContent";

const SeverityClasificationParametrizationPage: React.FC = () => {
  return (
    <div className="homepage-severity-clasification">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <SeverityClasificationContent />
          </div>
        }
      />
    </div>
  );
};

export default SeverityClasificationParametrizationPage;
