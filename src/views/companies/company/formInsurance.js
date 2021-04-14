import React from 'react';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { NavLink as RouterLink } from 'react-router-dom';

const InsurancesForm = ({ idCompany, loadInsurances, insurances }) => {
  const [value, setValue] = React.useState('');
  const [activeBtn, setActiveBtn] = React.useState(false);

  const handleChange = event => {
    setValue(event.target.value);
    setActiveBtn(true);
  };

  return (
    <Box flexDirection="row">
      <Typography>Add Insurance</Typography>
      <FormControl component="div">
        {loadInsurances && (
          <RadioGroup
            row
            aria-label="insurances"
            name="insurances"
            value={value}
            onChange={handleChange}
          >
            {insurances.map(insurance => (
              <FormControlLabel
                key={insurance.id}
                disabled={!insurance.available}
                value={insurance.id.toString()}
                control={<Radio color="primary" />}
                label={insurance.name}
              />
            ))}
          </RadioGroup>
        )}
      </FormControl>
      <Button
        disabled = {!activeBtn}
        color="primary"
        aria-label="add"
        component={RouterLink}
        to={`/app/company/${idCompany}/insurance`}
      >
        <AddIcon />
        Add Insurance
      </Button>
    </Box>
  );
};

export default InsurancesForm;
