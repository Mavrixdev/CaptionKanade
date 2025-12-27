import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
    const targetDate = new Date('2026-01-11T00:00:00'); // 11/1/2026
    const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Shutdown Banner */}
                <div className="mb-6 p-3 rounded-xl bg-red-200/60 dark:bg-red-900/40 border border-red-400/40">
                    <p className="text-red-700 dark:text-red-300 font-semibold text-lg">
                        Dịch vụ đã ngưng hoạt động từ ngày <span className="font-bold">25/11/2025</span> ❌
                    </p>
                </div>

                {/* 410 Gone */}
                <div className="relative mb-8">
                    <h1 className="text-8xl md:text-[10rem] font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                        410
                    </h1>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 blur-3xl rounded-full animate-ping"></div>
                </div>

                {/* Error Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
                        <AlertTriangle className="w-12 h-12 text-red-500 dark:text-red-400" />
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Trang đã ngưng hoạt động
                </h2>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                    Trang này hiện tại không còn khả dụng nữa. Chúng tôi sẽ quay trở lại vào ngày <span className="font-bold">11/01/2026</span>.
                </p>

                {/* Countdown */}
                <div className="mb-8 flex justify-center space-x-4 text-center">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{timeLeft.days}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ngày</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{timeLeft.hours}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Giờ</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{timeLeft.minutes}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phút</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{timeLeft.seconds}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Giây</p>
                    </div>
                </div>

                {/* Decorative Dots */}
                <div className="mt-12 flex justify-center space-x-4 opacity-30">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
