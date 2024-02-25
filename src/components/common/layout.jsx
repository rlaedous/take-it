import Header from './header';
import Footer from './footer';

const layout = ({ children }) => {
  return (
    <section>
      <Header />
      <div className='mainContent'>{children}</div>
      <Footer />
    </section>
  );
};

export default layout;
