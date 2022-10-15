import { GalleryItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ galleryItem, onClick }) => {
  const { largeImageURL, webformatURL, tags } = galleryItem;

  return (
    <GalleryItem onClick={e => onClick(largeImageURL)}>
      <Image src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  galleryItem: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
