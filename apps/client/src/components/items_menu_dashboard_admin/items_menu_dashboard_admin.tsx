import React from "react";

import { MenuItem } from "@/helpers/get_item_menu_dashboard_layout/types/menu_item_type";
import { getItem } from "@/helpers/get_item_menu_dashboard_layout/get_item_menu_dashboard_layout";
import {
  AlertOutlined,
  AuditOutlined,
  BookOutlined,
  DesktopOutlined,
  FolderViewOutlined,
  IssuesCloseOutlined,
  MonitorOutlined,
  PieChartOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { LuShieldAlert } from "react-icons/lu";
import { FaChartColumn } from "react-icons/fa6";
import { VscOpenPreview } from "react-icons/vsc";

import {
  ItemKeys,
  ItemNames,
} from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";

export const useMenuItems = () => {
  const items: MenuItem[] = [
    getItem(
      ItemNames.ITEM_DASHBOARD,
      ItemKeys.ITEM_DASHBOARD_KEY,
      <PieChartOutlined size={15} />
    ),

    getItem(
      ItemNames.ITEM_NOTIFICATIONS,
      ItemKeys.ITEM_NOTIFICATIONS_KEY,
      <AlertOutlined size={15} />
    ),

    getItem(
      ItemNames.ITEM_CREATE_REPORT,
      ItemKeys.ITEM_CREATE_REPORT_KEY,
      <SolutionOutlined size={15} />
    ),

    getItem(
      ItemNames.ITEM_SUMARY_REPORT,
      ItemKeys.ITEM_SUMARY_REPORT_KEY,
      <DesktopOutlined size={15} />
    ),

    getItem(
      ItemNames.ITEM_VALIDATION_REPORT,
      ItemKeys.ITEM_VALIDATION_REPORT_KEY,
      <SecurityScanOutlined size={17} />,
      [
        getItem(
          ItemNames.SUB_VALIDATE_REPORT,
          ItemKeys.SUB_VALIDATE_REPORT_KEY,
          <VscOpenPreview size={15} />
        ),
        getItem(
          ItemNames.SUB_CASES_FOR_REVIEW,
          ItemKeys.SUB_CASES_FOR_REVIEW_KEY,
          <VscOpenPreview size={15} />,
          undefined
        ),
      ]
    ),
  ];

  return items;
};
