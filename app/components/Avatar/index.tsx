import * as React from 'react';
import MAvatar from '@mui/material/Avatar';

function stringAvatar(name: string) {
  return {
    children: `${name.split(' ')[0][0]}`,
  };
}

export default function Avatar({
  name,
  style,
}: {
  name: string;
  style?: React.CSSProperties;
}) {
  return <MAvatar {...stringAvatar(name)} sx={style} />;
}
