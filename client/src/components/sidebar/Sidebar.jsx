import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  AccountBox,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
          <Link to="/" className="link">         
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
        </Link>
        <Link to="/accounts" className="link">
            <li className="sidebarListItem">
              <AccountBox className="sidebarIcon" />
              Accounts
            </li>
            </Link>
        <Link to="/transactions" className="link">
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Transactions
            </li>
            </Link>
           
          </ul>
         
        </div>
      
       
      </div>
    </div>
  );
}