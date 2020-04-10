import React, { useState } from 'react'
import Button from '../Button/Button'
import checkmark from '../../assets/checkmark.svg'

import './PhotoSelector.scss'
import { useTranslation } from 'react-i18next';

const PhotoSelector = ({ images }) => {
  const [t] = useTranslation('owner-photo-select');
  const [selectedPhoto, setSelectedPhoto] = useState(false)

  return (
    <div className="PhotoSelector">
      {images.map((image, i) =>
        <label
          key={i}
          className={`PhotoSelector-option
            ${selectedPhoto === i && 'PhotoSelector-option--selected'}
          `}
        >
          <input
            className="PhotoSelector-radio"
            type="radio"
            value={i}
            checked={selectedPhoto === i}
            onChange={e => setSelectedPhoto(parseInt(e.target.value))}
          />

          <img className="PhotoSelector-photo" src={image} alt={i} />

          {selectedPhoto === i &&
            <img className="PhotoSelector-checkmark" src={checkmark} alt="checkmark" />
          }
        </label>
      )}

      <div
        className={`PhotoSelector-nextBtn
          ${!selectedPhoto && 'PhotoSelector-nextBtn--disabled'}
        `}
      >
        {/* TODO: add upload image */}
        <Button to="/" label={`${t('continueButton')}  →`} />
      </div>
    </div>
  )
}

export default PhotoSelector
