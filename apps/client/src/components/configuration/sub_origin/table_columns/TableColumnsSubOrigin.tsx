import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import { Flex, Space } from "antd";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { statusOptions } from "@/utils/enums/statusOptions.enum";
import EditSubOriginButtonComponent from "../buttons/EditSubOriginButton";

const subOriginNameKey: keyof SubOrigin = "sub_o_name";
const subOriginDescriptionKey: keyof SubOrigin = "sub_o_description";
const originKey: keyof SubOrigin = "origin";
const subOriginStatusKey: keyof SubOrigin = "sub_o_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
  subOriginData: SubOrigin[] | undefined;
}

const TableColumnsSubOrigin = ({
  handleClickDelete,
  onRefetchRegister,
  subOriginData,
}: TableColumnProps) => [
  {
    title: "Sub Origen",
    dataIndex: subOriginNameKey,
    key: "sub_o_name",
    ellipsis: true,
    width: 300,
    searchable: true,
    sorter: (a: SubOrigin, b: SubOrigin) =>
      a.sub_o_name.length - b.sub_o_name.length,
  },
  {
    title: "Descripción",
    dataIndex: subOriginDescriptionKey,
    key: subOriginDescriptionKey,
    ellipsis: true,
    width: 210,
    searchable: true,
    sorter: (a: SubOrigin, b: SubOrigin) => {
      const aValue = a.sub_o_description || "";
      const bValue = b.sub_o_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Origen",
    dataIndex: originKey,
    key: originKey,
    ellipsis: true,
    width: 300,
    filters: Array.from(
      new Set(subOriginData?.map((list) => list.origin?.orig_name))
    ).map((name) => ({
      text: name || "No disponible",
      value: name || "No disponible",
    })),
    onFilter: (value: any, record: any) =>
      record.origin?.orig_name.includes(value as string),
    sorter: (a: SubOrigin, b: SubOrigin) =>
      a.origin?.orig_name.length - b.origin?.orig_name.length,
    render: (item: any) => <p>{item?.orig_name || "No disponible"}</p>,
  },
  {
    title: "Estado",
    dataIndex: subOriginStatusKey,
    key: subOriginStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: SubOrigin) => (
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
    render: (_: any, record: SubOrigin) => (
      <Space size={"small"}>
        <EditSubOriginButtonComponent
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

export default TableColumnsSubOrigin;
