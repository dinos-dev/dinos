# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Proguard가 활성화되면(Android 릴리스 빌드의 경우 기본적으로 활성화됨) 
# BuildConfig축소 프로세스에서 Java 클래스의 이름을 바꾸고 React Native Config가 참조하지 못하도록 할 수 있습니다. 
# 이를 방지하려면 다음에 예외를 추가합니다
-keep class com.dinosaurs.dinos.BuildConfig { *; }