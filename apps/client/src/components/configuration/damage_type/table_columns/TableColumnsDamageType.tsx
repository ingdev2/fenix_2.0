import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import EditDamageTypeButtonComponent from "../buttons/EditDamageTypeButton";
import { Flex, Space } from "antd";
import { statusOptions } from "@/utils/enums/statusOptions.enum";

const damageTypeNameKey: keyof DamageType = "dam_t_name";
const damageTypeDescriptionKey: keyof DamageType = "dam_t_description";
const damageTypeStatusKey: keyof DamageType = "dam_t_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
}

const TableColumnsDamageType = ({
  handleClickDelete,
  onRefetchRegister,
}: TableColumnProps) => [
  {
    title: "Tipo de daño",
    dataIndex: damageTypeNameKey,
    key: damageTypeNameKey,
    ellipsis: true,
    width: 400,
    searchable: true,
    sorter: (a: DamageType, b: DamageType) =>
      a.dam_t_name.length - b.dam_t_name.length,
  },
  {
    title: "Descripción",
    dataIndex: damageTypeDescriptionKey,
    key: damageTypeDescriptionKey,
    ellipsis: true,
    width: 410,
    searchable: true,
    sorter: (a: DamageType, b: DamageType) => {
      const aValue = a.dam_t_description || "";
      const bValue = b.dam_t_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Estado",
    dataIndex: damageTypeStatusKey,
    key: damageTypeStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: DamageType) => (
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
    render: (_: any, record: any) => (
      <Space size={"small"}>
        <EditDamageTypeButtonComponent
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
export default TableColumnsDamageType;
