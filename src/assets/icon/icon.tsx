import React from "react";

export function MessageIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="currentColor"
          d="M160 826.88L273.536 736H800a64 64 0 0064-64V256a64 64 0 00-64-64H224a64 64 0 00-64 64v570.88zM296 800L147.968 918.4A32 32 0 0196 893.44V256a128 128 0 01128-128h576a128 128 0 01128 128v416a128 128 0 01-128 128H296z"
        ></path>
        <path
          fill="currentColor"
          d="M352 512h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32zM352 320h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32z"
        ></path>
      </g>
    </svg>
  );
}

export const QuestionIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        d="M12 19a7 7 0 110-14 7 7 0 010 14zm-9-7a9 9 0 1118 0 9 9 0 01-18 0zm7.707-.584l.072 2.1h1.764l.024-1.02c.44-.064.824-.2 1.152-.408.328-.208.58-.472.756-.792.184-.328.276-.696.276-1.104 0-.536-.128-1.008-.384-1.416a2.657 2.657 0 00-1.044-.972c-.44-.232-.948-.348-1.524-.348-.688 0-1.268.168-1.74.504a2.44 2.44 0 00-.936 1.356l1.68.456a.976.976 0 01.372-.456c.176-.12.384-.18.624-.18.344 0 .624.1.84.3a.963.963 0 01.324.756c0 .368-.116.644-.348.828-.232.176-.536.28-.912.312l-.996.084zm.18 4.44c.216.216.472.324.768.324.304 0 .564-.108.78-.324.216-.216.324-.476.324-.78a1.05 1.05 0 00-.324-.768 1.063 1.063 0 00-.78-.324 1.05 1.05 0 00-.768.324 1.05 1.05 0 00-.324.768c0 .304.108.564.324.78z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export function GoogleIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      className=""
      {...props}
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
      ></path>
      <path
        fill="#FF3D00"
        d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691"
      ></path>
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
      ></path>
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
      ></path>
    </svg>
  );
}

export function ShowPasswordIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className=""
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M12 19c-7 0-10-7-10-7s3-7 10-7 10 7 10 7-3 7-10 7zm-8.164-6.207v.002-.002zm.46-.864l-.04.071.042.07c.337.568.85 1.322 1.544 2.07C7.23 15.635 9.236 17 12 17s4.77-1.364 6.16-2.86a12.39 12.39 0 001.543-2.07l.042-.07-.042-.07a12.39 12.39 0 00-1.544-2.07C16.77 8.365 14.764 7 12 7S7.23 8.364 5.84 9.86a12.386 12.386 0 00-1.543 2.07zM12 9a3 3 0 100 6 3 3 0 000-6z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export function HidePasswordIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className=""
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M3 5.414L4.414 4l14.85 14.85-1.415 1.413-1.936-1.935a9.695 9.695 0 01-3.913.806c-7 0-10-7-10-7s1.036-2.416 3.31-4.41L3 5.414zm9.538 9.538l1.824 1.824a7.789 7.789 0 01-2.362.358c-2.764 0-4.77-1.364-6.16-2.86a12.39 12.39 0 01-1.543-2.069l-.042-.07.042-.072c.337-.566.85-1.32 1.544-2.068.271-.293.567-.58.886-.853l2.321 2.32a3 3 0 003.49 3.49zm5.793-.868a12.455 12.455 0 001.372-1.879l.042-.07-.042-.072a12.39 12.39 0 00-1.544-2.068C16.77 8.5 14.764 7.135 12 7.135a8.97 8.97 0 00-.597.02L9.658 5.412A9.869 9.869 0 0112 5.134c7 0 10 7 10 7s-.712 1.662-2.253 3.367l-1.416-1.417zM3.836 12.927v.002-.002z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export function SearchIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
}

