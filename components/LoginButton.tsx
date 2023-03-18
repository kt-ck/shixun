import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Group,
  Button,
  Avatar,
  HoverCard,
  List,
  ThemeIcon,
  Box,
  Text,
} from "@mantine/core";
import { LoginPanel } from "./LoginPanel";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CircleDashed } from "tabler-icons-react";
import { setInfo, setIsLogIn } from "@/features/roleFeature/roleFeature";
import { setNotification } from "@/features/layoutFeature/layoutSlice";
import { gray_layout } from "@/type/const";
import { useRouter } from "next/router";
function LoginButton({
  btnTitle,
  btnVariant,
}: {
  btnTitle: string;
  btnVariant:
    | "outline"
    | "white"
    | "light"
    | "default"
    | "filled"
    | "gradient"
    | "subtle"
    | undefined;
}) {
  const [opened, handler] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const userinfo = useAppSelector((state) => state.role.userInfo);
  const router = useRouter();
  const submit = async (
    type: string,
    data: { phone: string; name: string; password: string; terms: boolean }
  ) => {
    if (type === "register" && data.terms) {
      const res = await fetch(process.env.Hostname + "/user/register/check", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: data.phone }),
      });
      let res_json = await res.json();
      console.log(res_json);
      console.log({
        phoneNumber: data.phone,
        username: data.name,
        password: data.password,
        role: 1,
      });
      if (res_json.status === "0") {
        const res = await fetch(process.env.Hostname + "/user/register", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: data.phone,
            username: data.name,
            password: data.password,
            role: 1,
          }),
        });
        res_json = await res.json();
        console.log(res_json);
        if (res_json.status === "1") {
          console.log("注册成功");
        } else {
          dispatch(
            setNotification({
              notifacationShow: true,
              notificationContent: res_json.msg,
              notificationTitle: "REGISTER ERROR",
              notificationType: "error",
            })
          );
        }
      } else {
        dispatch(
          setNotification({
            notifacationShow: true,
            notificationContent: "your phone exists",
            notificationTitle: "REGISTER ERROR",
            notificationType: "error",
          })
        );
      }
    } else {
      const res = await fetch(process.env.Hostname + "/user/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: data.phone,
          password: data.password,
        }),
      });
      const res_json = await res.json();
      console.log(res_json);
      if (res_json.status === "1") {
        dispatch(
          setInfo({
            role: 1,
            name: res_json.data.username,
            phone: res_json.data.phoneNumber,
            isLogIn: true,
          })
        );
        window.localStorage.setItem("token", res_json.data.token);
        window.localStorage.setItem("username", res_json.data.username);
      } else {
        dispatch(
          setNotification({
            notifacationShow: true,
            notificationContent: res_json.msg,
            notificationTitle: "Login ERROR",
            notificationType: "error",
          })
        );
      }
    }

    handler.close();
  };

  const logout = () => {
    dispatch(setIsLogIn(false));
  };
  return (
    <>
      <Modal opened={opened} onClose={handler.close} zIndex={1000001}>
        <LoginPanel submit={submit} />
      </Modal>
      <Group>
        {userinfo.isLogIn ? (
          <HoverCard>
            <HoverCard.Target>
              <Box
                sx={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: `1px solid ${gray_layout}`,
                  fontWeight: 500,
                }}
              >
                {userinfo.name[0]}
              </Box>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <List spacing="xs" size="sm" listStyleType="none" center>
                <List.Item
                  icon={
                    <ThemeIcon color="dark" size={24} radius="xl">
                      <CircleDashed size="1rem" />
                    </ThemeIcon>
                  }
                >
                  <Text
                    fw={500}
                    fz={"md"}
                    sx={{
                      minWidth: "10rem",
                      padding: "1rem 0",
                      cursor: "pointer",
                    }}
                    onClick={() => router.push("/account")}
                  >
                    My Account
                  </Text>
                </List.Item>
              </List>
              <Button color={"dark"} fullWidth onClick={logout}>
                Log out
              </Button>
            </HoverCard.Dropdown>
          </HoverCard>
        ) : (
          <Button variant={btnVariant} color={"dark"} onClick={handler.open}>
            {btnTitle}
          </Button>
        )}
      </Group>
    </>
  );
}

export default LoginButton;
