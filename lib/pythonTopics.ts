export type TopicLink = {
  label: string;
  description?: string;
  href: string;
};

export const pythonDataframeLessons: TopicLink[] = [
  {
    label: "DataFrames 101 roadmap",
    description: "The skill map and page sequence for dataframe interview prep.",
    href: "/topics/python-programming/dataframes",
  },
  {
    label: "Creating DataFrames",
    description: "Build dataframes from lists, records, and row dictionaries.",
    href: "/topics/python-programming/dataframes/creating-dataframes",
  },
  {
    label: "Inspection basics",
    description: "Read shape, dtypes, and head() output quickly and accurately.",
    href: "/topics/python-programming/dataframes/inspection-basics",
  },
  {
    label: "Selecting and filtering",
    description: "Use masks, column slices, and loc/iloc under interview pressure.",
    href: "/topics/python-programming/dataframes/selecting-and-filtering",
  },
];
