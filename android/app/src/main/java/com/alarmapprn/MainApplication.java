package com.alarmapprn;

import android.app.Application;

// ALARMS NOTIFICATION
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
// IMAGE PICKER
import com.imagepicker.ImagePickerPackage;
// RN SOUND
import com.zmxv.RNSound.RNSoundPackage;
// VECTOR ICONS
import com.oblador.vectoricons.VectorIconsPackage;


import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNSoundPackage(),
          new VectorIconsPackage(),
          new ReactNativePushNotificationPackage(),
          new ImagePickerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
