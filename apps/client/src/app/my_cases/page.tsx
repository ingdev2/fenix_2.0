import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import MyCasesContent from "@/components/my_cases/my_cases_content/MyCasesContent";

const CaseAssignmentPage: React.FC = () => {
  return (
    <div className="homepage-case-assignment">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <MyCasesContent />
          </div>
        }
      />
    </div>
  );
};

export default CaseAssignmentPage;