export function ItemIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="#000000"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>item-details</title>{" "}
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          {" "}
          <g
            id="icon"
            fill="currentColor"
            transform="translate(42.666667, 85.333333)"
          >
            {" "}
            <path
              d="M426.666667,1.42108547e-14 L426.666667,341.333333 L3.55271368e-14,341.333333 L3.55271368e-14,1.42108547e-14 L426.666667,1.42108547e-14 Z M384,42.6666667 L42.6666667,42.6666667 L42.6666667,298.666667 L384,298.666667 L384,42.6666667 Z M341.333333,213.333333 L341.333333,245.333333 L234.666667,245.333333 L234.666667,213.333333 L341.333333,213.333333 Z M341.333333,149.333333 L341.333333,181.333333 L234.666667,181.333333 L234.666667,149.333333 L341.333333,149.333333 Z M192,85.3333333 L192,170.666667 L85.3333333,170.666667 L85.3333333,85.3333333 L192,85.3333333 Z M341.333333,85.3333333 L341.333333,117.333333 L234.666667,117.333333 L234.666667,85.3333333 L341.333333,85.3333333 Z"
              id="Combined-Shape"
            >
              {" "}
            </path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export function BackIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z"></path>
      </g>
    </svg>
  );
}

export function ArrowDownIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      className="w-2.5 h-2.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 1l4 4 4-4"
      />
    </svg>
  );
}

export function LocationIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.2848 18.9935C12.1567 19.0875 12.0373 19.1728 11.9282 19.2493C11.8118 19.1721 11.6827 19.0833 11.5427 18.9832C10.8826 18.5109 10.0265 17.8176 9.18338 16.9529C7.45402 15.1792 6 12.9151 6 10.5C6 7.18629 8.68629 4.5 12 4.5C15.3137 4.5 18 7.18629 18 10.5C18 12.8892 16.4819 15.1468 14.6893 16.9393C13.8196 17.8091 12.9444 18.5099 12.2848 18.9935ZM19.5 10.5C19.5 16.5 12 21 12 21C11.625 21 4.5 16.5 4.5 10.5C4.5 6.35786 7.85786 3 12 3C16.1421 3 19.5 6.35786 19.5 10.5ZM13.5 10.5C13.5 11.3284 12.8284 12 12 12C11.1716 12 10.5 11.3284 10.5 10.5C10.5 9.67157 11.1716 9 12 9C12.8284 9 13.5 9.67157 13.5 10.5ZM15 10.5C15 12.1569 13.6569 13.5 12 13.5C10.3431 13.5 9 12.1569 9 10.5C9 8.84315 10.3431 7.5 12 7.5C13.6569 7.5 15 8.84315 15 10.5Z"
          fill="currentColor"
        ></path>{" "}
      </g>
    </svg>
  );
}

export function MinusIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      className="w-3 h-3 text-gray-900"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 2"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 1h16"
      />
    </svg>
  );
}

export function PlusIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      className="w-3 h-3 text-gray-900"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 18"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 1v16M1 9h16"
      />
    </svg>
  );
}

export function SquareCloseIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M10.0303 8.96967C9.73741 8.67678 9.26253 8.67678 8.96964 8.96967C8.67675 9.26256 8.67675 9.73744 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2626 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9697L13.0606 12L15.0303 10.0303C15.3232 9.73746 15.3232 9.26258 15.0303 8.96969C14.7374 8.6768 14.2625 8.6768 13.9696 8.96969L12 10.9394L10.0303 8.96967Z"
          fill="currentColor"
        ></path>{" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0574 1.25H11.9426C9.63424 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63422 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62177 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62177 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25C9.62177 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12C2.75 9.62177 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z"
          fill="currentColor"
        ></path>{" "}
      </g>
    </svg>
  );
}

export function UploadFileIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      className="w-8 h-8 mb-4 text-gray-500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 16"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
      />
    </svg>
  );
}

