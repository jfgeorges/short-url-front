import React from "react";

const ShortUrl = props => {
  return (
    <>
      <div className="originalUrl" onClick={() => props.handleUrlClick(props.index, props.shortUrl)}>
        {props.originalUrl}
      </div>
      <div className="shortUrl" onClick={() => props.handleUrlClick(props.index, props.shortUrl)}>
        {props.api_url + props.shortUrl}
      </div>
      <div className="visits bgcolor">
        {props.visitCounter} <i className="far fa-trash-alt" onClick={() => props.handleDeleteUrl(props.shortUrl)} />
      </div>
      <div className="bottom-line" />
    </>
  );
};

export default ShortUrl;
