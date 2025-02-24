import {useContext} from 'react';

import {EditorContext} from '../lib/EditorContext.tsx'

const useCurrentFrame = () => {
  const {frame} = useContext(EditorContext);
  return frame;
};

export default useCurrentFrame;