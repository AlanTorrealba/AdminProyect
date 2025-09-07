import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

import useSidebarStore from "../context/sideBarExpanden";

export function AsideBar({ children }) {
  const expanded = useSidebarStore((state) => state.expanded);
  const toggleExpanded = useSidebarStore((state) => state.toggleExpanded);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] bg-sky-700">
        <div className="p-4 pb-2 flex justify-end items-center">
          {/* <img
            src="/leon2.jpg"
            className={`overflow-hidden transition-all  ${
              expanded ? "w-20" : "w-0"
            }`}
            alt=""
          /> */}
          <button
            onClick={toggleExpanded}
            className="p-1.5 rounded-lg bg-sky-500 hover:bg-white"
          >
            {expanded ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        <ul className="flex-1 px-3">{children}</ul>

        <div className="border-t flex p-3">
          <img src="/leon.jpg" alt="" className="w-10 h-10 rounded-md" />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Antt</h4>
              <span className="text-xs text-white">
                antorrealbatapia@gmail.com
              </span>
            </div>
            {/* <BeakerIcon size={20} />  */}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const expanded = useSidebarStore((state) => state.expanded);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-gray-950 text-gray-200"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-36 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
