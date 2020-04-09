import React, { useState } from 'react';

import './Onboarding.scss';
import Button from "../components/Button/Button";
import Form from "../components/Form/Form";
import InlineInputs from "../components/InlineInputs/InlineInputs";
import Fields from "../components/Fields/Fields";
import { useTranslation } from 'react-i18next';

const Onboarding = (props) => {
  const [_] = useTranslation();
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
        <h1>{_('Create a category')}</h1>
        <p>{_(`First, let’s help your customers find the products they’re searching
          for by creating a category.`)}</p>
      </>),
      footer: categoriesAreSet &&
        <Button label={_('Next')} to={'/stores/1/onboarding/1'}/>,
      body: <InlineInputs addLabel={_('Add category')} values={categories}
                          onAdd={() => setCategories([...categories, ""])}
                          onChange={(val, i) => setCategories(prev => {
                            prev[i] = val;
                            return prev.concat();
                          })}/>,
    },
    {
      head: (<>
        <h1>{_('Finally, your first product!')}</h1>
        <p>{_(`You are close to getting your store online! Just one last step is
          needed. To create your first online product.`)}</p>
      </>),
      footer: <Button label="Add Product" to={'/stores/1'}/>,
      body: <>
        <Fields.TextInput onChange={onChange} placeholder={_('Name of the product')} name="name" value={product.name}/>
        <Fields.TextInput onChange={onChange} placeholder={_('Category')} name="category" value={product.category}/>
        <Fields.TextInput onChange={onChange} placeholder={_('Price')} name="price" value={product.price}/>
        <Fields.TextInput onChange={onChange} placeholder={_('Phone number')} name="phone" value={product.phone}/>
        <Fields.TextArea onChange={onChange} placeholder={_('Description of your product')} name="description" value={product.description}/>
        <Fields.FileUpload onChange={onChange} label="Upload photo" name="photo" value={product.photo}
                           helpText={_('JPEG .JPG .PNG (Just these file formats will work)')}/>
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

