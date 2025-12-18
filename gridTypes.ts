export type RowType = 'LTP' | 'STATUS' | 'DOC';

export interface GridRow {
  id: string;
  parentId?: string;
  type: RowType;
  name: string;
  ltpStatus?: string;
  docStatus?: string;
  action?: string;
  level: number;
  expanded?: boolean;
}

data.ts

import { GridRow } from './gridTypes';

export const ROW_DATA: GridRow[] = [
  {
    id: 'ltp-1',
    type: 'LTP',
    name: 'Account Master Central (AMC)',
    level: 0,
    expanded: true,
  },
  {
    id: 'status-1',
    parentId: 'ltp-1',
    type: 'STATUS',
    name: 'APPROVED_BY_CHECKER',
    level: 1,
    expanded: true,
  },
  {
    id: 'doc-1',
    parentId: 'status-1',
    type: 'DOC',
    name: 'Support_Doc.xlsx',
    docStatus: 'REJECTED_BY_CHECKER',
    action: 'Checker Rejected',
    level: 2,
  },
  {
    id: 'doc-2',
    parentId: 'status-1',
    type: 'DOC',
    name: 'AMC Doc1.pdf',
    docStatus: 'APPROVED_BY_CHECKER',
    action: 'Checker Approved',
    level: 2,
  },

  {
    id: 'status-2',
    parentId: 'ltp-1',
    type: 'STATUS',
    name: 'SUBMITTED_TO_CHECKER',
    level: 1,
    expanded: false,
  },
  {
    id: 'doc-3',
    parentId: 'status-2',
    type: 'DOC',
    name: 'Support_Doc.xlsx',
    docStatus: 'SUBMITTED_TO_CHECKER',
    action: 'Document Submitted',
    level: 2,
  },
];

TreeCellRenderer.tsx
import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { GridRow } from './gridTypes';

const TreeCellRenderer: React.FC<ICellRendererParams<GridRow>> = (props) => {
  const { data, api } = props;
  if (!data) return null;

  const paddingLeft = data.level * 24;

  const toggleExpand = () => {
    data.expanded = !data.expanded;
    api.refreshCells({ force: true });
  };

  const showArrow = data.type === 'LTP' || data.type === 'STATUS';

  return (
    <div style={{ paddingLeft, display: 'flex', alignItems: 'center' }}>
      {showArrow && (
        <span
          onClick={toggleExpand}
          style={{
            cursor: 'pointer',
            width: 16,
            display: 'inline-block',
          }}
        >
          {data.expanded ? '▼' : '▶'}
        </span>
      )}

      <span style={{ fontWeight: data.type === 'LTP' ? 600 : 400 }}>
        {data.name}
      </span>
    </div>
  );
};

export default TreeCellRenderer;


App.tsx

import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { GridRow } from './gridTypes';
import { ROW_DATA } from './data';
import TreeCellRenderer from './TreeCellRenderer';

const App: React.FC = () => {
  const [rowData, setRowData] = useState<GridRow[]>(ROW_DATA);

  const getVisibleRows = (rows: GridRow[]) => {
    const map = new Map<string, GridRow>();
    rows.forEach((r) => map.set(r.id, r));

    return rows.filter((row) => {
      let parent = row.parentId ? map.get(row.parentId) : null;
      while (parent) {
        if (!parent.expanded) return false;
        parent = parent.parentId ? map.get(parent.parentId) : null;
      }
      return true;
    });
  };

  const columnDefs = useMemo<ColDef<GridRow>[]>(() => [
    {
      headerName: 'LTP Name',
      field: 'name',
      cellRenderer: TreeCellRenderer,
      flex: 2,
    },
    {
      headerName: 'LTP Status',
      field: 'ltpStatus',
      flex: 1,
      valueGetter: (p) =>
        p.data?.type === 'STATUS' ? p.data.name : '',
    },
    {
      headerName: 'Document Name',
      field: 'name',
      flex: 1,
      valueGetter: (p) =>
        p.data?.type === 'DOC' ? p.data.name : '',
    },
    {
      headerName: 'Document Status',
      field: 'docStatus',
      flex: 1,
    },
    {
      headerName: 'Action',
      field: 'action',
      flex: 1,
    },
  ], []);

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <AgGridReact<GridRow>
        rowData={getVisibleRows(rowData)}
        columnDefs={columnDefs}
        suppressRowClickSelection
        rowHeight={44}
        headerHeight={40}
      />
    </div>
  );
};

export default App;
