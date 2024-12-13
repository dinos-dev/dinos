import { Svg, Path, Rect } from 'react-native-svg'

export function HomeIcon({ fill }: { fill: string }) {
  return (
    <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
      <Path
        d="M0 7.00865V18.8C0 18.9105 0.0895431 19 0.2 19H3.83871C3.92779 19 4 18.9278 4 18.8387V15C4 14.4477 4.44772 14 5 14C5.55228 14 6 14.4477 6 15V18.8387C6 18.9278 6.07221 19 6.16129 19H9.8C9.91046 19 10 18.9105 10 18.8V7.00865C10 6.7925 9.92997 6.58217 9.80039 6.40917L5.80039 1.06863C5.40041 0.534602 4.59959 0.534602 4.19961 1.06863L0.199611 6.40917C0.0700343 6.58217 0 6.7925 0 7.00865Z"
        fill={fill}
      />
      <Path
        d="M9 7.00865V18.8C9 18.9105 9.08954 19 9.2 19H12.8C12.9105 19 13 18.9105 13 18.8V12.2973C13 11.745 13.4477 11.2973 14 11.2973C14.5523 11.2973 15 11.745 15 12.2973V18.8C15 18.9105 15.0895 19 15.2 19H18.8C18.9105 19 19 18.9105 19 18.8V7.00865C19 6.7925 18.93 6.58217 18.8004 6.40917L14.8004 1.06863C14.4004 0.534602 13.5996 0.534602 13.1996 1.06863L9.19961 6.40917C9.07003 6.58217 9 6.7925 9 7.00865Z"
        fill={fill}
      />
    </Svg>
  )
}
HomeIcon.title = '홈'

export function HeartIcon({ fill }: { fill: string }) {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
      <Path
        d="M5.5 2H6.07573C7.78434 2 9.26371 3.18671 9.63436 4.85463L9.75 5.375L9.86564 4.85463C10.2363 3.18671 11.7157 2 13.4243 2H14C17.0376 2 19.5 4.46243 19.5 7.5C19.5 9.5 18.5 11.1667 17.5 12.5C16.5215 13.8046 12.6175 17.7171 10.1674 19.9136C9.78975 20.2522 9.21933 20.2412 8.84839 19.8952C6.51482 17.7189 2.59029 13.9537 1.5 12.5C0.5 11.1667 0 9.5 0 7.5C0 4.46243 2.46243 2 5.5 2Z"
        fill={fill}
      />
      <Path d="M5.5 1V1C8.26142 1 10.5 3.23858 10.5 6V6" stroke="#F4F4F4" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  )
}
HeartIcon.title = '리스트'

export function GalleryIcon({ fill }: { fill: string }) {
  return (
    <Svg width="17" height="19" viewBox="0 0 17 19" fill="none">
      <Path
        d="M0 4.82315C0 4.27087 0.447715 3.82315 1 3.82315H12.7619C13.3142 3.82315 13.7619 4.27087 13.7619 4.82315V13.116V15C13.7619 15.5523 13.3142 16 12.7619 16H1C0.447716 16 0 15.5523 0 15V4.82315Z"
        fill={fill}
      />
      <Path
        d="M1.61914 1C1.61914 0.447716 2.06686 0 2.61914 0H16.0001C16.5524 0 17.0001 0.447715 17.0001 1V1.8244C17.0001 2.1371 16.7466 2.3906 16.4339 2.3906H1.61914V1Z"
        fill={fill}
      />
      <Path
        d="M17 -4.83126e-08C17.5523 -2.16303e-08 18 0.447715 18 1L18 15C18 15.5523 17.5523 16 17 16L15.381 16L15.381 1C15.381 0.447716 15.8287 -1.04903e-07 16.381 -7.82204e-08L17 -4.83126e-08Z"
        fill={fill}
      />
    </Svg>
  )
}
GalleryIcon.title = '갤러리'

export function DinoIcon({ fill }: { fill: string }) {
  return (
    <Svg width="16" height="21" viewBox="0 0 16 21" fill="none">
      <Path
        d="M2.53448 0.362061C1.13457 0.362061 0 1.49427 0 2.89654H5.06897C5.06897 1.49427 3.93439 0.362061 2.53448 0.362061Z"
        fill={fill}
      />
      <Path
        d="M7.96565 0C6.16576 0 4.70703 1.29395 4.70703 2.89655H11.2243C11.2243 1.29395 9.76554 0 7.96565 0Z"
        fill={fill}
      />
      <Path
        d="M13.3958 0.362061C11.9959 0.362061 10.8613 1.49427 10.8613 2.89654H15.9303C15.9303 1.49427 14.7957 0.362061 13.3958 0.362061Z"
        fill={fill}
      />
      <Path d="M0 17H16V21H0V17Z" fill={fill} />
      <Rect y="5" width="9" height="11" fill={fill} />
      <Rect y="4" width="16" height="1" fill={fill} />
      <Rect x="9" y="5" width="7" height="11" fill={fill} />
      <Path d="M1.44754 14.4827L2.53374 16.2931H0.361328L1.44754 14.4827Z" fill="#F4F4F4" />
      <Path d="M14.4827 14.4827L15.5689 16.2931H13.3965L14.4827 14.4827Z" fill="#F4F4F4" />
      <Rect x="11.2246" y="9.77588" width="1.44828" height="1.44828" fill="#F4F4F4" />
      <Rect x="3.62109" y="9.77588" width="1.44828" height="1.44828" fill="#F4F4F4" />
      <Rect
        x="2.53516"
        y="7.66553"
        width="1.44828"
        height="1.44828"
        transform="rotate(45 2.53516 7.66553)"
        fill="#F4F4F4"
      />
      <Rect
        x="13.6973"
        y="7.66553"
        width="1.44828"
        height="1.44828"
        transform="rotate(45 13.6973 7.66553)"
        fill="#F4F4F4"
      />
    </Svg>
  )
}
DinoIcon.title = '마이다이노'