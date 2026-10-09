import axiosClient from '../config/axiosClient';

class TaskService {
  constructor() {
    this.API_URL = '/admin/task/my_task';
    this.HISTORY_URL = '/admin/task/my_task_history';
    this.IN_PROGRESS_URL = '/admin/task/my_task_progress'; // ✅ thêm đường dẫn mới
    this.UPDATE_URL = '/admin/task';
  }

  handleError(err, action) {
    if (err.response) {
      const message = err.response.data?.message || 'Có lỗi xảy ra';
      console.error(`❌ Lỗi ${action}:`, message);
      throw new Error(message);
    } else if (err.request) {
      console.error(`❌ Lỗi ${action}: Không thể kết nối tới server`);
      throw new Error('Không thể kết nối tới server');
    } else {
      console.error(`❌ Lỗi ${action}:`, err.message);
      throw new Error(err.message);
    }
  }

  // ✅ Danh sách nhiệm vụ của kỹ thuật viên
  async getMyTasks() {
    try {
      const response = await axiosClient.get(this.API_URL);
      return response.data.data.map(task => ({
        id: task.id,
        status: task.status,
        note: task.note,
        assignedDate: task.assignedDate,
        dueDate: task.dueDate,
        completedDate: task.completedDate,
        reportedBy: task.reportedBy,
        assignedToName: task.assignedToName,
        assignedByName: task.assignedByName,
        productName: task.productName,
        image: task.image,
      }));
    } catch (error) {
      this.handleError(error, 'lấy danh sách nhiệm vụ');
    }
  }

  // ✅ Lịch sử nhiệm vụ
  async getMyTaskHistory() {
    try {
      const response = await axiosClient.get(this.HISTORY_URL);
      return response.data.data.map(history => ({
        id: history.id,
        productName: history.productName,
        image: history.image,
        action: history.action,
        note: history.note,
        actionDate: history.actionDate,
        assignedBy: history.assignedBy,
        assignedTo: history.assignedTo,
        reportedBy: history.reportedBy,
      }));
    } catch (error) {
      this.handleError(error, 'lấy lịch sử nhiệm vụ');
    }
  }

  // ✅ Nhiệm vụ đang xử lý (IN_PROGRESS)
  async getMyTaskInProgress() {
    try {
      const response = await axiosClient.get(this.IN_PROGRESS_URL);
      return response.data.data.map(task => ({
        id: task.id,
        productName: task.productName,
        image: task.image,
        status: task.status,
        note: task.note,
        assignedDate: task.assignedDate,
        dueDate: task.dueDate,
        completedDate: task.completedDate,
        reportedBy: task.reportedBy,
        assignedToName: task.assignedToName,
        assignedByName: task.assignedByName,
      }));
    } catch (error) {
      this.handleError(error, 'lấy nhiệm vụ đang xử lý');
    }
  }

  // ✅ Cập nhật nhiệm vụ
  async updateTask(task) {
    try {
      const response = await axiosClient.put(this.UPDATE_URL, task);
      return response.data;
    } catch (error) {
      this.handleError(error, 'cập nhật nhiệm vụ');
    }
  }
}

export default new TaskService();
