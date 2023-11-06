import type { StoryObj } from '@storybook/react';
import '../../../styles/globals.scss';

import Input from './Input';

const meta = {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'label',
    },
    placeholder: {
      description: 'placeholder',
    },
    error: {
      description: 'Текст помилки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Ім'я",
    placeholder: "Введіть ім'я",
  },
};
