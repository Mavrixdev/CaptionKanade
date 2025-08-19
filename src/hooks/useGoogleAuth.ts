import { useState, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { GoogleTokenResponse, GoogleAuthError } from '../types/GoogleAuth';

export const useGoogleAuth = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { googleauth } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = useCallback(async (tokenResponse: GoogleTokenResponse) => {
    if (!tokenResponse?.access_token) {
      toast.error('Không thể lấy token từ Google');
      return;
    }

    setIsGoogleLoading(true);
    
    try {
      await googleauth(tokenResponse.access_token);
      toast.success('Đăng nhập Google thành công!');
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('account_not_found')) {
          toast.error('Tài khoản Google chưa được đăng ký. Vui lòng đăng ký trước.');
        } else if (error.message.includes('invalid_token')) {
          toast.error('Token Google không hợp lệ. Vui lòng thử lại.');
        } else if (error.message.includes('server_error')) {
          toast.error('Lỗi server. Vui lòng thử lại sau.');
        } else {
          toast.error(error.message || 'Đăng nhập Google thất bại');
        }
      } else {
        toast.error('Đã xảy ra lỗi không xác định');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  }, [googleauth, navigate]);

  const handleGoogleError = useCallback((error: GoogleAuthError) => {
    console.error('Google OAuth error:', error);
    
    if (error.error === 'popup_closed_by_user') {
      toast.error('Đăng nhập bị hủy. Vui lòng thử lại.');
    } else if (error.error === 'access_denied') {
      toast.error('Quyền truy cập bị từ chối. Vui lòng cấp quyền để tiếp tục.');
    } else if (error.error === 'immediate_failed') {
      toast.error('Đăng nhập thất bại. Vui lòng thử lại.');
    } else {
      toast.error('Lỗi đăng nhập Google. Vui lòng thử lại.');
    }
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    flow: 'implicit',
    scope: 'email profile',
  });

  return {
    googleLogin,
    isGoogleLoading,
  };
};
