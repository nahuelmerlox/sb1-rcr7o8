import { Observable } from '@nativescript/core';
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { EventData } from '@nativescript/core/data/observable';
import { Page } from '@nativescript/core/ui/page';

export class AppointmentsViewModel extends Observable {
    private _appointments: ObservableArray<any>;
    private _filterOptions: ObservableArray<string>;
    private _selectedFilterIndex: number;

    constructor() {
        super();
        this._appointments = new ObservableArray([]);
        this._filterOptions = new ObservableArray(['All', 'Pending', 'Confirmed', 'Cancelled']);
        this._selectedFilterIndex = 0;
        this.loadAppointments();
    }

    get appointments() {
        return this._appointments;
    }

    get filterOptions() {
        return this._filterOptions;
    }

    get selectedFilterIndex() {
        return this._selectedFilterIndex;
    }

    set selectedFilterIndex(value: number) {
        if (this._selectedFilterIndex !== value) {
            this._selectedFilterIndex = value;
            this.notifyPropertyChange('selectedFilterIndex', value);
            this.loadAppointments();
        }
    }

    async loadAppointments() {
        try {
            const response = await fetch('http://your-api-url/api/appointments');
            const data = await response.json();
            
            let filteredData = data;
            if (this._selectedFilterIndex > 0) {
                const status = this._filterOptions.getItem(this._selectedFilterIndex).toLowerCase();
                filteredData = data.filter(appointment => appointment.status === status);
            }
            
            this._appointments.splice(0);
            filteredData.forEach(appointment => this._appointments.push(appointment));
        } catch (error) {
            console.error('Error loading appointments:', error);
        }
    }

    async onConfirm(args: EventData) {
        const appointment = (args.object as any).bindingContext;
        try {
            await fetch(`http://your-api-url/api/appointments/${appointment.id}/confirm`, {
                method: 'PUT'
            });
            this.loadAppointments();
        } catch (error) {
            console.error('Error confirming appointment:', error);
        }
    }

    async onCancel(args: EventData) {
        const appointment = (args.object as any).bindingContext;
        try {
            await fetch(`http://your-api-url/api/appointments/${appointment.id}/cancel`, {
                method: 'PUT'
            });
            this.loadAppointments();
        } catch (error) {
            console.error('Error cancelling appointment:', error);
        }
    }
}

export function onNavigatingTo(args: EventData) {
    const page = args.object as Page;
    page.bindingContext = new AppointmentsViewModel();
}

export function onRefresh() {
    const vm = (args.object.page.bindingContext as AppointmentsViewModel);
    vm.loadAppointments();
}