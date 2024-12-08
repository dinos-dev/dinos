import { Svg, Path, Rect } from 'react-native-svg'

export function HomeIcon({ fill }: { fill: string }) {
  return (
    <Svg width="17" height="19" viewBox="0 0 17 19" fill="none">
      <Path
        d="M0 6.99417V18.3C0 18.4105 0.0895429 18.5 0.2 18.5H7.3C7.41046 18.5 7.5 18.4105 7.5 18.3V12C7.5 11.4477 7.94772 11 8.5 11C9.05229 11 9.5 11.4477 9.5 12V18.3C9.5 18.4105 9.58954 18.5 9.7 18.5H16.8C16.9105 18.5 17 18.4105 17 18.3V6.99417C17 6.6827 16.8549 6.38902 16.6075 6.19981L9.10745 0.464521C8.74889 0.190331 8.25111 0.190331 7.89255 0.46452L0.39255 6.19981C0.145131 6.38902 0 6.6827 0 6.99417Z"
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
HeartIcon.title = '찜'

export function GalleryIcon({ fill }: { fill: string }) {
  return (
    <Svg width="17" height="19" viewBox="0 0 17 19" fill="none">
      <Path
        d="M0 1C0 0.447715 0.447715 0 1 0H16C16.5523 0 17 0.447715 17 1V13.7396C17 14.2294 16.8202 14.7022 16.4948 15.0683L13.5967 18.3287C13.2172 18.7557 12.6731 19 12.1019 19H1C0.447715 19 0 18.5523 0 18V1Z"
        fill={fill}
      />
      <Path d="M5 6H12" stroke="#F4F4F4" strokeWidth="2" strokeLinecap="round" />
      <Path d="M5 11H12" stroke="#F4F4F4" strokeWidth="2" strokeLinecap="round" />
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
DinoIcon.title = '다이노'
