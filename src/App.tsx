import { BadgeCheck, BookOpen, Edit3, Flame, HelpCircle, Home, LogOut, Menu, MessageCircle, Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CaptionProvider } from './contexts/CaptionContext';

// === Các component đã được comment thì mở ra khi bạn đã implement xong ===
import CaptionBuilder from './components/CaptionBuilder';
import CaptionLibrary from './components/CaptionLibrary';
import ContactPage from './components/ContactPage';
import EmailVerification from './components/EmailVerification';
import HomePage from './components/HomePage';
import Login from './components/Login';
import PrivacyPolicy from './components/PrivacyPolicy';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import TermsOfService from './components/TermsOfService';
import Trending from './components/Trending';
import Tutorial from './components/Tutorial';
import UserPage from './components/UserPage';

// import ProtectedRoute from './components/ProtectedRoute'; // Mở khi cần dùng

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SidebarContent: React.FC<{ onNavigate?: () => void }> = ({ onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem('captionkanade-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
    // Nếu chưa có thì mặc định theo system preference (tùy chọn)
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('captionkanade-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('captionkanade-theme', 'light');
    }
  };

  const navigation: NavigationItem[] = [
    { id: '/', label: 'Home', icon: Home },
    { id: '/builder', label: 'Caption Studio', icon: Edit3 },
    { id: '/library', label: 'Library', icon: BookOpen },
    { id: '/trending', label: 'Trending', icon: Flame },
    { id: '/tutorial', label: 'Hướng dẫn', icon: HelpCircle },
    { id: '/contact', label: 'Liên hệ', icon: MessageCircle },
  ];

  const betaPages: NavigationItem[] = [
    { id: '#', label: 'Quản lý bộ sưu tập', icon: MdOutlineCollectionsBookmark },
  ];

  const getUserInitials = (user: any): string => {
    if (user?.username) return user.username.slice(0, 2).toUpperCase();
    if (user?.email) return user.email.slice(0, 2).toUpperCase();
    return 'U';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b">
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
        >
          CaptionKanade
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={location.pathname === id ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start h-12 px-4',
                location.pathname === id &&
                  'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900/40'
              )}
              asChild
            >
              <Link to={id} onClick={onNavigate}>
                <Icon className="mr-3 h-5 w-5" />
                {label}
              </Link>
            </Button>
          ))}
        </div>
      </nav>

      {/* Beta Pages */}
      <div className="px-4 mt-2 mb-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Tính năng thử nghiệm
        </div>
        <div className="space-y-1">
          {betaPages.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              disabled
              variant="ghost"
              className="w-full justify-start h-12 px-4 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              asChild
            >
              <span>
                <Icon className="mr-3 h-5 w-5" />
                {label}
              </span>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Footer */}
      <div className="p-4 space-y-3">
        {user ? (
          <>
            <Button variant="ghost" className="w-full justify-start h-auto p-3" asChild>
              <Link to="/profile" onClick={onNavigate}>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatar.png" alt={user.username || 'User'} />
                    <AvatarFallback className="bg-pink-100 text-pink-700 text-sm font-semibold">
                      {getUserInitials(user)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start min-w-0">
                    <span className="text-sm font-medium truncate max-w-[160px]">
                      {user.username ? `@${user.username}` : user.email.split('@')[0]}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {user.is_verified && (
                        <Badge
                          variant="secondary"
                          className="bg-green-600 hover:bg-green-600 text-white px-1.5 py-0 text-[10px] h-5"
                        >
                          <BadgeCheck className="w-3 h-3 mr-1" />
                          Đã xác thực
                        </Badge>
                      )}
                      {user?.id === '0fd2189f-1873-42bb-b2c8-6443772d12e3' && (
                        <Badge className="text-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white h-5 px-2">
                          Admin
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
              onClick={logout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Đăng xuất
            </Button>
          </>
        ) : (
          <div className="space-y-2">
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700" asChild>
              <Link to="/login" onClick={onNavigate}>
                Đăng nhập
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/register" onClick={onNavigate}>
                Đăng ký
              </Link>
            </Button>
          </div>
        )}

        {/* Theme Toggle */}
        <Button variant="outline" className="w-full justify-start mt-2" onClick={toggleTheme}>
          {isDarkMode ? (
            <>
              <Sun className="mr-3 h-4 w-4" />
              Chế độ sáng
            </>
          ) : (
            <>
              <Moon className="mr-3 h-4 w-4" />
              Chế độ tối
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  // Không hiển thị sidebar trên trang đăng nhập và đăng ký
  if (['/login', '/register', '/verify-email', '/reset-password'].includes(location.pathname)) {
    return null;
  }

  // Function để đóng sidebar trên mobile
  const handleMobileNavigate = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-background border-r sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent onNavigate={handleMobileNavigate} />
        </SheetContent>
      </Sheet>
    </>
  );
};

interface TopBarProps {
  toggleSidebar: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  const location = useLocation();

  // Không hiển thị topbar trên trang đăng nhập và đăng ký
  if (['/login', '/register', '/verify-email', '/reset-password'].includes(location.pathname)) {
    return null;
  }

  return (
    <header className="lg:hidden bg-background/80 backdrop-blur-lg border-b sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
        </Sheet>
        
        <Link 
          to="/" 
          className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
        >
          CaptionKanade
        </Link>
        
        <div className="w-10"></div>
      </div>
    </header>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-sky-100 to-indigo-500 dark:from-blue-900 dark:via-purple-900 dark:to-green-300 transition-all duration-300">
      <div className="flex h-screen">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col lg:ml-0 overflow-hidden">
          <TopBar toggleSidebar={toggleSidebar} />
          
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
const App: React.FC = () => {
  useEffect(() => {
    console.log(
      '%cChờ chút nha...',
      'color: #ec4899; font-size: 42px; font-weight: bold;'
    );
    console.log(
      '%cMuốn dùng API CaptionKanade? Inbox admin trên Discord nhé!\n→ https://discord.chisadin.site',
      'color: #000; font-size: 16px; font-weight: 600; background: #fce7f3; padding: 8px 12px; border-radius: 6px;'
    );
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CaptionProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#f3f4f6',
                borderRadius: '10px',
                border: '1px solid #374151',
              },
            }}
          />

          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route path="/" element={<HomePage />} />
              <Route path="/builder" element={<CaptionBuilder />} />
              <Route path="/library" element={<CaptionLibrary />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/profile" element={<UserPage />} />

              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />

              {/* 404 hoặc redirect nếu muốn */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Layout>
        </CaptionProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