export function ImageIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>image</title>{" "}
        <path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM6.016 24q0 0.832 0.576 1.44t1.408 0.576h16q0.832 0 1.408-0.576t0.608-1.44v-0.928q-0.224-0.448-1.12-2.688t-1.6-3.584-1.28-2.112q-0.544-0.576-1.12-0.608t-1.152 0.384-1.152 1.12-1.184 1.568-1.152 1.696-1.152 1.6-1.088 1.184-1.088 0.448q-0.576 0-1.664-1.44-0.16-0.192-0.48-0.608-1.12-1.504-1.6-1.824-0.768-0.512-1.184 0.352-0.224 0.512-0.928 2.24t-1.056 2.56v0.64zM6.016 9.024q0 1.248 0.864 2.112t2.112 0.864 2.144-0.864 0.864-2.112-0.864-2.144-2.144-0.864-2.112 0.864-0.864 2.144z"></path>{" "}
      </g>
    </svg>
  );
}

export function TrashIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
}

export function CarouselLeftArrow(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      className="w-4 h-4 text-white rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 1 1 5l4 4"
      />
    </svg>
  );
}

export function CarouselRightArrow(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      className="w-4 h-4 text-white rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 9 4-4-4-4"
      />
    </svg>
  );
}

export function BedIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 14 14"
      role="img"
      focusable="false"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M 4.3,7 C 5.1270625,7 5.8,6.32706 5.8,5.5 5.8,4.67294 5.1270625,4 4.3,4 3.4729375,4 2.8,4.67294 2.8,5.5 2.8,6.32706 3.4729375,7 4.3,7 Z m 6.6,-2.4 -4.2,0 C 6.53425,4.6 6.4,4.73425 6.4,4.9 l 0,2.7 -4.2,0 0,-3.9 C 2.2,3.53425 2.06575,3.4 1.9,3.4 l -0.6,0 C 1.13425,3.4 1,3.53425 1,3.7 l 0,6.6 c 0,0.16575 0.13425,0.3 0.3,0.3 l 0.6,0 c 0.16575,0 0.3,-0.13425 0.3,-0.3 l 0,-0.9 9.6,0 0,0.9 c 0,0.16575 0.13425,0.3 0.3,0.3 l 0.6,0 c 0.16575,0 0.3,-0.13425 0.3,-0.3 L 13,6.7 C 13,5.54013 12.059875,4.6 10.9,4.6 Z"></path>
      </g>
    </svg>
  );
}

export function BathIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M32,384a95.4,95.4,0,0,0,32,71.09V496a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V480H384v16a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V455.09A95.4,95.4,0,0,0,480,384V336H32ZM496,256H80V69.25a21.26,21.26,0,0,1,36.28-15l19.27,19.26c-13.13,29.88-7.61,59.11,8.62,79.73l-.17.17A16,16,0,0,0,144,176l11.31,11.31a16,16,0,0,0,22.63,0L283.31,81.94a16,16,0,0,0,0-22.63L272,48a16,16,0,0,0-22.62,0l-.17.17c-20.62-16.23-49.83-21.75-79.73-8.62L150.22,20.28A69.25,69.25,0,0,0,32,69.25V256H16A16,16,0,0,0,0,272v16a16,16,0,0,0,16,16H496a16,16,0,0,0,16-16V272A16,16,0,0,0,496,256Z"></path>
      </g>
    </svg>
  );
}

export function PaymentIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M31,7H1A1,1,0,0,0,0,8V24a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V8A1,1,0,0,0,31,7ZM25.09,23H6.91A6,6,0,0,0,2,18.09V13.91A6,6,0,0,0,6.91,9H25.09A6,6,0,0,0,30,13.91v4.18A6,6,0,0,0,25.09,23ZM30,11.86A4,4,0,0,1,27.14,9H30ZM4.86,9A4,4,0,0,1,2,11.86V9ZM2,20.14A4,4,0,0,1,4.86,23H2ZM27.14,23A4,4,0,0,1,30,20.14V23Z"></path>{" "}
        <path d="M7.51.71a1,1,0,0,0-.76-.1,1,1,0,0,0-.61.46l-2,3.43a1,1,0,0,0,1.74,1L7.38,2.94l5.07,2.93a1,1,0,0,0,1-1.74Z"></path>{" "}
        <path d="M24.49,31.29a1,1,0,0,0,.5.14.78.78,0,0,0,.26,0,1,1,0,0,0,.61-.46l2-3.43a1,1,0,1,0-1.74-1l-1.48,2.56-5.07-2.93a1,1,0,0,0-1,1.74Z"></path>{" "}
        <path d="M16,10a6,6,0,1,0,6,6A6,6,0,0,0,16,10Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,16,20Z"></path>{" "}
      </g>
    </svg>
  );
}

