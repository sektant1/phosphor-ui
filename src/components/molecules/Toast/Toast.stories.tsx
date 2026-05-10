import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast, useToast } from "./Toast";
import type { ToastProps } from "./Toast";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<ToastProps> = {
  title: "Molecules/Toast",
  component: Toast,
  argTypes: {
    variant:  { control: "inline-radio", options: ["info", "success", "warn", "error"] },
    message:  { control: "text" },
    visible:  { control: "boolean" },
  },
  args: {
    message: "link copied to clipboard",
    variant: "success",
    visible: true,
  },
};
export default meta;

const btnStyle: React.CSSProperties = {
  background: "none",
  border: "1px dashed var(--pho-color-primary-muted)",
  color: "var(--pho-color-primary)",
  fontFamily: "var(--pho-font-code)",
  fontSize: "12px",
  padding: "4px 12px",
  cursor: "pointer",
  letterSpacing: "0.06em",
};

export const Default: StoryObj<ToastProps> = {
  parameters: {
    layout: "padded",
    docs: { source: { code: basicUsage.Toast } },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem" }}>
      <Toast inline variant="info"    message="enrollment confirmed."       visible={true} />
      <Toast inline variant="success" message="link copied to clipboard"    visible={true} />
      <Toast inline variant="warn"    message="session expiring soon."      visible={true} />
      <Toast inline variant="error"   message="connection failed."          visible={true} />
    </div>
  ),
};

export const Interactive: StoryObj<ToastProps> = {
  render: () => {
    const { visible, message, variant, show, dismiss } = useToast(2400);
    return (
      <div style={{ padding: "2rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button style={btnStyle} onClick={() => show("link copied to clipboard", "success")}>success</button>
          <button style={btnStyle} onClick={() => show("enrollment confirmed.", "info")}>info</button>
          <button style={btnStyle} onClick={() => show("session expiring soon.", "warn")}>warn</button>
          <button style={btnStyle} onClick={() => show("connection failed.", "error")}>error</button>
        </div>
        <Toast visible={visible} message={message} variant={variant} onDismiss={dismiss} />
      </div>
    );
  },
};
