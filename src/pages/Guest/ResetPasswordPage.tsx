import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserApi from '~/api/UserApi'; // Đảm bảo đường dẫn này đúng

const ResetPasswordPage = () => {
    const navigate = useNavigate();

    const [token, setToken] = useState(''); // State để lưu trữ token người dùng nhập
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTokenChange = (e) => {
        setToken(e.target.value);
        setError(''); // Clear error khi người dùng bắt đầu nhập
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setError(''); // Clear error khi người dùng bắt đầu nhập
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setError(''); // Clear error khi người dùng bắt đầu nhập
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!token) {
            setError('Vui lòng nhập token đã được gửi đến email của bạn.');
            return;
        }
        if (!newPassword) {
            setError('Vui lòng nhập mật khẩu mới.');
            return;
        }
        if (newPassword.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        setLoading(true);
        try {
            const response = await UserApi.resetPassword(token, newPassword); // Gọi API mới
            setMessage(response?.message || 'Mật khẩu đã được đặt lại thành công. Bạn sẽ được chuyển hướng đến trang đăng nhập sau 3 giây...');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error: any) {
            setError(error?.response?.data?.message || 'Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại sau.');
            console.error('Lỗi gọi API đặt lại mật khẩu:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 mt-16">
            <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Đặt lại mật khẩu</h1>
                <p className="text-gray-500 text-center mb-4">
                    Vui lòng nhập token đã được gửi đến email của bạn và mật khẩu mới.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Thành công!</strong>
                        <span className="block sm:inline">{message}</span>
                    </div>}
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Lỗi!</strong>
                        <span className="block sm:inline">{error}</span>
                    </div>}

                    <div>
                        <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                            Token
                        </label>
                        <input
                            type="text"
                            id="token"
                            name="token"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                            value={token}
                            onChange={handleTokenChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Xác nhận mật khẩu mới
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;