export function PetIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 -1 26 26"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinejoin="round"
        strokeLinecap="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="m12.189 5.376v.031c0 .624-.109 1.223-.308 1.779l.012-.037c-.209.576-.546 1.063-.98 1.442l-.004.003c-.421.379-.981.61-1.595.61-.016 0-.032 0-.048 0h.002c-.843-.006-1.605-.348-2.16-.899-.624-.574-1.114-1.282-1.427-2.079l-.013-.038c-.287-.698-.458-1.507-.469-2.355v-.004c0-.009 0-.02 0-.031 0-.624.109-1.223.308-1.779l-.012.037c.209-.576.546-1.063.98-1.442l.004-.003c.421-.379.982-.611 1.596-.611.018 0 .036 0 .054.001h-.003c.843.005 1.606.347 2.16.899.617.573 1.104 1.279 1.416 2.071l.013.038c.289.7.46 1.513.469 2.364v.003zm-5.345 7.548c.001.025.001.054.001.084 0 .782-.246 1.506-.665 2.1l.008-.012c-.393.561-1.037.924-1.765.924-.033 0-.066-.001-.099-.002h.005c-.853-.011-1.628-.338-2.214-.87l.003.003c-1.264-1.089-2.073-2.677-2.117-4.454v-.008c-.001-.024-.001-.053-.001-.082 0-.785.246-1.513.665-2.11l-.008.012c.391-.566 1.036-.932 1.767-.932.032 0 .065.001.097.002h-.005c.853.011 1.628.338 2.214.87l-.003-.003c1.266 1.095 2.074 2.689 2.117 4.473v.007zm6.161-.422c1.521.087 2.896.646 3.998 1.531l-.014-.011c1.419 1.013 2.608 2.242 3.547 3.652l.032.051c.824 1.103 1.351 2.471 1.439 3.957l.001.02c.001.026.002.057.002.087 0 .404-.099.786-.274 1.121l.006-.013c-.172.311-.432.554-.748.699l-.01.004c-.291.139-.63.248-.984.309l-.024.003c-.336.055-.722.086-1.116.086-.025 0-.05 0-.075 0h.004c-1.074-.074-2.071-.326-2.988-.726l.058.023c-.835-.37-1.804-.621-2.82-.701l-.031-.002c-1.103.082-2.125.33-3.075.719l.067-.024c-.921.377-1.989.626-3.105.694l-.028.001q-2.866.002-2.866-2.279c.048-1.109.367-2.134.892-3.022l-.017.03c.617-1.149 1.341-2.138 2.184-3.012l-.004.004c.845-.881 1.808-1.639 2.868-2.249l.062-.033c.859-.54 1.893-.877 3.003-.921h.012zm3.735-3.297c-.014 0-.03 0-.046 0-.614 0-1.174-.232-1.597-.612l.002.002c-.438-.383-.776-.869-.976-1.422l-.008-.024c-.188-.519-.297-1.118-.297-1.742 0-.011 0-.022 0-.033v.002c.009-.855.18-1.667.485-2.411l-.016.044c.326-.831.812-1.536 1.426-2.106l.004-.003c.554-.551 1.317-.893 2.159-.898h.001.046c.614 0 1.174.232 1.597.612l-.002-.002c.438.383.776.869.976 1.422l.008.024c.191.522.301 1.125.301 1.753v.02-.001c-.01.852-.182 1.662-.485 2.403l.016-.044c-.326.835-.816 1.543-1.436 2.113l-.004.004c-.555.549-1.317.891-2.159.896h-.001zm6.75-1.624c.028-.001.06-.002.092-.002.731 0 1.376.366 1.762.925l.005.007c.411.586.657 1.313.657 2.099 0 .029 0 .057-.001.086v-.004c-.044 1.785-.853 3.373-2.109 4.454l-.008.007c-.583.529-1.358.856-2.209.867h-.002c-.028.001-.061.002-.094.002-.728 0-1.372-.362-1.76-.917l-.005-.007c-.411-.582-.657-1.307-.657-2.088 0-.029 0-.059.001-.088v.004c.043-1.791.851-3.385 2.109-4.474l.008-.007c.583-.527 1.356-.854 2.205-.865h.002z"></path>
      </g>
    </svg>
  );
}

