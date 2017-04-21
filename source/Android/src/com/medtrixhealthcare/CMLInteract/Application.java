package com.medtrixhealthcare.CMLInteract;

import java.io.BufferedWriter;
import java.io.FileWriter;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.StrictMode;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JsResult;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebSettings.RenderPriority;
import android.webkit.WebView;
import android.webkit.WebViewClient;

@SuppressLint("SetJavaScriptEnabled")
public class Application extends Activity {
	
	public static WebView webView = null;
	public static WebView networkView = null;
	
	private String TAG = "CMLInteract";
	private Handler handler = new Handler();
	
	final Context context = this;
	
	public static String PACKAGE_NAME = null;
	
	private int NETWORK_INTERVAL = 5000;
	
	private boolean appReload = true;
	
	private ValueCallback<Uri> mUploadMessage;
	private final static int FILECHOOSER_RESULTCODE = 1;
	
	// private static String networkCheckUrl =
	// "http://clients3.google.com/generate_204";
	private static String webUrl = "http://apps.medtrixhealthcare.com/cml";
	private static String overWriteUrl = "apps.medtrixhealthcare.com";
	private static String noInternetUrl = "file:///android_asset/noInternet/internet.html";
	
	public void log(String stacktrace) {
		try {
			BufferedWriter bos = new BufferedWriter(new FileWriter(Environment.getExternalStorageDirectory().getPath()
					+ "/cmlinteract/cmlinteract.log", true));
			bos.write(stacktrace);
			bos.newLine();
			bos.write("\r\n");
			bos.flush();
			bos.close();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
		if (requestCode == FILECHOOSER_RESULTCODE) {
			if (null == mUploadMessage)
				return;
			Uri result = intent == null || resultCode != RESULT_OK ? null : intent.getData();
			mUploadMessage.onReceiveValue(result);
			mUploadMessage = null;
		}
	}
	
	@SuppressLint("SdCardPath")
	@SuppressWarnings("deprecation")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		
		final Thread.UncaughtExceptionHandler defaultHandler = Thread.getDefaultUncaughtExceptionHandler();
		Thread.setDefaultUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler() {
			@Override
			public void uncaughtException(Thread thread, Throwable throwable) {
				defaultHandler.uncaughtException(thread, throwable);
			}
		});
		
		super.onCreate(savedInstanceState);
		
		PACKAGE_NAME = getApplicationContext().getPackageName();
		
		setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		this.requestWindowFeature(Window.FEATURE_NO_TITLE);
		this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
				WindowManager.LayoutParams.FLAG_FULLSCREEN);
		
		setContentView(R.layout.main_activity);
		
		if (android.os.Build.VERSION.SDK_INT > 9) {
			StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
			StrictMode.setThreadPolicy(policy);
		}
		
		handler.postDelayed(new Runnable() {
			public void run() {
				hasInternetAccess(context);
				handler.postDelayed(this, NETWORK_INTERVAL);
			}
		}, 100);
		
		webView = (WebView) findViewById(R.id.appWebview);
		networkView = (WebView) findViewById(R.id.networkWebview);
		
		try {
			WebSettings webSettings = webView.getSettings();
			
			// Set WebView Background color as Black
			webView.setBackgroundColor(Color.parseColor("#000000"));
			
			// JS and image Option
			webSettings.setJavaScriptEnabled(true);
			webSettings.setDomStorageEnabled(true);
			webSettings.setLoadsImagesAutomatically(true);
			
			// Database Option
			webSettings.setDatabaseEnabled(true);
			webSettings.setDatabasePath("/data/data/" + PACKAGE_NAME + "/databases");
			
			// File access option
			webSettings.setAllowFileAccess(true);
			webSettings.setAllowContentAccess(true);
			webSettings.setAllowFileAccessFromFileURLs(true);
			webSettings.setAllowUniversalAccessFromFileURLs(true);
			
			// Render priority
			webSettings.setRenderPriority(RenderPriority.HIGH);
			webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);
			
			// Zoom Control
			webSettings.setSupportZoom(false);
			webSettings.setBuiltInZoomControls(false);
			webSettings.setDisplayZoomControls(false);
			webSettings.setLoadWithOverviewMode(true);
			webSettings.setUseWideViewPort(false);
			
			// Scroll bar style
			webView.setHorizontalScrollBarEnabled(false);
			webView.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_OVERLAY);
			
			// Web client
			webView.setWebViewClient(new WebViewClient() {
				@Override
				public void onPageStarted(WebView view, String url, Bitmap favicon) {
					super.onPageStarted(view, url, favicon);
				}
				
				@Override
				public void onPageFinished(WebView view, String url) {
					super.onPageFinished(view, url);
				}
				
				@Override
				public boolean shouldOverrideUrlLoading(WebView view, String url) {
					if (!url.contains(overWriteUrl)) {
						Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
						i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
						context.startActivity(i);
						return true;
					}
					return false;
				}
			});
			
			// WebChrome client
			webView.setWebChromeClient(new WebChromeClient() {
				@Override
				public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
					return super.onJsAlert(view, url, message, result);
				}
				
				public void onConsoleMessage(String message, int lineNumber, String sourceID) {
					Log.d(TAG, message);
				}
				
				@SuppressWarnings("unused")
				public void openFileChooser(ValueCallback<Uri> uploadMsg) {
					
					mUploadMessage = uploadMsg;
					Intent i = new Intent(Intent.ACTION_GET_CONTENT);
					i.addCategory(Intent.CATEGORY_OPENABLE);
					i.setType("image/*");
					Application.this.startActivityForResult(Intent.createChooser(i, "File Chooser"),
							FILECHOOSER_RESULTCODE);
					
				}
				
				// For Android 3.0+
				@SuppressWarnings({ "unused", "rawtypes", "unchecked" })
				public void openFileChooser(ValueCallback uploadMsg, String acceptType) {
					mUploadMessage = uploadMsg;
					Intent i = new Intent(Intent.ACTION_GET_CONTENT);
					i.addCategory(Intent.CATEGORY_OPENABLE);
					i.setType("*/*");
					Application.this.startActivityForResult(Intent.createChooser(i, "File Browser"),
							FILECHOOSER_RESULTCODE);
				}
				
				// For Android 4.1
				@SuppressWarnings("unused")
				public void openFileChooser(ValueCallback<Uri> uploadMsg, String acceptType, String capture) {
					mUploadMessage = uploadMsg;
					Intent i = new Intent(Intent.ACTION_GET_CONTENT);
					i.addCategory(Intent.CATEGORY_OPENABLE);
					i.setType("image/*");
					Application.this.startActivityForResult(Intent.createChooser(i, "File Chooser"),
							Application.FILECHOOSER_RESULTCODE);
					
				}
			});
			
			networkView.setVisibility(View.GONE);
			webView.setVisibility(View.GONE);
			
			// Load HTML Page
			if (savedInstanceState == null) {
				webView.loadUrl(webUrl);
				networkView.loadUrl(noInternetUrl);
			}
		}
		catch (Exception ex) {
			Log.d(TAG, ex.getCause().toString());
		}
	}
	
	@Override
	protected void onDestroy() {
		super.onDestroy();
		this.finish();
	}
	
	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		webView.saveState(outState);
	}
	
	@Override
	protected void onRestoreInstanceState(Bundle savedInstanceState) {
		super.onRestoreInstanceState(savedInstanceState);
		webView.restoreState(savedInstanceState);
	}
	
	@Override
	protected void onStart() {
		super.onStart();
	}
	
	@Override
	public void onStop() {
		super.onStop();
	}
	
	@Override
	public void onPause() {
		super.onPause();
	}
	
	// Handle Device BackPress for loading previous web page or exit the
	// application.
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if ((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack()) {
			moveTaskToBack(true);
			webView.goBack();
			return true;
		}
		else {
			// finish();
		}
		return super.onKeyDown(keyCode, event);
	}
	
	private void hasInternetAccess(Context context) {
		if (isOnline()) {
			Log.i(TAG, "Has Internet Connection");
			if (appReload) {
				webView.loadUrl(webUrl);
				appReload = false;
			}
			networkView.setVisibility(View.GONE);
			webView.setVisibility(View.VISIBLE);
		}
		else {
			Log.i(TAG, "No Internet Connection");
			webView.setVisibility(View.GONE);
			networkView.setVisibility(View.VISIBLE);
		}
	}
	
	public boolean isOnline() {
		try {
			ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
			NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
			if (activeNetwork != null && activeNetwork.isConnectedOrConnecting()) {
				return activeNetwork.isConnected();
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
}
