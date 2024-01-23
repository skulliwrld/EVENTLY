import { FaAddressBook, FaHome, FaProjectDiagram } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

export const NavItems=[
    {
        title:'Home',
        link:"/",
        icons:<FaHome />
    },
    {
        title:'Create Events',
        link:"/create-events",
        icons:<FaPeopleGroup />
    },
    {
        title:'Profile',
        link:"events/profile",
        icons:<FaProjectDiagram />
    },
]