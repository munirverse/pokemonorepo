import type { Preview } from '@storybook/react';
import theme from './theme';

export const initialGlobals = {
  backgrounds: {
    grid: true,
  },
};

const preview: Preview = {
  parameters: {
    docs: {
      theme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      disableSaveFromUI: true,
    },
    backgrounds: {
      values: [
        { name: 'Dark', value: '#333' },
        { name: 'Light', value: '#F7F9F2' },
      ],
      default: 'Dark',
    },
    nextjs: {
      appDirectory: true,
    },
    options: {
      storySort: {
        order: [
          'About',
          'Software Architecture',
          'Backend Design Pattern',
          'Frontend Design Pattern',
          'Components',
        ],
      },
    },
  },
};

export default preview;
