import { Lang } from '@types';
import useStore from '@hooks/useStore';

export default function useLang(): Lang {
  const { lang } = useStore();

  return lang;
}
