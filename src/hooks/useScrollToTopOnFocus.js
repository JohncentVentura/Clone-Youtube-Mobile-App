import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export function useScrollToTopOnFocus(ref) {
  useFocusEffect(
    useCallback(() => {
      if (ref?.current) {
        if (ref.current.scrollToOffset) {
          ref.current.scrollToOffset({ offset: 0, animated: false });
        } else if (ref.current.scrollTo) {
          ref.current.scrollTo({ y: 0, animated: false });
        }
      }
    }, [ref])
  );
}
