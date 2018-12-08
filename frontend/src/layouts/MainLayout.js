import React from 'react';

const MainLayout = ({ children }) => (
      <div
        style={{
          backgroundColor: '#216288',
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'calc(10px + 2vmin)'
        }}
      >
        {children}
      </div>
);

export default MainLayout;