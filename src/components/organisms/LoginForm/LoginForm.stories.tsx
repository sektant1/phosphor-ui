import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";
import type { LoginFormProps } from "./LoginForm";
import { source, tsx } from "../../../stories/source";

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

const defaultSource = tsx`
import { LoginForm } from "phosphor-ui";

const defaultProps = {
    title:    "// access terminal",
    subtitle: "authenticate to continue",
    loading:  false,
    error:    "",
  };

export function Example() {
  return <LoginForm {...defaultProps} />;
}
`;

const withErrorSource = tsx`
import { LoginForm } from "phosphor-ui";

const withErrorProps = {
  ...{
    title:    "// access terminal",
    subtitle: "authenticate to continue",
    loading:  false,
    error:    "",
  },
  ...{
    error: "authentication failed",
  },
};

export function Example() {
  return <LoginForm {...withErrorProps} />;
}
`;

const loadingSource = tsx`
import { LoginForm } from "phosphor-ui";



const loadingProps = {
  ...{
    title:    "// access terminal",
    subtitle: "authenticate to continue",
    loading:  false,
    error:    "",
  },
  ...{
    loading: true,
  },
};

export function Example() {
  return <LoginForm {...loadingProps} />;
}
`;

export const Default: StoryObj<LoginFormProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};

export const WithError: StoryObj<LoginFormProps> = {
  parameters: { docs: { source: source(withErrorSource) } },
  args: {
    error: "authentication failed",
  },
};

export const Loading: StoryObj<LoginFormProps> = {
  parameters: { docs: { source: source(loadingSource) } },
  args: {
    loading: true,
  },
};
