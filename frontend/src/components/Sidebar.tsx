import React, { useState } from 'react';
import { BsArrowLeftShort, BsSearch } from 'react-icons/bs';
import { MdReport } from 'react-icons/md';
import { AiFillEnvironment } from 'react-icons/ai';
import { RiDashboardFill, RiGuideFill } from 'react-icons/ri';
import { GiMoneyStack } from 'react-icons/gi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  title: string;
  spacing?: boolean;
}

function Sidebar() {
  const { t } = useTranslation('translation');
  const [open, setOpen] = useState(true);

  const Menus: MenuItem[] = [
    { title: 'Incident Report' },
    { title: 'Res Guides' },
    { title: 'Food Share', spacing: true },
    { title: 'User' },
  ];

  return (
    <div className="flex h-full ">
      <div className={`bg-black h-screen p-5 pt-8 ${open ? 'w-72' : 'w-20'} duration-300 relative`}>
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <AiFillEnvironment
            className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && 'rotate-[360deg]'}`}
          />
          <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && 'scale-0'}`}>ResQReach</h1>
        </div>
        <ul>
          <>
            <NavLink to="/viewallincidents" className="text-black-300">
              <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-10 `}>
                <span className="text-2xl block float-left">
                  <MdReport />
                </span>
                <span className={`text-base front-medium flex-1 duration-200 ${!open && 'hidden'}`}>{t('report.label')}</span>
              </li>
            </NavLink>
          </>
        </ul>

        <ul>
          <>
            <Link to="/guidePreview">
              <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-10 `}>
                <span className="text-2xl block float-left">
                  <RiGuideFill />
                </span>
                <span className={`text-base front-medium flex-1 duration-200 ${!open && 'hidden'}`}>{t('guide.label')}</span>
              </li>
            </Link>
          </>
        </ul>

        <ul>
          <>
            <Link to="/foodshare">
              <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-10 `}>
                <span className="text-2xl block float-left">
                  <IoFastFoodOutline />
                </span>
                <span className={`text-base front-medium flex-1 duration-200 ${!open && 'hidden'}`}>{t('share.label')}</span>
              </li>
            </Link>
          </>
        </ul>

        <ul>
          <>
            <Link to="/donation">
              <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-10 `}>
                <span className="text-2xl block float-left">
                  <GiMoneyStack />
                </span>
                <span className={`text-base front-medium flex-1 duration-200 ${!open && 'hidden'}`}>{t('donation.label')}</span>
              </li>
            </Link>
          </>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
