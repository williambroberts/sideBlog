// icon:pinned | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from "react";

function IconPinned(props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M9 4v6l-2 4v2h10v-2l-2-4V4M12 16v5M8 4h8" />
    </svg>
  );
}

export default IconPinned;
