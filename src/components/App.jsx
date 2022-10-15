import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { getImages, PER_PAGE } from '../Api';

export class App extends Component {
  state = {
    images: [],
    query: null,
    currentPage: 1,
    showLoadMore: false,
    showModal: false,
    isLoading: false,
    largeImgUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { query, currentPage, images } = this.state;

    this.setState({ isLoading: true });

    try {
      const response = await getImages(query, currentPage);
      const imagesArray = response.hits;
      const totalHits = response.total;
      const showedHits = images.length;

      if (imagesArray.length !== 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...imagesArray],
        }));
        this.setState({ showLoadMore: true });
      }

      if (totalHits <= showedHits || totalHits <= PER_PAGE) {
        alert(`No more results for ${query}`);
        this.setState({ showLoadMore: false });
      }
    } catch {
      alert('Something went wrong. Try again');
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleSearch = searchData => {
    if (this.state.query !== searchData) {
      this.setState({ query: searchData.trim(), images: [], currentPage: 1 });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  getLargeImgUrl = url => {
    this.setState({ largeImgUrl: url });
  };

  toggleModal = url => {
    this.getLargeImgUrl(url);

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, isLoading, showLoadMore, largeImgUrl } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSearch={this.handleSearch} />

        {this.state.images && (
          <ImageGallery gallery={images} onImgClick={this.toggleModal} />
        )}
        <Loader status={isLoading} />
        {showLoadMore && !isLoading && (
          <Button loadMore={this.handleLoadMore} />
        )}
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImgUrl} alt="info" />
          </Modal>
        )}
      </div>
    );
  }
}
