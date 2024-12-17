import { Badge, Tooltip } from "antd";
import { MenuItem } from "./types/menu_item_type";

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    children,
    label: (
      <Tooltip title={label} placement="right">
        <span
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </span>
      </Tooltip>
    ),
    icon,
  } as MenuItem;
}
