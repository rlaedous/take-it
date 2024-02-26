import Header from './header';
import Footer from './footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const layout = ({ children }) => {
  return (
    <section>
      <Header />
      <div className='mainContent'>{children}</div>
      <ReactQueryDevtools />
      <Footer />
    </section>
  );
};

export default layout;
