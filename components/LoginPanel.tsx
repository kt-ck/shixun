import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
export function LoginPanel(props: PaperProps & { submit: Function }) {
  const [type, toggle] = useToggle(["login", "register"]);
  const { submit, ...paperProps } = props;
  const form = useForm({
    initialValues: {
      phone: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      phone: (val: string) =>
        /^1[3456789]\d{9}$/.test(val)
          ? null
          : "please input the right phone number",
      password: (val: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(val)
          ? null
          : "At least 8-16 characters, 1 uppercase letter, 1 lowercase letter and 1 number.",
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...paperProps}>
      <Text size="lg" weight={500}>
        Welcome to VL, {type} with
      </Text>

      <form onSubmit={form.onSubmit(() => submit(type, form.values))}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Phone"
            placeholder="198..."
            value={form.values.phone}
            onChange={(event) =>
              form.setFieldValue("phone", event.currentTarget.value)
            }
            error={form.errors.phone && "please input the right phone number"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "At least 8-16 characters, 1 uppercase letter, 1 lowercase letter and 1 number."
            }
            radius="md"
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button
            type="submit"
            radius="lg"
            color={"dark"}
            disabled={!form.values.terms}
          >
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
