import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import {
    TruckIcon,
    PowerIcon,
    HomeIcon,
    CreditCardIcon,
    KeyIcon,
    DocumentIcon
  } from "@heroicons/react/24/solid";
  import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

   
  export default function DefaultSidebar() {

    const handleLogout = () => {
      Cookies.remove('adminToken');
    }

    return (
      <Card className="w-full md:max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-blue-gray-50">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Vehicle Website
          </Typography>
        </div>
        {/* Content container */}
        <div className="p-4 flex gap-2 items-center">
          {/* Avatar icon */}
          <img
            src="https://docs.material-tailwind.com/img/face-1.jpg"
            alt="avatar"
            className="rounded-full h-8 w-8 mb-2 object-cover object-center"
          />

          {/* Page title */}
          <div className="text-lg font-bold text-center">Admin</div>
        </div>
        <List>
          <Link to={'/dashboard'}>
            <ListItem>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
          <Link to={'/manage-cars'}>
            <ListItem>
              <ListItemPrefix>
                <TruckIcon className="h-5 w-5" />
              </ListItemPrefix>
              Manage Cars
            </ListItem>
          </Link>
          <Link to={'/manage-blogs'}>
            <ListItem>
              <ListItemPrefix>
                <DocumentIcon className="h-5 w-5" />
              </ListItemPrefix>
              Manage Blogs
            </ListItem>
          </Link>
          <Link to={'/orders'}>
            <ListItem>
              <ListItemPrefix>
                <CreditCardIcon className="h-5 w-5" />
              </ListItemPrefix>
              View Orders
            </ListItem>
          </Link>
          <Link to={'/credentials'}>
            <ListItem>
              <ListItemPrefix>
                <KeyIcon className="h-5 w-5" />
              </ListItemPrefix>
              Credentials
            </ListItem>
          </Link>
          
          <Link onClick={handleLogout} to={'/'}>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </Link>
        </List>
      </Card>
    );
  }