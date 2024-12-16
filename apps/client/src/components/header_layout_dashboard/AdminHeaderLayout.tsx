"use client";

import React from "react";
import { useRouter } from "next/navigation";

import CustomDropdown from "@/components/common/custom_dropdown/CustomDropdown";
import { FaSignOutAlt } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { UserOutlined } from "@ant-design/icons";

const AdminHeaderLayout: React.FC = () => {
  const router = useRouter();

  const handleClickUpdatePersonalData = async () => {
    try {
      await router.push("/", {
        scroll: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClickSignOut = () => {
    try {
      // TODO -> CUANDO CIERRA SESIÓN
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <>
      <CustomDropdown
        titleCustomDropdown={"CAMILO SALGADO"}
        iconCustomItem1={<PiUserListBold />}
        titleCustomItem1="Mis Datos"
        iconCustomItem2={<FaSignOutAlt />}
        titleCustomItem2="Cerrar Sesión"
        handleClickCustomItem1={handleClickUpdatePersonalData}
        handleClickCustomItem2={handleClickSignOut}
        iconCustomDropdown={<UserOutlined />}
      />
    </>
  );
};

export default AdminHeaderLayout;
