import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ShowDialog from './showDialog';

function useDetectOutsideClick(ref: any) {
  useEffect(() => {
    /**
     * execute if clicked on outside of element
     */
    function handleClickOutside(event: any): void {
      if (ref.current && !ref.current.contains(event.target)) {
        ShowDialog(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

/**
 * if you click outside of it
 */
const DetectOutsideClick: React.FC = (props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useDetectOutsideClick(wrapperRef);
  return <div ref={wrapperRef}>{props.children}</div>;
};

DetectOutsideClick.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DetectOutsideClick;
