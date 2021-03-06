﻿/// <reference path="jquery.js" />
/// <reference path="knockoutjs.js" />

// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    WinJS.strictProcessing();


    function AppViewModel() {
        this.self = this;
        this.firstName = ko.observable("Steve");
        this.lastName = ko.observable("Gentile");
        this.sports = ko.observableArray();
        this.fullName = ko.computed(function () {
            return this.firstName() + " " + this.lastName();
        }, this.self);
    }

    //separate options in binding
    ko.bindingHandlers.stripe = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()); //creates the dependency
            var allBindings = allBindingsAccessor();
            var even = allBindings.evenClass;
            var odd = allBindings.oddClass;

            //update odd rows
            $(element).children(":nth-child(odd)").addClass(odd).removeClass(even);
            //update even rows
            $(element).children(":nth-child(even)").addClass(even).removeClass(odd);;
        }
    }

    function initialize() {
        var appViewModel = new AppViewModel();
        ko.applyBindings(appViewModel);

        appViewModel.sports.push({ name: "Golf" });
        appViewModel.sports.push({ name: "Basketball" });
        appViewModel.sports.push({ name: "Football" });
        appViewModel.sports.push({ name: "Tennis" });
    }

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();

    //If Document fully loaded than begin processing
    document.addEventListener("DOMContentLoaded", initialize, false);
})();
