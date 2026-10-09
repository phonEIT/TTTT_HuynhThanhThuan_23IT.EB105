import React, { Component } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaImage } from 'react-icons/fa';
import ChatBotService from '../../services/admin/ChatBotService';

class ChatBotWidget extends Component {
  state = {
    open: false,
    messages: [{ from: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn?' }],
    input: '',
    imageFile: null,
    imagePreview: null,
    loading: false,
  };

  // Chọn ảnh
  handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  // Gửi tin nhắn
  handleSend = async () => {
    const { input, imageFile, imagePreview, messages } = this.state;
    const trimmedText = typeof input === 'string' ? input.trim() : '';

    // Nếu không có text và ảnh => không gửi
    if (!trimmedText && !imageFile) return;

    // Thêm tin nhắn của user vào chat (có ảnh thì lưu luôn link ảnh)
    this.setState({
      messages: [
        ...messages,
        {
          from: 'user',
          text: trimmedText || '',
          image: imageFile ? imagePreview : null, // ✅ Lưu ảnh
        },
      ],
      input: '',
      imageFile: null,
      imagePreview: null,
      loading: true,
    });

    try {
      const formData = new FormData();
      if (trimmedText) formData.append('message', trimmedText);
      if (imageFile) formData.append('file', imageFile);

      const res = await ChatBotService.sendChatWithImage(formData);

      // Nếu bot trả về ảnh (ví dụ res.image) thì lưu lại
      const botMessage = {
        from: 'bot',
        text: res.reply || '',
        image: res.image || null, // ✅ Nếu server trả URL ảnh thì gán ở đây
      };

      this.setState((prev) => ({
        messages: [...prev.messages, botMessage],
        loading: false,
      }));
    } catch (error) {
      console.error('❌ Gửi chatbot thất bại:', error);
      this.setState((prev) => ({
        messages: [
          ...prev.messages,
          { from: 'bot', text: '❌ Lỗi khi gửi tin nhắn.' },
        ],
        loading: false,
      }));
    }
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleSend();
    }
  };

  render() {
    const { open, messages, input, loading, imagePreview } = this.state;

    return (
      <div className='fixed bottom-6 right-6 z-50'>
        {open ? (
          <div className='bg-white border border-indigo-300 shadow-lg rounded-xl w-80 h-96 flex flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between px-4 py-2 border-b bg-indigo-100 rounded-t-xl'>
              <h2 className='text-indigo-700 font-semibold text-sm'>
                🤖 Hỗ trợ ChatBot
              </h2>
              <button
                onClick={() => this.setState({ open: false })}
                className='text-gray-500 hover:text-red-500'
              >
                <FaTimes />
              </button>
            </div>

            {/* Chat body */}
            <div className='flex-1 overflow-y-auto p-3 space-y-2 text-sm'>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col space-y-1 ${
                    msg.from === 'bot' ? 'items-start' : 'items-end'
                  }`}
                >
                  {/* Ảnh */}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt='uploaded'
                      className='max-w-[150px] max-h-[150px] rounded-lg object-cover'
                    />
                  )}

                  {/* Bubble */}
                  <div
                    className={`px-3 py-2 rounded-lg ${
                      msg.from === 'bot'
                        ? 'bg-gray-100 text-gray-700 text-left'
                        : 'bg-indigo-600 text-white text-right'
                    }`}
                  >
                    {msg.from === 'bot' ? (
                      <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Preview ảnh */}
            {imagePreview && (
              <div className='p-2 border-t bg-gray-50 flex justify-center'>
                <img
                  src={imagePreview}
                  alt='preview'
                  className='max-h-24 rounded-lg'
                />
              </div>
            )}

            {/* Input box */}
            <div className='flex items-center border-t p-2 bg-white rounded-b-xl gap-2'>
              <input
                type='text'
                placeholder='Nhập tin nhắn...'
                value={input}
                onChange={(e) => this.setState({ input: e.target.value })}
                onKeyDown={this.handleKeyDown}
                className='flex-1 px-3 text-black py-2 border rounded-lg text-sm outline-none'
              />
              <label className='cursor-pointer bg-gray-200 p-2 rounded-lg hover:bg-gray-300'>
                <FaImage />
                <input
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={this.handleImageSelect}
                />
              </label>
              <button
                onClick={this.handleSend}
                className='bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700'
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => this.setState({ open: true })}
            className='bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg'
          >
            <FaRobot className='text-xl' />
          </button>
        )}
      </div>
    );
  }
}

export default ChatBotWidget;
