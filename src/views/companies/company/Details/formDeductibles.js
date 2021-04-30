import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, getThemePaletteMode } from '@material-ui/data-grid';
import Switch from '@material-ui/core/Switch';

function renderRating(params) {
  const [ saving, setSaving ] = React.useState(Boolean(params.row.is_saving));

  /*
  async function isSaving() {
      
  }
  */

  return (
    <Switch
      onChange={() => {
        setSaving(Boolean(!saving))
      }}
      checked={saving}
      name={params.row.id}
    />
  );
}

const useStyles = makeStyles(theme => {
  const backgroundColor =
    getThemePaletteMode(theme.palette) === 'dark'
      ? '#376331'
      : theme.palette.primary;
  return {
    root: {
      '& .MuiDataGrid-cellEditable': {
        backgroundColor
      }
    }
  };
});

const FormDeductibles = ({ deductibles }) => {
  const classes = useStyles();
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        hideFooterPagination={'false'}
        className={classes.root}
        rows={deductibles}
        columns={columns}
      />
    </div>
  );
};

export default FormDeductibles;

const columns = [
  {
    field: 'option',
    headerName: 'Deductible',
    type: 'number',
    editable: true,
    width: 220
  },
  {
    field: 'applicable',
    headerName: 'Savings (%)',
    type: 'number',
    editable: true,
    width: 220
  },
  { field: 'id', headerName: 'Delete', editable: true, width: 220 },
  {
    field: 'is_saving',
    headerName: 'Saving',
    editable: true,
    width: 220,
    renderCell: renderRating
  }
];
