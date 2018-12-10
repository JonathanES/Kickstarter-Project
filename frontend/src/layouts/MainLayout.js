import React from 'react';

const MainLayout = ({ children }) => (
      <div
        style={{
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