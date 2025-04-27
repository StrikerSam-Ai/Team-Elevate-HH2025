import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Card, TextArea, Button, IconButton, JournalErrorBoundary, WalletGuide, MediaPreview, ViewToggle, EntryMemo, SearchBar, Skeleton } from './';
import { journalAPI } from '../api/journal';
import { useToast } from '../contexts/ToastContext';
import { useWeb3 } from '../contexts/Web3Context';
import { journalEntry } from '../utils/validation';
import { blockchainService } from '../services/blockchainService';
import { groupEntriesByDate, formatTimeAgo } from '../utils/journalHelpers';

const JournalContent = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [verifyingEntries, setVerifyingEntries] = useState({});
  const fileInputRef = useRef();
  const { addToast } = useToast();
  const { isConnected, connectWallet } = useWeb3();
  const [showGuide, setShowGuide] = useState(true);
  const [hasEntries, setHasEntries] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    if (isConnected) {
      loadEntries();
    } else {
      setIsLoading(false);
    }
  }, [isConnected]);

  const updateAvailableTags = useCallback((entries) => {
    const tags = new Set();
    entries.forEach(entry => {
      entry.tags?.forEach(tag => tags.add(tag));
    });
    setAvailableTags(Array.from(tags).sort());
  }, []);

  const loadEntries = async () => {
    try {
      const fetchedEntries = await journalAPI.getEntries();
      const sortedEntries = fetchedEntries.sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      );
      setEntries(sortedEntries);
      setHasEntries(sortedEntries.length > 0);
      setShowGuide(!sortedEntries.length);
      updateAvailableTags(sortedEntries);
    } catch (error) {
      addToast('Failed to load journal entries', 'error');
      console.error('Error loading entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateEntry = () => {
    if (!newEntry.trim() && selectedFiles.length === 0) return false;
    if (!journalEntry.content.validate(newEntry)) {
      addToast(journalEntry.content.message, 'error');
      return false;
    }
    if (!journalEntry.media.validate(selectedFiles)) {
      addToast(journalEntry.media.message, 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      try {
        await connectWallet();
      } catch (error) {
        addToast('Please connect your wallet to continue', 'error');
        return;
      }
    }

    if (!validateEntry()) return;

    setIsUploading(true);
    try {
      const entryData = {
        content: newEntry,
        timestamp: new Date().toISOString(),
        tags,
        notes
      };
      
      await journalAPI.saveEntry(entryData, selectedFiles);
      addToast('Memory saved successfully!', 'success');
      setNewEntry('');
      setSelectedFiles([]);
      setTags([]);
      setNotes('');
      await loadEntries();
    } catch (error) {
      addToast('Failed to save memory', 'error');
      console.error('Error saving entry:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleVerifyEntry = async (entry) => {
    if (!isConnected) {
      addToast('Please connect your wallet to verify entries', 'warning');
      return;
    }

    setVerifyingEntries(prev => ({ ...prev, [entry.ipfsHash]: true }));
    try {
      const isVerified = await blockchainService.verifyEntry(entry.ipfsHash);
      if (isVerified) {
        setEntries(prev => 
          prev.map(e => 
            e.ipfsHash === entry.ipfsHash 
              ? { ...e, isVerified: true }
              : e
          )
        );
        addToast('Entry verified on blockchain successfully!', 'success');
      } else {
        addToast('Could not verify entry on blockchain', 'error');
      }
    } catch (error) {
      console.error('Error verifying entry:', error);
      addToast('Failed to verify entry', 'error');
    } finally {
      setVerifyingEntries(prev => ({ ...prev, [entry.ipfsHash]: false }));
    }
  };

  const handleGetStarted = () => {
    setShowGuide(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchesSearch = searchTerm
        ? entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.notes?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesTags = selectedTags.length
        ? selectedTags.every(tag => entry.tags?.includes(tag))
        : true;

      return matchesSearch && matchesTags;
    });
  }, [entries, searchTerm, selectedTags]);

  const groupedEntries = useMemo(() => {
    return groupEntriesByDate(filteredEntries);
  }, [filteredEntries]);

  if (isLoading) {
    return (
      <div className="journal-container">
        <h1>My Journal</h1>
        <div className="entries-container">
          <div className="entries-header">
            <h2>Memory Timeline</h2>
          </div>
          <Skeleton 
            variant="journal-entry" 
            count={3} 
            className="entries-grid view-grid"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="journal-container">
      <h1>My Journal</h1>
      
      {!isConnected ? (
        <Card className="connect-wallet-card">
          <h3>Connect Your Wallet</h3>
          <p>To start journaling and storing your memories securely on the blockchain, please connect your Web3 wallet.</p>
          <Button onClick={connectWallet} variant="primary">
            Connect Wallet
          </Button>
        </Card>
      ) : showGuide && !hasEntries ? (
        <WalletGuide onGetStarted={handleGetStarted} />
      ) : (
        <>
          <form onSubmit={handleSubmit} className="journal-form">
            <TextArea
              label="Write your thoughts..."
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="What's on your mind today?"
              rows={4}
              disabled={isUploading}
            />

            <div className="media-upload-section">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                accept="image/*,video/*"
                style={{ display: 'none' }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => fileInputRef.current.click()}
                disabled={isUploading}
              >
                Add Photos/Videos
              </Button>
              
              {selectedFiles.length > 0 && (
                <div className="media-previews">
                  {selectedFiles.map((file, index) => (
                    <MediaPreview
                      key={index}
                      file={file}
                      onRemove={() => removeFile(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            <EntryMemo
              tags={tags}
              notes={notes}
              onTagsChange={setTags}
              onNotesChange={setNotes}
            />

            <Button 
              type="submit" 
              disabled={isUploading || (!newEntry.trim() && selectedFiles.length === 0)}
              className="submit-button"
            >
              {isUploading ? 'Saving to Blockchain...' : 'Save Memory'}
            </Button>
          </form>

          <div className="entries-container">
            <div className="entries-header">
              <h2>Memory Timeline</h2>
              {entries.length > 0 && (
                <ViewToggle 
                  view={viewMode} 
                  onToggle={setViewMode}
                />
              )}
            </div>

            {entries.length > 0 && (
              <SearchBar
                onSearch={handleSearch}
                availableTags={availableTags}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
              />
            )}

            {filteredEntries.length === 0 ? (
              <Card className="empty-state">
                {entries.length === 0 ? (
                  <p>No memories yet. Start writing your first journal entry!</p>
                ) : (
                  <p>No memories match your search criteria.</p>
                )}
              </Card>
            ) : (
              <div className={`entries-grid view-${viewMode}`}>
                {groupedEntries.map(({ date, entries: groupEntries }) => (
                  <React.Fragment key={date}>
                    <div className="date-separator">
                      <span className="date-label">{date}</span>
                      <div className="date-line" />
                    </div>
                    {groupEntries.map(entry => (
                      <Card 
                        key={entry.transactionHash || entry.ipfsHash} 
                        className={`entry-card ${verifyingEntries[entry.ipfsHash] ? 'verifying' : ''} ${entry.isVerified ? 'verified' : ''}`}
                        isVerified={entry.isVerified}
                        showVerifyButton={!entry.isVerified}
                        onVerify={() => handleVerifyEntry(entry)}
                        verifying={verifyingEntries[entry.ipfsHash]}
                        subtitle={formatTimeAgo(entry.timestamp)}
                      >
                        <p className={viewMode === 'grid' ? 'truncate-text' : ''}>
                          {entry.content}
                        </p>
                        {entry.mediaUrls && entry.mediaUrls.length > 0 && (
                          <div className="media-grid">
                            {entry.mediaUrls.map((url, index) => (
                              <div key={index} className="media-item">
                                {url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                  <img src={url} alt={`Memory ${index + 1}`} loading="lazy" />
                                ) : (
                                  <video controls preload="none">
                                    <source src={url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {(entry.tags?.length > 0 || entry.notes) && (
                          <div className="entry-metadata">
                            {entry.tags?.length > 0 && (
                              <div className="entry-tags">
                                {entry.tags.map((tag, index) => (
                                  <span key={index} className="tag">{tag}</span>
                                ))}
                              </div>
                            )}
                            {entry.notes && (
                              <div className="entry-notes">
                                <p className="notes-text">{entry.notes}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </Card>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Journal = () => {
  return (
    <JournalErrorBoundary onRetry={() => window.location.reload()}>
      <JournalContent />
    </JournalErrorBoundary>
  );
};

export default Journal;