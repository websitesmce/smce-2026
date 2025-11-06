import React from 'react';

const whatsappLink =
  'https://wa.me/919032727017?text=Hey%20there!%20I%20have%20a%20question%20regarding%20admissions.';

function WhatsApp() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-1000 bg-green-500 w-16 h-16 flex items-center justify-center rounded-full shadow-lg transition-colors duration-200 cursor-pointer"
      style={{
        // Default (Mobile) position: bottom 16px (0.5rem)
        // Adjust the '16px' value to your desired lower position on mobile
        bottom: '16px', 
        right: '16px',
      }}
      // Use Tailwind responsive class to override on larger screens (md: is typically 768px and up)
      // md:bottom-8 corresponds to bottom: 32px (the original value)
      onMouseOver={e => (e.currentTarget.style.backgroundColor = '#1ebe57')}
      onMouseOut={e => (e.currentTarget.style.backgroundColor = '#25D366')}
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <g>
          <path
            d="M16.001 2.667c-7.364 0-13.334 5.97-13.334 13.333 0 2.353.617 4.645 1.793 6.652L2.667 29.334l6.919-1.799A13.244 13.244 0 0 0 16 29.333c7.364 0 13.334-5.97 13.334-13.334S23.364 2.667 16.001 2.667zm0 24c-2.082 0-4.117-.553-5.885-1.6l-.42-.248-4.108 1.065 1.099-4.01-.273-.433A10.606 10.606 0 0 1 5.334 16c0-5.89 4.777-10.667 10.667-10.667s10.667 4.777 10.667 10.667S21.89 26.667 16.001 26.667zm5.83-7.758c-.317-.159-1.873-.924-2.162-1.03-.288-.107-.497-.159-.705.16-.21.317-.81 1.03-.993 1.242-.183.212-.365.238-.682.08-.317-.159-1.34-.493-2.552-1.574-.944-.842-1.581-1.883-1.768-2.2-.184-.317-.02-.487.139-.646.143-.143.318-.372.477-.558.159-.185.211-.317.318-.529.106-.212.053-.397-.027-.557-.08-.159-.705-1.704-.965-2.338-.255-.613-.515-.53-.705-.54-.183-.008-.396-.01-.609-.01-.212 0-.557.08-.849.397-.29.317-1.115 1.09-1.115 2.656 0 1.567 1.142 3.082 1.301 3.297.159.212 2.249 3.44 5.453 4.686.763.294 1.357.47 1.822.601.765.219 1.46.188 2.011.114.614-.082 1.873-.765 2.138-1.505.264-.74.264-1.373.185-1.505-.08-.132-.288-.212-.604-.372z"
            fill="#fff"
          />
        </g>
      </svg>
    </a>
  );
}

export default WhatsApp;