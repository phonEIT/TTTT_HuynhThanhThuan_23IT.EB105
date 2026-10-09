import React, { Component } from 'react';
import { getMyNotifications } from '../../services/user/NotificationService';
import dayjs from 'dayjs';
import {
  MdNotificationsActive,
  MdCheckCircle,
  MdCancel,
  MdHourglassEmpty,
} from 'react-icons/md';

export default class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchNotifications();
  }

  async fetchNotifications() {
    try {
      this.setState({ loading: true });
      const res = await getMyNotifications();
      this.setState({ notifications: res });
    } catch (err) {
      console.error('Không thể tải thông báo:', err);
    } finally {
      this.setState({ loading: false });
    }
  }

  getStatusStyle(status) {
    switch (status) {
      case 'APPROVED':
        return {
          color: 'text-green-600',
          icon: <MdCheckCircle className='w-5 h-5 text-green-500' />,
        };
      case 'PENDING':
        return {
          color: 'text-yellow-600',
          icon: <MdHourglassEmpty className='w-5 h-5 text-yellow-500' />,
        };
      default:
        return {
          color: 'text-red-600',
          icon: <MdCancel className='w-5 h-5 text-red-500' />,
        };
    }
  }

  render() {
    const { notifications, loading } = this.state;

    if (loading) {
      return (
        <div className='flex justify-center items-center h-40 text-indigo-600 text-lg'>
          ⏳ Đang tải thông báo...
        </div>
      );
    }

    return (
      <div className='p-6 max-w-5xl mx-auto'>
        <h2 className='text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 mb-10'>
          🔔 Nội dung thông báo
        </h2>

        <div className='space-y-4'>
          {notifications.length === 0 ? (
            <div className='bg-white shadow-lg rounded-xl p-6 flex items-center justify-center h-24 border border-gray-200'>
              <p className='text-gray-500'>Không có thông báo nào.</p>
            </div>
          ) : (
            notifications.map((noti) => {
              const statusInfo = this.getStatusStyle(noti.approval.status);
              return (
                <div
                  key={noti.id}
                  className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 flex items-start gap-4 border border-gray-100'
                >
                  {/* Ảnh thiết bị */}
                  {noti.approval?.device?.image && (
                    <img
                      src={noti.approval.device.image}
                      alt={noti.approval.device.productName}
                      className='w-20 h-20 object-cover rounded-lg border border-gray-200'
                    />
                  )}

                  {/* Nội dung */}
                  <div className='flex-1'>
                    <div className='flex justify-between items-center mb-2'>
                      <p className='text-sm text-gray-500'>
                        {dayjs(noti.notificationDate).format(
                          'DD/MM/YYYY HH:mm'
                        )}
                      </p>
                      <div className='flex items-center gap-1'>
                        {statusInfo.icon}
                        <span
                          className={`${statusInfo.color} font-semibold text-sm`}
                        >
                          {noti.approval.status}
                        </span>
                      </div>
                    </div>

                    <h3 className='text-lg font-semibold text-gray-800 mb-1'>
                      {noti.content}
                    </h3>

                    <p className='text-sm text-gray-600'>
                      <span className='font-medium'>Thiết bị:</span>{' '}
                      {noti.approval.device.productName}
                    </p>
                    <p className='text-sm text-gray-600'>
                      <span className='font-medium'>Người dùng:</span>{' '}
                      {noti.user.userName}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
