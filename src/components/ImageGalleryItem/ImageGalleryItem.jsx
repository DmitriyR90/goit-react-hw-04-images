import { GalleryItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({ galleryItem }) => {
  const { webformatURL, tags } = galleryItem;

  const [largeImgUrl, setLargeImgUrl] = useState('');
  const [largeImgTag, setlargeImgTag] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleOpenLargeImg = () => {
    if (!showModal) {
      setLargeImgUrl(galleryItem.largeImageURL);
      setlargeImgTag(galleryItem.tags);
      toggleModal();
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <GalleryItem onClick={e => handleOpenLargeImg()}>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImgUrl} alt={largeImgTag} />
        </Modal>
      )}
      <Image src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  galleryItem: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
};
