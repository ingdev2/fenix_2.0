"use client";

import React, { ReactNode } from "react";

import { Tag } from "antd";
import { TagProps } from "antd/lib";

const CustomTag: React.FC<{
  color: TagProps["color"];
  label: string;
  textColor?: string;
  customIcon?: ReactNode;
  stylesCustom?: React.CSSProperties;
}> = ({ color, label, textColor, customIcon, stylesCustom }) => {
  return (
    <Tag
      key={label}
      color={color}
      style={{
        ...stylesCustom,
        color: textColor,
      }}
      icon={customIcon}
    >
      {label}
    </Tag>
  );
};

export default CustomTag;
