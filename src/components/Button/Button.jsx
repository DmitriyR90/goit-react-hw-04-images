import { BtnStyled } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ loadMore }) => {
  return (
    <BtnStyled type="button" onClick={loadMore}>
      Load more
    </BtnStyled>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
