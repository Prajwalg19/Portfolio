"use client"; // i am adding this because the next js treats all folder in the root directory as server components but the framer motion needs react hooks which are not available in server components
import { motion } from "framer-motion";
import { links } from "@/library/data";
import Link from "next/link";
import { ContextData } from "@/context/activeContext";

export default function Header() {
    const { activeState, setActiveState, setTheTime } = ContextData(); // gets the value of the context data without usage of the useContext hook

    return (
        <motion.header
            className="dark:bg-gray-950 dark:text-gray-50 bg-opacity-80 backdrop-blur-[0.5rem] shadow-lg fixed left-1/2 sm:top-[2rem]  text-sm top-0 sm:w-[40rem] bg-white w-full sm:rounded-full z-[100] dark:bg-opacity-70"
            initial={{ y: -110, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
        >
            <ul className="flex flex-wrap items-center sm:justify-between justify-center w-full h-auto px-1 py-1 font-semibold transition-all box-border">
                {links.map((item) => (
                    <Link
                        key={item.hash}
                        href={item.hash}
                        onClick={() => {
                            setActiveState(item.hash);
                            setTheTime(Date.now()); // this will set current time in terms of milliseconds and if from the point of click to the destination section takes more than 1 second (1000) then we assign the section using the setActiveState. For example look at the about.tsx ,there we not
                            // only check if the inView true but also check if the time from click to the destination has taken more than 1 second
                        }}
                    >
                        <motion.li className={`dark:hover:text-gray-100  box-border text-gray-500 dark:text-gray-400  px-3 py-2 rounded-full hover:text-gray-900 transition ${activeState == item.hash && "!bg-slate-200 dark:!bg-gray-800 dark:!text-gray-100 !text-gray-900"}`}>{item.name}</motion.li>
                    </Link>
                ))}
            </ul>
        </motion.header>
    );
}
