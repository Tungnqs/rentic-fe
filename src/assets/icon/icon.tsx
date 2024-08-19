import React from "react";

export function MessageIcon(props: React.HTMLAttributes<SVGElement>) {
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
        d="M16 6H8a4 4 0 00-4 4v8h12a4 4 0 004-4v-4a4 4 0 00-4-4zM8 4a6 6 0 00-6 6v10h14a6 6 0 006-6v-4a6 6 0 00-6-6H8zm0 5h8v2H8V9zm3 4H8v2h3v-2z"
        clipRule="evenodd"
      ></path>
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
        fill-rule="evenodd"
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
          stroke="#ffffff"
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
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>item-details</title>{" "}
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
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
      fill="#ffffff"
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
