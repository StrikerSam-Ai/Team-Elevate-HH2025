import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GroupFilters from '../../components/Groups/GroupFilters';
import GroupList from '../../components/Groups/GroupList';
import styles from './Groups.module.css';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    location: 'all',
    frequency: 'all',
    sortBy: 'newest'
  });

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        const response = await fetch('/api/groups');
        const data = await response.json();
        
        let filteredGroups = data;

        // Apply filters
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredGroups = filteredGroups.filter(group => 
            group.name.toLowerCase().includes(searchLower) ||
            group.description.toLowerCase().includes(searchLower)
          );
        }

        if (filters.category !== 'all') {
          filteredGroups = filteredGroups.filter(group => 
            group.category.toLowerCase() === filters.category
          );
        }

        if (filters.location !== 'all') {
          filteredGroups = filteredGroups.filter(group => 
            group.location.toLowerCase() === filters.location
          );
        }

        if (filters.frequency !== 'all') {
          filteredGroups = filteredGroups.filter(group => 
            group.meetingFrequency.toLowerCase() === filters.frequency
          );
        }

        // Apply sorting
        switch (filters.sortBy) {
          case 'newest':
            filteredGroups.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case 'popular':
            filteredGroups.sort((a, b) => b.memberCount - a.memberCount);
            break;
          case 'alphabetical':
            filteredGroups.sort((a, b) => a.name.localeCompare(b.name));
            break;
          default:
            break;
        }

        setGroups(filteredGroups);
        setError(null);
      } catch (err) {
        setError('Failed to load groups. Please try again later.');
        console.error('Error fetching groups:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.groupsPage}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Community Groups</h1>
          <p>Join groups to connect with others who share your interests</p>
          <Link to="/groups/create" className={styles.createButton}>
            Create New Group
          </Link>
        </div>
      </div>

      <div className={styles.container}>
        <GroupFilters onFilterChange={handleFilterChange} />
        <GroupList 
          groups={groups} 
          loading={loading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default Groups;