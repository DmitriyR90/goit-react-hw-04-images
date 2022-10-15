import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { getImages, PER_PAGE } from '../Api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImgUrl, setlargeImgUrl] = useState('');

  useEffect(() => {
    async function fetchImages() {
      if (query === null) {
        return;
      }

      setIsLoading(true);

      try {
        const response = await getImages(query, currentPage);
        const imagesArray = response.hits;

        if (imagesArray.length !== 0) {
          setImages(prevState => [...prevState, ...imagesArray]);

          setShowLoadMore(true);
        }

        if (imagesArray.length < PER_PAGE) {
          setShowLoadMore(false);
        }
      } catch {
        alert('Something went wrong. Try again');
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [query, currentPage]);

  const handleSearch = searchData => {
    if (query !== searchData) {
      setQuery(searchData.trim());
      setImages([]);
      setCurrentPage(1);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const getLargeImgUrl = url => {
    setlargeImgUrl(url);
  };

  const toggleModal = url => {
    getLargeImgUrl(url);

    setShowModal(!showModal);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 16,
        paddingBottom: 24,
      }}
    >
      <Searchbar onSearch={handleSearch} />

      {images && <ImageGallery gallery={images} onImgClick={toggleModal} />}
      <Loader status={isLoading} />
      {showLoadMore && !isLoading && <Button loadMore={handleLoadMore} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImgUrl} alt="info" />
        </Modal>
      )}
    </div>
  );
};
