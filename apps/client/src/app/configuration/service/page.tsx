import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import ServiceContent from "@/components/configuration/service/ServiceContent";

const ServiceParametrizationPage: React.FC = () => {
  return (
    <div className="homepage-service">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <ServiceContent />
          </div>
        }
      />
    </div>
  );
};

export default ServiceParametrizationPage;
