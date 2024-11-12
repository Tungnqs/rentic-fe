import { useState } from "react";
import { BankIcon, LeaveIcon, SquareCloseIcon } from "../../assets/icon/icon";
import { INavbarItems } from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../store/slices/auth.slice";
import { formatMoney } from "../../store/slices/app.slice";

interface ICollapseSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  menuItems?: INavbarItems[];
  handleLogout: ()=> void;
  isLandLord?: boolean;
}

const CollapseSidebar = ({
  isSidebarOpen,
  toggleSidebar,
  menuItems,
  handleLogout,
  isLandLord
}: ICollapseSidebarProps) => {

  const userProfile = useSelector(selectUserProfile);

  return (
    <div className="z-50">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-80 z-10"
          onClick={toggleSidebar}
        />
      )}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-[330px] border-r-2 max-md:text-[21px] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-labelledby="drawer-navigation-label"
        tabIndex={-1}
      >
        <div
          id="drawer-navigation-label"
          className="text-center font-semibold text-secondaryYellow uppercase text-[35px]"
        >
          Menu
        </div>
        <button
          type="button"
          onClick={toggleSidebar}
          aria-controls="drawer-navigation"
          className="text-darkGray bg-transparent rounded-lg text-sm w-[50px] absolute top-3 right-3 inline-flex items-center justify-center"
        >
          <SquareCloseIcon className="w-full" />
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <div className="p-2"><span className="font-semibold">User:</span> {userProfile.username}</div>
          {isLandLord && <div className="p-2 pb-4 border-b-2 border-thirdYellow"><span className="font-semibold">Balance:</span> {formatMoney(userProfile.balance as number)} VND</div>}
          {isLandLord && <Link onClick={toggleSidebar} to={"/deposit"} className="p-2 pt-4 flex gap-3"><BankIcon className="w-[24px] text-secondaryYellow"/><div>Deposit</div></Link>}
          <ul className="space-y-2 font-medium">
            {menuItems &&
              menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    onClick={toggleSidebar}
                    to={item.path as string}
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                  >
                    <div className="w-[24px] text-secondaryYellow">{item.icon}</div>
                    <span className="ml-3">{item.title}</span>
                  </Link>
                </li>
              ))}
            <li>
              <div onClick={handleLogout} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer text-red-500">
                <LeaveIcon className="w-[24px]" />
                <span className="ml-3 whitespace-nowrap">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CollapseSidebar;
