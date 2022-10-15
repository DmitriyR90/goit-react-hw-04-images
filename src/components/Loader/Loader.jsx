import { Bars } from 'react-loader-spinner';
import { LoadingWrap } from './Loader.styled';
import PropTypes from 'prop-types';

export const Loader = ({ status }) => {
  return (
    <LoadingWrap>
      <Bars
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={status}
      />
    </LoadingWrap>
  );
};

Loader.propTypes = {
  status: PropTypes.bool.isRequired,
};
