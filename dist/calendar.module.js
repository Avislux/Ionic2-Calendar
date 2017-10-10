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
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
require('intl');
require('intl/locale-data/jsonp/en');
var monthview_1 = require('./monthview');
var weekview_1 = require('./weekview');
var dayview_1 = require('./dayview');
var calendar_1 = require('./calendar');
var init_position_scroll_1 = require('./init-position-scroll');
var NgCalendarModule = (function () {
    function NgCalendarModule() {
    }
    NgCalendarModule = __decorate([
        core_1.NgModule({
            declarations: [
                monthview_1.MonthViewComponent, weekview_1.WeekViewComponent, dayview_1.DayViewComponent, calendar_1.CalendarComponent, init_position_scroll_1.initPositionScrollComponent
            ],
            imports: [ionic_angular_1.IonicModule],
            exports: [calendar_1.CalendarComponent],
            entryComponents: [calendar_1.CalendarComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], NgCalendarModule);
    return NgCalendarModule;
}());
exports.NgCalendarModule = NgCalendarModule;
//# sourceMappingURL=calendar.module.js.map