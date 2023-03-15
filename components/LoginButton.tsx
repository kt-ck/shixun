import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Group,
  Button,
  Avatar,
  HoverCard,
  List,
  ThemeIcon,
} from "@mantine/core";
import { LoginPanel } from "./LoginPanel";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CircleDashed } from "tabler-icons-react";
import {
  setInfo,
  setIsLogIn,
  setToken,
} from "@/features/roleFeature/roleFeature";
import { setNotification } from "@/features/layoutFeature/layoutSlice";

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
  const submit = async (
    type: string,
    data: { phone: string; name: string; password: string; terms: boolean }
  ) => {
    console.log(process.env.BaseUrl);
    if (type === "register" && data.terms) {
      const res = await fetch(process.env.BaseUrl + "/user/register/check", {
        method: "post",
        headers:{
          "Content-Type": "application/json"
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
        const res = await fetch(process.env.BaseUrl + "/user/register", {
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
      const res = await fetch(process.env.BaseUrl + "/user/login", {
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
      console.log(res_json)
      if (res_json.status === "1") {
        dispatch(setToken(res_json.data.token));
        window.localStorage.setItem("token", res_json.data.token);
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
              <Avatar
                component="a"
                href="/acount"
                target="_blank"
                radius="xl"
                src={userinfo.avatar}
                alt={userinfo.name}
              />
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <List spacing="xs" size="sm" listStyleType="none" center>
                <List.Item
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <CircleDashed size="1rem" />
                    </ThemeIcon>
                  }
                >
                  Submit a pull request once you are done
                </List.Item>
              </List>
              <Button
                variant="gradient"
                gradient={{ from: "orange", to: "red" }}
                fullWidth
                onClick={logout}
              >
                Log out
              </Button>
            </HoverCard.Dropdown>
          </HoverCard>
        ) : (
          <Button variant={btnVariant} onClick={handler.open}>
            {btnTitle}
          </Button>
        )}
      </Group>
    </>
  );
}

export default LoginButton;
