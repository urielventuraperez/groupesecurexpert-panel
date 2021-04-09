import React, {useState, useEffect} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { API, LSTOKEN } from 'src/utils/environmets';

const RadioInsurances = ( {idCompany} ) => {

    const [insurances, setInsurances] = useState([]);
    const [loadInsurances, setLoadInsurances] = useState(false);  
  
    useEffect(() => {
        getInsurances(idCompany);
    }, []);
    
    async function getInsurances(idCompany) {
    let response = await fetch(`${API}/api/company/${idCompany}/insurances`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      }
    });
    if (response.status) {
      let getInsurances = await response.json();
      setLoadInsurances(true);
      setInsurances(getInsurances.data);
    }
    }
    
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
        <FormLabel component="legend">Insurances</FormLabel>
          { loadInsurances &&
          (
            <RadioGroup aria-label="insurances" name="gender1" value={value} onChange={handleChange}>
                {
                    insurances.map( insurance => (
                        <FormControlLabel key={insurance.id} disabled={!insurance.available} value={insurance.id} control={<Radio />} label={insurance.name} />
                    ))
                }
            </RadioGroup>
          )
          }
    </FormControl>
  );
}

export default RadioInsurances;