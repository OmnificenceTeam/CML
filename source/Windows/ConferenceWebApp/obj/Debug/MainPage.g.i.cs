﻿#pragma checksum "C:\Work\Code\CML\source\Windows\ConferenceWebApp\MainPage.xaml" "{406ea660-64cf-4c82-b6f0-42d48172a799}" "BFF646914C9C511E93D8989D3FC3427D"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using Microsoft.Phone.Controls;
using System;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Automation.Peers;
using System.Windows.Automation.Provider;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Interop;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Resources;
using System.Windows.Shapes;
using System.Windows.Threading;


namespace ConferenceWebApp {
    
    
    public partial class MainPage : Microsoft.Phone.Controls.PhoneApplicationPage {
        
        internal System.Windows.Controls.Grid LayoutRoot;
        
        internal System.Windows.VisualStateGroup VisualStateGroup;
        
        internal System.Windows.VisualState FlipCardFront;
        
        internal System.Windows.VisualState FlipCardBack;
        
        internal System.Windows.Controls.Grid ContentPanel;
        
        internal Microsoft.Phone.Controls.WebBrowser backrectangle;
        
        internal Microsoft.Phone.Controls.WebBrowser frontrectangle;
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Windows.Application.LoadComponent(this, new System.Uri("/ConferenceWebApp;component/MainPage.xaml", System.UriKind.Relative));
            this.LayoutRoot = ((System.Windows.Controls.Grid)(this.FindName("LayoutRoot")));
            this.VisualStateGroup = ((System.Windows.VisualStateGroup)(this.FindName("VisualStateGroup")));
            this.FlipCardFront = ((System.Windows.VisualState)(this.FindName("FlipCardFront")));
            this.FlipCardBack = ((System.Windows.VisualState)(this.FindName("FlipCardBack")));
            this.ContentPanel = ((System.Windows.Controls.Grid)(this.FindName("ContentPanel")));
            this.backrectangle = ((Microsoft.Phone.Controls.WebBrowser)(this.FindName("backrectangle")));
            this.frontrectangle = ((Microsoft.Phone.Controls.WebBrowser)(this.FindName("frontrectangle")));
        }
    }
}