export function ResizeIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      enableBackground="new 0 0 32 32"
      xmlSpace="preserve"
      fill="currentColor"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <line
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeMiterlimit="10"
          x1="6"
          y1="26"
          x2="26"
          y2="6"
        ></line>{" "}
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="13,27 5,27 5,19 "
        ></polyline>{" "}
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="19,5 27,5 27,13 "
        ></polyline>{" "}
        <line
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeMiterlimit="10"
          x1="6"
          y1="6"
          x2="26"
          y2="26"
        ></line>{" "}
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="5,13 5,5 13,5 "
        ></polyline>{" "}
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="27,19 27,27 19,27 "
        ></polyline>{" "}
      </g>
    </svg>
  );
}

export function MenuIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="-2.5 0 19 19"
      xmlns="http://www.w3.org/2000/svg"
      className="cf-icon-svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M.789 4.836a1.03 1.03 0 0 1 1.03-1.029h10.363a1.03 1.03 0 1 1 0 2.059H1.818A1.03 1.03 0 0 1 .79 4.836zm12.422 4.347a1.03 1.03 0 0 1-1.03 1.029H1.819a1.03 1.03 0 0 1 0-2.059h10.364a1.03 1.03 0 0 1 1.029 1.03zm0 4.345a1.03 1.03 0 0 1-1.03 1.03H1.819a1.03 1.03 0 1 1 0-2.059h10.364a1.03 1.03 0 0 1 1.029 1.03z"></path>
      </g>
    </svg>
  );
}

export function PropertyIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z"
          fill="currentColor"
        ></path>{" "}
      </g>
    </svg>
  );
}

export function ProfileIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z"
          fill="currentColor"
        ></path>{" "}
        <path
          d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z"
          fill="currentColor"
        ></path>{" "}
      </g>
    </svg>
  );
}

export function LeaveIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      className="flex-shrink-0 w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 16"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
      />
    </svg>
  );
}

