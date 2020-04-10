import Fields from '../../components/Fields/Fields';
import PlacesSuggest from '../../components/PlacesSuggest/PlacesSuggest';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';


const getItemFromAddress = (wantedType, haystack) => {
  const needle = haystack.find(item => item.types.some(type => type === wantedType))
  return needle ? needle.long_name : '';
};

const BusinessForm = ({ location, business, onChange }) => {
  const [t] = useTranslation('new-store-business');
  const state = !location.state ? 'init' :
    location.state.useGoogle ? 'google' : 'manual';

  const emitOnChange = (event) => {
    if (event.target)
      return onChange({ [event.target.name]: event.target.value })

    if (event === false)
      return onChange(false);

    // data from places API
    const newData = {
      website: event.website,
      name: event.structured_formatting && event.structured_formatting.main_text,
      phone: event.formatted_phone_number,
      address: getItemFromAddress('route', event.address_components) + ' ' +
        getItemFromAddress('street_number', event.address_components),
      zipcity: getItemFromAddress('postal_code', event.address_components) + ' ' +
        getItemFromAddress('locality', event.address_components),
      mapsPlaceObject: event,
    };
    return onChange(newData);
  };

  const fields = <>
    <Fields.TextInput onChange={emitOnChange} placeholder={t('name')} name="name" value={business.name}/>
    <Fields.TextInput onChange={emitOnChange} placeholder={t('address')} name="address" value={business.address}/>
    <Fields.TextInput onChange={emitOnChange} placeholder={t('zipAndCity')} name="zipcity" value={business.zipcity}/>
    <Fields.TextInput onChange={emitOnChange} placeholder={t('email')} name="email" value={business.email}/>
    <Fields.TextInput onChange={emitOnChange} placeholder={t('phoneNumber')} name="phone" value={business.phone}/>
    <Fields.TextInput onChange={emitOnChange} placeholder={t('website')} name="website" value={business.website}/>
    <Fields.TextArea onChange={emitOnChange} placeholder={t('description')} name="desc" value={business.desc}/>
  </>;

  const formProps = {
    head: {
      init: <><h1>{t('intro.head')}</h1><p>{t('intro.text')}</p></>,
      google: business.mapsPlaceObject ? <><h1>{t('googleConfirm.head')}</h1>
          <p>{t('googleConfirm.text')}</p></>
        : // or
        <><h1>{t('searchGoogle.head')}</h1><p>{t('searchGoogle.text')}</p></>,
      manual: <><h1>{t('manually.head')}</h1><p>{t('manually.text')}</p></>,
    },
    body: {
      google: business.mapsPlaceObject ? fields :
        <PlacesSuggest onSelected={(selected) => emitOnChange(selected)}/>,
      manual: fields,
    },
    footer: {
      init: <div className="Btn-group">
        <Button label={t('intro.button_google')} onClick={() => onChange(false)}
                to={{ pathname: '/stores/new/business', state: { useGoogle: true } }}/>
        <Button label={t('intro.button_manually')} to={{ pathname: '/stores/new/business', state: { useGoogle: false } }} secondary/>
      </div>,
      manual: <Button label={t('manually.continue')} to="/stores/1/onboarding"/>,
      google: <Button label={t('googleConfirm.continue')} to="/stores/1/onboarding"/>,
    },
  };

  return <Form head={formProps.head[state]} body={formProps.body[state]}
               footer={formProps.footer[state]}/>;
};

export default BusinessForm;
