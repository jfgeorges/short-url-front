import React from "react";

const ShortUrl = props => {
  return (
    <div className="urlListIem">
      <div className="originalUrl">{props.originalUrl}</div>
      <div className="shortUrl" onClick={() => props.handleUrlClick(props.index, props.shortUrl)}>
        {props.serverPath + props.shortUrl}
      </div>
      <div className="visits bgcolor">
        {props.visitCounter} <i className="far fa-trash-alt" onClick={() => alert(props.visitCounter)} />
      </div>
    </div>
  );
};

export default ShortUrl;
