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
      display: 'inline-flex',
      justifyContent: 'flex-end', // Right-align buttons
      padding: '4px', // Space around the button group
      gap: '0px', // Space between each button
    },
    button: {
      textTransform: 'none',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      lineHeight: '20px',
      color: '#71717A',
      backgroundColor: 'rgba(244,244,245,0)',
      padding: '6px 12px',
      borderRadius: '6px',
      border: '1px solid transparent',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
    },
    activeButton: {
      backgroundColor: '#ffffff',
      fontWeight: 600,
      border: '1px solid #E4E4E7',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.0)',
      color: '#09090B',
    },
    hoverButton: {
      backgroundColor: '#E5E7EB',
      color: '#3F3F46',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.0)',
    },
  };


  return (
    <Box sx={styles.container}>
      <ButtonGroup
        variant="text"
        aria-label="filter tabs"
        style={{
          background: "#EFF2F1", // Light background for the button group
          padding: "4px",
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
            onMouseOver={(e) => {
              if (selectedFilter !== filter) {
                e.currentTarget.style.backgroundColor = styles.hoverButton.backgroundColor;
                e.currentTarget.style.color = styles.hoverButton.color;
              }
            }}
            onMouseOut={(e) => {
              if (selectedFilter !== filter) {
                e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
                e.currentTarget.style.color = styles.button.color;
              }
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