export function BankIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      xmlSpace="preserve"
      fill="currentColor"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <circle fill="currentColor" cx="32" cy="14" r="3"></circle>{" "}
          <path
            fill="currentColor"
            d="M4,25h56c1.794,0,3.368-1.194,3.852-2.922c0.484-1.728-0.242-3.566-1.775-4.497l-28-17 C33.438,0.193,32.719,0,32,0s-1.438,0.193-2.076,0.581l-28,17c-1.533,0.931-2.26,2.77-1.775,4.497C0.632,23.806,2.206,25,4,25z M32,9c2.762,0,5,2.238,5,5s-2.238,5-5,5s-5-2.238-5-5S29.238,9,32,9z"
          ></path>{" "}
          <rect x="34" y="27" fill="currentColor" width="8" height="25"></rect>{" "}
          <rect x="46" y="27" fill="currentColor" width="8" height="25"></rect>{" "}
          <rect x="22" y="27" fill="currentColor" width="8" height="25"></rect>{" "}
          <rect x="10" y="27" fill="currentColor" width="8" height="25"></rect>{" "}
          <path
            fill="currentColor"
            d="M4,58h56c0-2.209-1.791-4-4-4H8C5.791,54,4,55.791,4,58z"
          ></path>{" "}
          <path
            fill="currentColor"
            d="M63.445,60H0.555C0.211,60.591,0,61.268,0,62v2h64v-2C64,61.268,63.789,60.591,63.445,60z"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export function ReportIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 1000 1000"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      enableBackground="new 0 0 1000 1000"
      xmlSpace="preserve"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <metadata>
          {" "}
          Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
        </metadata>{" "}
        <g>
          {" "}
          <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
            {" "}
            <path d="M1685.8,4989.2c-253.7-58.9-499.3-265.9-621.1-519.6l-75.1-158.3l-6.1-4141c-4.1-2772.8,2-4173.4,16.2-4238.4c56.8-267.9,257.8-513.6,523.7-639.4l156.3-75.1l3258-6.1c2174-4.1,3290.4,2,3355.4,16.2c326.8,69,627.2,365.4,702.4,692.2c14.2,58.9,22.3,1049.5,22.3,2809.4c0,2616.5-2,2724.1-38.6,2801.2c-48.7,101.5-3373.6,3428.5-3458.9,3460.9C5449.2,5017.6,1797.5,5015.6,1685.8,4989.2z M4856.5,3087.2c0-1433.1,2-1451.4,115.7-1648.3c89.3-152.2,253.7-298.4,426.3-381.6l158.3-75.1l1427-6.1l1425-6.1v-2494.7c0-1891.9-6.1-2506.9-24.4-2547.5c-52.8-117.7,148.2-111.6-3385.8-111.6s-3333.1-6.1-3385.8,111.6c-38.6,81.2-34.5,8302.2,4.1,8371.2c58.9,105.6,12.2,101.5,1682.8,103.5h1556.9V3087.2z M6866.1,1585.1c-1351.9-4.1-1337.7-6.1-1380.3,109.6c-12.2,30.5-20.3,552.1-20.3,1293V4230l1319.4-1319.4l1319.4-1319.4L6866.1,1585.1z"></path>{" "}
            <path d="M2989-327.1v-304.5h2009.6h2009.6v304.5v304.5H4998.6H2989V-327.1z"></path>{" "}
            <path d="M2989-1646.5V-1951h2009.6h2009.6v304.5v304.5H4998.6H2989V-1646.5z"></path>{" "}
            <path d="M2989-2925.3v-304.5h954.1h954v304.5v304.5h-954H2989V-2925.3z"></path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export function AdsIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="currentColor"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 392.58 392.58"
      xmlSpace="preserve"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M161.413,268.135c-6.012,0-10.925,4.848-10.925,10.925v32.97c0,6.012,4.849,10.925,10.925,10.925 c6.077,0,10.925-4.848,10.925-10.925v-32.97C172.273,272.984,167.425,268.135,161.413,268.135z"></path>{" "}
          </g>{" "}
        </g>{" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M322.318,97.986V10.843c-1.164-11.96-11.895-11.766-15.451-9.891L137.041,80.337H32.249 c-6.012,0-10.925,4.849-10.925,10.925V222.56c0,6.012,4.849,10.925,10.925,10.925h9.826l30.125,150.368 c1.034,5.107,5.495,8.727,10.667,8.727h59.992h0.065c6.012,0,10.925-4.848,10.925-10.925c0-1.228-29.608-148.234-29.608-148.234 h12.735l169.762,79.386c12.865,3.168,15.451-6.206,15.451-9.891v-87.143c27.927-5.172,49.067-29.608,49.067-58.958 C371.385,127.529,350.245,103.158,322.318,97.986z M129.542,370.729H91.853L64.314,233.42h37.689L129.542,370.729z M130.706,211.634H43.174V102.123h87.531V211.634z M300.532,285.719l-147.976-69.172v-34.392h4.461 c6.012,0,10.925-4.849,10.925-10.925c0-6.012-4.848-10.925-10.925-10.925h-4.461v-21.786h26.246 c6.012,0,10.925-4.848,10.925-10.925c0-6.012-4.849-10.925-10.925-10.925h-26.246V97.016l147.976-69.172V285.719z M322.318,193.469v-73.115c15.774,4.719,27.281,19.329,27.281,36.525C349.599,174.139,338.092,188.75,322.318,193.469z"></path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export function NoPetIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="currentColor"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 487.549 487.549"
      xmlSpace="preserve"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <g>
              {" "}
              <path d="M352.634,410.996L101.388,159.733h-3.641c-14.157,0-27.082,4.809-37.633,12.672L25.915,146.75 c-7.148-5.363-17.289-3.891-22.668,3.242c-5.379,7.164-3.923,17.32,3.241,22.668l33.317,24.992 c-3.418,7.785-5.395,16.355-5.395,25.422v87.841c0,11.323,7.895,20.77,18.477,23.254l-7.422,16.354 c-6.77,14.979-7.922,31.892-3.289,47.645l17.387,58.88c3.813,12.938,15.661,21.336,28.504,21.336 c2.785,0,5.648-0.396,8.445-1.229c15.758-4.652,24.741-21.185,20.105-36.938l-17.398-58.875c-0.602-2.09-0.445-4.305,0.441-6.267 l10.395-22.938c4.762-10.504,15.25-17.272,26.797-17.272h100.304c19.997,0,37.458,13.478,42.566,32.793l23.331,88.535 c3.496,13.352,15.552,22.176,28.728,22.176c2.517,0,5.048-0.315,7.578-0.996c15.914-4.19,25.371-20.453,21.181-36.332 L352.634,410.996z"></path>{" "}
              <path d="M480.208,148.52l-48.23-62.516c-7.862-10.199-18.206-17.906-29.814-22.73l-35.04-49.02 c-2.754-3.859-7.5-5.758-12.146-4.875c-4.653,0.902-8.354,4.414-9.492,9.02l-12.971,52.296 c-5.362,3.729-10.332,8.098-14.602,13.238c-7.75,9.348-12.91,20.328-15.281,31.906c-1.489,7.262-5.062,13.938-10.297,19.172 l-0.031,0.031c-9.762,9.777-21.801,16.516-34.754,20.531l85.879,85.863c1.707-2.941,3.43-5.883,5.504-8.621l18-23.742 l44.185,22.621c14.693,7.496,32.634,3.828,43.168-8.859l25.138-30.246C489.953,179.892,490.285,161.585,480.208,148.52z"></path>{" "}
              <path d="M107.001,50.824c-9.493-9.488-24.867-9.488-34.355,0c-9.492,9.492-9.492,24.867,0,34.359L381.47,394.023 c4.746,4.745,10.961,7.12,17.181,7.12c6.215,0,12.435-2.375,17.181-7.12c9.487-9.488,9.487-24.867,0-34.354L107.001,50.824z"></path>{" "}
            </g>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export function AllowPetIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="currentColor"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 487.546 487.546"
      xmlSpace="preserve"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M480.206,148.523l-48.23-62.531c-7.857-10.195-18.206-17.898-29.815-22.723l-35.038-49.023 c-2.754-3.852-7.497-5.75-12.147-4.863c-4.651,0.895-8.353,4.406-9.491,9l-12.97,52.305c-5.362,3.727-10.332,8.098-14.604,13.238 c-7.756,9.34-12.903,20.328-15.276,31.914c-1.484,7.252-5.062,13.93-10.296,19.167l-0.036,0.037 c-15.805,15.805-37.236,24.688-59.59,24.688H97.745c-14.157,0-27.078,4.809-37.629,12.66L25.913,146.75 c-7.148-5.371-17.29-3.898-22.668,3.234c-5.375,7.16-3.923,17.316,3.245,22.676l33.313,24.988 c-3.418,7.789-5.396,16.363-5.396,25.418v87.832c0,11.344,7.896,20.775,18.478,23.27l-7.418,16.355 c-6.773,14.973-7.926,31.891-3.293,47.647l17.387,58.875c3.813,12.94,15.659,21.332,28.504,21.332 c2.785,0,5.648-0.402,8.449-1.234c15.754-4.651,24.738-21.188,20.105-36.944l-17.402-58.875c-0.602-2.074-0.442-4.306,0.44-6.258 l10.392-22.93c4.769-10.522,15.253-17.282,26.806-17.282h100.299c19.998,0,37.458,13.47,42.566,32.793l23.333,88.535 c3.496,13.345,15.552,22.181,28.728,22.181c2.517,0,5.047-0.324,7.579-0.996c15.913-4.185,25.374-20.461,21.179-36.336 l-28.741-109.125v-48.168c0-18.396,6.012-36.271,17.133-50.926l18-23.738l44.185,22.605c14.694,7.516,32.633,3.828,43.168-8.859 l25.137-30.242C489.952,179.882,490.284,161.583,480.206,148.523z"></path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export function NodataIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z"
          stroke="currentColor"
          strokeWidth="1.5"
        ></path>{" "}
        <path
          opacity="0.5"
          d="M10.5 15L13.5 12M13.5 15L10.5 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>{" "}
      </g>
    </svg>
  );
}

