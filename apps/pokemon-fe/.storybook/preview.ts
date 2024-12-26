import type { Preview } from '@storybook/react';

export const globals = {
  backgrounds: {
    grid: true,
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: 'Dark', value: '#333' },
        { name: 'Light', value: '#F7F9F2' },
      ],
      default: 'Dark',
    },
  },
};

export default preview;
