import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";
import type { LoginFormProps } from "./LoginForm";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<LoginFormProps> = {
  title: "Organisms/LoginForm",
  component: LoginForm,
  argTypes: {
    title:           { control: "text" },
    subtitle:        { control: "text" },
    submitLabel:     { control: "text" },
    identifierLabel: { control: "text" },
    passwordLabel:   { control: "text" },
    error:           { control: "text" },
    loading:         { control: "boolean" },
  },
  args: {
    title:    "// access terminal",
    subtitle: "authenticate to continue",
    loading:  false,
    error:    "",
  },
};
export default meta;

export const Default: StoryObj<LoginFormProps> = {
  parameters: { docs: { source: { code: basicUsage.LoginForm } } },
};

export const WithError: StoryObj<LoginFormProps> = {
  args: {
    error: "authentication failed",
  },
};

export const Loading: StoryObj<LoginFormProps> = {
  args: {
    loading: true,
  },
};
