"use client";

import React, { ReactNode } from "react";

import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { CiCircleChevDown } from "react-icons/ci";

const CustomDropdown: React.FC<{
  titleCustomDropdown: string;
  iconCustomDropdown: ReactNode;
  iconCustomItem1?: ReactNode;
  iconCustomItem2?: ReactNode;
  iconCustomItem3?: ReactNode;
  iconCustomItem4?: ReactNode;
  titleCustomItem1?: string;
  titleCustomItem2?: string;
  titleCustomItem3?: string;
  titleCustomItem4?: string;
  handleClickCustomItem1?: () => void;
  handleClickCustomItem2?: () => void;
}> = ({
  titleCustomDropdown,
  iconCustomDropdown,
  iconCustomItem1,
  iconCustomItem2,
  iconCustomItem3,
  iconCustomItem4,
  titleCustomItem1,
  titleCustomItem2,
  titleCustomItem3,
  titleCustomItem4,
  handleClickCustomItem1,
  handleClickCustomItem2,
}) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: titleCustomItem1,
      icon: iconCustomItem1,
      onClick: handleClickCustomItem1,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: titleCustomItem2,
      icon: iconCustomItem2,
      onClick: handleClickCustomItem2,
      danger: true,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      arrow
    >
      <a
        style={{
          color: "#001133",
          fontSize: 15,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Space>
          {titleCustomDropdown}

          {iconCustomDropdown}

          <CiCircleChevDown style={{ color: "#001133" }} />
        </Space>
      </a>
    </Dropdown>
  );
};

export default CustomDropdown;
