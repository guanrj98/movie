import Vue from "vue";

const EventBus = new Vue();

/**
 * 事件派发
 * @param {*} ev 
 * @param {*} message 
 */
export function eventEmit(ev, message) {
  EventBus.$emit(ev, message);
}

/**
 * 事件监听
 * @param {*} ev 
 * @param {*} fn 
 */
export function eventOn(ev, fn) {
  EventBus.$on(ev, fn);
}

export function eventOff(ev) {
  EventBus.$off(ev, {});
}

