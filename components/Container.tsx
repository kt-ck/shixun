import { MyHeader } from "./Header";
import { MyFooter } from "./Footer";
import type { ReactElement } from "react";
import { Check, X } from "tabler-icons-react";
import { Notification, Box } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setNotification } from "@/features/layoutFeature/layoutSlice";
function MyContainer({ children }: { children: ReactElement }) {
  const notification = useAppSelector((state) => state.layout.notification);
  const dispatcher = useAppDispatch();
  return (
    <>
      <MyHeader />
      <Box>
        {notification.notifacationShow && (
          <Notification
            icon={
              notification.notificationType === "error" ? (
                <X size="1.1rem" />
              ) : (
                <Check size="1.1rem" />
              )
            }
            color={notification.notificationType === "error" ? "red" : "teal"}
            title={notification.notificationTitle}
            onClick={() =>
              dispatcher(
                setNotification({
                  notifacationShow: false,
                  notificationContent: "",
                  notificationTitle: "",
                  notificationType: "info",
                })
              )
            }
          >
            {notification.notificationContent}
          </Notification>
        )}
      </Box>

      {children}
      <MyFooter
        data={[
          {
            title: "title",
            links: [{ label: "linksLabel", link: "/" }],
          },
        ]}
      />
    </>
  );
}

export default MyContainer;
