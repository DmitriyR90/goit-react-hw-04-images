import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ gallery, onImgClick }) => {
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
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onImgClick: PropTypes.func.isRequired,
};
