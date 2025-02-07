import { useContext } from 'react';

import { ThemeContext } from '../../contexts/theme';

const Divisor = () => {
  const theme = useContext(ThemeContext);
  return (
    <div className="flex flex-row justify-center items-center mt-6">
      <div className="flex-1 h-[1px]" style={{ backgroundColor: theme.TextColor }}></div>
      <div className="p-2" style={{ color: theme.TextColor }}>
        OR
      </div>
      <div className="flex-1 h-[1px]" style={{ backgroundColor: theme.TextColor }}></div>
    </div>
  );
};

export default Divisor;
