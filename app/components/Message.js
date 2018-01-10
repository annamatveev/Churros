import React from "react";
import PropTypes from 'prop-types';

const Message = ({ message }) => (
  <div className="feed">
    { message }
  </div>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;