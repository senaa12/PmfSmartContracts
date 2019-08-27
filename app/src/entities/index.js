import { makeEntity } from "react-entities";
import * as appState from "./appState";
import * as appData from "./appData";
import * as animations from "./animations";
import * as portal from "./portal";

export const useAppState = makeEntity(appState);
export const useAppData = makeEntity(appData);
export const useAnimations = makeEntity(animations);
export const usePortal = makeEntity(portal);