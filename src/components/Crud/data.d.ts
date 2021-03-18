export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}
 
export interface OrderBy {
  asc: boolean
  column: string
}

export interface Conditions {
  column: string;
  dateFormat: string;
  option: string;
  type: string;
  value: never;
  value2: never;
  valueList: string[];
}

export interface PageInfo {
  conditions?: Conditions;
  orderBy?: OrderBy[];
  query?: string;
  size: number | undefined;
  current: number | undefined;
  template?: TableListItem;
}