import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import { Button, Flex, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { statusOptions } from "@/utils/enums/statusOptions.enum";
import EditReasonReturnCaseButtonComponent from "../buttons/EditReasonReturnCaseBurron";

const reasonReturnCaseCauseKey: keyof ReasonReturnCase = "rec_r_cause";
const reasonReturnCaseDescriptionKey: keyof ReasonReturnCase =
  "rec_r_description";
const roleKey: keyof ReasonReturnCase = "role";
const reasonReturnCaseStatusnKey: keyof ReasonReturnCase = "rec_r_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
  ReasonReturnCaseData: ReasonReturnCase[] | undefined;
}

const TableColumnsReasonReturnCase = ({
  handleClickDelete,
  onRefetchRegister,
  ReasonReturnCaseData,
}: TableColumnProps) => [
  {
    title: "Razón devolución de caso",
    dataIndex: reasonReturnCaseCauseKey,
    key: reasonReturnCaseCauseKey,
    ellipsis: true,
    width: 300,
    searchable: true,
    sorter: (a: ReasonReturnCase, b: ReasonReturnCase) =>
      a.rec_r_cause.length - b.rec_r_cause.length,
  },
  {
    title: "Descripción",
    dataIndex: reasonReturnCaseDescriptionKey,
    key: reasonReturnCaseDescriptionKey,
    ellipsis: true,
    width: 210,
    searchable: true,
    sorter: (a: ReasonReturnCase, b: ReasonReturnCase) => {
      const aValue = a.rec_r_description || "";
      const bValue = b.rec_r_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Rol",
    dataIndex: roleKey,
    key: roleKey,
    ellipsis: true,
    width: 300,
    filters: Array.from(
      new Set(ReasonReturnCaseData?.map((list) => list.role?.role_name))
    ).map((name) => ({
      text: name || "No disponible",
      value: name || "No disponible",
    })),
    onFilter: (value: any, record: any) =>
      record.role?.role_name.includes(value as string),
    sorter: (a: ReasonReturnCase, b: ReasonReturnCase) =>
      a.role?.role_name.length - b.role?.role_name.length,
    render: (item: any) => <p>{item?.role_name || "No disponible"}</p>,
  },
  {
    title: "Estado",
    dataIndex: reasonReturnCaseStatusnKey,
    key: reasonReturnCaseStatusnKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: Service) => (
      <Flex justify="center">
        {item ? (
          <CustomTags
            colorCustom="green"
            labelCustom={statusOptions.ENABLED}
          />
        ) : (
          <CustomTags
            colorCustom="red"
            labelCustom={statusOptions.CANCELED}
          />
        )}
      </Flex>
    ),
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    width: 75,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: ReasonReturnCase) => (
      <Space size={"small"}>
        <EditReasonReturnCaseButtonComponent
          dataRecord={record}
          onRefectRegister={onRefetchRegister}
        />
        <CustomDeletePopConfirm
          onConfirm={() => handleClickDelete(record.id)}
          titleButton="Eliminar"
          title="Eliminar registro"
          description="¿Estás seguro de que deseas eliminar este registro?"
        />
      </Space>
    ),
  },
];

export default TableColumnsReasonReturnCase;
