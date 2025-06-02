import { Meta, StoryObj } from "@storybook/react";
import Step from "./step";

const meta: Meta<typeof Step> = {
  title: "Components/Exposure/Step",
  component: Step,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Step>;

const baseProps = {
  id: 1,
  title: "Do the breathing exercise",
  description:
    "Spend a few minutes focusing on your breath to calm down before proceeding.",
  disabled: false,
  isActive: true,
  onChange: (updatedStep: any) => {
    console.log("onChange", updatedStep);
  },
};

export const ActivePending: Story = {
  args: {
    ...baseProps,
    status: "Pending",
  },
};

export const ActiveCompleted: Story = {
  args: {
    ...baseProps,
    status: "Completed",
  },
};

export const InactivePending: Story = {
  args: {
    ...baseProps,
    status: "Pending",
    isActive: false,
  },
};

export const InactiveCompleted: Story = {
  args: {
    ...baseProps,
    status: "Completed",
    isActive: false,
  },
};

export const DisabledStep: Story = {
  args: {
    ...baseProps,
    status: "Pending",
    disabled: true,
  },
};

export const StepWithTimer: Story = {
  args: {
    ...baseProps,
    status: "Pending",
    duration: 90,
  },
};
