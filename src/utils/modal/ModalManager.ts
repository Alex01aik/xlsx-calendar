import { observable, action, makeAutoObservable } from 'mobx';
import react from 'react';

export class ModalManager {
  @observable isOpen: boolean = false;
  @observable component: react.ReactNode = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  open(component: react.ReactNode) {
    this.component = component;
    this.isOpen = true;
  }

  @action
  close() {
    this.isOpen = false;
  }
}

export const modalManager = new ModalManager();
