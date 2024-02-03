import { DividerVerticalIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Sidebar from "@/components/component/sidebar/sidebar";
import useScreenSize from "@/lib/hooks/use-screensize";
import React from "react";

interface SidebarContainerProps {
  loggedIn: boolean;
  userId: string;
  sidebarOpen: boolean;
  isHovered: boolean;
  setSidebarOpen: (open: boolean) => void;
  setIsHovered: (hovered: boolean) => void;
}

const SidebarContainer = ({
  loggedIn,
  userId,
  sidebarOpen,
  setSidebarOpen,
  isHovered,
  setIsHovered,
}: SidebarContainerProps) => {
  const isLargeScreen = useScreenSize();

  const sidebarVariants = {
    open: {
      width: "auto",
      opacity: 1,
      transition: { duration: 0.3, opacity: { duration: 0.1 } },
    },
    closed: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.3, opacity: { duration: 0.1 } },
    },
  };

  return (
    <>
      <motion.div
        className={sidebarOpen ? "pointer-events-auto" : "pointer-events-none"}
        variants={sidebarVariants}
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
      >
        <div
          className={`flex h-screen ${
            isHovered ? "bg-[black] opacity-50 transition duration-300" : ""
          }`}
        >
          <Sidebar userId={userId} loggedIn={loggedIn} />
        </div>
      </motion.div>
      <div className="relative" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {isLargeScreen && (
          <div
            className="hover:none absolute top-1/2 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <DividerVerticalIcon
              className="h-8 w-8"
              style={{ color: "A1A1AA" }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SidebarContainer;
