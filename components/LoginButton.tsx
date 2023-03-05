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
import {  CircleDashed } from "tabler-icons-react";
import { setInfo, setIsLogIn } from "@/features/roleFeature/roleFeature";
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
  const submit = async (type: string, data: { email: string }) => {
    if (type === "register") {
    } else {
      const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify(data),
      });
      const userinfo = await res.json();
      dispatch(setInfo(userinfo));
    }

    handler.close();
  };

  const logout = () =>{
    dispatch(setIsLogIn(false))
  }
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
