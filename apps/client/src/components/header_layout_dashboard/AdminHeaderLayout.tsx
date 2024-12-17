"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { getFirstNameAndFirstLastName } from "@/helpers/get_first_name/get_first_name";

import CustomDropdown from "@/components/common/custom_dropdown/CustomDropdown";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { FaSignOutAlt } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { UserOutlined } from "@ant-design/icons";

import {
  setDefaultValuesUserSession,
  setNameUserSession,
} from "@/redux/features/user_session/userSessionSlice";

import { setResetModal } from "@/redux/features/common/modal/modalSlice";

const AdminHeaderLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();

  const nameUserSession = session?.user?.name;

  const nameUserState = useAppSelector((state) => state.userSession.name);

  useEffect(() => {
    if (!nameUserState) {
      dispatch(setNameUserSession(nameUserSession));
    }
  }, [session, nameUserState]);

  const handleClickUpdatePersonalData = async () => {
    try {
      await router.push(
        `${process.env.NEXT_PUBLIC_BONNA_HUB_URL}/user/dashboard/personal_data`,
        {
          scroll: true,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClickSignOut = () => {
    try {
      dispatch(setDefaultValuesUserSession());
      dispatch(setResetModal());
      signOut({
        redirect: true,
        callbackUrl: `${process.env.NEXT_PUBLIC_BONNA_HUB_URL}/login`,
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <>
      {!nameUserState ? (
        <CustomSpin />
      ) : (
        <CustomDropdown
          titleCustomDropdown={`HOLA, ${getFirstNameAndFirstLastName(nameUserState)}`}
          iconCustomItem1={<PiUserListBold />}
          titleCustomItem1="Mis Datos Personales"
          iconCustomItem2={<FaSignOutAlt />}
          titleCustomItem2="Cerrar Sesión"
          handleClickCustomItem1={handleClickUpdatePersonalData}
          handleClickCustomItem2={handleClickSignOut}
          iconCustomDropdown={<UserOutlined />}
        />
      )}
    </>
  );
};

export default AdminHeaderLayout;
