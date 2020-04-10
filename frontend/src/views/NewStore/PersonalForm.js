import React from 'react';
import Fields from '../../components/Fields/Fields';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';


const PersonalForm = ({ person, onChange }) => {
  const [t] = useTranslation('new-store-owner');
  const emitOnChange = (event) => {
    return onChange({ [event.target.name]: event.target.value })
  };
  return (
    <Form
      head={<>
        <h1>{t('head')}</h1>
        <p>{t('text')}</p>
      </>}
      body={<>
        <Fields.TextInput onChange={emitOnChange} placeholder={t('name')} name="name" value={person.name}/>
        <Fields.TextInput onChange={emitOnChange} placeholder={t('surname')} name="surname" value={person.surname}/>
        <Fields.TextInput onChange={emitOnChange} placeholder={t('address')} name="address" value={person.address}/>
        <Fields.TextInput onChange={emitOnChange} placeholder={t('zipAndCity')} name="zipcity" value={person.zipcity}/>
        <Fields.TextInput onChange={emitOnChange} placeholder={t('email')} name="email" value={person.email}/>
        <Fields.TextInput onChange={emitOnChange} placeholder={t('phoneNumber')} name="phone" value={person.phone}/>
      </>}
      footer={<Button label={t('Next')} to={`/stores/new/business`}/>}
    />
  );
}

export default PersonalForm;
