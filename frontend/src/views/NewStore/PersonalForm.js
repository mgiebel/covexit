import React from 'react';
import Fields from '../../components/Fields/Fields';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';


const PersonalForm = ({ person, onChange }) => {
  const [_] = useTranslation();
  const emitOnChange = (event) => {
    return onChange({ [event.target.name]: event.target.value })
  };
  return (
    <Form
      head={<>
        <h1>{_('Welcome!')}</h1>
        <p>{_(`You’ve made a great decision to register to Covexit.
          We’ll help you in the process of getting ready online.`)}</p>
      </>}
      body={<>
        <Fields.TextInput onChange={emitOnChange} placeholder={_('Name')} name="name" value={person.name}/>
        <Fields.TextInput onChange={emitOnChange} placeholder={_('Surname')} name="surname" value={person.surname}/>
        <Fields.TextInput onChange={emitOnChange} placeholder={_('Address')} name="address" value={person.address}/>
        <Fields.TextInput onChange={emitOnChange} placeholder={_('Zip and City')} name="zipcity" value={person.zipcity}/>
        <Fields.TextInput onChange={emitOnChange} placeholder={_('E-mail')} name="email" value={person.email}/>
        <Fields.TextInput onChange={emitOnChange} placeholder={_('Phone number')} name="phone" value={person.phone}/>
      </>}
      footer={<Button label={_('Next')} to={`/stores/new/business`}/>}
    />
  );
}

export default PersonalForm;
