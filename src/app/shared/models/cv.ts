export interface CV {
    id: number;
    name: string;
    personalInformation: {
      fullName: string;
      cityName?: string;
      email: string;
      mobileNumber: string;
    };
    experienceInformation: {
      companyName: string;
      city?: string;
      companyField?: string;
    };
  }