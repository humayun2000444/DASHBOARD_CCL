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
      justifyContent: 'right',
      padding: '8px', // Add some spacing around the button group
    },
    button: {
      textTransform: 'none',
      fontFamily: 'Inter',
      fontSize: '14px',
      lineHeight: '20px',
      color: '#656575', // Subtle grey text for inactive buttons
      padding: '10px 16px', // Balanced padding for a cleaner look
      borderRadius: '8px',
      border: '1px solid transparent', // Transparent border to maintain layout consistency
      fontWeight: '400',
      backgroundColor: '#F4F4F5', // Default background for buttons
      transition: 'all 0.3s ease', // Smooth transitions for hover/active
    },
    activeButton: {
      backgroundColor: '#ffffff', // White background for active button
      fontWeight: 'bold', // Bold text for active filter
      border: '1px solid #1d94ab', // Border with the primary color
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for active state
      color: '#1d94ab', // Primary color for active button text
      transition: 'all 0.3s ease',
    },
    hoverButton: {
      backgroundColor: '#e6f5f8', // Slightly lighter shade of primary for hover
      color: '#1d94ab', // Primary color on hover
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
