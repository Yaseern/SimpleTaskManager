import { Observable, Subject } from "rxjs";
import { Task } from "./task-type";
import { cloneDeep as _cloneDeep } from "lodash";
import { Injectable } from "@angular/core";

@Injectable()
export class TaskStoreService {
    private _rowClickEvent$ = new Subject<Task>();
    private _taskStore: Task[] = [];
    private _refreshDataEvent$ = new Subject<boolean>();

    publishRowClick(item: Task): void {
        this._rowClickEvent$.next(_cloneDeep(item));
    }

    getRowClick(): Observable<Task> {
        return this._rowClickEvent$.asObservable();
    }

    taskStore(): Task[] {
        return _cloneDeep(this._taskStore);
    }

    triggerRefresh() {
        this._refreshDataEvent$.next(true);
    }

    refreshTable() {
        return this._refreshDataEvent$.asObservable();
    }


    initiateStore(tasks: Task[]): void {
        this._taskStore = _cloneDeep(tasks);
    }

    updateStore(task: Task): void {
        const index = this._taskStore.findIndex(t => t.id == task.id);
        if (index >= 0) {
            this._taskStore[index] = _cloneDeep(task);
        }
    }

    addStore(task: Task): void {
        this._taskStore.push(_cloneDeep(task));
    }

    deleteStore(id: number): void {
        const tasks = this._taskStore.filter(t => t.id != id);
        this._taskStore = _cloneDeep(tasks);
    }
}