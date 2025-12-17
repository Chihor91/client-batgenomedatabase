import * as React from "react";
import { MaterialReactTable } from "material-react-table";

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
