"use client";

import React, { useState } from "react";

import {
  Button,
  Col,
  ConfigProviderProps,
  Input,
  Modal,
  Row,
  Skeleton,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { findOneReportValidateByConsecutive } from "@/api/dashboard";
import { IReportSearchItem } from "@/redux/utils/interfaces/dashboard/dashboard.interface";
import { getColorByCaseType } from "@/utils/enums/case_type_color.enum";
//import {ValidatedReports} from "@/utils/ValidatedReports";

type SizeType = ConfigProviderProps["componentSize"];
const ReportSearchEngineComponent: React.FC = () => {
  const [size, setSize] = useState<SizeType>("large");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<IReportSearchItem[]>([]);
  const [inputQuery, setInputQuery] = useState("");

  const columns = [
    {
      title: "# REPORTE",
      dataIndex: "val_cr_filingnumber",
      key: "val_cr_filingnumber",
    },
    {
      title: "TIPO DOC",
      dataIndex: "val_cr_doctypepatient",
      key: "val_cr_doctypepatient",
    },
    {
      title: "DOCUMENTO",
      dataIndex: "val_cr_documentpatient",
      key: "val_cr_filingnumber",
    },
    {
      title: "NOMBRES",
      dataIndex: "val_cr_firstnamepatient",
      key: "val_cr_firstnamepatient",
      render: (text: any) => <p>{text}</p>,
    },
    {
      title: "APELLIDO",
      dataIndex: "val_cr_firstlastnamepatient",
      key: "val_cr_firstlastnamepatient",
      render: (text: any) => <p>{text}</p>,
    },
    {
      title: "TIPO CASO",
      key: "caseType",
      render: (_: any, record: any) => (
        <>
          <Tag
            style={{ color: "#000" }}
            color={getColorByCaseType(
              record?.caseType?.cas_t_name?.toUpperCase()
            )}
          >
            {record.caseType.cas_t_name?.toUpperCase()}
          </Tag>
        </>
        /*<p>{record?.caseType?.cas_t_name?.toUpperCase()}</p>*/
      ),
    },
  ];

  const showModal = () => setIsModalOpen(true);
  //const handleOk = () => setIsModalOpen(false)
  const handleCancel = () => {
    setContent([]);
    setInputQuery("");
    setLoading(false);
    setIsModalOpen(false);
  };
  const handleInputQuery = (event: any) => setInputQuery(event.target.value);
  const onClick = async () => {
    if (!inputQuery.trim()) {
      alert("Por favor ingresa algún valor en el campo de búsqueda.");
      return;
    }

    try {
      setLoading(true);
      const data = await findOneReportValidateByConsecutive(inputQuery);
      if (!data) {
        setContent([]);
      }
      setContent(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Button icon={<SearchOutlined />} size={size} onClick={showModal}>
        Buscar reporte por Consecutivo, Nombre o Cédula
      </Button>
      <Modal
        title="Búsqueda de reporte"
        open={isModalOpen}
        onCancel={handleCancel}
        onClose={handleCancel}
        width={1000}
        footer={null}
      >
        <div style={{ padding: "16px" }}>
          <Row style={{ marginBottom: "16px" }}>
            <Col flex={9}>
              <Input
                size={size}
                autoFocus
                placeholder="# Reporte, Nombre o Cédula"
                onChange={handleInputQuery}
                value={inputQuery}
              />
            </Col>
            <Col
              flex={1}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Tooltip title="Buscar">
                <Button size={size} icon={<SearchOutlined />} onClick={onClick}>
                  Buscar Caso
                </Button>
              </Tooltip>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Skeleton loading={loading} />
              {!loading && content.length ? (
                <Table
                  columns={columns}
                  dataSource={content}
                  size={"small"}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => {
                        alert(`click ${record.val_cr_filingnumber}`);
                      },
                    };
                  }}
                />
              ) : !loading && !content.length ? (
                <p style={{ textAlign: "center" }}>
                  No se han encontrado registros
                </p>
              ) : undefined}
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};
export default ReportSearchEngineComponent;
