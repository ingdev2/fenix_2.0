import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Flex, Space } from "antd";
import { StatusOptionsEnum } from "@/utils/enums/status_options.enum";
import EditEventButtonComponent from "../buttons/EditEventButton";

const eventNameKey: keyof Events = "eve_name";
const eventTypeKey: keyof Events = "eve_eventtype_id_fk";
const unitKey: keyof Events = "eve_unit_id_fk";
const oncologyCategoryKey: keyof Events = "eve_oncologycategory_id_fk";
const characterizationCaseKey: keyof Events = "eve_characterizationcase_id_fk";
const eventStatusKey: keyof Events = "eve_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
  eventTypeData: EventType[] | undefined;
  unitData: Unit[] | undefined;
  oncologyCategoryData: OncologyCategory[] | undefined;
  characterizationCaseData: CharacterizationCase[] | undefined;
}

const TableColumnsEvent = ({
  handleClickDelete,
  onRefetchRegister,
  eventTypeData,
  unitData,
  oncologyCategoryData,
  characterizationCaseData,
}: TableColumnProps) => [
  {
    title: "Suceso",
    dataIndex: eventNameKey,
    key: eventNameKey,
    ellipsis: true,
    width: 330,
    searchable: true,
    sorter: (a: Events, b: Events) => a.eve_name.length - b.eve_name.length,
  },
  {
    title: "Estrategia",
    dataIndex: eventTypeKey,
    key: eventTypeKey,
    width: 300,
    ellipsis: true,
    filters:
      eventTypeData
        ?.map((type) => ({
          value: type.eve_t_name,
          text: type.eve_t_name,
        }))
        .filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i) || // para evitar duplicados
      [],
    onFilter: (value: any, record: any) => {
      return String(record.eve_eventtype_id_fk) === String(value);
    },
    render: (type: string) => type,
  },
  {
    title: "Unidad",
    dataIndex: unitKey,
    key: unitKey,
    ellipsis: true,
    width: 150,
    filters:
      unitData?.map((type) => ({
        value: type.unit_name,
        text: type.unit_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.eve_unit_id_fk) === String(value);
    },
    render: (type: any) => type,
  },
  {
    title: "Categoría",
    key: oncologyCategoryKey,
    dataIndex: oncologyCategoryKey,
    width: 180,
    filters:
      oncologyCategoryData?.map((type) => ({
        value: type.onc_c_name,
        text: type.onc_c_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.eve_oncologycategory_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Caracterización",
    key: characterizationCaseKey,
    dataIndex: characterizationCaseKey,
    width: 200,
    filters:
      characterizationCaseData?.map((type) => ({
        value: type.cha_c_name,
        text: type.cha_c_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.eve_characterizationcase_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Estado",
    dataIndex: eventStatusKey,
    key: eventStatusKey,
    ellipsis: true,
    fixed: "right" as "right",
    width: 100,
    render: (item: Events) => (
      <Flex justify="center">
        {item ? (
          <CustomTags
            colorCustom="green"
            labelCustom={StatusOptionsEnum.ENABLED}
          />
        ) : (
          <CustomTags
            colorCustom="red"
            labelCustom={StatusOptionsEnum.CANCELED}
          />
        )}
      </Flex>
    ),
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    fixed: "right" as "right",
    ellipsis: true,
    width: 75,
    render: (_: any, record: Events) => (
      <Space size={"small"}>
        <EditEventButtonComponent
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

export default TableColumnsEvent;