export function PhoneIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
}

export function EmailIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 35 35"
      data-name="Layer 2"
      id="ee13b174-13f0-43ea-b921-f168b1054f8d"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M29.384,30.381H5.615A5.372,5.372,0,0,1,.25,25.015V9.984A5.371,5.371,0,0,1,5.615,4.619H29.384A5.372,5.372,0,0,1,34.75,9.984V25.015A5.372,5.372,0,0,1,29.384,30.381ZM5.615,7.119A2.868,2.868,0,0,0,2.75,9.984V25.015a2.868,2.868,0,0,0,2.865,2.866H29.384a2.869,2.869,0,0,0,2.866-2.866V9.984a2.869,2.869,0,0,0-2.866-2.865Z"></path>
        <path d="M17.486,20.865a4.664,4.664,0,0,1-2.9-.975L1.218,9.237A1.25,1.25,0,1,1,2.777,7.282L16.141,17.935a2.325,2.325,0,0,0,2.7-.007L32.04,7.287a1.249,1.249,0,1,1,1.569,1.945L20.414,19.873A4.675,4.675,0,0,1,17.486,20.865Z"></path>
      </g>
    </svg>
  );
}

export function AccountIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className=""
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M0 0h48v48H0z" fill="none"></path>{" "}
        <g id="Shopicon">
          {" "}
          <path d="M31.278,25.525C34.144,23.332,36,19.887,36,16c0-6.627-5.373-12-12-12c-6.627,0-12,5.373-12,12 c0,3.887,1.856,7.332,4.722,9.525C9.84,28.531,5,35.665,5,44h38C43,35.665,38.16,28.531,31.278,25.525z M16,16c0-4.411,3.589-8,8-8 s8,3.589,8,8c0,4.411-3.589,8-8,8S16,20.411,16,16z M24,28c6.977,0,12.856,5.107,14.525,12H9.475C11.144,33.107,17.023,28,24,28z"></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export function ChartIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="" {...props}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M20 13.75C20 13.3358 19.6642 13 19.25 13H16.25C15.8358 13 15.5 13.3358 15.5 13.75V20.5H14V4.25C14 3.52169 13.9984 3.05091 13.9518 2.70403C13.908 2.37872 13.8374 2.27676 13.7803 2.21967C13.7232 2.16258 13.6213 2.09197 13.296 2.04823C12.9491 2.00159 12.4783 2 11.75 2C11.0217 2 10.5509 2.00159 10.204 2.04823C9.87872 2.09197 9.77676 2.16258 9.71967 2.21967C9.66258 2.27676 9.59196 2.37872 9.54823 2.70403C9.50159 3.05091 9.5 3.52169 9.5 4.25V20.5H8V8.75C8 8.33579 7.66421 8 7.25 8H4.25C3.83579 8 3.5 8.33579 3.5 8.75V20.5H2H1.75C1.33579 20.5 1 20.8358 1 21.25C1 21.6642 1.33579 22 1.75 22H21.75C22.1642 22 22.5 21.6642 22.5 21.25C22.5 20.8358 22.1642 20.5 21.75 20.5H21.5H20V13.75Z"
          fill="currentColor"
        ></path>{" "}
      </g>
    </svg>
  );
}
