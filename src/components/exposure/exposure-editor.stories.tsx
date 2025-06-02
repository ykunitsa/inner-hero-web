import { Meta, StoryObj } from "@storybook/react";
import ExposureEditor from "./exposure-editor";

const meta: Meta<typeof ExposureEditor> = {
  title: "Exposure/ExposureEditor",
  component: ExposureEditor,
};

export default meta;
type Story = StoryObj<typeof ExposureEditor>;

export const Default: Story = {
  args: {
    onSubmit: (exposure) => {
      alert("Submitted exposure:\n" + JSON.stringify(exposure, null, 2));
    },
  },
};
