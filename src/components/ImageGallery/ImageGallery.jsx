import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  render() {
    const { gallery, onImgClick } = this.props;

    return (
      <Gallery>
        {gallery.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              galleryItem={image}
              onClick={onImgClick}
            />
          );
        })}
      </Gallery>
    );
  }
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onImgClick: PropTypes.func.isRequired,
};
