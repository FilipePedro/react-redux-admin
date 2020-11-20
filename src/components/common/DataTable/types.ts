import { SyntheticEvent } from 'react';
import { IUser } from '../../../types';

interface IHeadCells {
  id?: string;
  numeric?: boolean;
  avatar?: boolean;
  disablePadding?: boolean;
  label?: string;
}

export interface EnhancedTableProps {
  rows: IUser[],
  headerCells: IHeadCells[],
  deleteAction: (selected: number[]) => void,
  loading: boolean
}

export interface DataTableToolbarProps {
  selected: number[]
  deleteAction: (selected: number[]) => void
  resetSelected: () => void
}

export interface DataTableHeadProps {
  classes: Record<"table" | "root" | "paper" | "visuallyHidden" | "avatar" | "loadingCell", string>
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: 'asc' | 'desc' | undefined | false,
  orderBy: string
  numSelected: number
  rowCount: number
  onRequestSort: (event: SyntheticEvent, property: string) => void
  headCells: any[],
}

export type direction = 'asc' | 'desc'

export type directionProps = 'asc' | 'desc' | undefined | false
