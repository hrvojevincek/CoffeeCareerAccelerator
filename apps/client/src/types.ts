export type JobData = {
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

export type Inputs = {
  username: string;
  email: string;
  password: string;
  category: string;
};
