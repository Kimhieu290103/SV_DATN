import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserApi from '~/api/UserApi'; // Đảm bảo đường dẫn này đúng với vị trí file UserApi của bạn

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setEmail(e.target.value);
        setError(''); // Clear error khi người dùng bắt đầu nhập
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Validation email
        if (!email) {
            setError('Vui lòng nhập địa chỉ email.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Địa chỉ email không hợp lệ.');
            return;
        }

        setLoading(true);
        try {
            const data = await UserApi.forgotPassword(email);
            setEmail('');
            navigate('/reset-password');
        } catch (error: any) {
            setError('')
            setError(error?.response?.data?.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.');
            console.error('Lỗi gọi API quên mật khẩu:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 mt-16">
            <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Quên mật khẩu</h1>
                <p className="text-gray-500 text-center mb-4">
                    Nhập địa chỉ email bạn đã đăng ký để nhận hướng dẫn đặt lại mật khẩu.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Lỗi!</strong>
                        <span className="block sm:inline">{error}</span>
                    </div>}
                    {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Thành công!</strong>
                        <span className="block sm:inline">{message}</span>
                    </div>}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Địa chỉ email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="your.email@example.com"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-600 text-sm mt-4">
                    Bạn đã nhớ mật khẩu?{" "}
                    <Link to="/login" className="text-blue-900 hover:underline font-medium">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;