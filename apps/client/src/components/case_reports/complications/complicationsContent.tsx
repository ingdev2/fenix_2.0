"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const ComplicationsContent: React.FC = () => {
  const searchParams = useSearchParams();

  return (
    <div className="case-report-conplications" style={{ padding: "16px" }}>
      <h3>Complications report</h3>
      <p>Case Type ID: {searchParams}</p>
    </div>
  );
};

export default ComplicationsContent;
