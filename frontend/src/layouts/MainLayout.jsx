import React from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import ChatBotWidget from '../components/shared/ChatBotWidget';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header /> 
      <main>{children}</main>
      <Footer />
      <ChatBotWidget />
    </>
  );
};

export default MainLayout;
