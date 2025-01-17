import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { ButtonVariant } from './Button.d';

const meta = {
  title: 'Components/Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: () => {},
    children: 'Button Text',
    variant: 'primary',
    disabled: false,
    className: '',
    textColor: '',
    borderBGreen: false,
    widthFull: false,
    fontSize: 16,
    type: 'button',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    children: { control: 'text' },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'white',
        'transparent',
        'blue'
      ] as ButtonVariant[],
    },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    textColor: { control: 'color' },
    borderBGreen: { control: 'boolean' },
    widthFull: { control: 'boolean' },
    fontSize: { control: 'number' },
    type: { control: 'select', options: ['submit', 'reset', 'button'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const PrimaryWithHoverBorderGreen: Story = {
  args: {
    children: 'Primary Button, Hover me',
    variant: 'primary',
    borderBGreen: true,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const SecondaryWithCustomColor: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    textColor: 'text-primary',
  },
};

export const White: Story = {
  args: {
    children: 'White Button',
    variant: 'white',
  },
};

export const Transparent: Story = {
  args: {
    children: 'Transparent Button',
    variant: 'transparent',
  },
};

export const TransparentWithCustomColorAndHover: Story = {
  args: {
    children: 'Transparent Button, Hover me',
    variant: 'transparent',
    textColor: 'text-red-500',
    className: 'hover:text-green',
  },
};
