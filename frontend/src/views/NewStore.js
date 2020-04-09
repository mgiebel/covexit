import React, { useState } from 'react';

import './NewStore.scss';
import Button from "components/Button/Button";
import Form from "components/Form/Form";
import { Route, Switch } from "react-router-dom";
import ViewWrappers from "components/ViewWrappers/ViewWrappers";
import PersonalForm from './NewStore/PersonalForm';
import BusinessForm from './NewStore/BusinessForm';
import { useTranslation } from 'react-i18next';


const NewStore = (props) => {
  const [_] = useTranslation();
  const match = props.match;

  const [business, setBusiness] = useState({
    name: '', hours: '', mapsPlaceObject: '',
    address: '', zipcity: '', email: '', phone: '', website: '', desc: '',
  });
  const [person, setPerson] = useState({
    name: '', surname: '', address: '', phone: '', zipcity: '', email: '' });


  return (
    <ViewWrappers.View withPadding>
      <Switch>
        {/* create a business */}
        <Route path={`${match.path}/business`} render={(routeProps) =>
          <BusinessForm onChange={data => setBusiness(data ? { ...business, ...data} : {})}
                        business={business} {...routeProps} />
        }/>
        {/* create an owner */}
        <Route path={`${match.path}/owner`}>
          <PersonalForm onChange={data => setPerson({ ...person,  ...data})} person={person} />
        </Route>
        {/* initial view */}
        <Route path={match.path}>
          <Form
            head={<>
              <h1>{_('Awesome decision!')}</h1>
              <p>{_(`We’ll guide you through the process so you have it as easy as
                possible to bring your business online.`)}</p>
            </>}
            footer={<>
              <div className="Btn-group">
                <Button label={_('Register with google')} to={{ pathname: `${match.path}/owner`, state: { useGoogle: true } }}/>
                <Button label={_('Register by email')} to={{ pathname: `${match.path}/owner`, state: { useGoogle: false } }} secondary/>
              </div>
            </>}
          />
        </Route>
      </Switch>
    </ViewWrappers.View>
  );
};

export default NewStore

