import React, { useState } from 'react';
import { IconButton } from './';

const MediaPreview = ({ file, onRemove }) => {
  const [preview, setPreview] = useState(() => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  });

  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');

  React.useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="media-preview">
      <div className="preview-content">
        {isImage && (
          <img src={preview} alt={file.name} />
        )}
        {isVideo && (
          <div className="video-placeholder">
            <span className="video-icon">▶</span>
            <span className="video-name">{file.name}</span>
          </div>
        )}
      </div>
      <IconButton
        icon="×"
        onClick={onRemove}
        className="remove-media"
        variant="error"
        size="small"
      />
      <div className="media-info">
        <span className="media-name">{file.name}</span>
        <span className="media-size">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
      </div>
    </div>
  );
};

export default MediaPreview;