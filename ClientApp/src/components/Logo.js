import PropTypes from 'prop-types';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </g>
      </svg> */}

      <svg width="100%" height="100%" viewBox="0 0 413 212" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M49.4062 164.203C50.3939 164.203 51.2214 164.55 51.8887 165.244C52.5827 165.911 52.9297 166.739 52.9297 167.727C52.9297 168.714 52.5827 169.555 51.8887 170.249C51.2214 170.916 50.3939 171.25 49.4062 171.25C48.4186 171.25 47.5911 170.916 46.9238 170.249C46.2298 169.555 45.8828 168.714 45.8828 167.727C45.8828 166.739 46.2298 165.911 46.9238 165.244C47.5911 164.55 48.4186 164.203 49.4062 164.203ZM40.8779 164.203C41.8656 164.203 42.693 164.55 43.3604 165.244C44.0544 165.911 44.4014 166.739 44.4014 167.727C44.4014 168.714 44.0544 169.555 43.3604 170.249C42.693 170.916 41.8656 171.25 40.8779 171.25C39.8903 171.25 39.0628 170.916 38.3955 170.249C37.7015 169.555 37.3545 168.714 37.3545 167.727C37.3545 166.739 37.7015 165.911 38.3955 165.244C39.0628 164.55 39.8903 164.203 40.8779 164.203ZM80.1162 161C76.0322 160.653 72.8825 159.132 70.667 156.436C69.5726 158.331 67.7842 159.625 65.3018 160.319C63.6468 160.773 61.3913 161 58.5352 161H30.1475C26.9443 161 24.3285 160.653 22.2998 159.959C17.5218 158.357 14.0117 155.234 11.7695 150.59C9.52734 145.972 9.28711 141.301 11.0488 136.576H15.9736C15.0127 139.112 14.5589 141.728 14.6123 144.424C14.6657 147.093 15.2262 149.522 16.2939 151.711C17.415 154.007 18.9766 155.808 20.9785 157.116C23.1406 158.504 25.6631 159.198 28.5459 159.198H60.5371C61.2845 159.172 61.9385 159.132 62.499 159.078C63.9137 158.891 65.1149 158.424 66.1025 157.677C68.4515 155.835 69.4658 153.793 69.1455 151.551C68.585 147.867 66.8766 144.784 64.0205 142.302C61.1377 139.819 57.8011 138.578 54.0107 138.578C51.4482 138.578 48.6722 139.339 45.6826 140.86C42.6663 142.409 40.571 144.13 39.3965 146.025C39.3698 146.052 39.3698 146.039 39.3965 145.985C39.4232 145.905 39.4632 145.812 39.5166 145.705C39.5967 145.572 39.6768 145.438 39.7568 145.305C39.8636 145.118 39.9837 144.918 40.1172 144.704C40.4375 144.197 40.7845 143.703 41.1582 143.223C41.612 142.582 42.1191 141.995 42.6797 141.461C44.041 140.046 45.5625 138.938 47.2441 138.138C49.3262 137.123 51.5817 136.616 54.0107 136.616C58.3083 136.616 62.0853 138.031 65.3418 140.86C68.5449 143.663 70.4535 147.173 71.0674 151.391C71.361 153.419 72.3887 155.181 74.1504 156.676C75.9121 158.224 77.9007 159.065 80.1162 159.198V161ZM99.5352 161H80.0762V159.198H99.5352V161ZM118.994 161H99.5352V159.198H118.994V161ZM138.453 161H118.994V159.198H138.453V161ZM149.544 143.303C149.544 139.245 150.905 135.522 153.628 132.132C157.071 127.808 161.889 125.646 168.082 125.646C173.34 125.646 177.678 127.114 181.095 130.05C184.698 133.146 186.5 137.31 186.5 142.542C186.5 146.092 185.619 149.349 183.857 152.312C182.016 155.461 179.453 157.757 176.17 159.198H197.591V161H138.453V159.198H159.193C155.937 157.57 153.454 155.194 151.746 152.071C150.278 149.375 149.544 146.452 149.544 143.303ZM154.389 142.062C154.389 147.453 155.883 151.711 158.873 154.834C161.622 157.69 165.039 159.118 169.123 159.118C172.727 159.118 175.663 157.917 177.932 155.515C180.494 152.792 181.775 148.908 181.775 143.863C181.775 138.872 180.401 134.828 177.651 131.731C175.009 128.769 171.726 127.287 167.802 127.287C163.718 127.287 160.488 128.542 158.112 131.051C155.63 133.667 154.389 137.337 154.389 142.062ZM163.958 113.434C164.946 113.434 165.773 113.781 166.44 114.475C167.134 115.142 167.481 115.969 167.481 116.957C167.481 117.945 167.134 118.785 166.44 119.479C165.773 120.147 164.946 120.48 163.958 120.48C162.997 120.48 162.17 120.147 161.476 119.479C160.782 118.785 160.435 117.945 160.435 116.957C160.435 115.996 160.782 115.169 161.476 114.475C162.17 113.781 162.997 113.434 163.958 113.434ZM172.566 113.434C173.527 113.434 174.355 113.781 175.049 114.475C175.743 115.169 176.09 115.996 176.09 116.957C176.09 117.945 175.743 118.785 175.049 119.479C174.355 120.147 173.527 120.48 172.566 120.48C171.579 120.48 170.751 120.147 170.084 119.479C169.39 118.785 169.043 117.945 169.043 116.957C169.043 115.969 169.39 115.142 170.084 114.475C170.751 113.781 171.579 113.434 172.566 113.434ZM217.09 161H197.631V159.198H217.09V161ZM236.549 161H217.09V159.198H236.549V161ZM256.008 161H236.549V159.198H256.008V161ZM256.008 159.198C257.583 159.172 259.158 158.664 260.732 157.677C262.654 156.476 263.962 154.634 264.656 152.151C265.11 150.496 265.337 148.147 265.337 145.104V129.89C265.337 128.875 265.203 128.115 264.937 127.607C264.536 126.86 263.829 126.486 262.814 126.486C262.12 126.486 261.693 126.46 261.533 126.406C261.4 126.38 261.333 126.273 261.333 126.086C261.333 125.952 261.413 125.846 261.573 125.766L266.858 125.726C269.181 125.699 270.916 125.686 272.063 125.686C272.571 125.686 272.824 125.819 272.824 126.086C272.824 126.246 272.664 126.353 272.344 126.406L272.063 126.446L271.823 126.486C271.583 126.513 271.383 126.553 271.223 126.606C270.155 126.873 269.621 127.688 269.621 129.049V142.622C269.594 144.09 269.541 145.358 269.461 146.426C269.247 149.229 268.78 151.537 268.06 153.353C266.218 157.944 262.201 160.493 256.008 161V159.198ZM268.66 164.203C267.673 164.203 266.845 164.55 266.178 165.244C265.484 165.911 265.137 166.739 265.137 167.727C265.137 168.714 265.484 169.555 266.178 170.249C266.845 170.916 267.673 171.25 268.66 171.25C269.648 171.25 270.475 170.916 271.143 170.249C271.837 169.555 272.184 168.714 272.184 167.727C272.184 166.739 271.837 165.911 271.143 165.244C270.475 164.55 269.648 164.203 268.66 164.203ZM260.132 164.203C259.144 164.203 258.317 164.55 257.649 165.244C256.955 165.911 256.608 166.739 256.608 167.727C256.608 168.714 256.955 169.555 257.649 170.249C258.317 170.916 259.144 171.25 260.132 171.25C261.119 171.25 261.947 170.916 262.614 170.249C263.308 169.555 263.655 168.714 263.655 167.727C263.655 166.739 263.308 165.911 262.614 165.244C261.947 164.55 261.119 164.203 260.132 164.203ZM283.795 147.307C283.928 150.563 284.582 153.152 285.757 155.074C287.305 157.663 289.747 159.038 293.084 159.198V161C288.92 160.653 285.77 159.118 283.635 156.396C283.661 156.636 283.675 156.996 283.675 157.477C283.675 160.573 282.634 163.309 280.552 165.685C278.657 167.793 276.081 169.448 272.824 170.649C275.84 167.74 277.576 165.791 278.029 164.804C279.044 162.562 279.551 158.224 279.551 151.791V137.337C279.524 136.429 279.511 135.442 279.511 134.374V129.129C279.511 128.408 279.377 127.834 279.11 127.407C278.763 126.82 278.149 126.526 277.269 126.526C277.188 126.526 277.055 126.54 276.868 126.566L276.428 126.606C276.188 126.606 276.001 126.566 275.867 126.486C275.654 126.38 275.547 126.219 275.547 126.006C275.547 125.899 275.627 125.806 275.787 125.726L281.072 125.686C283.395 125.659 285.13 125.646 286.277 125.646C286.758 125.646 286.998 125.779 286.998 126.046C286.998 126.259 286.878 126.38 286.638 126.406L286.397 126.446H286.117C285.877 126.473 285.65 126.513 285.437 126.566C284.769 126.727 284.315 126.993 284.075 127.367C283.888 127.688 283.795 128.235 283.795 129.009V147.307ZM312.543 161H293.084V159.198H312.543V161ZM332.002 161H312.543V159.198H332.002V161ZM351.461 161H332.002V159.198H351.461V161ZM351.461 161V159.198H360.99C361.017 156.716 361.03 149.535 361.03 137.657C361.03 130.69 361.017 124.604 360.99 119.399C360.964 113.634 360.937 110.417 360.91 109.75C360.83 108.656 360.483 107.922 359.869 107.548C359.389 107.281 358.561 107.147 357.387 107.147C357.146 107.094 357.026 107.014 357.026 106.907C357.026 106.8 357.106 106.694 357.267 106.587C357.427 106.48 357.6 106.427 357.787 106.427H367.797C368.277 106.427 368.518 106.587 368.518 106.907C368.518 107.041 368.384 107.121 368.117 107.147C367.156 107.147 366.476 107.334 366.075 107.708C365.621 108.108 365.368 108.789 365.314 109.75C365.261 110.524 365.234 117.744 365.234 131.411C366.836 129.729 368.331 128.448 369.719 127.567C371.561 126.366 373.349 125.766 375.084 125.766H394.623C394.97 125.766 395.451 125.792 396.064 125.846C400.709 126.219 404.486 127.901 407.396 130.891C410.438 133.987 411.973 137.911 412 142.662C412 147.734 410.305 152.045 406.915 155.595C403.498 159.198 399.308 161 394.343 161H351.461ZM394.022 159.198C398.08 159.198 401.336 157.73 403.792 154.794C406.168 151.991 407.355 148.401 407.355 144.023C407.355 139.806 406.341 136.109 404.312 132.933C402.017 129.356 398.974 127.567 395.184 127.567H375.084C372.201 127.567 369.839 128.969 367.997 131.771C366.449 134.147 365.528 137.03 365.234 140.42V159.198H394.022Z"
          fill="#FDA92D"
        />
        <path
          d="M93.5 30.2156C94.1821 25.4411 107.755 22.2658 117.422 20.8136C118.486 20.6539 118.951 22.0227 118.025 22.571L110.567 26.9904C109.802 27.4438 109.965 28.5955 110.826 28.8187L116.958 30.4083C120.313 31.2782 123.737 31.8557 127.192 32.1343L214.72 39.193C214.901 39.2076 215.07 39.2859 215.198 39.4139C215.679 39.8942 215.338 40.7156 214.659 40.7156H141.5C125.167 39.5489 92.7 35.8156 93.5 30.2156Z"
          fill="#FDA92D"
          stroke="#FDA92D"
        />
        <path
          d="M323.5 36.7156C286.3 33.9156 253.333 46.5489 241.5 53.2156C247.5 52.2156 261.3 49.6156 268.5 47.2156C277.5 44.2156 298.5 44.2156 313.5 44.2156C328.5 44.2156 337 47.7156 350.5 52.7156C364 57.7156 388.5 77.2156 395 79.7156C400.2 81.7156 408.167 79.8823 411.5 78.7156C397.667 65.8823 360.7 39.5156 323.5 36.7156Z"
          fill="#023047"
          stroke="#023047"
        />
        <path
          d="M209 3.71558C149 -8.28442 73.3333 22.3822 43 39.2156C57.1667 32.3822 100.4 17.4156 160 12.2156C219.6 7.01558 259.167 30.3822 271.5 42.7156L287 37.7156C257 13.7156 222.5 5.04891 209 3.71558Z"
          fill="#FDA92D"
          stroke="#FDA92D"
        />
        <path d="M35.5 49.7156L15.5 66.7156L8 41.7156L60.5 39.7156L35.5 49.7156Z" fill="#023047" stroke="#023047" />
      </svg>
    </Box>
  );
}