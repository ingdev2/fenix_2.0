import { Button, Popconfirm } from "antd";
import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

interface DeletePopConfirmProps {
  onConfirm: () => void;
  titleButton: string;
  title: string;
  description: string;
}

const CustomDeletePopConfirm: React.FC<DeletePopConfirmProps> = ({
  onConfirm,
  titleButton,
  title,
  description,
}) => {
  const [open, setOpen] = useState(false);

  const showPopConfirm = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    onConfirm();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popconfirm
      title={title}
      description={description}
      open={open}
      onConfirm={handleOk}
      onCancel={handleCancel}
      okText={"Si"}
      cancelText={"Cancelar"}
    >
      <Button
        size={"small"}
        title={titleButton}
        shape="circle"
        icon={<DeleteOutlined />}
        style={{ background: "#ff4d4f", color: "#ffffff" }}
        onClick={showPopConfirm}
      />
    </Popconfirm>
  );
};

export default CustomDeletePopConfirm;
