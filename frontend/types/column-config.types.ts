// types/column-config.types.ts
export type ColumnConfig<T> = {
  header: string;
  render: (row: T) => React.ReactNode;
};
