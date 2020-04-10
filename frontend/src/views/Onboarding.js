import React, { useState } from 'react';

import './Onboarding.scss';
import Button from "../components/Button/Button";
import Form from "../components/Form/Form";
import InlineInputs from "../components/InlineInputs/InlineInputs";
import Fields from "../components/Fields/Fields";
import { useTranslation } from 'react-i18next';

const Onboarding = (props) => {
  const [t] = useTranslation('onboarding');
  const match = props.match;
  const step = match.params.step;

  const [categories, setCategories] = useState([]);
  const categoriesAreSet = categories.some(e => !!e);

  const [product, setProduct] = useState({name: '', category: '', price: '', phone: '', description: '', photo: ''});
  const onChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.files || event.target.value });
  };

  const steps = [
    {
      head: (<>
        <h1>{t('categories.head')}</h1>
        <p>{t('categories.text')}</p>
      </>),
      footer: categoriesAreSet &&
        <Button label={t('categories.button')} to={'/stores/1/onboarding/1'}/>,
      body: <InlineInputs addLabel={t('categories.label')} values={categories}
                          onAdd={() => setCategories([...categories, ""])}
                          onChange={(val, i) => setCategories(prev => {
                            prev[i] = val;
                            return prev.concat();
                          })}/>,
    },
    {
      head: (<>
        <h1>{t('product.head')}</h1>
        <p>{t('product.text')}</p>
      </>),
      footer: <Button label={t('product.button')} to={'/stores/1'}/>,
      body: <>
        <Fields.TextInput onChange={onChange} placeholder={t('product.name')} name="name" value={product.name}/>
        <Fields.TextInput onChange={onChange} placeholder={t('product.category')} name="category" value={product.category}/>
        <Fields.TextInput onChange={onChange} placeholder={t('product.price')} name="price" value={product.price}/>
        <Fields.TextArea onChange={onChange} placeholder={t('product.description')} name="description" value={product.description}/>
        <Fields.FileUpload onChange={onChange} label={t('product.photo')} name="photo" value={product.photo}
                           helpText={t('product.photoHelp)')}/>
      </>,
    },
  ];


  return (
    <div className={`Onboarding Onboarding--${step}`}>
      <Form {...steps[step]} />
    </div>
  );
};

export default Onboarding

