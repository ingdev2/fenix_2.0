import React from "react";

import { Space } from "antd";

import CustomButton from "@/components/common/custom_button/CustomButton";

import { BsTrashFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";

const OptionsCaseAssignmentReviewButton: React.FC<{
  handleCLickCancelCase: () => void;
  handleClickAssignResearch: () => void;
  handleClickReturnCaseToValidator: () => void;
}> = ({
  handleCLickCancelCase,
  handleClickAssignResearch,
  handleClickReturnCaseToValidator,
}) => {
  return (
    <>
      <Space style={{ display: "flex", justifyContent: "center" }}>
        <CustomButton
          idCustomButton="cancel-case-button"
          typeCustomButton="primary"
          sizeCustomButton="small"
          iconPositionCustomButton={"end"}
          onClickCustomButton={handleCLickCancelCase}
          titleCustomButton="Anular Caso"
          iconCustomButton={<BsTrashFill />}
          styleCustomButton={{
            background: "#8C1111",
            color: "#fff",
            fontSize: "12px",
            borderRadius: "16px",
          }}
        />

        <div className="assign-research-button">
          <CustomButton
            idCustomButton="assign-analyst-button"
            typeCustomButton="primary"
            sizeCustomButton="small"
            iconPositionCustomButton={"end"}
            onClickCustomButton={handleClickAssignResearch}
            titleCustomButton="Asignar investigador"
            iconCustomButton={<FaUserAlt />}
            styleCustomButton={{
              background: "#015E90",
              color: "#fff",
              fontSize: "12px",
              borderRadius: "16px",
            }}
          />
        </div>

        <div className="return-case-button">
          <CustomButton
            idCustomButton="return-case-button"
            typeCustomButton="primary"
            sizeCustomButton="small"
            iconPositionCustomButton={"end"}
            onClickCustomButton={handleClickReturnCaseToValidator}
            titleCustomButton="Devolver caso a validador"
            iconCustomButton={<IoReturnUpBackOutline />}
            styleCustomButton={{
              background: "#FF7F50",
              color: "#fff",
              fontSize: "12px",
              borderRadius: "16px",
            }}
          />
        </div>
      </Space>
    </>
  );
};

export default OptionsCaseAssignmentReviewButton;
