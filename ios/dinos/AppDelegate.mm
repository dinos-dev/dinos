#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h>
#import <GoogleSignIn/GoogleSignIn.h>
#import <GoogleMaps/GoogleMaps.h> //애플지도 대신 구글맵 사용하기 위한 import
#import "RNCConfig.h" // 환경변수

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:[RNCConfig envFor:@"MAPS_IOS_API_KEY"]];
  self.moduleName = @"dinos";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  // naver
  if ([url.scheme isEqualToString:@"naverlogin"]) {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];
  }
  // google
  return [GIDSignIn.sharedInstance handleURL:url];
}

@end

