import { Button, Space } from "antd";

import { EyeOutlined, LoadingOutlined } from "@ant-design/icons";

import { customTagCaseTypes } from "@/components/common/custom_tags/CustomTagsCaseType";
import CustomButton from "@/components/common/custom_button/CustomButton";

const eventNameKey: keyof CaseReportValidate = "val_cr_event_id_fk";
const CaseTypeNameKey: keyof CaseReportValidate = "val_cr_casetype_id_fk";
const MovementReportNameKey: keyof CaseReportValidate =
  "val_cr_statusmovement_id_fk";
const PriorityNameKey: keyof CaseReportValidate = "val_cr_priority_id_fk";

interface TableColumnProps {
  caseTypeData: CaseType[] | undefined;
  eventData: Events[] | undefined;
  priorityData: Priority[] | undefined;
  movementReportData: MovementReport[] | undefined;
  handleClickSeeMore: (id: string, caseOriginalId: string) => void;
  reportValidateByIdDataLoading: boolean;
}

const TableColumnsValidateReport = ({
  caseTypeData,
  priorityData,
  movementReportData,
  handleClickSeeMore: handleClickSeeMore,
  reportValidateByIdDataLoading,
}: TableColumnProps) => [
  {
    title: "Estado",
    dataIndex: MovementReportNameKey,
    key: MovementReportNameKey,
    width: 180,
    filters:
      movementReportData?.map((type) => ({
        value: type.mov_r_name,
        text: type.mov_r_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.val_cr_statusmovement_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Código",
    dataIndex: "val_cr_filingnumber",
    key: "val_cr_filingnumber",
    width: 120,
    ellipsis: true,
    searchable: true,
    sorter: (a: CaseReportValidate, b: CaseReportValidate) =>
      a.val_cr_filingnumber.length - b.val_cr_filingnumber.length,
  },
  {
    title: "Fecha ocurrencia",
    dataIndex: "val_cr_dateofcase",
    key: "val_cr_dateofcase",
    width: 100,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "Documento",
    dataIndex: "val_cr_documentpatient",
    key: "val_cr_documentpatient",
    width: 120,
    ellipsis: true,
    searchable: true,
    sorter: (a: CaseReportValidate, b: CaseReportValidate) =>
      (a.val_cr_documentpatient ?? "").length -
      (b.val_cr_documentpatient ?? "").length,
  },
  {
    title: "Tipo de caso",
    dataIndex: CaseTypeNameKey,
    key: CaseTypeNameKey,
    width: 180,
    filters:
      caseTypeData?.map((type) => ({
        value: type.cas_t_name,
        text: type.cas_t_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.val_cr_casetype_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => customTagCaseTypes(type),
  },
  {
    title: "Suceso",
    dataIndex: eventNameKey,
    key: eventNameKey,
    width: 220,
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Prioridad",
    dataIndex: PriorityNameKey,
    key: PriorityNameKey,
    width: 100,
    filters:
      priorityData?.map((type) => ({
        value: type.prior_name,
        text: type.prior_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.val_cr_priority_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    fixed: "right" as "right",
    ellipsis: true,
    width: 70,
    render: (_: any, record: CaseReportValidate) => (
      <Space size="small">
        <CustomButton
          classNameCustomButton="see-more-report-button"
          idCustomButton="see-more-report-button"
          typeCustomButton="primary"
          titleTooltipCustomButton="Detalles"
          iconCustomButton={
            !reportValidateByIdDataLoading ? (
              <EyeOutlined />
            ) : (
              <LoadingOutlined />
            )
          }
          onClickCustomButton={() =>
            handleClickSeeMore(record.id, record.val_cr_originalcase_id_fk)
          }
          styleCustomButton={{
            background: "#6F42C1",
            color: "#ffffff",
          }}
          shapeCustomButton="circle"
          sizeCustomButton={"small"}
          disabledCustomButton={!reportValidateByIdDataLoading ? false : true}
        />
      </Space>
    ),
  },
];

export default TableColumnsValidateReport;
