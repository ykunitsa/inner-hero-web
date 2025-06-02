import { Meta, StoryObj } from "@storybook/react";
import RatingStep from "./rating-step";

const meta: Meta<typeof RatingStep> = {
  title: "Components/Exposure/RatingStep",
  component: RatingStep,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RatingStep>;

const baseProps = {
  id: 1,
  value: 5,
  notes: "",
  disabled: false,
  type: "SubjectiveRatingStep" as const,
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

export const Disabled: Story = {
  args: {
    ...baseProps,
    status: "Pending",
    disabled: true,
  },
};

export const ObjectiveType: Story = {
  args: {
    ...baseProps,
    status: "Pending",
    type: "ObjectiveRatingStep",
  },
};
