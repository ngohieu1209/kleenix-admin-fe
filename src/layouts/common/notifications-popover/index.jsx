import { m } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { getSocketInstance } from 'src/socket/socket-connection';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { varHover } from 'src/components/animate';

import NotificationItem from './notification-item';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'all',
    label: 'Tất cả',
    count: 22,
  },
  {
    value: 'unread',
    label: 'Chưa đọc',
    count: 12,
  }
];

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const drawer = useBoolean();

  const smUp = useResponsive('up', 'sm');

  const [currentTab, setCurrentTab] = useState('all');

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = getSocketInstance();
    socket.emit('admin-notifications')
    socket.on('list-notification', (payload) => {
      setNotifications(payload)
    })
  }, [])

  const notificationUnRead = notifications.filter((item) => item.isMark === false);

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleMarkAsRead = useCallback((notificationId) => {
    const socket = getSocketInstance();
    socket.emit('mark-notification', { notificationId });
    setNotifications(
      notifications.map((notification) => {
        if (notification.id === notificationId) {
          return {
            ...notification,
            isMark: true,
          };
        }
        return notification;
      })
    );
  }, [notifications]);

  const handleMarkAllAsRead = useCallback(() => {
    const socket = getSocketInstance();
    socket.emit('mark-all-notification')
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isMark: true,
      }))
    );
  }, [notifications]);

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Thông báo
      </Typography>

      {!!notificationUnRead.length && (
        <Tooltip title="Đánh dấu đọc tất cả">
          <IconButton color="primary" onClick={handleMarkAllAsRead}>
            <Iconify icon="eva:done-all-fill" />
          </IconButton>
        </Tooltip>
      )}

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      )}
    </Stack>
  );

  const renderTabs = (
    <Tabs value={currentTab} onChange={handleChangeTab}>
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            <Label
              variant={((tab.value === 'all' || tab.value === currentTab) && 'filled') || 'soft'}
              color={
                (tab.value === 'unread' && 'info') ||
                'default'
              }
            >
              { tab.value === 'all' ? notifications.length : notificationUnRead.length }
            </Label>
          }
          sx={{
            '&:not(:last-of-type)': {
              mr: 3,
            },
          }}
        />
      ))}
    </Tabs>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {currentTab === 'all' && notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} markAsRead={() => handleMarkAsRead(notification.id)} />
        ))}
        {currentTab === 'unread' && notificationUnRead.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} markAsRead={() => handleMarkAsRead(notification.id)} />
        ))}
      </List>
    </Scrollbar>
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={drawer.value ? 'primary' : 'default'}
        onClick={drawer.onTrue}
      >
        <Badge badgeContent={notificationUnRead.length} color="error">
          <Iconify icon="solar:bell-bing-bold-duotone" width={24} />
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}

        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2.5, pr: 1 }}
        >
          {renderTabs}
        </Stack>

        <Divider />

        {renderList}

      </Drawer>
    </>
  );
}
