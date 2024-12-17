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
import { RiTeamLine } from "react-icons/ri";

import {
  ItemKeys,
  ItemNames,
} from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";

export const useMenuItems = () => {
  const items: MenuItem[] = [
    getItem(
      ItemNames.ITEM_DASHBOARD,
      `${ItemKeys.ITEM_DASHBOARD_KEY}`,
      <PieChartOutlined />
    ),
    getItem(
      ItemNames.ITEM_NOTIFICATIONS,
      `${ItemKeys.ITEM_NOTIFICATIONS_KEY}`,
      <AlertOutlined />
    ),
    getItem(
      ItemNames.ITEM_CREATE_REPORT,
      `${ItemKeys.ITEM_CREATE_REPORT_KEY}`,
      <SolutionOutlined />
    ),
    getItem(
      ItemNames.ITEM_SUMMARY,
      `${ItemKeys.ITEM_SUMMARY_KEY}`,
      <DesktopOutlined />
    ),
    getItem(
      ItemNames.ITEM_SYNERGY,
      `${ItemKeys.ITEM_SYNERGY_KEY}`,
      <RiTeamLine />
    ),

    getItem(
      ItemNames.ITEM_VALIDATION,
      ItemKeys.ITEM_VALIDATION_KEY,
      <SecurityScanOutlined />,
      [
        getItem(ItemNames.SUB_VALIDATE_CASES, ItemKeys.SUB_VALIDATE_CASES_KEY),
        getItem(ItemNames.SUB_OTHER_CASES, ItemKeys.SUB_OTHER_CASES_KEY),
      ]
    ),

    getItem(
      ItemNames.ITEM_ANALYSIS,
      ItemKeys.ITEM_ANALYSIS_KEY,
      <MonitorOutlined />,
      [
        getItem(
          ItemNames.SUB_CASE_ASSIGNMENT,
          ItemKeys.SUB_CASE_ASSIGNMENT_KEY
        ),
        getItem(ItemNames.SUB_MY_CASE, ItemKeys.SUB_MY_CASE_KEY),
        getItem(ItemNames.SUB_INFORMATION, ItemKeys.SUB_CASE_INFORMATION_KEY),
      ]
    ),

    getItem(
      ItemNames.ITEM_FOLLOW_UPS,
      ItemKeys.ITEM_FOLLOW_UPS_KEY,
      <FolderViewOutlined />
    ),

    getItem(
      ItemNames.ITEM_ACTION_PLANS,
      ItemKeys.ITEM_ACTION_PLANS_KEY,
      <BookOutlined />,
      [
        getItem(ItemNames.SUB_PLANS_CREATED, ItemKeys.SUB_PLANS_CREATED_KEY),
        getItem(ItemNames.SUB_MONITORING, ItemKeys.SUB_MONITORING_KEY),
      ]
    ),

    getItem(ItemNames.ITEM_RISK, ItemKeys.ITEM_RISK_KEY, <LuShieldAlert />, [
      getItem(ItemNames.SUB_RISK_ANALYSIS, ItemKeys.SUB_RISK_ANALYSIS_KEY),
      getItem(ItemNames.SUB_RISK_SUMMARY, ItemKeys.SUB_RISK_SUMMARY_KEY),
      getItem(ItemNames.SUB_RISK_MATRIX, ItemKeys.SUB_RISK_MATRIX_KEY),
      getItem(
        ItemNames.SUB_RISK_INFORMATION,
        ItemKeys.SUB_RISK_INFORMATION_KEY
      ),
    ]),

    getItem(
      ItemNames.ITEM_SP_PROGRAM,
      ItemKeys.ITEM_SP_PROGRAM_KEY,
      <AuditOutlined />,
      [
        getItem(ItemNames.SUB_STRATEGIES, ItemKeys.SUB_STRATEGIES_KEY),
        getItem(ItemNames.SUB_SP_INFORMATION, ItemKeys.SUB_SP_INFORMATION_KEY),
        getItem(
          ItemNames.SUB_SANCTIONS_FRAMEWORK,
          ItemKeys.SUB_SANCTIONS_FRAMEWORK_KEY
        ),
      ]
    ),

    getItem(
      ItemNames.ITEM_CLOSING_CYCLE,
      ItemKeys.ITEM_CLOSING_CYCLE_KEY,
      <IssuesCloseOutlined />
    ),
    getItem(
      ItemNames.ITEM_INDICATORS,
      ItemKeys.ITEM_INDICATORS_KEY,
      <FaChartColumn />
    ),

    getItem(
      ItemNames.ITEM_CONFIGURATION,
      ItemKeys.ITEM_CONFIGURATION_KEY,
      <SettingOutlined />,
      [
        getItem(ItemNames.SUB_EVENT_TYPE, ItemKeys.SUB_EVENT_TYPE_KEY),
        getItem(ItemNames.SUB_EVENT, ItemKeys.SUB_EVENT_KEY),
        getItem(ItemNames.SUB_CASE_TYPES, ItemKeys.SUB_CASE_TYPES_KEY),
        getItem(ItemNames.SUB_RISK_TYPES, ItemKeys.SUB_RISK_TYPES_KEY),
        getItem(
          ItemNames.SUB_SEVERITY_CLASIFICATIONS,
          ItemKeys.SUB_SEVERITY_CLASIFICATIONS_KEY
        ),
        getItem(ItemNames.SUB_PRIORITIES, ItemKeys.SUB_PRIORITIES_KEY),
        getItem(ItemNames.SUB_UNITS, ItemKeys.SUB_UNITS_KEY),
        getItem(ItemNames.SUB_SERVICES, ItemKeys.SUB_SERVICES_KEY),
        getItem(ItemNames.SUB_ORIGINS, ItemKeys.SUB_ORIGINS_KEY),
        getItem(ItemNames.SUB_SUB_ORIGINS, ItemKeys.SUB_SUB_ORIGINS_KEY),
        getItem(ItemNames.SUB_RISK_LEVELS, ItemKeys.SUB_RISK_LEVELS_KEY),
        getItem(
          ItemNames.SUB_CASE_CHARACTERIZATION,
          ItemKeys.SUB_CASE_CHARACTERIZATION_KEY
        ),
        getItem(ItemNames.SUB_ROLE, ItemKeys.SUB_ROLE_KEY),
        getItem(
          ItemNames.SUB_RESEARCH_INSTRUMENTS,
          ItemKeys.SUB_RESEARCH_INSTRUMENTS_KEY
        ),
        getItem(ItemNames.SUB_DEVICE_TYPES, ItemKeys.SUB_DEVICE_TYPES_KEY),
        getItem(ItemNames.SUB_DAMAGE_TYPES, ItemKeys.SUB_DAMAGE_TYPES_KEY),
        getItem(ItemNames.SUB_FLUID_TYPES, ItemKeys.SUB_FLUID_TYPES_KEY),
        getItem(
          ItemNames.SUB_INFLUENCY_FACTORS,
          ItemKeys.SUB_INFLUENCY_FACTORS_KEY
        ),
        getItem(
          ItemNames.SUB_FAILED_MEASURES,
          ItemKeys.SUB_FAILED_MEASURES_KEY
        ),
        getItem(ItemNames.SUB_RISK_FACTORS, ItemKeys.SUB_RISK_FACTORS_KEY),
        getItem(
          ItemNames.SUB_SAFETY_BARRIERS,
          ItemKeys.SUB_SAFETY_BARRIERS_KEY
        ),
        getItem(ItemNames.SUB_PROTOCOLS, ItemKeys.SUB_PROTOCOLS_KEY),
        getItem(ItemNames.SUB_UNSAFE_ACTIONS, ItemKeys.SUB_UNSAFE_ACTIONS_KEY),
        getItem(
          ItemNames.SUB_RETURN_REASONS_CASE,
          ItemKeys.SUB_RETURN_REASONS_CASE_KEY
        ),
        getItem(ItemNames.SUB_MOVEMENTS, ItemKeys.SUB_MOVEMENTS_KEY),
        getItem(
          ItemNames.SUB_ONCOLOGICAL_CATEGORY,
          ItemKeys.SUB_ONCOLOGICAL_CATEGORY_KEY
        ),
      ]
    ),
  ];

  return items;
};
