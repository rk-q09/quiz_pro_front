import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Notification } from './Notification';

export default {
  title: 'Components/Notificaton',
  component: Notification,
  parameters: {
    colors: { expanded: true },
  },
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (props) => (
  <Notification {...props} />
);

export const Info = Template.bind({});
Info.args = {
  notification: {
    id: '1',
    type: 'info',
    title: 'Hello Info',
    message: 'This is info notification',
  },
  onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`),
};
export const Success = Template.bind({});
Success.args = {
  notification: {
    id: '1',
    type: 'success',
    title: 'Hello, Success',
    message: 'This is success notification',
  },
  onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`),
};
export const Warning = Template.bind({});
Warning.args = {
  notification: {
    id: '1',
    type: 'warning',
    title: 'Hello, Warning',
    message: 'This is warning notification',
  },
  onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`),
};
export const Error = Template.bind({});
Error.args = {
  notification: {
    id: '1',
    type: 'error',
    title: 'Hello, Error',
    message: 'This is error notification',
  },
  onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`),
};
