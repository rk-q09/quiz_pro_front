import { useNotificationStore } from '@/stores/notifications';
import { Flex } from '@chakra-ui/layout';

import { Notification } from './Notification';

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore();

  return (
    <Flex
      position="fixed"
      direction="column"
      justify="flex-end"
      top={0}
      right={2}
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </Flex>
  );
};
