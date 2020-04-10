import React from 'react'
import PhotoSelector from '../components/PhotoSelector/PhotoSelector'
import { businessImages, bakeryImages } from '../shared/businessImages'

import './PhotoSelect.scss'
import { useTranslation } from 'react-i18next';

const PhotoSelect = () => {
  const [t] = useTranslation('photo-select');
  const googleBusiness = false;

  const getImages = () => {
    // here we make an api call to get images from the google business account.
    // if the user registered with email, use preloaded business images

    return googleBusiness ? bakeryImages : businessImages
  }

  return (
    <div className="PhotoSelect">
      <div className="Intro">
        <h1>{t('head')}</h1>
        <p>{t('text')}</p>
      </div>

      <PhotoSelector images={getImages()} />
    </div>
  )
}

export default PhotoSelect
