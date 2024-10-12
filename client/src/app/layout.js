import './globals.css';
import Navbar from './components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Include Navbar */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
