import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { redirect } from "next/navigation";

import { setIdNumberUserSession } from "@/redux/features/user_session/userSessionSlice";

const useAuthValidationAdmin = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const idNumberUserSession = session?.user?.id_number;

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  useEffect(() => {
    if (!idNumberUserSessionState) {
      dispatch(setIdNumberUserSession(idNumberUserSession));
    }

    if (status === "unauthenticated") {
      redirect(`${process.env.NEXT_PUBLIC_BONNA_HUB_URL}/login_admin`);
    }
  }, [status, idNumberUserSessionState, session]);
};

export default useAuthValidationAdmin;
