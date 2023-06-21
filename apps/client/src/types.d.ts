type JobData = {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  employerId: number;
  posted: boolean;
  employer: {
    name: string;
  };
};

type Inputs = {
  username: string;
  email: string;
  password: string;
  category: string;
};

type LoggedInProp = {
  isLoggedIn?: boolean | undefined;
  setisLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
};
