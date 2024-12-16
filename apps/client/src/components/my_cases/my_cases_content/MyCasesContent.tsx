"use client";

import React from "react";
import { TabsProps } from "antd";
import CustomTabs from "@/components/common/custom_tabs/CustomTabs";
import AssignedCases from "./my_cases_content_option/AssignedCases";
import CasesCharacterization from "./my_cases_content_option/CasesCharacterization";
import { myCasesOption } from "../utils/enums/myCasesOption.enum";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: myCasesOption.ASSIGNED_CASES,
    children: <AssignedCases />,
  },
  {
    key: "2",
    label: myCasesOption.CHARACTERIZATION_CASES,
    children: <CasesCharacterization />,
  },
];

const MyCasesContent: React.FC = () => {
  return (
    <div>
      <CustomTabs
        item={items}
        sizeName="small"
        isCentered={true}
        defaultKey="1"
      />
    </div>
  );
};

export default MyCasesContent;
