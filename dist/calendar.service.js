"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var CalendarService = (function () {
    function CalendarService() {
        this.currentDateChangedFromParent = new Subject_1.Subject();
        this.currentDateChangedFromChildren = new Subject_1.Subject();
        this.eventSourceChanged = new Subject_1.Subject();
        this.currentDateChangedFromParent$ = this.currentDateChangedFromParent.asObservable();
        this.currentDateChangedFromChildren$ = this.currentDateChangedFromChildren.asObservable();
        this.eventSourceChanged$ = this.eventSourceChanged.asObservable();
    }
    CalendarService.prototype.setCurrentDate = function (val, fromParent) {
        if (fromParent === void 0) { fromParent = false; }
        this._currentDate = val;
        if (fromParent) {
            this.currentDateChangedFromParent.next(val);
        }
        else {
            this.currentDateChangedFromChildren.next(val);
        }
    };
    Object.defineProperty(CalendarService.prototype, "currentDate", {
        get: function () {
            return this._currentDate;
        },
        enumerable: true,
        configurable: true
    });
    CalendarService.prototype.rangeChanged = function (component) {
        if (this.queryMode === 'local') {
            if (component.eventSource && component.onDataLoaded) {
                component.onDataLoaded();
            }
        }
        else if (this.queryMode === 'remote') {
            component.onRangeChanged.emit(component.range);
        }
    };
    CalendarService.prototype.getStep = function (mode) {
        switch (mode) {
            case 'month':
                return {
                    years: 0,
                    months: 1,
                    days: 0
                };
            case 'week':
                return {
                    years: 0,
                    months: 0,
                    days: 7
                };
            case 'day':
                return {
                    years: 0,
                    months: 0,
                    days: 1
                };
        }
    };
    CalendarService.prototype.getAdjacentCalendarDate = function (mode, direction) {
        var step = this.getStep(mode);
        var calculateCalendarDate = new Date(this.currentDate.getTime()), year = calculateCalendarDate.getFullYear() + direction * step.years, month = calculateCalendarDate.getMonth() + direction * step.months, date = calculateCalendarDate.getDate() + direction * step.days;
        calculateCalendarDate.setFullYear(year, month, date);
        if (mode === 'month') {
            var firstDayInNextMonth = new Date(year, month + 1, 1);
            if (firstDayInNextMonth.getTime() <= calculateCalendarDate.getTime()) {
                calculateCalendarDate = new Date(firstDayInNextMonth.getTime() - 24 * 60 * 60 * 1000);
            }
        }
        return calculateCalendarDate;
    };
    CalendarService.prototype.getAdjacentViewStartTime = function (component, direction) {
        var adjacentCalendarDate = this.getAdjacentCalendarDate(component.mode, direction);
        return component.getRange(adjacentCalendarDate).startTime;
    };
    CalendarService.prototype.populateAdjacentViews = function (component) {
        var currentViewStartDate, currentViewData, toUpdateViewIndex, currentViewIndex = component.currentViewIndex;
        if (component.direction === 1) {
            currentViewStartDate = this.getAdjacentViewStartTime(component, 1);
            toUpdateViewIndex = (currentViewIndex + 1) % 3;
            component.views[toUpdateViewIndex] = component.getViewData(currentViewStartDate);
        }
        else if (component.direction === -1) {
            currentViewStartDate = this.getAdjacentViewStartTime(component, -1);
            toUpdateViewIndex = (currentViewIndex + 2) % 3;
            component.views[toUpdateViewIndex] = component.getViewData(currentViewStartDate);
        }
        else {
            if (!component.views) {
                currentViewData = [];
                currentViewStartDate = component.range.startTime;
                currentViewData.push(component.getViewData(currentViewStartDate));
                currentViewStartDate = this.getAdjacentViewStartTime(component, 1);
                currentViewData.push(component.getViewData(currentViewStartDate));
                currentViewStartDate = this.getAdjacentViewStartTime(component, -1);
                currentViewData.push(component.getViewData(currentViewStartDate));
                component.views = currentViewData;
            }
            else {
                currentViewStartDate = component.range.startTime;
                component.views[currentViewIndex] = component.getViewData(currentViewStartDate);
                currentViewStartDate = this.getAdjacentViewStartTime(component, -1);
                toUpdateViewIndex = (currentViewIndex + 2) % 3;
                component.views[toUpdateViewIndex] = component.getViewData(currentViewStartDate);
                currentViewStartDate = this.getAdjacentViewStartTime(component, 1);
                toUpdateViewIndex = (currentViewIndex + 1) % 3;
                component.views[toUpdateViewIndex] = component.getViewData(currentViewStartDate);
            }
        }
    };
    CalendarService.prototype.loadEvents = function () {
        this.eventSourceChanged.next();
    };
    CalendarService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CalendarService);
    return CalendarService;
}());
exports.CalendarService = CalendarService;
//# sourceMappingURL=calendar.service.js.map