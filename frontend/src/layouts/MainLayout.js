import React from 'react';

const MainLayout = ({ children }) => (
      <div
        style={{
          textAlign: 'center',
          minHeight: '100vh',
          fontSize: 'calc(10px + 2vmin)'
        }}
      >
        {children}
      </div>
);

export default MainLayout;