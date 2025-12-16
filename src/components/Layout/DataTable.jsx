import * as React from "react";
import { MaterialReactTable } from "material-react-table";

/**
 * DataTable - A reusable wrapper for MaterialReactTable
 *
 * Provides pre-configured defaults for consistent table styling across the app.
 *
 * @param {Object} props
 * @param {Array} props.columns - Column definitions for MaterialReactTable
 * @param {Array} props.data - Array of row data
 * @param {string} [props.globalFilter] - Global search filter string
 * @param {Array} [props.columnFilters] - Array of {id, value} for column filtering
 * @param {Object} [props.muiTablePaperProps] - Override paper styling
 * @param {Object} [props.initialState] - Override initial state
 */
export default function DataTable({
  columns,
  data,
  globalFilter,
  columnFilters = [],
  muiTablePaperProps,
  initialState,
}) {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnActions={false}
      enableColumnFilters={false}
      enableTopToolbar={false}
      enableBottomToolbar={true}
      enableSorting={true}
      enablePagination={true}
      layoutMode="fixed"
      state={{
        globalFilter: globalFilter || undefined,
        columnFilters,
      }}
      initialState={{
        pagination: { pageSize: 10, pageIndex: 0 },
        density: "comfortable",
        ...initialState,
      }}
      muiTablePaperProps={{
        elevation: 0,
        sx: { boxShadow: "none", width: "100%" },
        ...muiTablePaperProps,
      }}
    />
  );
}
