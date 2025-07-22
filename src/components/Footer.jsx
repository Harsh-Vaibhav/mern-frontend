import React from 'react';

export default function Footer() {
  const footerStyle = {
    backgroundColor: '#222',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem 0',
    fontSize: '0.95rem',
    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
    marginTop: 'auto',
    width: '100%',
  };

  return (
    <footer style={footerStyle}>
      <p>© {new Date().getFullYear()} Harsh Vaibhav. All rights reserved.</p>
    </footer>
  );
}
