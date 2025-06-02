import { Meta, StoryObj } from "@storybook/react";
import Exposure from "./index";

const meta: Meta<typeof Exposure> = {
  title: "Components/Exposure",
  component: Exposure,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Exposure>;

export const Default: Story = {
  args: {
    id: 1,
    title: "Public Speaking Exposure",
    status: "To Do",
    steps: [
      {
        id: 1,
        type: "SubjectiveRatingStep",
        status: "Pending",
        value: 0,
        notes: "",
      },
      {
        id: 2,
        type: "ActionStep",
        status: "Pending",
        title: "Prepare speech",
        description: "Write and rehearse the speech.",
        duration: 300,
      },
      {
        id: 3,
        type: "ActionStep",
        status: "Pending",
        title: "Deliver speech",
        description: "Present the speech to an audience.",
        duration: 600,
      },
      {
        id: 4,
        type: "ObjectiveRatingStep",
        status: "Pending",
        value: 0,
        notes: "",
      },
    ],
  },
};
