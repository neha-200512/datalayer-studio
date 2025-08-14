export interface Dataset {
  id: string;
  name: string;
  theme: string;
  access: string;
  versions: string[];
  desc: string;
  variables: string[];
  quick: {
    records: string;
    updated: string;
  };
}

export const DATASETS: Dataset[] = [
  {
    id: "plfs",
    name: "Periodic Labour Force Survey (PLFS)",
    theme: "labour",
    access: "public",
    versions: ["2021_q4", "2022_q3", "2023_q1"],
    desc: "Unit-level labour force indicators across India.",
    variables: [
      "state",
      "gender", 
      "age",
      "employment_status",
      "sector",
      "wage_monthly",
    ],
    quick: { records: "5,200,000", updated: "2024-12-31" },
  },
  {
    id: "hces",
    name: "Household Consumer Expenditure Survey (HCES)",
    theme: "consumption",
    access: "premium",
    versions: ["2018", "2022"],
    desc: "Household consumption and expenditure patterns.",
    variables: ["state", "sector", "mpce", "education", "household_size"],
    quick: { records: "1,800,000", updated: "2023-06-10" },
  },
  {
    id: "nss75",
    name: "NSS 75th Round – Health",
    theme: "consumption",
    access: "public",
    versions: ["2019"],
    desc: "Health and morbidity data from NSS.",
    variables: ["state", "age", "gender", "ailment", "treatment_type"],
    quick: { records: "750,000", updated: "2020-03-01" },
  },
  {
    id: "census2011",
    name: "Census 2011 Microdata",
    theme: "demographics",
    access: "premium",
    versions: ["2011"],
    desc: "Detailed demographic and socio-economic data from Census 2011.",
    variables: ["state", "district", "age", "gender", "education", "occupation"],
    quick: { records: "12,000,000", updated: "2012-06-15" },
  },
  {
    id: "aidis",
    name: "All India Debt and Investment Survey (AIDIS)",
    theme: "finance",
    access: "public",
    versions: ["2019_jan", "2019_dec"],
    desc: "Household debt and investment patterns across India.",
    variables: ["state", "sector", "debt_amount", "investment_type", "income"],
    quick: { records: "1,100,000", updated: "2020-08-20" },
  },
  {
    id: "shg",
    name: "Self Help Group (SHG) Survey",
    theme: "finance", 
    access: "public",
    versions: ["2020", "2021", "2022"],
    desc: "Self-help group membership and financial inclusion data.",
    variables: ["state", "gender", "age", "group_type", "savings_amount"],
    quick: { records: "890,000", updated: "2023-03-12" },
  },
];

export interface APIKey {
  label: string;
  key: string;
  role: string;
}

export const generateRandomKey = (): string => {
  return (
    "sk_" +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10)
  );
};

export const STATES = [
  "Maharashtra",
  "Delhi", 
  "Tamil Nadu",
  "West Bengal",
  "Gujarat",
  "Rajasthan",
  "Karnataka",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Andhra Pradesh",
];

export const EMPLOYMENT_STATUS_OPTIONS = [
  "Employed",
  "Unemployed", 
  "Out of labour force",
];

export const SECTOR_OPTIONS = [
  "Rural",
  "Urban",
];

export const EDUCATION_OPTIONS = [
  "Primary",
  "Secondary", 
  "Tertiary",
];