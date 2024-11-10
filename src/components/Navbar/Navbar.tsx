import React, { useEffect, useMemo, useState } from "react";
import * as S from "./Navbar.styled";
import Logo from "./../../assets/images/rentic-logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authLogout,
  selectIsLogin,
  selectUserProfile,
} from "../../store/slices/auth.slice";
import { AppDispatch } from "../../store";
import AnonymousAvatar from "../../assets/images/anonymous-avatar.png";
import { BellIcon, CloseIcon, MenuIcon } from "../../assets/icon/icon";
import CollapseSidebar from "../CollapseSidebar/CollapseSidebar";
import {
  createPaymentLink,
  IDataForCreatePaymentLink,
} from "../../store/slices/payment.slice";
import { formatMoney } from "../../store/slices/app.slice";
import { getAllNotifications, INotificationItem, readNotification, selectAllNotification, selectNotificationCount, selectNotificationLoading } from "../../store/slices/notification.slice";
import { formatDate } from "../../pages/Moderator/Report/ReportList";

export interface INavbarItems {
  title: string;
  path?: string;
  popup?: React.JSX.Element;
  icon?: React.JSX.Element;
}

interface INavbarItemsProps {
  navbarItems?: INavbarItems[];
}

const Navbar = ({ navbarItems }: INavbarItemsProps) => {
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    dispatch(getAllNotifications())
  }, [])

  const notifications = useSelector(selectAllNotification);
  const notificationLoading = useSelector(selectNotificationLoading);
  const notificationCount = useSelector(selectNotificationCount);

  const handleReadNotification = (notificationId: string)=>{
    dispatch(readNotification(notificationId));
  }

  const handleReadAllNotifications = ()=>{
    notifications.forEach((item)=>{
      if(item.isRead === false){
        handleReadNotification(item.id);
      }
    })
  }

  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);

  const avatar = useMemo(() => {
    if (userProfile.avatar) {
      return userProfile.avatar;
    }
    return AnonymousAvatar;
  }, [userProfile.avatar]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    await dispatch(authLogout({}));
    setIsSidebarOpen(false);
    navigate("/login");
  };

  const hasManyNavItems = useMemo(()=>{
    return navbarItems && navbarItems?.length >= 4;
  }, [navbarItems])

  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const toggleNotification = () =>{
    setIsOpenNotification(!isOpenNotification);
  }

  return (
    <S.Layout>
      <CollapseSidebar
        handleLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={navbarItems}
      />
      <S.Container>
        <div className="flex items-center gap-3">
          <div className={`flex ${hasManyNavItems ? "gap-3" : "max-md:gap-3"}`}>
            {isLogin && (
              <div className={`${hasManyNavItems ? "" : "max-md:block hidden"} text-secondaryYellow border-[3px]cursor-pointer flex items-center cursor-pointer`}>
                <MenuIcon
                  onClick={toggleSidebar}
                  className={`${hasManyNavItems ? "w-[45px]" : "max-md:w-[45px] max-md:block hidden"}`}
                />
              </div>
            )}
            <S.LogoGroup
              onClick={() => {
                navigate("/");
              }}
            >
              <S.Logo src={Logo} />
              <div className="max-sm:hidden"><S.LeftItem>Rentic</S.LeftItem></div>
            </S.LogoGroup>
          </div>
          <div className="flex items-center gap-3 max-md:hidden">
            {!hasManyNavItems && navbarItems &&
              navbarItems.map((navbarItem, index) => (
                <NavLink
                  to={navbarItem.path as string}
                  key={index}
                  className="hover:underline cursor-pointer"
                >
                  {navbarItem.title}
                </NavLink>
              ))}
          </div>
        </div>
        <S.RightNavbar>
          {isLogin && (
              <>
                <div className="relative select-none">
                  <div className="absolute right-[-4px] top-[-2px] bg-red-600 text-white text-[11px] min-w-5 w-fit aspect-square flex justify-center items-center rounded-full">{notificationCount}</div>
                  <div onClick={toggleNotification} className="w-fit bg-primaryYellow text-white p-2 rounded-full cursor-pointer hover:bg-yellow-500">
                    <BellIcon className="w-6" /> 
                  </div>
                  {isOpenNotification &&(<div className="absolute shadow-md bottom-[-420px] left-[-360px] max-md:left-[-194px] max-sm:left-[-151px] max-lg:left-[-300px] border-2 rounded-md w-[400px] max-sm:w-[300px] text-[14px]">
                    <div className="p-4 bg-white text-[20px] font-bold rounded-t-md border-b flex items-center justify-between">
                      <div>Notifications</div>
                      <CloseIcon onClick={toggleNotification} className="w-5 hover:text-yellow-600 cursor-pointer" />
                    </div>
                    <div className="bg-white h-[300px] overflow-y-scroll flex flex-col">
                      {notifications.map((item)=>(
                        <NotificationItem handleReadNotification={handleReadNotification} notificationItem={item} />
                      ))}
                    </div>
                    <div className="rounded-b-md p-4 bg-white border-t "><div onClick={handleReadAllNotifications} className="font-semibold cursor-pointer hover:underline">Mark all as read</div></div>
                  </div>)}
                </div>
              </>
            )
          }
          {isLogin && (
            <>
              <S.Balance>
                <p className="w-fit font-semibold select-none">Balance: <span className="text-yellow-600">{formatMoney(userProfile.balance as number)}₫</span></p>
              </S.Balance>
              <S.SubscribeBtn onClick={()=>navigate("/deposit")}>Deposit</S.SubscribeBtn>
            </>
          )}
          {isLogin ? (
            <div className="flex gap-3 items-center">
              <S.UserAvatar onClick={()=>navigate("/profile")} src={avatar} />
              <div
                onClick={handleLogout}
                className="cursor-pointer hover:underline"
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="flex gap-5 items-center">
              <Link to={"/login"} className="hover:underline cursor-pointer">
                Login
              </Link>
              <Link to={"/register"} className="cursor-pointer px-3 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 transition-colors">
                Sign up
              </Link>
            </div>
          )}
        </S.RightNavbar>
      </S.Container>
    </S.Layout>
  );
};

interface INotificationItemProps{
  notificationItem: INotificationItem;
  handleReadNotification:(notiId: string) => void; 
}

const NotificationItem = ({notificationItem, handleReadNotification}: INotificationItemProps) => {
  return (
    <div>
      <div onClick={()=>handleReadNotification(notificationItem.id)} className="p-2 pl-8 flex flex-col gap-1 relative group hover:bg-yellow-50 cursor-pointer">
        {!notificationItem.isRead && <div className="absolute w-[10px] h-[10px] top-[14px] left-3 bg-yellow-600 rounded-full" />}
        <div className="group-hover:underline"><span className="font-semibold break-words">{notificationItem.type}:</span> {notificationItem.message}</div>
        <div className="text-[12px] text-gray-500">{formatDate(notificationItem.createdAt)}</div>
      </div>
      <div className="border-b ml-8 mr-2"/>
    </div>
  );
};

export default Navbar;
