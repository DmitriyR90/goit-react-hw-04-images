import { Formik } from 'formik';
import { Header, SearchForm, SearchBtn, SearchInput } from './Searchbar.styled';
import { TbSearch } from 'react-icons/tb';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSearch }) => {
  const handleSubmit = (values, actions) => {
    onSearch(values.searchField);
    actions.resetForm();
  };

  return (
    <Header>
      <Formik initialValues={{ searchField: '' }} onSubmit={handleSubmit}>
        <SearchForm>
          <SearchBtn type="submit">
            <TbSearch size="24" />
          </SearchBtn>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchField"
          />
        </SearchForm>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
