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

declare function useNavigate(): NavigateFunction;

interface NavigateFunction {
  (
    to: To,
    options?: {
      replace?: boolean;
      state?: any;
      relative?: RelativeRoutingType;
    }
  ): void;
  (delta: number): void;
}

interface UserProviderProps {
  children: ReactNode;
}

type User = {
  username: string;
  category: string;
  id: number | undefined;
};

type UserProfile = {
  firstName: string;
  surname: string;
  city: string;
  email: string;
  bio: string;
};

type UserExp = {
  jobtitle: string;
  company: string;
  dates: string;
  description: string;
};

type UserData = {
  bio: string;
  category: string;
  applications: Application[];
  city: string;
  email: string;
  experience: Experience[];
  id: number;
  name: string;
  surname: string;
  username: string;
};

type Application = {
  jobId: number;
  userId: number;
  hired: boolean;
};

type Experience = {
  userId: number;
  jobtitle: string;
  company: string;
  dates: string;
  description: string;
};
