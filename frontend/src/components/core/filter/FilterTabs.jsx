import React from 'react';
import { Button, Box, ButtonGroup } from '@mui/material';

const filters = ['Last 1 hour', 'Last 24 hours', 'Last 7 days', 'Last 30 days'];

const FilterTabs = ({ selectedFilter, onFilterChange }) => {
  const handleFilterChange = (filter) => {
    onFilterChange(filter); // Trigger callback to update the selected filter in UserDashBoard
  };

  // Inline styles
  const styles = {
    container: {
      display: 'inline',
      justifyContent: 'right',
    },
    button: {
      textTransform: 'none',
      fontFamily: 'Inter',
      fontSize: '14px',
      lineHeight: '12px',
      color: '#656575',
      padding: '12px 8px',
      borderRadius: '8px',
      border: '1px solid transparent', // Keep a transparent border to avoid shaking
      fontWeight: '400',
      transition: 'all 0.3s ease', // Smooth transitions for hover/active
    },
    activeButton: {
      backgroundColor: '#ffffff',
      fontWeight: 'bold',
      border: '1px solid #d0d7de', // Same border width to avoid layout shift
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
      color: '#656575',
      padding: '12px 8px', // Ensure padding is identical
      transition: 'all 0.3s ease', // Smooth effect for active state
    },
    hoverButton: {
      backgroundColor: '#f4f4f5', // Background change on hover
      color: '#656575',
      transition: 'all 0.3s ease', // Smooth hover transition
    },
  };

  return (
    <Box sx={styles.container}>
      <ButtonGroup
        variant="text"
        aria-label="filter tabs"
        style={{
          background: "#F4F4F5",
          padding: "4px 4px",
          borderRadius: '8px',
          gap: '4px',
        }}>
        {filters.map((filter) => (
          <Button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            style={{
              ...styles.button,
              ...(selectedFilter === filter ? styles.activeButton : {}),
            }}
          >
            {filter}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default FilterTabs;
