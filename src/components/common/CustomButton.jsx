import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(`p-2 rounded`, {
  variants: {
    size: {
      sm: `text-sm`,
      md: `text-md`,
      lg: `text-lg`
    },
    color: {
      primary: `bg-blue-500 text-white`,
      secondary: `bg-gray-300 text-gray-700`
    }
  }
});

// eslint-disable-next-line react/prop-types
const CustomButton = ({ size, color, children, addClassName }) => {
  const className = buttonVariants({ size, color });
  return (
    <button className={twMerge(`${className} ${addClassName}`)}>
      {children}
    </button>
  );
};

export default CustomButton;
