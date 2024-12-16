"use client";

import React from "react";

import CustomTag from "./CustomTag";
import { caseTypeReport } from "@/utils/enums/caseTypeColor.enum";
import CustomTags from "./CustomTags";

export const customTagCaseTypes = (statusName: string | undefined) => {
  switch (statusName) {
    case caseTypeReport.RISK:
      return <CustomTags colorCustom="red" labelCustom={caseTypeReport.RISK} />;

    case caseTypeReport.ADVERSE_EVENT:
      return <CustomTag color="cyan" label={caseTypeReport.ADVERSE_EVENT} />;

    case caseTypeReport.INCIDENT:
      return <CustomTag color="orange" label={caseTypeReport.INCIDENT} />;

    case caseTypeReport.INDICATING_UNSAFE_CARE:
      return (
        <CustomTag color="lime" label={caseTypeReport.INDICATING_UNSAFE_CARE} />
      );

    case caseTypeReport.COMPLICATIONS:
      return <CustomTag color="pink" label={caseTypeReport.COMPLICATIONS} />;

    default:
      return null;
  }
};
