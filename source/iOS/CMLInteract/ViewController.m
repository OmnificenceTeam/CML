//
//  ViewController.m
//  ConferenceApp
//
//  Created by user on 11/01/14.
//  Copyright (c) 2014 Omnificence. All rights reserved.
//

#import "ViewController.h"


BOOL g_bInvokePush = FALSE;
NSString* g_deviceToken = @"";
NSData* g_pushData = NULL;

@interface ViewController ()

@end

@implementation ViewController
@synthesize webView;
@synthesize noInternetView;

-(BOOL) prefersStatusBarHidden
{
    return YES;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [[NSURLCache sharedURLCache] removeAllCachedResponses];
    [[NSURLCache sharedURLCache] setDiskCapacity:0];
    [[NSURLCache sharedURLCache] setMemoryCapacity:0];
    
    [UIView setAnimationsEnabled:NO];
    /*[[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(reachabilityChanged:)
                                                 name:kReachabilityChangedNotification
                                               object:nil];
    
    NSString* _HOST = @"www.google.com";
    networkReachability = [Reachability reachabilityWithHostName:_HOST];
    [networkReachability startNotifier];
    */
    bIsAppLoaded = NO;
    bIsCoreUpdate = NO; // set common module folder is not updated.
    
    webView.delegate = self;
    //updateView.delegate = self;
    webView.scrollView.bounces = NO;
    noInternetView.scrollView.bounces = NO;
    [self.view sendSubviewToBack:noInternetView];
    [webView setBackgroundColor:[UIColor clearColor]];
    [noInternetView setBackgroundColor:[UIColor clearColor]];
    
    //webView.hidden = NO;
    //noInternetView.hidden = YES;
    //[updateView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:[self appUpdatePage]]]];
    
    [webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[self appStartPage]]]];
    [noInternetView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:[self noInternetPage]]]];
    
    // Check for server reachability in different thread.
    dispatch_queue_t iqueue = dispatch_queue_create("iqueue", NULL);
    dispatch_async(iqueue, ^void {
        int lastStatus = 0 , currentStatus = -1;
        while (true) {
            NSData *data = [NSData dataWithContentsOfURL:[NSURL URLWithString:@"http://www.cmlinteract.com"]];
            
            if([data length] > 300 ) {
                dispatch_async(dispatch_get_main_queue(), ^void {
                    if(!bIsAppLoaded)
                        [webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[self appStartPage]]]];
                    [self.view bringSubviewToFront:webView];
                });
                currentStatus = 1;
            }
            else
            {
                dispatch_async(dispatch_get_main_queue(), ^void {
                    [self.view bringSubviewToFront:noInternetView];
                });
                currentStatus = 0;
            }
            
            if(lastStatus != currentStatus) {
                dispatch_async(dispatch_get_main_queue(), ^void {
                    [webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"onNetworkStatus(%d)", currentStatus ]];
                });
            }
            
            lastStatus = currentStatus;
            sleep(10);
            
        }
        
    });

}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)reachabilityChanged:(NSNotification*)notification
{
    sleep(1);
    Reachability *notifier = [notification object];
    NSLog(@"Network status : %d", [notifier currentReachabilityStatus]);

    [webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"onNetworkStatus(%d)", [notifier currentReachabilityStatus]]];
    
    if([notifier currentReachabilityStatus] == 1) {
        [self.view bringSubviewToFront:webView];
        [webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[self appStartPage]]]];
    }
    else
        [self.view bringSubviewToFront:noInternetView];
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    NSURL *URL = [request URL];
    // nav://,isModuleUptodate,1
    if ([[URL scheme] isEqualToString:@"nav"]) {
        NSArray *params = [[URL absoluteString] componentsSeparatedByString:@"?"];
        if([[params objectAtIndex:1] isEqualToString:@"nointernet"]) {
            [self.view bringSubviewToFront:noInternetView];
        }
        else if([[params objectAtIndex:1] isEqualToString:@"url"]) {
            NSString *path = [[params objectAtIndex:2]
                              stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
            
            [[UIApplication sharedApplication] openURL:[NSURL URLWithString:path]];
        }
        
        return NO;
    }
    return YES;
}


- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error {
    
    bIsAppLoaded = NO;
    //NSLog(@"Failed to load URL %@. Error : %@", webView.request.URL.absoluteString, error);
    /*
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Error"
                                                    message:@"Can't connect to server. Please check your internet connection."
                                                   delegate:self
                                          cancelButtonTitle:@"OK"
                                          otherButtonTitles:nil];
    [alert show];*/
}
-(void)viewWillAppear:(BOOL)animated{
}
-(void)webViewDidFinishLoad:(UIWebView *)WebView
{
    bIsAppLoaded = YES;
}


- (void)fadeAnimationDidStop:(NSString*)animationID finished:(NSNumber*)finished context:(void*)context
{
    NSLog(@"Animation complete.");
    [webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"SetDeviceToken('%@')",g_deviceToken]];
    // Check for internet connectivity...
    

    
}

-(void)invokeJSPushMethod:(NSString *)message
{
    NSLog(@"invoking script...%@", message);
    [webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"onPushNotification('%@')", message]];
}



-(NSString*) appStartPage
{
    return @"http://www.cmlinteract.com";
}

-(NSString*)noInternetPage
{
    NSLog(@"Path : %@", [[NSBundle mainBundle] pathForResource:@"noInternet/internet" ofType:@"html"]);
    return [[NSBundle mainBundle] pathForResource:@"noInternet/internet" ofType:@"html"];
}



@end
